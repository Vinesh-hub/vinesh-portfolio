import { PROJECTS } from '../data.js';

function CardArt({ project }) {
  return (
    <div className="relative mb-6 h-44 overflow-hidden rounded-2xl border border-white/10" style={{ background: project.gradient }}>
      <div data-parallax-art className="absolute -inset-y-4 inset-x-8 rounded-xl bg-white/10 shadow-[0_0_24px_rgba(101,212,255,0.15)] backdrop-blur-md" />
      <div className="absolute bottom-4 right-8 h-14 w-24 rounded-xl bg-white/[0.07]" />
      <span className="absolute left-5 top-5 font-display text-5xl font-bold text-white/15">
        {project.index}
      </span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="glass shine group w-[82vw] max-w-md shrink-0 snap-center overflow-hidden rounded-[24px] p-6 transition-transform duration-200 hover:-translate-y-1.5 md:w-[30rem]">
      <CardArt project={project} />
      <span className={`mb-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${project.badgeColor}`}>
        {project.badge}
      </span>
      <h3 className="mb-3 font-display text-2xl font-semibold">{project.title}</h3>
      <p className="text-fog">{project.description}</p>
      <div className="mb-5 mt-4 flex flex-wrap gap-2.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs">
            {t}
          </span>
        ))}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-neon transition-colors hover:text-neon-soft"
      >
        Open project →
      </a>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 scroll-mt-0 overflow-hidden">
      <div className="mx-auto w-[min(80rem,calc(100%-2.5rem))] pb-6 pt-24">
        <div data-reveal className="mb-10 text-center">
          <p className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-neon">Featured work</p>
          <h2 data-sweep-title className="font-display text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-tight">
            Projects with <span className="grad-text">real engineering instincts.</span>
          </h2>
          <p className="mt-4 hidden text-fog md:block">Scroll to travel through the gallery →</p>
        </div>
      </div>
      <div id="projects-viewport" className="overflow-x-auto pb-24 md:overflow-visible">
        <div id="projects-track" className="flex w-max snap-x snap-mandatory gap-6 px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] md:snap-none">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div className="flex w-[82vw] max-w-md shrink-0 snap-center items-center justify-center md:w-[30rem]">
            <a
              href="https://github.com/Vinesh-hub?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="glass shine flex h-full min-h-[24rem] w-full flex-col items-center justify-center gap-3 rounded-[24px] p-6 text-center transition-transform duration-200 hover:-translate-y-1.5"
            >
              <span className="font-display text-5xl">→</span>
              <span className="font-display text-2xl font-semibold">More on GitHub</span>
              <span className="text-fog">Explore every repository</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
