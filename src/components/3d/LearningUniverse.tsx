import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TopicNode from './TopicNode';
import { categories } from '../../data/categories';
import { questions } from '../../data/questions';
import { useAppStore } from '../../store/useAppStore';

// Controls camera movement based on selected node
function CameraController({ activeCategoryId }: { activeCategoryId: string | null }) {
  const { camera, controls } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 15));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (activeCategoryId) {
      // Find the node index to get its position
      const index = categories.findIndex(c => c.id === activeCategoryId);
      if (index !== -1) {
        const angle = (index / categories.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 2) * 2;
        
        // Move camera close to the node, slightly offset
        targetPosition.current.set(x * 1.5, y + 2, z * 1.5);
        lookAtTarget.current.set(x, y, z);
      }
    } else {
      // Reset view to overview
      targetPosition.current.set(0, 8, 20);
      lookAtTarget.current.set(0, 0, 0);
    }
  }, [activeCategoryId]);

  useFrame(() => {
    // Smooth camera interpolation
    camera.position.lerp(targetPosition.current, 0.05);
    
    if (controls && (controls as any).target) {
      (controls as any).target.lerp(lookAtTarget.current, 0.05);
      (controls as any).update();
    }
  });

  return null;
}

interface LearningUniverseProps {
  onSelectCategory: (id: string | null) => void;
  activeCategoryId: string | null;
}

function Scene({ onSelectCategory, activeCategoryId }: LearningUniverseProps) {
  const { completed } = useAppStore();

  // Pre-calculate positions in a constellation ring
  const nodePositions = useMemo(() => {
    return categories.map((cat, index) => {
      const angle = (index / categories.length) * Math.PI * 2;
      const radius = 8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(index * 2) * 2; // Add some vertical variation
      
      return new THREE.Vector3(x, y, z);
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#4f46e5" distance={20} />
      
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />

      {/* Constellation lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(nodePositions.flatMap(p => [p.x, p.y, p.z, 0, 0, 0]))}
            count={categories.length * 2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="rgba(255,255,255,0.05)" transparent />
      </line>

      {/* Nodes */}
      {categories.map((cat, index) => {
        const catQuestions = questions.filter(q => q.category.toLowerCase() === cat.name.toLowerCase());
        const catCompleted = catQuestions.filter(q => completed.includes(q.id)).length;
        const progress = catQuestions.length > 0 ? catCompleted / catQuestions.length : 0;
        
        return (
          <TopicNode
            key={cat.id}
            position={[nodePositions[index].x, nodePositions[index].y, nodePositions[index].z]}
            color={cat.color}
            name={cat.name}
            progress={progress}
            isActive={activeCategoryId === cat.id}
            onClick={() => onSelectCategory(activeCategoryId === cat.id ? null : cat.id)}
          />
        );
      })}

      <CameraController activeCategoryId={activeCategoryId} />
      
      <OrbitControls 
        enablePan={false}
        enableZoom={!activeCategoryId} // Disable manual zoom when zoomed in
        minDistance={5}
        maxDistance={40}
        maxPolarAngle={Math.PI / 1.5} // Don't allow camera to go below ground too far
        autoRotate={!activeCategoryId}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function LearningUniverse({ onSelectCategory, activeCategoryId }: LearningUniverseProps) {
  return (
    <div className="absolute inset-0 bg-[#030014]">
      <Canvas camera={{ position: [0, 8, 20], fov: 45 }} dpr={[1, 2]}>
        <Scene onSelectCategory={onSelectCategory} activeCategoryId={activeCategoryId} />
      </Canvas>
    </div>
  );
}
