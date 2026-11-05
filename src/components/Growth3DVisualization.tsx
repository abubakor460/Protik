import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { TrendingUp, BarChart2, Layers } from 'lucide-react';

interface Growth3DProps {
  className?: string;
}

export const Growth3DVisualization: React.FC<Growth3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(3); // 0 to 4
  const stateRef = useRef({
    activeStage: 3,
    targetRotX: 0.15,
    targetRotY: -0.2,
    currentRotX: 0.15,
    currentRotY: -0.2,
  });

  useEffect(() => {
    stateRef.current.activeStage = activeStage;
  }, [activeStage]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.05);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.8, 3.2, 5.8);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {}

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xcceeff, 0x111122, 0.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.4);
    keyLight.position.set(5, 7, 4);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00d2ff, 2.0, 10);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Main visual group
    const visualGroup = new THREE.Group();
    scene.add(visualGroup);

    // 1. Procedural Ground Grid with Coplanar Offset
    const gridGeo = new THREE.PlaneGeometry(6, 6);
    const gridCanvas = document.createElement('canvas');
    gridCanvas.width = 256;
    gridCanvas.height = 256;
    const gCtx = gridCanvas.getContext('2d');
    if (gCtx) {
      gCtx.fillStyle = '#08080a';
      gCtx.fillRect(0, 0, 256, 256);
      gCtx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      gCtx.lineWidth = 1;
      const step = 32;
      for (let x = 0; x <= 256; x += step) {
        gCtx.beginPath();
        gCtx.moveTo(x, 0);
        gCtx.lineTo(x, 256);
        gCtx.stroke();
        gCtx.beginPath();
        gCtx.moveTo(0, x);
        gCtx.lineTo(256, x);
        gCtx.stroke();
      }
    }
    const gridTexture = new THREE.CanvasTexture(gridCanvas);
    gridTexture.colorSpace = THREE.SRGBColorSpace;
    gridTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const gridMat = new THREE.MeshBasicMaterial({
      map: gridTexture,
      transparent: true,
      opacity: 0.65,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -0.01;
    visualGroup.add(gridMesh);

    // 2. Growth Pillars (5 composite bars with base, metallic body & luminous cap)
    const pillarData = [
      { x: -1.8, targetHeight: 0.8, color: 0x223344, capColor: 0x00d2ff },
      { x: -0.9, targetHeight: 1.35, color: 0x1f385c, capColor: 0x00d2ff },
      { x: 0.0, targetHeight: 1.9, color: 0x1a457a, capColor: 0x00b4d8 },
      { x: 0.9, targetHeight: 2.5, color: 0x145398, capColor: 0x0096c7 },
      { x: 1.8, targetHeight: 3.2, color: 0x0e62b6, capColor: 0x0077b6 },
    ];

    const pillars: {
      group: THREE.Group;
      body: THREE.Mesh;
      cap: THREE.Mesh;
      targetHeight: number;
    }[] = [];

    pillarData.forEach((item, index) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(item.x, 0, 0);

      // Body (BoxGeometry)
      const bodyGeo = new THREE.BoxGeometry(0.48, 1, 0.48);
      // Shift pivot to bottom center so scale doesn't clip below ground
      bodyGeo.translate(0, 0.5, 0);

      const bodyMat = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.85,
        roughness: 0.25,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = !isSoftwareGl;
      body.receiveShadow = !isSoftwareGl;
      pGroup.add(body);

      // Glowing Cap
      const capGeo = new THREE.BoxGeometry(0.5, 0.06, 0.5);
      capGeo.translate(0, 0.03, 0);
      const capMat = new THREE.MeshStandardMaterial({
        color: item.capColor,
        emissive: item.capColor,
        emissiveIntensity: 0.7,
        metalness: 0.5,
        roughness: 0.2,
      });
      const cap = new THREE.Mesh(capGeo, capMat);
      pGroup.add(cap);

      visualGroup.add(pGroup);
      pillars.push({ group: pGroup, body, cap, targetHeight: item.targetHeight });
    });

    // 3. Smooth 3D Growth Curve (CatmullRom Spline + TubeGeometry)
    const curvePoints = pillarData.map((p) => new THREE.Vector3(p.x, p.targetHeight + 0.35, 0));
    const spline = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(spline, 64, 0.045, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x006699,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
    });
    const curveMesh = new THREE.Mesh(tubeGeo, tubeMat);
    visualGroup.add(curveMesh);

    // 4. Data Nodes along the Curve
    const nodeSpheres: THREE.Mesh[] = [];
    curvePoints.forEach((pt) => {
      const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x00d2ff,
        emissiveIntensity: 1.0,
        metalness: 0.9,
        roughness: 0.1,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.copy(pt);
      visualGroup.add(sphere);
      nodeSpheres.push(sphere);
    });

    // 5. Floating Upward Metric Particles
    const pCount = isSoftwareGl ? 20 : 45;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pVel = new Float32Array(pCount);

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 4;
      pPos[i * 3 + 1] = Math.random() * 3.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      pVel[i] = 0.4 + Math.random() * 0.8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const pCloud = new THREE.Points(pGeo, pMat);
    visualGroup.add(pCloud);

    // Mouse movement
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.targetRotY = -0.2 + nx * 0.35;
      stateRef.current.targetRotX = 0.15 - ny * 0.25;
    };
    container.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping on rotation
      const damp = 1 - Math.exp(-4 * dt);
      stateRef.current.currentRotX += (stateRef.current.targetRotX - stateRef.current.currentRotX) * damp;
      stateRef.current.currentRotY += (stateRef.current.targetRotY - stateRef.current.currentRotY) * damp;

      visualGroup.rotation.x = stateRef.current.currentRotX;
      visualGroup.rotation.y = stateRef.current.currentRotY;

      // Animate pillar heights and caps
      pillars.forEach((p, idx) => {
        const pulse = 1 + Math.sin(time * 2 + idx * 0.8) * 0.04;
        const currentH = p.targetHeight * pulse;
        p.body.scale.set(1, currentH, 1);
        p.cap.position.y = currentH;
      });

      // Animate floating upward particles
      const positions = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        positions[i * 3 + 1] += pVel[i] * dt;
        if (positions[i * 3 + 1] > 4.0) {
          positions[i * 3 + 1] = 0;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      // Highlight active node
      const currentActive = stateRef.current.activeStage;
      nodeSpheres.forEach((node, idx) => {
        const targetScale = idx === currentActive ? 1.7 : 1.0;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);

      // Clean up geometries & materials
      gridGeo.dispose();
      gridTexture.dispose();
      gridMat.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative rounded-2xl bg-[#0f0f14]/80 border border-[#22222d] overflow-hidden ${className}`}>
      {/* 3D Scene Viewport */}
      <div ref={mountRef} className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16161f]/90 border border-[#272736] text-[11px] font-mono text-zinc-300">
        <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
        <span>3D Media Buying Growth Matrix</span>
        <span className="text-[10px] text-zinc-500 font-sans">(Interactive)</span>
      </div>

      {/* Stage Selector Pills (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-[#13131a]/95 border border-[#252533] text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {['Audit & Baseline', 'Pixel / CAPI', 'Hook Iteration', 'Scale Phase', 'Peak ROAS'].map((stage, idx) => (
            <button
              key={stage}
              onClick={() => setActiveStage(idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all ${
                activeStage === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#1a1a24]'
              }`}
            >
              Stage 0{idx + 1}
            </button>
          ))}
        </div>
        <div className="text-[10px] font-mono text-zinc-500 hidden sm:block">
          Click stage or drag 3D space
        </div>
      </div>
    </div>
  );
};
