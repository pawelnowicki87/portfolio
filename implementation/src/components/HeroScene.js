import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Three.js wireframe sphere + orbiting particles + starfield.
   Mounts a renderer into the given containerRef and cleans up on unmount. */
export default function HeroScene({ containerRef, enabled = true }) {
  const destroyedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const mount = containerRef.current;
    if (!mount) return undefined;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050a12, 0.05);

    const camera = new THREE.PerspectiveCamera(50, w() / h(), 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    renderer.setClearColor(0x000000, 0);
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    /* Main wire sphere */
    const sphereGeo = new THREE.IcosahedronGeometry(2.2, 4);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x5fc7d1, wireframe: true, transparent: true, opacity: 0.28,
    });
    const sphere = new THREE.Mesh(sphereGeo, wireMat);
    group.add(sphere);

    /* Inner glass sphere */
    const innerGeo = new THREE.IcosahedronGeometry(2.18, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x14778a, transparent: true, opacity: 0.06, side: THREE.DoubleSide,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    /* Halo rings */
    const ringGeo = new THREE.TorusGeometry(3.2, 0.008, 16, 200);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x9ee0e6, transparent: true, opacity: 0.7 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    group.add(ring);

    const ring2Geo = new THREE.TorusGeometry(3.7, 0.004, 16, 200);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x5fc7d1, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.z = 0.4;
    group.add(ring2);

    /* Particles around sphere */
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.6 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = haloCanvas.height = 64;
    const hctx = haloCanvas.getContext('2d');
    const grad = hctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0,    'rgba(207, 240, 243, 1)');
    grad.addColorStop(0.35, 'rgba(95, 199, 209, 0.7)');
    grad.addColorStop(1,    'rgba(95, 199, 209, 0)');
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, 64, 64);
    const haloTex = new THREE.CanvasTexture(haloCanvas);

    const partMat = new THREE.PointsMaterial({
      size: 0.07, map: haloTex, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xcdf0f3,
    });
    const points = new THREE.Points(partGeo, partMat);
    group.add(points);

    /* Starfield */
    const starCount = 800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPos[i * 3 + 2] = -10 - Math.random() * 20;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.04, color: 0x9ee0e6, transparent: true, opacity: 0.6,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* Mouse parallax */
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMouse = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      target.x = (x - 0.5) * 1.0;
      target.y = (y - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const ro = new ResizeObserver(() => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    });
    ro.observe(mount);

    let raf = 0;
    let paused = document.hidden;
    const onVis = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (paused || destroyedRef.current) return;
      const t = performance.now() / 1000;
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      group.rotation.y = t * 0.10 + current.x * 0.8;
      group.rotation.x = Math.sin(t * 0.3) * 0.08 + current.y * 0.6;
      sphere.rotation.y -= 0.0018;
      sphere.rotation.x += 0.0009;
      inner.rotation.y += 0.001;
      ring.rotation.z += 0.0012;
      ring2.rotation.z -= 0.0009;
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0003;

      const s = 1 + Math.sin(t * 0.8) * 0.02;
      sphere.scale.setScalar(s);

      stars.rotation.z = Math.sin(t * 0.05) * 0.05;
      stars.position.x = current.x * -0.6;
      stars.position.y = current.y * -0.4;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      destroyedRef.current = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVis);
      renderer.dispose();
      [sphereGeo, innerGeo, ringGeo, ring2Geo, partGeo, starGeo].forEach((g) => g.dispose());
      [wireMat, innerMat, ringMat, ring2Mat, partMat, starMat].forEach((m) => m.dispose());
      haloTex.dispose();
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [enabled, containerRef]);

  return null;
}
