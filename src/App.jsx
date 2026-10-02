import { lazy, Suspense, useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar.jsx';
import Preloader from './components/Preloader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import About from './components/About.jsx';
import Journey from './components/Journey.jsx';
import Projects from './components/Projects.jsx';
import Stack from './components/Stack.jsx';
import Learning from './components/Learning.jsx';
import Contact from './components/Contact.jsx';
import { usePrefersReducedMotion } from './hooks/hooks.js';
import { useScrollAnimations } from './hooks/useScrollAnimations.js';

const Scene3D = lazy(() => import('./components/Scene3D.jsx'));

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reduced = usePrefersReducedMotion();
  const motionOK = !reduced && loaded;
  useScrollAnimations(motionOK, loaded);

  useEffect(() => {
    if (reduced) {
      setLoaded(true);
      return undefined;
    }
    document.body.style.overflow = loaded ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loaded, reduced]);

  useEffect(() => {
    if (!loaded || reduced) return undefined;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Anchor links glide through Lenis instead of jumping
    const onClick = (e) => {
      const a = e.target.closest('a[href^=\"#\"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === '#projects' ? 0 : -70, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, [loaded, reduced]);

  return (
    <div className="relative min-h-screen bg-void text-ice">
      {!loaded && !reduced && <Preloader onDone={() => setLoaded(true)} />}

      {motionOK && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}

      <CustomCursor enabled={motionOK} />

      <div
        id="progress-fill"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-neon via-violet-glow to-mint shadow-[0_0_18px_rgba(101,212,255,0.65)]"
        aria-hidden="true"
      />

      <div className="grain" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero motionOK={motionOK} started={loaded || reduced} />
          <Ticker />
          <About />
          <Journey />
          <Projects />
          <Stack />
          <Learning />
        </main>
        <Contact />
      </div>
    </div>
  );
}
