import { motion } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover3d?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = '',
  onClick,
  hover3d = true,
  glowColor,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hover3d || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!hover3d || !cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass rounded-2xl transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: glowColor
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}40`
          : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
