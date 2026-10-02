import { STACK } from '../data.js';

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 scroll-mt-20">
      <div className="mx-auto w-[min(80rem,calc(100%-2.5rem))] py-24">
        <div data-reveal className="mb-10 text-center">
          <p className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-neon">Modern stack</p>
          <h2 data-sweep-title className="font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight">
            Technologies I work with <span className="grad-text">daily.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-fog">
            A responsive, fine-tuned grid — hover any card to feel the depth, glow and lift.
          </p>
        </div>
        <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((s) => (
            <div
              key={s.group}
              data-hover
              className="glass shine group rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-neon/40 hover:shadow-[0_24px_60px_rgba(101,212,255,0.18)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon/25 to-violet-glow/25 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {s.icon}
              </div>
              <h3 className="mb-4 font-display text-lg font-semibold">{s.group}</h3>
              <ul className="space-y-2.5 text-fog">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_10px_rgba(101,212,255,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-0 bg-gradient-to-r from-neon to-mint transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
