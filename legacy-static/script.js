document.addEventListener('DOMContentLoaded', () => {
  const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const navLinks = document.querySelectorAll('.nav a');
  const sections = [...document.querySelectorAll('main section[id], footer[id]')];
  const progressBar = document.querySelector('.scroll-progress');
  const tiltCard = document.querySelector('[data-tilt]');
  const cursorGlow = document.querySelector('.cursor-glow');
  const blobs = document.querySelectorAll('.blob');
  const year = document.getElementById('year');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      if (!section.id) return;

      const top = section.offsetTop;
      const height = section.offsetHeight;
      const isActive = scrollPosition >= top && scrollPosition < top + height;

      navLinks.forEach((link) => {
        const matches = link.getAttribute('href') === `#${section.id}`;
        link.classList.toggle('active', matches && isActive);
      });
    });

    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.setProperty('--progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    }
  };

  const revealElements = document.querySelectorAll('.value-item, .project-card, .info-card, .stack-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });

  const counters = document.querySelectorAll('[data-count]');
  const countUp = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || '';
    if (!motionOK || Number.isNaN(target)) {
      element.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1200;
    const started = performance.now();
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);

    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      element.textContent = `${Math.round(easeOut(progress) * target)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  const rotator = document.querySelector('.role-rotator');
  if (rotator && motionOK) {
    let roles = [];
    try {
      const textarea = document.createElement('textarea');
      roles = JSON.parse(rotator.dataset.roles || '[]').map((role) => {
        textarea.innerHTML = role;
        return textarea.value;
      });
    } catch (error) {
      roles = [rotator.textContent.trim()];
    }

    if (roles.length > 1) {
      let index = 0;
      setInterval(() => {
        rotator.classList.add('is-fading');
        setTimeout(() => {
          index = (index + 1) % roles.length;
          rotator.textContent = roles[index];
          rotator.classList.remove('is-fading');
        }, 320);
      }, 3000);
    }
  }

  if (tiltCard && motionOK && canHover && finePointer) {
    const resetTilt = () => {
      tiltCard.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
      tiltCard.style.removeProperty('--spot-x');
      tiltCard.style.removeProperty('--spot-y');
    };

    tiltCard.addEventListener('pointermove', (event) => {
      const bounds = tiltCard.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      tiltCard.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg)`;
      tiltCard.style.setProperty('--spot-x', `${x * 100}%`);
      tiltCard.style.setProperty('--spot-y', `${y * 100}%`);
    });

    tiltCard.addEventListener('pointerleave', resetTilt);
  }

  if (cursorGlow && motionOK && canHover && finePointer) {
    let pending = null;
    window.addEventListener(
      'pointermove',
      (event) => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          cursorGlow.style.setProperty('--mx', `${event.clientX}px`);
          cursorGlow.style.setProperty('--my', `${event.clientY}px`);
          pending = null;
        });
      },
      { passive: true }
    );
  }

  if (blobs.length && motionOK && finePointer) {
    let pending = null;
    window.addEventListener(
      'pointermove',
      (event) => {
        if (pending) return;
        pending = requestAnimationFrame(() => {
          const x = event.clientX / window.innerWidth - 0.5;
          const y = event.clientY / window.innerHeight - 0.5;
          blobs.forEach((blob, index) => {
            const depth = [18, -24, 14][index] || 12;
            blob.style.translate = `${x * depth}px ${y * depth}px`;
          });
          pending = null;
        });
      },
      { passive: true }
    );
  }

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
});
