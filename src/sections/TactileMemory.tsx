import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

interface Transform {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  width: number;
  height: number;
}

function adjust(
  img: HTMLImageElement,
  parent: HTMLElement,
  canvasDim: { width: number; height: number }
) {
  const imgRatio = img.naturalHeight / img.naturalWidth;
  const winRatio = canvasDim.height / canvasDim.width;
  const dim = { w: canvasDim.width, h: canvasDim.height };

  if (winRatio > imgRatio) {
    dim.w = Math.round(canvasDim.height / imgRatio);
  } else {
    dim.h = Math.round(canvasDim.width * imgRatio);
  }

  parent.style.width = dim.w + 'px';
  parent.style.height = dim.h + 'px';

  return dim;
}

function calcTransforms(
  img: HTMLImageElement,
  canvasDim: { width: number; height: number }
): Transform[] {
  const dim = adjust(img, img.parentElement!, canvasDim);
  const transforms: Transform[] = [];
  const nRows = 6;
  const nCols = 5;

  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      const rotation = -18 + 4 * r;
      const scale = 0.9 + 0.05 * Math.random();
      const isEven = c % 2 === 0;
      let y: number;
      let x: number;

      if (r === 0) y = isEven ? 16 : 0;
      else if (r === 1) y = isEven ? 44 : 24;
      else if (r === 2) y = isEven ? 72 : 52;
      else if (r === 3) y = isEven ? 100 : 80;
      else if (r === 4) y = isEven ? 128 : 108;
      else y = isEven ? 156 : 136;

      if (c === 0) x = isEven ? 12 : 0;
      else if (c === 1) x = isEven ? 56 : 44;
      else if (c === 2) x = isEven ? 100 : 88;
      else if (c === 3) x = isEven ? 144 : 132;
      else x = isEven ? 188 : 176;

      transforms.push({
        x: Math.round(x),
        y: Math.round(y),
        rotation: -1 * rotation * (c + 0.5),
        scale: Math.round(scale * 100) / 100,
        width: Math.round(dim.w),
        height: Math.round(dim.h),
      });
    }
  }

  return transforms;
}

export default function TactileMemory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [transforms, setTransforms] = useState<Transform[]>([]);
  const isPressedRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    const parent = parentRef.current;
    if (!img || !parent) return;

    const handleLoad = () => {
      const dims = { width: 300, height: 360 };
      const t = calcTransforms(img, dims);
      setTransforms(t);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, []);

  const animateToGrid = useCallback(() => {
    const container = containerRef.current;
    if (!container || transforms.length === 0) return;

    const instaxEls = container.querySelectorAll<HTMLElement>('.instax');

    instaxEls.forEach((el, i) => {
      const t = transforms[i];
      if (!t) return;

      if (tweenRef.current) tweenRef.current.kill();

      gsap.to(el, {
        x: t.x,
        y: t.y,
        rotation: t.rotation,
        scale: t.scale,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  }, [transforms]);

  const animateToCenter = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const instaxEls = container.querySelectorAll<HTMLElement>('.instax');

    instaxEls.forEach((el) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  }, []);

  useEffect(() => {
    if (isPressed) {
      animateToGrid();
    } else {
      animateToCenter();
    }
  }, [isPressed, animateToGrid, animateToCenter]);

  const handlePointerDown = useCallback(() => {
    isPressedRef.current = true;
    setIsPressed(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    isPressedRef.current = false;
    setIsPressed(false);
  }, []);

  // Build the instax grid cells
  const cells = Array.from({ length: 30 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    return { row, col, index: i };
  });

  return (
    <section
      ref={sectionRef}
      className="bg-[#090909] py-40 md:py-52 px-6 flex flex-col items-center justify-center min-h-screen"
    >
      <div className="text-center mb-12">
        <p
          className="text-champagne-gold text-xl mb-4"
          style={{ fontFamily: '"Allura", cursive' }}
        >
          The Experience
        </p>
        <h2
          className="text-warm-ivory text-3xl md:text-5xl font-medium mb-4"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Hold to Feel the Memory
        </h2>
        <p className="text-soft-beige/50 text-xs uppercase tracking-[0.2em] font-body mb-8">
          Click and hold to unfold the moment
        </p>
        <a
          href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-champagne-gold/40 text-champagne-gold px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-body hover:bg-champagne-gold hover:text-deep-black transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          Start Your Session
        </a>
      </div>

      <div
        ref={containerRef}
        className="relative w-[300px] h-[360px] cursor-pointer group select-none touch-none"
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        <div
          ref={parentRef}
          className="relative w-full h-full overflow-hidden"
          style={{ background: '#1C1C1C' }}
        >
          {/* Single instax that morphs into grid */}
          {cells.map((cell) => (
            <div
              key={cell.index}
              className="instax absolute"
              style={{
                width: '60px',
                height: '72px',
                left: `${cell.col * 60}px`,
                top: `${cell.row * 60}px`,
                transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
                overflow: 'hidden',
                background: '#F8F3EA',
                padding: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <img
                ref={cell.index === 0 ? imgRef : undefined}
                src="/images/tactile_hero.jpg"
                alt="Memory"
                className="w-full h-full object-cover"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
