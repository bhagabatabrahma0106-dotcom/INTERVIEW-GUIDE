import { useMemo } from 'react';

interface DevicePerf {
  /** True on devices with < 4 logical CPU cores — disable bloom/DOF, halve particles. */
  isLowEnd: boolean;
  /** Recommended particle count for this device. */
  particleCount: number;
  /** Recommended devicePixelRatio cap. */
  dprCap: [number, number];
}

/**
 * Returns a stable performance tier for the current device.
 * Values are computed once on mount and never change during a session.
 */
export function useDevicePerf(): DevicePerf {
  return useMemo<DevicePerf>(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const isLowEnd = cores < 4;
    return {
      isLowEnd,
      particleCount: isLowEnd ? 80 : 180,
      dprCap: isLowEnd ? [1, 1] : [1, 2],
    };
  }, []);
}
