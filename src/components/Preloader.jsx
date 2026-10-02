import { useEffect, useState } from 'react';

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(() => onDone?.(), 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void transition-all duration-700 ${
        leaving ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-neon">Vinesh — Portfolio</p>
      <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-none tabular-nums">
        {count}
        <span className="grad-text">%</span>
      </h1>
      <div className="mt-6 h-px w-[min(22rem,70vw)] overflow-hidden bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-neon via-violet-glow to-mint transition-[width]"
          style={{ width: `${count}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-fog">Loading AI systems, 3D particles & smooth scroll…</p>
    </div>
  );
}
