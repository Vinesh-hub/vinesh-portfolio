export const PROFILE = {
  name: 'Vinesh',
  roles: [
    'Generative AI Engineer',
    'RAG Systems Builder',
    'FastAPI Backend Developer',
    'Practical AI Product Builder',
  ],
  photo: `${import.meta.env.BASE_URL}profile.png`,
  github: 'https://github.com/Vinesh-hub',
  linkedin: 'https://www.linkedin.com/in/vadijarla-vinesh-b13734370',
  email: 'mailto:hello@vinesh.dev',
};

export const STATS = [
  { value: 5, suffix: '+', label: 'AI & backend projects' },
  { value: 8, suffix: '+', label: 'Technologies practiced' },
  { value: 4, suffix: '', label: 'Live GitHub projects' },
];

export const TICKER = [
  'Python',
  'FastAPI',
  'LangChain',
  'LangGraph',
  'RAG',
  'PostgreSQL',
  'pgvector',
  'Docker',
  'REST APIs',
  'Pydantic',
  'Vector Search',
  'LLM Evaluation',
];

export const PROJECTS = [
  {
    id: 'rag-support',
    index: '01',
    badge: 'AI Assistant',
    badgeColor: 'text-sky-200 border-sky-300/25 bg-sky-400/10',
    title: 'RAG-Based Customer Support Assistant',
    description:
      'A graph-based support assistant that retrieves answers from PDF knowledge bases, routes intents, and escalates low-confidence queries to human agents.',
    tech: ['Python', 'LangGraph', 'RAG'],
    url: 'https://github.com/Vinesh-hub/RAG-Based-Customer-Support-Assistant',
    visual: 'from-sky-400/25 via-violet-500/10 to-mint-300/20',
    gradient: 'linear-gradient(135deg, rgba(101,212,255,.22), rgba(139,92,246,.10), rgba(126,240,197,.18))',
  },
  {
    id: 'rag-postgres',
    index: '02',
    badge: 'Data + AI',
    badgeColor: 'text-violet-200 border-violet-300/25 bg-violet-400/10',
    title: 'RAG Application using PostgreSQL',
    description:
      'A PostgreSQL and pgvector environment for building retrieval-augmented generation apps in Dockerized development workflows and GitHub Codespaces.',
    tech: ['PostgreSQL', 'pgvector', 'Docker'],
    url: 'https://github.com/Vinesh-hub/RAG-Application-using-PostgreSQL',
    visual: 'from-violet-400/25 via-sky-400/10 to-mint-300/15',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,.24), rgba(101,212,255,.10), rgba(126,240,197,.14))',
  },
  {
    id: 'fastapi-courses',
    index: '03',
    badge: 'Backend',
    badgeColor: 'text-mint-200 border-mint-300/25 bg-mint-400/10',
    title: 'FastAPI Online Course Platform',
    description:
      'A REST API for course discovery, seat tracking, dynamic pricing, wishlist logic, and bulk enrollment workflows.',
    tech: ['FastAPI', 'Pydantic', 'REST API'],
    url: 'https://github.com/Vinesh-hub/fastapi-online-course-platform',
    visual: 'from-mint-300/25 via-sky-400/10 to-violet-400/15',
    gradient: 'linear-gradient(135deg, rgba(126,240,197,.22), rgba(101,212,255,.10), rgba(139,92,246,.14))',
  },
  {
    id: 'cricket-counter',
    index: '04',
    badge: 'Frontend',
    badgeColor: 'text-amber-200 border-amber-300/25 bg-amber-400/10',
    title: 'Cricket Score Counter',
    description:
      'A JavaScript scoring app for tracking match progress with live values for runs, wickets, overs, and overall score flow.',
    tech: ['JavaScript', 'Frontend', 'UX'],
    url: 'https://github.com/Vinesh-hub/Cricket-score-counter',
    visual: 'from-amber-300/25 via-sky-400/10 to-violet-400/15',
    gradient: 'linear-gradient(135deg, rgba(255,166,77,.22), rgba(101,212,255,.10), rgba(139,92,246,.14))',
  },
];

export const STACK = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'SQL'], icon: '⌨' },
  { group: 'Backend', items: ['FastAPI', 'REST APIs', 'Pydantic'], icon: '⚙' },
  { group: 'AI', items: ['RAG', 'LangChain', 'LangGraph'], icon: '✦' },
  { group: 'Data & Infra', items: ['PostgreSQL', 'pgvector', 'Docker'], icon: '◈' },
];

export const PILLARS = [
  {
    index: '01',
    title: 'LLM Systems',
    text: 'Designing smarter, grounded AI experiences with real retrieval and reasoning workflows.',
  },
  {
    index: '02',
    title: 'Production APIs',
    text: 'Building reliable backend services with clean contracts, validation, and maintainable architecture.',
  },
  {
    index: '03',
    title: 'Data + Retrieval',
    text: 'Connecting data systems, vector search, and product thinking to unlock practical automation.',
  },
];

export const JOURNEY = [
  {
    phase: '01 — Foundations',
    title: 'Python & backend fundamentals',
    text: 'Built a strong base in Python, APIs and SQL — learning how clean data models and well-designed endpoints power everything above them.',
    tags: ['Python', 'SQL', 'REST'],
  },
  {
    phase: '02 — API Craft',
    title: 'FastAPI products in the wild',
    text: 'Shipped course platforms and REST services with validation, pricing logic and enrollment flows — thinking like a product engineer, not just a coder.',
    tags: ['FastAPI', 'Pydantic', 'Testing'],
  },
  {
    phase: '03 — Intelligence Layer',
    title: 'RAG & LLM workflows',
    text: 'Moved into retrieval-augmented generation: chunking, embeddings, pgvector search, LangGraph routing and human-in-the-loop escalation.',
    tags: ['RAG', 'LangGraph', 'pgvector'],
  },
  {
    phase: '04 — Now',
    title: 'Production-grade AI systems',
    text: 'Focused on evaluation, observability and deployment — turning demos into dependable AI products people can trust.',
    tags: ['Eval', 'Docker', 'Agents'],
  },
];

