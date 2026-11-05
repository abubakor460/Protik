import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, RotateCw, Sparkles, Sliders } from 'lucide-react';

interface Hero3DSceneProps {
  className?: string;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [renderMode, setRenderMode] = useState<'pbr' | 'wireframe' | 'minimal'>('pbr');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [activePlatformNode, setActivePlatformNode] = useState<'All' | 'Meta' | 'TikTok' | 'Google'>('All');

  // Mutable state for the animation loop
  const stateRef = useRef({
    renderMode: 'pbr',
    speedMultiplier: 1,
    activePlatformNode: 'All',
    targetRotX: 0,
    targetRotY: 0,
    currentRotX: 0,
    currentRotY: 0,
  });

  useEffect(() => {
    stateRef.current.renderMode = renderMode;
    stateRef.current.speedMultiplier = speedMultiplier;
    stateRef.current.activePlatformNode = activePlatformNode;
  }, [renderMode, speedMultiplier, activePlatformNode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per skill directives
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

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.045);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer setup
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

    // Mandatory RoomEnvironment setup for PBR reflections
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Graceful fallback
    }

    // Studio 3-point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xbfdbfe, 0x0f172a, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(4, 5, 5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00d2ff, 1.8);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const blueFill = new THREE.PointLight(0x0066ff, 1.5, 12);
    blueFill.position.set(-3, 3, 2);
    scene.add(blueFill);

    // -------------------------------------------------------------------------
    // COMPOSITE PROCEDURAL HERO OBJECT: 8-part Media Buying Hologram Nexus
    // -------------------------------------------------------------------------
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 1. Central Core: Dark Chromium Faceted Polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      metalness: 0.95,
      roughness: 0.18,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = !isSoftwareGl;
    heroGroup.add(coreMesh);

    // 2. Inner Luminous Core
    const innerLuminousGeo = new THREE.SphereGeometry(0.68, 24, 24);
    const innerLuminousMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerLuminous = new THREE.Mesh(innerLuminousGeo, innerLuminousMat);
    heroGroup.add(innerLuminous);

    // 3. Primary Gimbal Ring (Titanium / Silver)
    const ring1Geo = new THREE.TorusGeometry(1.85, 0.045, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xe0e5ec,
      metalness: 0.92,
      roughness: 0.14,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    heroGroup.add(ring1);

    // 4. Secondary Gimbal Ring (Electric Cyan Accent)
    const ring2Geo = new THREE.TorusGeometry(2.2, 0.035, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x004466,
      emissiveIntensity: 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    heroGroup.add(ring2);

    // 5. Outer Slotted Orbit Ring
    const ring3Geo = new THREE.TorusGeometry(2.55, 0.02, 12, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x71717a,
      metalness: 0.7,
      roughness: 0.4,
      transparent: true,
      opacity: 0.8,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    heroGroup.add(ring3);

    // 6. Platform Data Nodes (Meta, TikTok, Google Satellite Orbs)
    const nodeMetaGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeMetaMat = new THREE.MeshStandardMaterial({
      color: 0x1877f2,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0d47a1,
      emissiveIntensity: 0.5,
    });
    const nodeMeta = new THREE.Mesh(nodeMetaGeo, nodeMetaMat);
    nodeMeta.position.set(2.2, 0.4, 0);
    heroGroup.add(nodeMeta);

    const nodeTikTokGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeTikTokMat = new THREE.MeshStandardMaterial({
      color: 0xff0050,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x880028,
      emissiveIntensity: 0.5,
    });
    const nodeTikTok = new THREE.Mesh(nodeTikTokGeo, nodeTikTokMat);
    nodeTikTok.position.set(-1.8, 1.4, 0.8);
    heroGroup.add(nodeTikTok);

    const nodeGoogleGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeGoogleMat = new THREE.MeshStandardMaterial({
      color: 0x4285f4,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1a73e8,
      emissiveIntensity: 0.5,
    });
    const nodeGoogle = new THREE.Mesh(nodeGoogleGeo, nodeGoogleMat);
    nodeGoogle.position.set(0.6, -2.1, 1.1);
    heroGroup.add(nodeGoogle);

    // 7. Grounding Soft Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.65)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.45,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.8;
    scene.add(shadowPlane);

    // 8. Procedural Floating Data Particles
    const particleCount = isSoftwareGl ? 35 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i3 + 2] = radius * Math.cos(phi);
      scaleArray[i] = 0.5 + Math.random() * 1.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle sprite using procedural canvas texture (zero 404s)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      pGrad.addColorStop(0, 'rgba(0, 210, 255, 1)');
      pGrad.addColorStop(0.35, 'rgba(0, 102, 255, 0.8)');
      pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = pGrad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);
    particleTexture.colorSpace = THREE.SRGBColorSpace;

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Center offset to complement editorial text layout (right-shifted slightly on desktop)
    const updateScenePosition = () => {
      if (window.innerWidth >= 1024) {
        heroGroup.position.set(1.4, 0.1, 0);
        shadowPlane.position.set(1.4, -2.8, 0);
      } else {
        heroGroup.position.set(0, -0.4, 0);
        shadowPlane.position.set(0, -2.8, 0);
      }
    };
    updateScenePosition();

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetRotY = normX * 0.45;
      stateRef.current.targetRotX = -normY * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      updateScenePosition();
    };
    window.addEventListener('resize', handleResize);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Animation loop with exponential damping and software WebGL guard
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();
      const spd = stateRef.current.speedMultiplier;

      // Exponential damping for mouse parallax
      const dampFactor = 1 - Math.exp(-4.5 * dt);
      stateRef.current.currentRotX += (stateRef.current.targetRotX - stateRef.current.currentRotX) * dampFactor;
      stateRef.current.currentRotY += (stateRef.current.targetRotY - stateRef.current.currentRotY) * dampFactor;

      heroGroup.rotation.x = stateRef.current.currentRotX + Math.sin(time * 0.4 * spd) * 0.08;
      heroGroup.rotation.y = stateRef.current.currentRotY + time * 0.25 * spd;

      // Independent sub-rotations
      coreMesh.rotation.y = time * 0.4 * spd;
      coreMesh.rotation.z = time * 0.15 * spd;

      innerLuminous.rotation.x = -time * 0.5 * spd;
      innerLuminous.rotation.y = time * 0.3 * spd;

      ring1.rotation.x = time * 0.3 * spd;
      ring1.rotation.y = Math.PI / 4 + Math.sin(time * 0.25 * spd) * 0.2;

      ring2.rotation.z = -time * 0.22 * spd;
      ring2.rotation.x = Math.PI / 3 + Math.cos(time * 0.3 * spd) * 0.15;

      ring3.rotation.y = time * 0.18 * spd;
      ring3.rotation.z = Math.PI / 4;

      // Orbital Platform Nodes
      const orbitSpeed = time * 0.6 * spd;
      nodeMeta.position.x = Math.cos(orbitSpeed) * 2.2;
      nodeMeta.position.z = Math.sin(orbitSpeed) * 2.2;
      nodeMeta.position.y = Math.sin(orbitSpeed * 1.5) * 0.4;

      nodeTikTok.position.x = Math.cos(orbitSpeed + (Math.PI * 2) / 3) * 2.1;
      nodeTikTok.position.z = Math.sin(orbitSpeed + (Math.PI * 2) / 3) * 2.1;
      nodeTikTok.position.y = Math.cos(orbitSpeed * 1.2) * 0.5;

      nodeGoogle.position.x = Math.cos(orbitSpeed + (Math.PI * 4) / 3) * 2.3;
      nodeGoogle.position.z = Math.sin(orbitSpeed + (Math.PI * 4) / 3) * 2.3;
      nodeGoogle.position.y = Math.sin(orbitSpeed * 1.1) * 0.6;

      // Platform selection highlight
      const pNode = stateRef.current.activePlatformNode;
      nodeMeta.scale.setScalar(pNode === 'Meta' ? 1.6 : 1);
      nodeTikTok.scale.setScalar(pNode === 'TikTok' ? 1.6 : 1);
      nodeGoogle.scale.setScalar(pNode === 'Google' ? 1.6 : 1);

      // Gentle floating particles rotation
      particles.rotation.y = -time * 0.05 * spd;

      // Mode toggling
      const mode = stateRef.current.renderMode;
      coreMat.wireframe = mode === 'wireframe';
      ring1Mat.wireframe = mode === 'wireframe';
      ring2Mat.wireframe = mode === 'wireframe';

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      // Dispose resources
      coreGeo.dispose();
      coreMat.dispose();
      innerLuminousGeo.dispose();
      innerLuminousMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeMetaGeo.dispose();
      nodeMetaMat.dispose();
      nodeTikTokGeo.dispose();
      nodeTikTokMat.dispose();
      nodeGoogleGeo.dispose();
      nodeGoogleMat.dispose();
      shadowGeo.dispose();
      shadowTexture.dispose();
      shadowMat.dispose();
      particleGeo.dispose();
      particleTexture.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-auto ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Ergonomic Collapsible Bottom Control Dock (skill compliance: no backdrop-filter over WebGL, max-width <= 940px, pinned to bottom center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto">
        <button
          onClick={() => setIsDockOpen(!isDockOpen)}
          className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-zinc-400 hover:text-white bg-[#111116] border border-[#22222c] rounded-full transition-colors mb-2 shadow-lg"
          title="Toggle 3D Viewport Controls"
        >
          <Sliders className="w-3 h-3 text-cyan-400" />
          <span>{isDockOpen ? 'Hide 3D Viewport Controls' : '3D Viewport Studio'}</span>
          <span className="text-[9px] text-zinc-500">{isDockOpen ? '▼' : '▲'}</span>
        </button>

        {isDockOpen && (
          <div className="bg-[#121217] border border-[#252530] text-zinc-200 rounded-xl px-4 py-3 shadow-2xl flex flex-wrap items-center gap-4 text-xs font-mono max-w-[92vw]">
            {/* Render Mode */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 uppercase text-[10px]">Shading:</span>
              <button
                onClick={() => setRenderMode('pbr')}
                className={`px-2.5 py-1 rounded transition-colors ${renderMode === 'pbr' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-[#181820] text-zinc-400 hover:text-white'}`}
              >
                PBR Studio
              </button>
              <button
                onClick={() => setRenderMode('wireframe')}
                className={`px-2.5 py-1 rounded transition-colors ${renderMode === 'wireframe' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-[#181820] text-zinc-400 hover:text-white'}`}
              >
                Wireframe
              </button>
            </div>

            <div className="w-[1px] h-4 bg-zinc-800 hidden sm:block" />

            {/* Orbit Speed */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 uppercase text-[10px]">Speed:</span>
              {[0.5, 1, 1.8].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2 py-0.5 rounded transition-colors ${speedMultiplier === s ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-[#181820] text-zinc-400 hover:text-white'}`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <div className="w-[1px] h-4 bg-zinc-800 hidden sm:block" />

            {/* Platform Orbit Focus */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 uppercase text-[10px]">Focus Node:</span>
              {(['All', 'Meta', 'TikTok', 'Google'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatformNode(platform)}
                  className={`px-2 py-0.5 rounded transition-colors ${activePlatformNode === platform ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-[#181820] text-zinc-400 hover:text-white'}`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
