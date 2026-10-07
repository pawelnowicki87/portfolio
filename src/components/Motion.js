import { createContext, useContext, useEffect, useRef } from 'react';

export const MotionContext = createContext(true);
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  const motion = useContext(MotionContext);
  useEffect(() => {
    const el = ref.current;
    if (!motion || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('reveal-waiting');
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.remove('reveal-waiting'); io.disconnect(); }
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    io.observe(el);
    return () => { io.disconnect(); el.classList.remove('reveal-waiting'); };
  }, [motion]);
  return <Tag ref={ref} className={'reveal ' + className} style={{ '--reveal-delay': delay + 'ms' }}>{children}</Tag>;
}
export function useParallax() {
  const ref = useRef(null);
  const motion = useContext(MotionContext);
  useEffect(() => {
    const el = ref.current;
    if (!motion || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--pointer-x', ((e.clientX - r.left) / r.width - 0.5) * 14 + 'px');
        el.style.setProperty('--pointer-y', ((e.clientY - r.top) / r.height - 0.5) * 14 + 'px');
      });
    };
    const reset = () => { cancelAnimationFrame(raf); el.style.setProperty('--pointer-x', '0px'); el.style.setProperty('--pointer-y', '0px'); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); reset(); };
  }, [motion]);
  return ref;
}
