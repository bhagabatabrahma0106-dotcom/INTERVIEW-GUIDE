import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useDevicePerf } from '../hooks/useDevicePerf';
import { ErrorBoundary3D } from '../components/three/ErrorBoundary3D';

// Shared geometry for all icosahedra — one allocation.
const icoGeo = new THREE.IcosahedronGeometry(1, 1);

interface DriftingIcoProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  rotAxis: THREE.Vector3;
}

function DriftingIco({ position, color, speed, scale, rotAxis }: DriftingIcoProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (reducedMotion || !mesh.current) return;
    mesh.current.rotateOnAxis(rotAxis, delta * speed * 0.15);
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 0.6}
      rotationIntensity={reducedMotion ? 0 : 0.3}
      floatIntensity={reducedMotion ? 0 : 0.8}
    >
      <mesh ref={mesh} geometry={icoGeo} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.055}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const reducedMotion = useReducedMotion();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    // violet / purple / cyan palette
    const palette: [number, number, number][] = [
      [0.49, 0.23, 0.93], // violet
      [0.66, 0.33, 0.97], // purple
      [0.13, 0.83, 0.93], // cyan
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.018;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.007;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Positions, colors, speeds for background icosahedra
const ICO_CONFIG: DriftingIcoProps[] = [
  { position: [-5,  3, -8],  color: '#7c3aed', speed: 0.8, scale: 1.8, rotAxis: new THREE.Vector3(1, 1, 0).normalize() },
  { position: [ 6, -2, -10], color: '#a855f7', speed: 0.6, scale: 2.2, rotAxis: new THREE.Vector3(0, 1, 1).normalize() },
  { position: [ 3,  5, -12], color: '#22d3ee', speed: 1.0, scale: 1.5, rotAxis: new THREE.Vector3(1, 0, 1).normalize() },
  { position: [-7, -4, -9],  color: '#7c3aed', speed: 0.5, scale: 2.6, rotAxis: new THREE.Vector3(0, 1, 0) },
  { position: [ 1,  1, -6],  color: '#a855f7', speed: 1.2, scale: 1.0, rotAxis: new THREE.Vector3(1, 1, 1).normalize() },
];

function Scene({ particleCount }: { particleCount: number }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#7c3aed" />
      <pointLight position={[-5, -5, 5]} intensity={0.2} color="#22d3ee" />
      {ICO_CONFIG.map((cfg, i) => (
        <DriftingIco key={i} {...cfg} />
      ))}
      <ParticleField count={particleCount} />
    </>
  );
}

export default function Background3D() {
  const { particleCount, dprCap } = useDevicePerf();

  return (
    <div className="fixed inset-0 -z-10 opacity-70" aria-hidden="true">
      <ErrorBoundary3D>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          style={{ background: 'transparent' }}
          dpr={dprCap}
        >
          <Scene particleCount={particleCount} />
        </Canvas>
      </ErrorBoundary3D>
    </div>
  );
}
