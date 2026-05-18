import { PointerEvent, useRef } from 'react';
import { useAnimationFrame }    from 'motion/react';

interface UseDragSeekOptions {
  onSeekChange:   (seek: number) => void;
  sensitivity?:   number;
  loop?:          boolean;
  velocityDecay?: number;
}

export function useDragSeek({
  onSeekChange,
  sensitivity   = 500,
  loop          = true,
  velocityDecay = 0.95,
}: UseDragSeekOptions) {
  const isDragging = useRef(false);
  const lastX      = useRef(0);
  const velocity   = useRef(0);
  const seekRef    = useRef(0);

  const wrap = (value: number) => ((value % 1) + 1) % 1;

  const updateSeek = (newSeek: number) => {
    seekRef.current = loop ? wrap(newSeek) : Math.max(0, Math.min(1, newSeek));
    onSeekChange(seekRef.current);
  };

  useAnimationFrame(() => {
    if (isDragging.current || Math.abs(velocity.current) < 0.0001) return;

    velocity.current *= velocityDecay;
    updateSeek(seekRef.current + velocity.current);
  });

  const onPointerDown = (e: PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
    lastX.current      = e.clientX;
    velocity.current   = 0;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging.current) return;

    const deltaX     = e.clientX - lastX.current;
    const seekDelta  = deltaX / sensitivity;
    lastX.current    = e.clientX;
    velocity.current = seekDelta;

    updateSeek(seekRef.current + seekDelta);
  };

  const onPointerUp = (e: PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    isDragging.current = false;
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
}
