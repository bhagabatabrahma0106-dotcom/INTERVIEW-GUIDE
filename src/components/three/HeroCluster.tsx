import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories, type Category } from '../../data/categories';
import { questions } from '../../data/questions';
import { useAppStore } from '../../store/useAppStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDevicePerf } from '../../hooks/useDevicePerf';
import { ErrorBoundary3D } from '../three/ErrorBoundary3D';

gsap.registerPlugin(ScrollTrigger);

// Shared geometries — allocated once
const icoGeo = new THREE.IcosahedronGeometry(1, 1);
const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);

// ── Layout: fibonacci sphere distribution ──────────────────────────────────────
function fibonacciSpherePositions(n: number, radius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    positions.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
    );
  }
  return positions;
}

// ── Camera scroll controller ───────────────────────────────────────────────────
interface ScrollCameraProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}

function ScrollCamera({ containerRef, reducedMotion }: ScrollCameraProps) {
  const { camera } = useThree();
  const progress = useRef(0);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    camera.position.set(0, 0.5, 15);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, [camera, containerRef, reducedMotion]);

  useFrame(() => {
    if (reducedMotion) return;
    // Dolly in: z 15 → 7 as scroll progress 0 → 1
    const targetZ = 15 - progress.current * 8;
    // Subtle tilt up as we push in
    const targetY = 0.5 - progress.current * 1.5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Single topic orb ────────────────────────────────────────────────────────────
interface TopicOrbProps {
  category: Category;
  position: THREE.Vector3;
  progress: number; // 0–1
  reducedMotion: boolean;
}

function TopicOrb({ category, position, progress, reducedMotion }: TopicOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const isHovered = useRef(false);

  const emissiveColor = useMemo(() => new THREE.Color(category.color), [category.color]);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
    // Pulse core brightness
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.5 + position.x) * 0.25;
    }
    // Scale on hover
    const targetScale = isHovered.current ? 1.15 : 1;
    meshRef.current.parent!.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.4}
      floatIntensity={reducedMotion ? 0 : 1.2}
    >
      <group position={position}>
        {/* Outer wireframe shell */}
        <mesh
          ref={meshRef}
          geometry={icoGeo}
          onPointerEnter={() => { isHovered.current = true; }}
          onPointerLeave={() => { isHovered.current = false; }}
        >
          <meshStandardMaterial
            color={category.color}
            emissive={emissiveColor}
            emissiveIntensity={0.1 + progress * 0.5}
            transparent
            opacity={0.55}
            wireframe
          />
        </mesh>

        {/* Inner solid core */}
        <mesh ref={coreRef} geometry={coreGeo}>
          <meshStandardMaterial
            color={category.color}
            emissive={emissiveColor}
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Point light for local glow */}
        <pointLight color={category.color} intensity={progress * 1.2 + 0.3} distance={4} />

        {/* Floating label */}
        <Html
          position={[0, -1.6, 0]}
          center
          distanceFactor={14}
          zIndexRange={[50, 0]}
          style={{ pointerEvents: 'none', transition: 'opacity 0.3s' }}
        >
          <span className="px-2.5 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/15 whitespace-nowrap shadow-lg">
            {category.name}
          </span>
        </Html>
      </group>
    </Float>
  );
}

// ── Ambient central glow ────────────────────────────────────────────────────────
function CentralGlow({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    meshRef.current.scale.set(s, s, s);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.8, 32, 32]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#7c3aed"
        emissiveIntensity={1}
        transparent
        opacity={0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ── Main scene ──────────────────────────────────────────────────────────────────
interface HeroSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}

function HeroScene({ containerRef, reducedMotion }: HeroSceneProps) {
  const { completed } = useAppStore();

  const positions = useMemo(
    () => fibonacciSpherePositions(categories.length, 5.5),
    []
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 4, 6]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-4, -3, -6]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#7c3aed" distance={12} />

      <CentralGlow reducedMotion={reducedMotion} />

      {categories.map((cat, i) => {
        const catQs = questions.filter(
          (q) => q.category.toLowerCase() === cat.name.toLowerCase()
        );
        const done = catQs.filter((q) => completed.includes(q.id)).length;
        const prog = catQs.length > 0 ? done / catQs.length : 0;

        return (
          <TopicOrb
            key={cat.id}
            category={cat}
            position={positions[i]}
            progress={prog}
            reducedMotion={reducedMotion}
          />
        );
      })}

      <ScrollCamera containerRef={containerRef} reducedMotion={reducedMotion} />
    </>
  );
}

// ── Public component ────────────────────────────────────────────────────────────
interface HeroClusterProps {
  /** The hero section element used as the ScrollTrigger anchor. */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroCluster({ containerRef }: HeroClusterProps) {
  const { dprCap } = useDevicePerf();
  const reducedMotion = useReducedMotion();

  // Static gradient fallback when reduced motion is requested
  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 60% 50%, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.1) 30%, rgba(10,10,15,0) 70%)',
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <ErrorBoundary3D>
        <Canvas
          camera={{ position: [0, 0.5, 15], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          dpr={dprCap}
        >
          <HeroScene containerRef={containerRef} reducedMotion={reducedMotion} />
        </Canvas>
      </ErrorBoundary3D>
    </div>
  );
}
