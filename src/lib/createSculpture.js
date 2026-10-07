import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

// Loaded as a separate chunk only when motion is enabled. No external models or textures.
export function createSculpture(mount, { onReady, onUnavailable }) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { onUnavailable(); return null; }
  const resources = [];
  const cleanups = [];
  let stop = () => {};
  try {
    const keep = resource => { resources.push(resource); return resource; };
    let frame = 0;
    let alive = true;
    stop = () => { alive = false; cancelAnimationFrame(frame); };
    let visible = true;
    let targetEnergy = 0;
    let energy = 0;
    let elapsed = 0;
    let rotation = 0;
    let previous = 0;
    let dragging = false;
    let lastX = 0;
    let dragAngle = 0;
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 60);
    camera.position.set(0, 0, 9.8);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .92;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.appendChild(renderer.domElement);

    const pmrem = keep(new THREE.PMREMGenerator(renderer));
    const room = new RoomEnvironment(renderer);
    room.traverse(object => {
      if (object.isMesh && object.material.isMeshStandardMaterial) object.material.color.set(0x03050d);
    });
    const panelGeometry = new THREE.BoxGeometry(.1, 7, 8);
    const bluePanel = new THREE.Mesh(panelGeometry, new THREE.MeshBasicMaterial({ color: new THREE.Color('#1c37ff').multiplyScalar(10) }));
    bluePanel.position.set(-5, 2, 1);
    room.add(bluePanel);
    const environment = keep(pmrem.fromScene(room, .03));
    room.dispose();
    scene.environment = environment.texture;

    const sculpture = new THREE.Group();
    sculpture.rotation.set(.25, -.45, .2);
    scene.add(sculpture);
    const geometry = keep(new THREE.TorusKnotGeometry(1.48, .47, 224, 28, 2, 3));
    const uniforms = { uTime: { value: 0 }, uEnergy: { value: 0 } };
    const metal = keep(new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 1, roughness: .09, clearcoat: .7,
      clearcoatRoughness: .08, envMapIntensity: 1.15,
      iridescence: .07, iridescenceIOR: 1.4, iridescenceThicknessRange: [120, 300],
    }));
    metal.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vSculptPosition;\nuniform float uTime;\nuniform float uEnergy;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSculptPosition = position;\ntransformed += normal * sin(position.y * 2.5 + uTime * .7) * (.025 + uEnergy * .045);');
      shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vSculptPosition;\nuniform float uEnergy;')
        .replace('#include <color_fragment>', '#include <color_fragment>\nfloat band = smoothstep(-.2, .45, sin(vSculptPosition.y * 1.8 + vSculptPosition.x * 1.3));\nvec3 ink = mix(vec3(.012,.045,.8), vec3(.95,.17,.015), uEnergy);\ndiffuseColor.rgb *= mix(vec3(.84,.9,1.), ink, band * .93);');
    };
    const knot = new THREE.Mesh(geometry, metal);
    sculpture.add(knot);

    const rings = new THREE.Group();
    scene.add(rings);
    const ringMaterial = keep(new THREE.MeshBasicMaterial({ color: 0x7185ff, transparent: true, opacity: .27, depthWrite: false }));
    const ring = new THREE.Mesh(keep(new THREE.TorusGeometry(3.05, .008, 6, 160)), ringMaterial);
    ring.rotation.set(1.16, .25, -.35);
    rings.add(ring);
    const arc = new THREE.Mesh(keep(new THREE.TorusGeometry(2.8, .014, 8, 100, Math.PI * .68)), ringMaterial);
    arc.rotation.set(.8, -.4, 1.6);
    rings.add(arc);
    const satelliteMaterial = keep(new THREE.MeshStandardMaterial({ color: 0xa7b4ff, metalness: 1, roughness: .18, envMapIntensity: 2 }));
    const satelliteGeometry = keep(new THREE.IcosahedronGeometry(.08, 2));
    const satellites = Array.from({ length: 3 }, () => {
      const mesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      rings.add(mesh); return mesh;
    });
    const halo = new THREE.Mesh(keep(new THREE.PlaneGeometry(10, 10)), keep(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uEnergy: uniforms.uEnergy },
      vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'varying vec2 vUv; uniform float uEnergy; void main(){ float d=length((vUv-.5)*vec2(1.,1.3)); float glow=exp(-d*d*13.)*.19; vec3 col=mix(vec3(.07,.15,1.),vec3(1.,.22,.04),uEnergy); gl_FragColor=vec4(col,glow); }',
    })));
    halo.position.z = -2;
    scene.add(halo);

    const positions = [];
    const count = window.innerWidth < 760 ? 36 : 80;
    for (let i = 0; i < count; i++) {
      const a = i * 2.399963;
      const r = 3.3 + (Math.sin(i * 43.1) + 1) * .9;
      positions.push(Math.cos(a) * r, Math.sin(a) * r * .72, Math.sin(i * 2.7) * 2 - 1.5);
    }
    const dustGeometry = keep(new THREE.BufferGeometry());
    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const dustMaterial = keep(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uEnergy: uniforms.uEnergy },
      vertexShader: 'void main(){ vec4 p=modelViewMatrix*vec4(position,1.); gl_Position=projectionMatrix*p; gl_PointSize=22./-p.z; }',
      fragmentShader: 'uniform float uEnergy; void main(){ float d=length(gl_PointCoord-.5); float a=smoothstep(.5,.1,d)*.65; gl_FragColor=vec4(mix(vec3(.5,.62,1.),vec3(1.,.65,.3),uEnergy),a); }',
    }));
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);
    scene.add(new THREE.HemisphereLight(0xb8c7ff, 0x151b3b, 1.5));
    const light = new THREE.DirectionalLight(0xffffff, 1.4);
    light.position.set(3, 4, 5);
    scene.add(light);
    const rim = new THREE.PointLight(0x4260ff, 24, 15);
    rim.position.set(-4, 0, 3);
    scene.add(rim);
    const amber = new THREE.PointLight(0xffb36b, 16, 15);
    amber.position.set(3, -2, 2);
    scene.add(amber);
    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.position.z = width < 500 ? 11.5 : 9.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    cleanups.push(() => observer.disconnect());
    observer.observe(mount); resize();
    const onMove = e => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - .5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - .5) * 2;
      if (dragging) dragAngle += (e.clientX - lastX) * .007;
      lastX = e.clientX;
    };
    const onDown = e => { dragging = true; lastX = e.clientX; mount.setPointerCapture(e.pointerId); };
    const onUp = () => { dragging = false; };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; dragging = false; };
    const onKey = e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); dragAngle += e.key === 'ArrowLeft' ? -.3 : .3;
      }
    };
    mount.addEventListener('pointermove', onMove);
    mount.addEventListener('pointerdown', onDown);
    mount.addEventListener('pointerup', onUp);
    mount.addEventListener('pointercancel', onUp);
    mount.addEventListener('pointerleave', onLeave);
    mount.addEventListener('keydown', onKey);
    cleanups.push(() => {
      mount.removeEventListener('pointermove', onMove);
      mount.removeEventListener('pointerdown', onDown);
      mount.removeEventListener('pointerup', onUp);
      mount.removeEventListener('pointercancel', onUp);
      mount.removeEventListener('pointerleave', onLeave);
      mount.removeEventListener('keydown', onKey);
    });

    const render = timestamp => {
      if (!alive || !visible || document.hidden) { frame = 0; previous = 0; return; }
      const dt = previous ? Math.min((timestamp - previous) / 1000, .05) : 0;
      previous = timestamp; elapsed += dt;
      energy += (targetEnergy - energy) * Math.min(dt * 2.4, 1);
      rotation += dt * (.095 + energy * .08);
      current.x += (pointer.x - current.x) * .055;
      current.y += (pointer.y - current.y) * .055;
      uniforms.uTime.value = elapsed;
      uniforms.uEnergy.value = energy;
      sculpture.rotation.y = -.45 + rotation + current.x * .28 + dragAngle;
      sculpture.rotation.x = .25 + current.y * .16 + Math.sin(elapsed * .25) * .09;
      sculpture.rotation.z = .2 + Math.sin(elapsed * .18) * .1;
      sculpture.position.y = Math.sin(elapsed * .6) * .09;
      sculpture.scale.setScalar(1 + energy * .06);
      rings.rotation.z = elapsed * .035;
      ringMaterial.color.setRGB(.44 + energy * .5, .52 - energy * .18, 1 - energy * .7);
      satellites.forEach((mesh, i) => {
        const a = elapsed * (.18 + i * .02) + i * 2.094;
        mesh.position.set(Math.cos(a) * 3.05, Math.sin(a) * 1.1, Math.sin(a) * 2.8);
      });
      dust.rotation.z = elapsed * .007;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const resume = () => {
      if (!alive || !visible || document.hidden) {
        cancelAnimationFrame(frame); frame = 0; previous = 0; return;
      }
      if (!frame) frame = requestAnimationFrame(render);
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }, { threshold: 0 });
    cleanups.push(() => visibility.disconnect());
    visibility.observe(mount);
    document.addEventListener('visibilitychange', resume);
    cleanups.push(() => document.removeEventListener('visibilitychange', resume));
    const onLost = e => { e.preventDefault(); alive = false; cancelAnimationFrame(frame); onUnavailable(); };
    renderer.domElement.addEventListener('webglcontextlost', onLost);
    cleanups.push(() => renderer.domElement.removeEventListener('webglcontextlost', onLost));
    renderer.render(scene, camera);
    onReady();
    resume();
    return {
      setEnergy(value) { targetEnergy = value ? 1 : 0; },
      destroy() {
        stop();
        cleanups.forEach(cleanup => cleanup());
        resources.forEach(resource => resource.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      },
    };
  } catch {
    stop();
    cleanups.forEach(cleanup => cleanup());
    resources.forEach(resource => resource.dispose());
    renderer.dispose();
    renderer.domElement.remove();
    onUnavailable();
    return null;
  }
}
