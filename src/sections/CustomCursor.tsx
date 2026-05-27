import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch.current) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    const handleMouseEnterInteractive = () => {
      cursor.classList.add('expanded');
    };

    const handleMouseLeaveInteractive = () => {
      cursor.classList.remove('expanded');
    };

    window.addEventListener('mousemove', moveCursor);

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, .collage-polaroid, .service-card, .gallery-item, .instax'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    observer.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
}
