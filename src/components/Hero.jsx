import { useEffect, useRef, useState } from 'react';
import { PROFILE, STATS } from '../data.js';
import { useCountUp, useInViewOnce } from '../hooks/hooks.js';

function Stat({ value, suffix, label }) {
  const ref = useRef(null);
  const seen = useInViewOnce(ref);
  const n = useCountUp(value, seen);
  return (
    <li ref={ref} className="glass min-w-[150px] rounded-2xl px-5 py-4">
      <strong className="block font-display text-2xl tabular-nums">
        {n}
        {suffix}
      </strong>
      <span className="text-sm text-fog">{label}</span>
    </li>
  );
}

const SKILLS = ['Python', 'FastAPI', 'LangGraph', 'RAG', 'PostgreSQL', 'Generative AI'];
const METRICS = [
  ['Focus', 'AI Products'],
  ['Stack', 'Python + LLMs'],
  ['Current', 'Agent workflows'],
  ['Interest', 'Deployment & testing'],
];

function PhotoCard({ motionOK }) {
  const [photoOk, setPhotoOk] = useState(true);
  const cardRef = useRef(null);

  const onTilt = (e) => {
    const el = cardRef.current;
    if (!el || !motionOK) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
  };

  return (
    <div className="relative flex justify-center" style={{ perspective: '1200px' }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {['RAG', 'Python', 'FastAPI', 'AI'].map((chip, i) => (
          <span
            key={chip}
            className="absolute animate-float-y rounded-full border border-neon/25 bg-panel/85 px-3.5 py-1.5 text-xs font-semibold shadow-[0_12px_30px_rgba(3,8,18,0.45)] backdrop-blur-md"
            style={{ ...CHIP_POS[i], animationDelay: `${i * 1.4}s` }}
          >
            {chip}
          </span>
        ))}
      </div>
      <div
        ref={cardRef}
        data-hero-card
        data-hero-item
        onMouseMove={onTilt}
        onMouseLeave={() => {
          if (cardRef.current) cardRef.current.style.transform = '';
        }}
        className="glass relative w-[min(100%,26rem)] rounded-[26px] p-6 shadow-[0_20px_64px_rgba(4,10,20,0.45)] transition-transform duration-200 will-change-transform"
      >
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-xs font-medium text-mint">
          <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_rgba(126,240,197,0.85)]" />
          Available for opportunities
        </div>
        <div className="relative mx-auto mt-5 h-48 w-48">
          <span className="absolute -inset-3 animate-rotate-slow rounded-full bg-[conic-gradient(from_0deg,transparent_0_8%,rgba(101,212,255,0.9),rgba(139,92,246,0.9),rgba(126,240,197,0.8),transparent_92%_100%)]" aria-hidden="true" />
          <span className="absolute -inset-5 animate-rotate-slow-rev rounded-full bg-[conic-gradient(from_0deg,transparent_0_10%,rgba(139,92,246,0.5),rgba(101,212,255,0.5),transparent_90%_100%)] opacity-50 blur-[2px]" aria-hidden="true" />
          <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-void bg-gradient-to-br from-neon to-violet-glow shadow-[0_22px_60px_rgba(4,10,20,0.55),0_0_44px_rgba(101,212,255,0.28)]">
            {photoOk ? (
              <img
                src={PROFILE.photo}
                alt="Portrait of Vinesh"
                className="h-full w-full object-cover"
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-display text-7xl font-bold text-void">
                V
              </span>
            )}
          </div>
        </div>
        <div className="mt-5 text-center">
          <h2 className="font-display text-2xl font-bold">{PROFILE.name}</h2>
          <p className="mt-1.5 text-fog">AI Engineer • Builder • Problem Solver</p>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3.5 text-left">
          {METRICS.map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] px-3.5 py-3">
              <span className="mb-1 block text-xs text-fog">{k}</span>
              <strong className="text-[0.95rem]">{v}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({ motionOK, started }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!motionOK || !started) return undefined;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % PROFILE.roles.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(id);
  }, [motionOK, started]);

  return (
    <section id="hero" className="relative overflow-hidden pt-[72px]">
      <div className="mx-auto grid w-[min(80rem,calc(100%-2.5rem))] items-center gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
        <HeroCopy role={PROFILE.roles[roleIdx]} fading={fading} />
        <PhotoCard motionOK={motionOK} />
      </div>
      <div data-hero-scroll className="relative z-10 flex justify-center pb-10 text-xs uppercase tracking-[0.3em] text-fog">
        <span className="flex flex-col items-center gap-2">
          Scroll
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-neon to-transparent" />
        </span>
      </div>
    </section>
  );
}


const CHIP_POS = [
  { top: '4%', left: '0' },
  { top: '12%', right: '0' },
  { top: '72%', left: '0' },
  { top: '84%', right: '0' },
];

function HeroCopy({ role, fading }) {
  const fadeCls = fading ? '-translate-y-2 opacity-0' : 'translate-y-0 opacity-100';
  return (
    <div data-hero-copy>
      <p
        data-hero-item
        className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-neon/25 bg-neon/[0.06] px-4 py-2 text-[0.76rem] font-bold uppercase tracking-[0.12em] text-neon"
      >
        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-mint shadow-[0_0_14px_rgba(126,240,197,0.9)]" />
        <span className={`inline-block min-h-[1.2em] transition-all duration-300 ${fadeCls}`}>
          {role}
        </span>
      </p>
      <h1 data-hero-item className="font-display text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[1.03] tracking-tight">
        I build <span className="grad-text">practical AI systems</span> that make software feel smarter.
      </h1>
      <p data-hero-item className="mt-6 max-w-2xl text-lg text-fog">
        I&rsquo;m Vinesh, a developer focused on turning LLM ideas into reliable, user-facing
        products — from retrieval-augmented generation apps to robust backend APIs and
        production-minded developer tooling.
      </p>
      <div data-hero-item className="mt-8 flex flex-wrap gap-4">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="shine rounded-full bg-gradient-to-br from-neon to-neon-soft px-7 py-3.5 font-semibold text-void shadow-[0_14px_36px_rgba(101,212,255,0.35)] transition-transform hover:-translate-y-0.5"
        >
          View GitHub
        </a>
        <a
          href="#projects"
          className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 hover:border-neon/40"
        >
          Explore projects
        </a>
      </div>
      <ul data-hero-item className="mt-9 flex flex-wrap gap-3.5" aria-label="Profile stats">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </ul>
    </div>
  );
}

