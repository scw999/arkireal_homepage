'use client';

import { useEffect, useState } from 'react';

export function ClientEffects() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      const total = root.scrollHeight - root.clientHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const targets = document.querySelectorAll<HTMLElement>(
      'main section, main figure, main h2',
    );
    targets.forEach((el) => {
      el.setAttribute('data-reveal', '');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.setAttribute('data-revealed', '');
      }
    });
    root.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revealed', '');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] bg-accent"
      style={{
        width: `${progress * 100}%`,
        transition: 'width 0.1s linear',
      }}
    />
  );
}
