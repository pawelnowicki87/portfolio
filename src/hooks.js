import { useState, useEffect, useRef } from 'react';

/* Lazy-reveal once-in-view */
export function useInView(ref, opts = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px', ...opts });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, opts.threshold, opts.rootMargin]); // eslint-disable-line
  return inView;
}

/* Typewriter — cycles words with a blinking cursor */
export function useTypewriter(words, speed = 80, pause = 1400) {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const target = words[wi];
    const tick = () => {
      if (!deleting) {
        if (text.length < target.length) {
          setText(target.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (text.length > 0) {
          setText(target.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setWi((wi + 1) % words.length);
        }
      }
    };
    const id = setTimeout(tick, deleting ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [text, deleting, wi, words, speed, pause]);
  return text;
}

/* Scroll-spy active section */
export function useScrollActive(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let cur = ids[0];
      for (const s of sections) {
        if (s.offsetTop <= y) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

/* Smooth-scroll helper */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const pt = parseFloat(getComputedStyle(el).paddingTop) || 0;
    window.scrollTo({ top: el.offsetTop + pt - 80, behavior: 'smooth' });
  }
}

/* Magnetic mouse-position tracker (writes --mx --my to the element) */
export function useMouseTrack() {
  const ref = useRef(null);
  const onMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    ref.current.style.setProperty('--my', (e.clientY - r.top) + 'px');
  };
  return [ref, onMouseMove];
}
