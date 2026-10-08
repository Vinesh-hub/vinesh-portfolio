import { PROFILE } from '../data.js';

export default function Contact() {
  return (
    <footer id="contact" className="relative z-10 scroll-mt-20">
      <div className="mx-auto w-[min(80rem,calc(100%-2.5rem))] pb-14 pt-6">
        <div
          data-reveal
          className="glass relative overflow-hidden rounded-[28px] p-8 shadow-[0_24px_80px_rgba(3,8,18,0.55)] md:p-12"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-glow/25 blur-[90px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-neon/20 blur-[90px]"
            aria-hidden="true"
          />
          <p className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-neon">
            Let&rsquo;s connect
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-tight">
            Have an AI idea? Let&rsquo;s turn it into <span className="grad-text">something real.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-fog">
            I&rsquo;m open to internships, collaborations and conversations about RAG, agents and
            production backend systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="shine rounded-full bg-gradient-to-br from-neon to-neon-soft px-7 py-3.5 font-semibold text-void shadow-[0_14px_36px_rgba(101,212,255,0.35)] transition-transform hover:-translate-y-0.5"
            >
              GitHub →
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 hover:border-neon/40"
            >
              LinkedIn →
            </a>
            <a
              href={PROFILE.email}
              className="rounded-full border border-mint/30 bg-mint/10 px-7 py-3.5 font-semibold text-mint transition-transform hover:-translate-y-0.5"
            >
              Say hello ✦
            </a>
          </div>
  
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-fog">
          <p>© {new Date().getFullYear()} Vinesh. Crafted with Python, curiosity, and clean APIs.</p>
          <a
            href="#hero"
            className="rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 font-semibold transition-transform hover:-translate-y-0.5 hover:border-neon/40"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
