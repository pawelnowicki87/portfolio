// Three.js hero scene: rotating wireframe icosahedron, particle field, mouse parallax
function Hero3D() {
  const mountRef = React.useRef(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !window.THREE) return;
    const THREE = window.THREE;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w(), h());
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // === Central object: icosahedron wireframe + glow shell ===
    const group = new THREE.Group();
    scene.add(group);

    const ico = new THREE.IcosahedronGeometry(1.55, 1);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(ico),
      new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.85 })
    );
    group.add(wire);

    // inner solid (faceted, dark, low opacity)
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshStandardMaterial({
        color: 0x0e1014, metalness: 0.85, roughness: 0.35,
        emissive: 0x1a103a, emissiveIntensity: 0.45,
        flatShading: true, transparent: true, opacity: 0.95,
      })
    );
    group.add(inner);

    // outer glow shell (additive)
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.05, 1),
      new THREE.MeshBasicMaterial({
        color: 0x7c5cff, transparent: true, opacity: 0.06,
        blending: THREE.AdditiveBlending, wireframe: true,
      })
    );
    group.add(shell);

    // vertex dots
    const verts = ico.attributes.position;
    const dotGeom = new THREE.BufferGeometry();
    const dotPos = [];
    for (let i = 0; i < verts.count; i++) dotPos.push(verts.getX(i), verts.getY(i), verts.getZ(i));
    dotGeom.setAttribute('position', new THREE.Float32BufferAttribute(dotPos, 3));
    const dots = new THREE.Points(
      dotGeom,
      new THREE.PointsMaterial({ color: 0x5eead4, size: 0.06, transparent: true, opacity: 0.9 })
    );
    group.add(dots);

    // === Orbiting torus rings ===
    const ringMat = () => new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.18, wireframe: true });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.005, 8, 96), ringMat());
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.005, 8, 96), ringMat());
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.005, 8, 96), ringMat());
    ring1.rotation.x = Math.PI / 2.2;
    ring2.rotation.x = Math.PI / 1.8; ring2.rotation.y = Math.PI / 5;
    ring3.rotation.x = Math.PI / 2.6; ring3.rotation.y = -Math.PI / 4;
    scene.add(ring1); scene.add(ring2); scene.add(ring3);

    // small satellites on rings
    const sat = (color) => new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 16, 16),
      new THREE.MeshBasicMaterial({ color })
    );
    const sats = [
      { m: sat(0xa78bfa), r: 2.4, t: 0, s: 0.6 },
      { m: sat(0x5eead4), r: 2.8, t: Math.PI, s: -0.45 },
      { m: sat(0xfbbf24), r: 3.2, t: Math.PI/2, s: 0.35 },
    ];
    sats.forEach(o => scene.add(o.m));

    // === Particle field ===
    const pCount = 700;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 4 + Math.random() * 6;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pPos[i*3]   = r * Math.sin(p) * Math.cos(t);
      pPos[i*3+1] = r * Math.sin(p) * Math.sin(t);
      pPos[i*3+2] = r * Math.cos(p);
    }
    pGeom.setAttribute('position', new THREE.Float32BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeom,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.55, depthWrite: false })
    );
    scene.add(particles);

    // === Lighting ===
    scene.add(new THREE.AmbientLight(0x404060, 0.6));
    const key = new THREE.PointLight(0xa78bfa, 2.4, 20);
    key.position.set(3, 2, 4); scene.add(key);
    const fill = new THREE.PointLight(0x5eead4, 1.2, 20);
    fill.position.set(-3, -2, 3); scene.add(fill);

    // === Mouse parallax ===
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      target.x = nx * 0.6;
      target.y = -ny * 0.4;
    };
    window.addEventListener('mousemove', onMove);

    // === Resize ===
    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    const ro = new ResizeObserver(onResize); ro.observe(mount);

    // === Animate ===
    let rafId;
    const clock = new THREE.Clock();
    const tick = () => {
      const dt = clock.getDelta();
      const t  = clock.elapsedTime;

      cur.x += (target.x - cur.x) * 0.04;
      cur.y += (target.y - cur.y) * 0.04;

      group.rotation.y += dt * 0.25;
      group.rotation.x = cur.y * 0.4 + Math.sin(t * 0.4) * 0.12;
      group.position.x = cur.x * 0.3;

      shell.rotation.y -= dt * 0.15;
      shell.rotation.x += dt * 0.08;

      ring1.rotation.z += dt * 0.25;
      ring2.rotation.z -= dt * 0.18;
      ring3.rotation.z += dt * 0.12;

      sats.forEach(o => {
        o.t += dt * o.s;
        // place satellite on its tilted ring
        const cx = Math.cos(o.t) * o.r;
        const cy = Math.sin(o.t) * o.r;
        o.m.position.set(cx, cy * 0.15, cy);
      });

      particles.rotation.y += dt * 0.02;
      particles.rotation.x += dt * 0.01;

      camera.position.x += (cur.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (cur.y * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose?.();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.());
          else obj.material.dispose?.();
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 hero-canvas" />;
}

window.Hero3D = Hero3D;
