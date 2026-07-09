import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Mouse tracker ────────────────────────────────────────────────────────────
const mouse2D = { x: 0, y: 0 };

// ── 1. Galaxy particle field ─────────────────────────────────────────────────
function GalaxyParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const COUNT = 2400;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < COUNT; i++) {
      const arm      = i % 2;
      const radius   = 1.2 + Math.random() * 5.5;
      const spinAngle = radius * 0.6;
      const branchAngle = (arm / 2) * Math.PI * 2;
      const scatter  = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);

      positions[i * 3]     = Math.cos(branchAngle + spinAngle) * radius + scatter * 0.5;
      positions[i * 3 + 1] = scatter * 0.25;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + scatter * 0.5;

      const t   = Math.min(radius / 7, 1);
      const col = palette[Math.floor(Math.random() * palette.length)].clone();
      col.lerp(new THREE.Color('#ffffff'), t * 0.3);
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y  = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.x  = mouse2D.y * 0.05;
    pointsRef.current.rotation.z  = mouse2D.x * -0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
        <bufferAttribute args={[colors, 3]}    attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ── 2. Orbiting energy rings ─────────────────────────────────────────────────
interface RingProps {
  radius: number; tube: number; color: string;
  speed: number; tiltX: number; tiltZ: number; pulseOffset: number;
}

function EnergyRing({ radius, tube, color, speed, tiltX, tiltZ, pulseOffset }: RingProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.z = t * speed;
      meshRef.current.rotation.y = t * speed * 0.4;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.6 + Math.sin(t * 1.2 + pulseOffset) * 0.4;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z = t * speed * -0.7;
      const s = 1 + Math.sin(t * 0.8 + pulseOffset) * 0.04;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.06 + Math.sin(t * 1.5 + pulseOffset) * 0.03;
    }
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tube, 6, 90]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={0.8}
          roughness={0.1} metalness={1} transparent opacity={0.55}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>
      <mesh ref={glowRef}>
        <torusGeometry args={[radius, tube * 4, 4, 90]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={1}
          transparent opacity={0.07}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── 3. Neural network ────────────────────────────────────────────────────────
const NODE_POSITIONS: [number, number, number][] = [
  [ 0,    0,    0   ],
  [ 1.8,  0.8, -0.4 ],
  [-1.6,  1.1,  0.3 ],
  [ 0.7, -1.5,  0.7 ],
  [-1.3, -1.0, -0.7 ],
  [ 2.4, -0.3,  0.5 ],
  [-2.6,  0.1, -0.3 ],
  [ 0.8,  2.2,  0.2 ],
  [-0.6, -2.3, -0.2 ],
  [ 2.0,  1.6,  0.6 ],
];

const NODE_COLORS = ['#7c3aed','#a855f7','#22d3ee','#6366f1','#ec4899','#10b981','#f59e0b'];
const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[1,9],[2,6],[3,5],[4,6],
  [5,9],[6,7],[7,9],[8,4],[1,3],[2,4],[9,7],
];

function NeuralNode({ position, color, index }: {
  position: [number,number,number]; color: string; index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const ph = index * 0.7;
    meshRef.current.position.x = position[0] + Math.sin(t * 0.4 + ph) * 0.15;
    meshRef.current.position.y = position[1] + Math.cos(t * 0.35 + ph) * 0.12;
    meshRef.current.position.z = position[2] + Math.sin(t * 0.5 + ph * 1.3) * 0.1;
    meshRef.current.rotation.y += 0.012;
    meshRef.current.rotation.x += 0.008;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.5 + Math.sin(t * 1.5 + ph) * 0.4;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[index === 0 ? 0.2 : 0.08 + (index % 3) * 0.03, 1]} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={0.7}
          roughness={0.1} metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function NeuralBeam({ a, b, color }: {
  a: [number,number,number]; b: [number,number,number]; color: string;
}) {
  const lineRef = useRef<THREE.Line>(null!);
  const geo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...a),
      new THREE.Vector3(...b),
    ]);
  }, [a, b]);

  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.15,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), [color]);

  const line = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);

  useFrame((state) => {
    mat.opacity = 0.06 + Math.abs(Math.sin(state.clock.elapsedTime * 0.6 + a[0])) * 0.22;
  });

  return <primitive object={line} ref={lineRef} />;
}

function DataPacket({ a, b, color, speed, offset }: {
  a: [number,number,number]; b: [number,number,number];
  color: string; speed: number; offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const start = useMemo(() => new THREE.Vector3(...a), [a]);
  const end   = useMemo(() => new THREE.Vector3(...b), [b]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = ((state.clock.elapsedTime * speed + offset) % 1 + 1) % 1;
    meshRef.current.position.lerpVectors(start, end, t);
    const d = Math.abs(t - 0.5) * 2;
    (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + d * 1.5;
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.4 + (1 - d) * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.035, 6, 6]} />
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={1}
        transparent opacity={0.8}
        blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </mesh>
  );
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.06 + mouse2D.x * 0.12;
    groupRef.current.rotation.x = mouse2D.y * 0.06;
  });
  return (
    <group ref={groupRef}>
      {NODE_POSITIONS.map((pos, i) => (
        <NeuralNode key={i} position={pos} color={NODE_COLORS[i % NODE_COLORS.length]} index={i} />
      ))}
      {EDGES.map(([ai, bi], i) => (
        <NeuralBeam key={i} a={NODE_POSITIONS[ai]} b={NODE_POSITIONS[bi]}
          color={NODE_COLORS[(ai + bi) % NODE_COLORS.length]} />
      ))}
      {EDGES.slice(0, 8).map(([ai, bi], i) => (
        <DataPacket key={i} a={NODE_POSITIONS[ai]} b={NODE_POSITIONS[bi]}
          color={NODE_COLORS[(ai + bi + 2) % NODE_COLORS.length]}
          speed={0.28 + i * 0.04} offset={i * 0.15} />
      ))}
    </group>
  );
}

// ── 4. Pulsing central core ──────────────────────────────────────────────────
function PulsingCore() {
  const coreRef  = useRef<THREE.Mesh>(null!);
  const halo1Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.12;
      coreRef.current.scale.setScalar(s);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.8 + Math.sin(t * 1.8) * 0.4;
    }
    if (halo1Ref.current) {
      const s = 1 + Math.sin(t * 0.7 + 1) * 0.1;
      halo1Ref.current.scale.setScalar(s);
      (halo1Ref.current.material as THREE.MeshStandardMaterial).opacity =
        0.07 + Math.sin(t * 0.9) * 0.03;
      halo1Ref.current.rotation.y = t * 0.2;
      halo1Ref.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed" emissive="#a855f7" emissiveIntensity={1}
          roughness={0} metalness={1}
        />
      </mesh>
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial
          color="#7c3aed" emissive="#7c3aed" emissiveIntensity={1}
          transparent opacity={0.07} depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color="#a78bfa" intensity={3} distance={7} />
    </group>
  );
}

// ── 5. Camera drift ──────────────────────────────────────────────────────────
function CameraDrift() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 7));
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    target.current.x = Math.sin(t * 0.12) * 0.6 + mouse2D.x * -0.8;
    target.current.y = Math.cos(t * 0.09) * 0.4 + mouse2D.y * 0.6;
    target.current.z = 7 + Math.sin(t * 0.07) * 0.2;
    camera.position.lerp(target.current, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ── Scene ────────────────────────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 6, 5]}   intensity={1.2} color="#a78bfa" />
      <pointLight position={[-6,-5,-4]}  intensity={0.7} color="#22d3ee" />
      <pointLight position={[0, 0, 4]}   intensity={0.4} color="#ec4899" distance={10} />
      <GalaxyParticles />
      <EnergyRing radius={2.2} tube={0.011} color="#7c3aed" speed={0.22}  tiltX={0.5}  tiltZ={0.2}  pulseOffset={0}   />
      <EnergyRing radius={3.2} tube={0.008} color="#22d3ee" speed={-0.15} tiltX={1.1}  tiltZ={-0.4} pulseOffset={1.5} />
      <EnergyRing radius={4.1} tube={0.006} color="#a855f7" speed={0.10}  tiltX={-0.3} tiltZ={0.8}  pulseOffset={2.8} />
      <EnergyRing radius={1.7} tube={0.013} color="#ec4899" speed={-0.28} tiltX={1.4}  tiltZ={0.6}  pulseOffset={0.7} />
      <NeuralNetwork />
      <PulsingCore />
      <CameraDrift />
    </>
  );
}

// ── Public export — fills its container ──────────────────────────────────────
export default function ProfileScene() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse2D.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse2D.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{
        antialias: true, alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
    </Canvas>
  );
}
