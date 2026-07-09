import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface TopicNodeProps {
  position: [number, number, number];
  color: string;
  name: string;
  progress: number; // 0 to 1
  onClick: () => void;
  isActive: boolean;
}

export default function TopicNode({ position, color, name, progress, onClick, isActive }: TopicNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Dynamic values based on progress and hover state
  const targetScale = isActive ? 1.5 : hovered ? 1.2 : 1;
  const currentScale = useRef(1);

  const emissiveIntensity = useMemo(() => {
    // 0 progress = dim, 1 progress = very bright
    return 0.2 + (progress * 1.5) + (isActive ? 1 : 0);
  }, [progress, isActive]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth scale interpolation
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
      meshRef.current.scale.set(currentScale.current, currentScale.current, currentScale.current);
      
      // Rotate slowly over time
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={isActive ? 0 : 2} rotationIntensity={isActive ? 0 : 0.5} floatIntensity={isActive ? 0 : 1}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[1, 64, 64]}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={2}
            wireframe={progress < 0.2} // Show wireframe if barely started
          />
        </Sphere>
        
        {/* Core glow for high progress */}
        {progress > 0 && (
          <pointLight color={color} intensity={progress * 2} distance={5} />
        )}

        {/* Floating Label */}
        <Html
          position={[0, -1.8, 0]}
          center
          distanceFactor={15}
          zIndexRange={[100, 0]}
          style={{ transition: 'all 0.3s', opacity: isActive || hovered ? 1 : 0.6 }}
        >
          <div className="flex flex-col items-center pointer-events-none">
            <span className="px-3 py-1 text-sm font-bold text-white bg-black/50 backdrop-blur-md rounded-full border border-white/20 whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {name}
            </span>
            {(isActive || hovered) && (
              <span className="mt-1 text-xs font-mono bg-black/60 px-2 py-0.5 rounded text-white/80">
                {Math.round(progress * 100)}%
              </span>
            )}
          </div>
        </Html>
      </group>
    </Float>
  );
}
