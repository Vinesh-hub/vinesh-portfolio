import { useEffect, useRef } from 'react';

export default function CustomCursor({ enabled }) {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    document.documentElement.classList.add('has-custom-cursor');

    const dx = { x: -100, y: -100 };
    const rx = { x: -100, y: -100 };
    let raf = 0;
    let hovering = false;

    const onMove = (e) => {
      dx.x = e.clientX;
      dx.y = e.clientY;
      const t = e.target.closest('a, button, [data-hover]');
      hovering = Boolean(t);
    };

    const tick = () => {
      rx.x += (dx.x - rx.x) * 0.16;
      rx.y += (dx.y - rx.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${dx.x}px, ${dx.y}px) translate(-50%,-50%)`;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx.x}px, ${rx.y}px) translate(-50%,-50%) scale(${hovering ? 1.8 : 1})`;
        ring.current.style.borderColor = hovering ? 'rgba(126,240,197,0.8)' : 'rgba(101,212,255,0.55)';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden [@media(hover:hover)]:block" aria-hidden="true">
      <span ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_12px_rgba(101,212,255,0.9)]" />
      <span ref={ring} className="absolute left-0 top-0 h-9 w-9 rounded-full border transition-[border-color] duration-200" />
    </div>
  );
}
