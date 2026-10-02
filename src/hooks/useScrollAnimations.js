import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations(motionOK, started) {
  useEffect(() => {
    if (!motionOK || !started) return undefined;

    const ctx = gsap.context(() => {
      // Site-wide scroll progress bar (scrubbed) ---------------------------
      gsap.to('#progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });

      // Generic reveal: [data-reveal] fades/slides in ----------------------
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        );
      });

      // Stagger groups: [data-reveal-group] children cascade ----------------
      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: 'top 86%' },
          },
        );
      });

      // Hero entrance -------------------------------------------------------
      gsap.fromTo(
        '[data-hero-item]',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.15 },
      );

      // Hero scroll-out: content drifts up, photo card rotates away
      // (the exact "timeline scrubs to scroll" effect) ---------------------
      const heroTl = gsap.timeline({
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      heroTl
        .to('[data-hero-copy]', { yPercent: -18, opacity: 0, ease: 'none' }, 0)
        .to('[data-hero-card]', { yPercent: 12, rotateY: -14, rotateX: 6, opacity: 0.1, ease: 'none' }, 0)
        .to('[data-hero-scroll]', { opacity: 0, ease: 'none' }, 0);

      // Giant section titles sweep in ---------------------------------------
      gsap.utils.toArray('[data-sweep-title]').forEach((title) => {
        gsap.fromTo(
          title,
          { xPercent: -6, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 90%' },
          },
        );
      });

      // Horizontal project gallery: pinned + scrubbed -----------------------
      const track = document.querySelector('#projects-track');
      const viewport = document.querySelector('#projects-viewport');
      if (track && viewport) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const distance = () => track.scrollWidth - viewport.clientWidth;
          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: '#projects',
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        });
      }

      // Parallax on project card art -----------------------------------------
      gsap.utils.toArray('[data-parallax-art]').forEach((art) => {
        gsap.fromTo(
          art,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: art, start: 'left right', end: 'right left', scrub: true },
          },
        );
      });

      // Journey: scrubbed card stack ------------------------------------------
      const cards = gsap.utils.toArray('[data-journey-card]');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.88,
          rotateX: 8,
          opacity: 0.35,
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: '#journey-stack',
            start: `top+=${i * 240} center`,
            end: `top+=${(i + 1) * 240} center`,
            scrub: 0.6,
          },
        });
        gsap.to(card.querySelector('[data-journey-progress]'), {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#journey-stack',
            start: `top+=${i * 240} center`,
            end: `top+=${(i + 1) * 240} center`,
            scrub: 0.6,
          },
        });
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    // Fonts/layout settle after preloader → recalc all triggers
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [motionOK, started]);
}

// Back-compat: some components still pass a scrollRef-style signature.
export function useLenis() {
  return useRef(null);
}
