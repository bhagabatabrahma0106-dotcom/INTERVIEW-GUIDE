import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Returns true when the user has requested reduced motion via the OS
 * preference. Use this to disable 3D autoplay, GSAP ScrollTrigger, and
 * particle animations.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
