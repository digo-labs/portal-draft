import { useEffect, useRef, useState, useCallback } from 'react';

interface VideoScrubProps {
  src:        string;
  fps:        number;
  seek:       number;
  className?: string;
}

export function VideoScrub({ src, fps, seek, className }: VideoScrubProps) {
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const framesRef         = useRef<ImageBitmap[]>([]);
  const [ready, setReady] = useState(false);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || framesRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(frameIndex, framesRef.current.length - 1));
    const bitmap  = framesRef.current[clamped];
    if (!bitmap) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const bw = bitmap.width;
    const bh = bitmap.height;

    const scale = Math.max(cw / bw, ch / bh);
    const dw    = bw * scale;
    const dh    = bh * scale;
    const dx    = (cw - dw) / 2;
    const dy    = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(bitmap, dx, dy, dw, dh);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const extract = async () => {
      const video       = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.muted       = true;
      video.playsInline = true;
      video.preload     = 'auto';
      video.src         = src;
      video.load();

      console.log('[VideoScrub] loading video...');

      await new Promise<void>((resolve, reject) => {
        video.addEventListener('canplaythrough', () => resolve(), { once: true });
        video.addEventListener('error', () => reject(new Error('Failed to load video')), { once: true });
      });

      console.log('[VideoScrub] video ready:', video.duration, video.videoWidth, video.videoHeight);

      const totalFrames = Math.floor(video.duration * fps);
      const w           = video.videoWidth;
      const h           = video.videoHeight;

      const offscreen  = document.createElement('canvas');
      offscreen.width  = w;
      offscreen.height = h;
      const offCtx     = offscreen.getContext('2d')!;

      const frames: ImageBitmap[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (cancelled) return;

        video.currentTime = i / fps;
        await new Promise<void>((resolve) => {
          video.addEventListener('seeked', () => resolve(), { once: true });
        });

        offCtx.clearRect(0, 0, w, h);
        offCtx.drawImage(video, 0, 0, w, h);

        const bitmap = await createImageBitmap(offscreen);
        frames.push(bitmap);

        if (i === 0) {
          framesRef.current = [bitmap];
          drawFrame(0);
          console.log('[VideoScrub] first frame drawn');
        }
      }

      if (!cancelled) {
        framesRef.current = frames;
        setReady(true);
        console.log('[VideoScrub] all frames extracted:', frames.length, '— READY');
      }
    };

    extract();
    return () => {
      cancelled = true;
    };
  }, [src, fps, drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const dpr               = window.devicePixelRatio || 1;
      canvas.width            = width * dpr;
      canvas.height           = height * dpr;
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || framesRef.current.length === 0) return;
    const totalFrames = framesRef.current.length;
    const frameIndex  = Math.round(seek * (totalFrames - 1));
    drawFrame(frameIndex);
  }, [seek, ready, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
