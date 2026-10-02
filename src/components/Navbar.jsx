import { useEffect, useState } from 'react';
import { PROFILE } from '../data.js';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-void/75 shadow-[0_8px_30px_rgba(3,7,16,0.4)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] w-[min(80rem,calc(100%-2.5rem))] items-center justify-between gap-4">
          <a href="#hero" className="flex items-center gap-2.5 font-display font-bold tracking-wide">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-neon to-violet-glow font-extrabold text-void">
              V
            </span>
            <span>{PROFILE.name}</span>
            <span className="hidden rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 text-[0.65rem] font-semibold text-mint sm:inline-block">
              v2.0
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[0.95rem] text-fog lg:flex" aria-label="Main navigation">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link transition-colors hover:text-ice">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="shine hidden rounded-full border border-neon/40 bg-neon/10 px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              Let&rsquo;s connect
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] lg:hidden"
            >
              <span className={`h-0.5 w-5 bg-ice transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 bg-ice transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`h-0.5 w-5 bg-ice transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
      </header>

      <div
        className={`fixed inset-0 z-40 bg-void/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-6 text-2xl font-display font-semibold" aria-label="Mobile navigation">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`transition-all duration-300 hover:text-neon ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-full bg-gradient-to-br from-neon to-neon-soft px-7 py-3 text-lg text-void"
          >
            Let&rsquo;s connect
          </a>
        </nav>
      </div>
    </>
  );
}
