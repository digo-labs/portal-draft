import { useRef }            from 'react';
import { useAnimationFrame } from 'motion/react';

interface UsePushSeekOptions {
  onSeekChange: (seek: number) => void;
  impulse?:     number;
  decay?:       number;
  loop?:        boolean;
}

export function usePushSeek({
  onSeekChange,
  impulse = 0.3,
  decay   = 0.95,
  loop    = true,
}: UsePushSeekOptions) {
  const velocity = useRef(0);
  const seekRef  = useRef(0);

  const wrap = (value: number) => ((value % 1) + 1) % 1;

  useAnimationFrame(() => {
    if (Math.abs(velocity.current) < 0.001) return;

    velocity.current *= decay;
    seekRef.current  += velocity.current;
    seekRef.current   = loop ? wrap(seekRef.current) : Math.max(0, Math.min(1, seekRef.current));

    onSeekChange(seekRef.current);
  });

  const onClick = () => {
    velocity.current += impulse;
  };

  return { onClick };
}
