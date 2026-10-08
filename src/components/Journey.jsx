import { JOURNEY } from '../data.js';

export default function Journey() {
  return (
    <section id="journey" className="relative z-10 scroll-mt-20">
      <div className="mx-auto w-[min(80rem,calc(100%-2.5rem))] py-24">
        <div data-reveal className="mb-12 text-center">
          <p className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-neon">Scroll journey</p>
          <h2 data-sweep-title className="font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight">
            Watch my path <span className="grad-text">unfold as you scroll.</span>
          </h2>
        </div>

        <div id="journey-stack" className="relative mx-auto max-w-3xl" style={{ perspective: '1400px' }}>
          {JOURNEY.map((step, i) => (
            <article
              key={step.phase}
              data-journey-card
              className="glass mb-6 rounded-[26px] p-7 shadow-[0_24px_70px_rgba(3,8,18,0.5)] md:p-9"
              style={{ zIndex: i + 1 }}
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-neon/25 bg-neon/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-neon">
                  {step.phase}
                </span>
                <span className="font-display text-5xl font-bold text-white/10">0{i + 1}</span>
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold md:text-3xl">{step.title}</h3>
              <p className="text-lg text-fog">{step.text}</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {step.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div data-journey-progress className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-neon via-violet-glow to-mint" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
