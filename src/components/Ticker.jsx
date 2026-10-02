import { TICKER } from '../data.js';

export default function Ticker() {
  const row = (hidden) => (
    <div className="flex items-center gap-7 whitespace-nowrap py-4 pl-7 pr-3.5" aria-hidden={hidden || undefined}>
      {TICKER.map((item) => (
        <span key={item} className="flex items-center gap-7">
          <span className="font-display text-base font-semibold text-fog">{item}</span>
          <i className="text-sm not-italic text-neon">✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Core technologies" className="relative z-10 overflow-hidden">
      <div className="mask-fade-x border-y border-white/10 bg-abyss/70 backdrop-blur-md">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
