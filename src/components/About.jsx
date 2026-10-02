import { PILLARS } from '../data.js';

const CARDS = [
  { tag: 'Core', title: 'RAG & LLM workflows', text: 'Document retrieval, knowledge grounding, intent routing, and reliable AI interactions.' },
  { tag: 'Backend', title: 'FastAPI & REST APIs', text: 'Clean architectures, structured validation, and scalable API experiences.' },
  { tag: 'Data', title: 'PostgreSQL & vector search', text: 'Production-ready storage, metadata systems, and retrieval pipelines.' },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-20">
      <div className="mx-auto w-[min(80rem,calc(100%-2.5rem))] py-24">
        <div data-reveal className="mb-10">
          <p className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-neon">About me</p>
          <h2 data-sweep-title className="max-w-3xl font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-tight tracking-tight">
            Building useful software with <span className="grad-text">Python, data, and Generative AI.</span>
          </h2>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="space-y-5 text-lg text-fog">
            <p>
              My work sits at the intersection of engineering and intelligence: I enjoy creating
              retrieval systems, conversational workflows, and backend services that are practical,
              testable, and user-friendly.
            </p>
            <p>
              I&rsquo;m especially interested in production practices such as evaluation,
              observability, API design, deployment, and human-in-the-loop systems.
            </p>
          </div>
          <div data-reveal-group className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {CARDS.map((c) => (
              <article key={c.title} className="glass shine rounded-[22px] p-6 transition-transform duration-200 hover:-translate-y-1">
                <span className="inline-block rounded-full border border-neon/25 bg-neon/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-neon">
                  {c.tag}
                </span>
                <h3 className="mb-3 mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-fog">{c.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div data-reveal-group className="mt-8 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.index} className="glass rounded-[22px] p-6 transition-colors hover:border-neon/30">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-neon-soft">
                {p.index}
              </span>
              <h3 className="mb-2 font-display text-xl font-semibold">{p.title}</h3>
              <p className="text-fog">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
