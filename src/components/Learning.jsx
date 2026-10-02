export default function Learning() {
  return (
    <section className="relative z-10">
      <div className="mx-auto w-[min(80rem,calc(100%-2.5rem))] pb-24">
        <div
          data-reveal
          className="glass grid gap-6 rounded-[28px] bg-gradient-to-br from-panel to-abyss p-7 shadow-[0_20px_64px_rgba(4,10,20,0.45)] md:grid-cols-[1.1fr_0.9fr] md:p-9"
        >
          <div>
            <p className="mb-4 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-neon">
              Currently learning
            </p>
            <h2 className="font-display text-[clamp(1.8rem,2.4vw,2.5rem)] font-bold leading-snug tracking-tight">
              Production-ready RAG evaluation, observability, and scalable AI systems.
            </h2>
          </div>
          <ul className="flex flex-col justify-center gap-3 pl-5 text-fog">
            <li>Reliable AI workflows with human-in-the-loop systems</li>
            <li>Evaluation and observability for LLM pipelines</li>
            <li>API deployment, testing, and backend architecture</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
