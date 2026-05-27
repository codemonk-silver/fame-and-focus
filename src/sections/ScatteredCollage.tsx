import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { INSTAGRAM_URL, WHATSAPP_URL, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(Draggable, InertiaPlugin);

interface PolaroidData {
  img: string;
  caption: string;
  x: number;
  y: number;
  rotation: number;
}

const polaroids: PolaroidData[] = [
  { img: '/images/portrait_01.jpg', caption: 'Golden Hour', x: 30, y: 40, rotation: -10 },
  { img: '/images/event_01.jpg', caption: 'Evening Light', x: 260, y: 100, rotation: 6 },
  { img: '/images/product_01.jpg', caption: 'Noir Essence', x: 500, y: 30, rotation: -4 },
  { img: '/images/fashion_01.jpg', caption: 'Editorial', x: 730, y: 130, rotation: 8 },
  { img: '/images/album_cover_1.jpg', caption: 'Watercolor', x: 80, y: 360, rotation: 3 },
  { img: '/images/album_cover_2.jpg', caption: 'Golden Age', x: 350, y: 330, rotation: -7 },
  { img: '/images/album_cover_3.jpg', caption: 'Botanical', x: 590, y: 380, rotation: 2 },
  { img: '/images/tactile_hero.jpg', caption: 'Through Film', x: 820, y: 350, rotation: -5 },
  { img: '/images/graduation_01.jpg', caption: 'The Tassel', x: 170, y: 190, rotation: 11 },
  { img: '/images/wedding_01.jpg', caption: 'Forever', x: 420, y: 210, rotation: -8 },
  { img: '/images/birthday_01.jpg', caption: 'Celebrate', x: 650, y: 260, rotation: 5 },
  { img: '/images/food_01.jpg', caption: 'Indulgence', x: 880, y: 200, rotation: -3 },
  { img: '/images/couple_01.jpg', caption: 'Rooftop Love', x: 40, y: 540, rotation: 7 },
  { img: '/images/corporate_01.jpg', caption: 'Executive', x: 300, y: 510, rotation: -6 },
  { img: '/images/beauty_01.jpg', caption: 'Golden Gaze', x: 540, y: 550, rotation: 4 },
  { img: '/images/lifestyle_01.jpg', caption: 'Slow Morning', x: 780, y: 520, rotation: -9 },
  { img: '/images/family_01.jpg', caption: 'Together', x: 160, y: 680, rotation: 2 },
  { img: '/images/realestate_01.jpg', caption: 'Luxury Living', x: 450, y: 660, rotation: -11 },
  { img: '/images/skincare_01.jpg', caption: 'Radiance', x: 720, y: 690, rotation: 6 },
];

export default function ScatteredCollage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('.collage-polaroid');
    const proxy = document.createElement('div');
    const followers: gsap.core.Tween[] = [];
    const props: Array<{
      el: HTMLElement;
      initialX: number;
      initialY: number;
      rotation: number;
      scale: number;
    }> = [];
    const draggables: Draggable[] = [];

    function updateZIndex(activeEl: HTMLElement, allEls: NodeListOf<HTMLElement>) {
      allEls.forEach((el) => {
        gsap.set(el, { zIndex: 1 });
      });
      gsap.set(activeEl, { zIndex: 100 });
    }

    elements.forEach((el) => {
      const posX = +(el.dataset.x || 0);
      const posY = +(el.dataset.y || 0);
      const rotation = +(el.dataset.rotation || 0);

      const d = Draggable.create(el, {
        type: 'x,y',
        inertia: true,
        edgeResistance: 0.8,
        throwResistance: 0.25,
        bounds: container,
        zIndexBoost: true,
        onDragStart: function () {
          updateZIndex(this.target as HTMLElement, elements);
        },
      })[0];

      draggables.push(d);

      gsap.set(el, { x: posX, y: posY, rotation: rotation });

      props.push({
        el,
        initialX: posX,
        initialY: posY,
        rotation: rotation,
        scale: 1,
      });

      followers.push(
        gsap.to(proxy, {
          duration: 1,
          x: posX,
          y: posY,
          paused: true,
        })
      );
    });

    // Intro animation
    elements.forEach((el, i) => {
      const obj = props[i];
      const delay = i * 0.08;
      gsap.fromTo(
        el,
        {
          x: gsap.utils.random(-200, 1200),
          y: gsap.utils.random(-200, 900),
          rotation: gsap.utils.random(-60, 60),
          opacity: 0,
          scale: 0.8,
        },
        {
          x: obj.initialX,
          y: obj.initialY,
          rotation: obj.rotation,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          delay,
          ease: 'power3.out',
        }
      );
    });

    // Physics ticker
    const springUpdate = () => {
      props.forEach((obj, index) => {
        const f = followers[index];
        const t = f.time() + 0.01;
        f.time(t);

        const targetX = f.vars.x as number;
        const targetY = f.vars.y as number;
        const currentX = gsap.getProperty(obj.el, 'x') as number;
        const currentY = gsap.getProperty(obj.el, 'y') as number;

        const stiffness = 0.004;
        const springX = (targetX - currentX) * stiffness;
        const springY = (targetY - currentY) * stiffness;

        const pointerX = gsap.getProperty(proxy, 'x') as number;
        const pointerY = gsap.getProperty(proxy, 'y') as number;
        const diffX = pointerX - currentX;
        const diffY = pointerY - currentY;
        const angle = Math.atan2(diffY, diffX);
        const pointerVelX = Math.cos(angle) * Math.sqrt(diffX * diffX + diffY * diffY) * 0.01;
        const pointerVelY = Math.sin(angle) * Math.sqrt(diffX * diffX + diffY * diffY) * 0.01;

        gsap.set(obj.el, {
          x: currentX + springX + pointerVelX,
          y: currentY + springY + pointerVelY,
        });
      });
    };

    gsap.ticker.add(springUpdate);

    return () => {
      gsap.ticker.remove(springUpdate);
      draggables.forEach((d) => d.kill());
      followers.forEach((f) => f.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scattered-collage">
      {polaroids.map((p, i) => (
        <div
          key={i}
          className="collage-polaroid"
          data-x={p.x}
          data-y={p.y}
          data-rotation={p.rotation}
        >
          <div className="polaroid-img">
            <img src={p.img} alt={p.caption} draggable={false} />
          </div>
          <div className="polaroid-caption">{p.caption}</div>
        </div>
      ))}

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="text-center pointer-events-auto bg-[#090909]/50 backdrop-blur-lg rounded-sm px-12 py-12 border border-warm-ivory/10">
          <p
            className="text-champagne-gold text-2xl md:text-3xl mb-4"
            style={{ fontFamily: '"Allura", cursive' }}
          >
            Frame &amp; Focus Studio
          </p>
          <h1
            className="text-warm-ivory text-4xl md:text-6xl lg:text-8xl font-medium leading-[1.05] mb-6"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Capture the Moment.<br />Keep the Feeling.
          </h1>
          <p className="font-body text-soft-beige text-sm md:text-base tracking-wide max-w-lg mx-auto mb-10 leading-relaxed">
            Premium photography for portraits, events, brands, and lifestyle
            moments — crafted with clean lighting, sharp detail, and a timeless
            visual style.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={WHATSAPP_URL + '?text=' + encodeURIComponent(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-warm-ivory text-deep-black px-10 py-4 text-xs uppercase tracking-[0.15em] font-body font-medium hover:bg-champagne-gold transition-colors duration-300 inline-block"
            >
              Book a Session
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-warm-ivory/40 text-warm-ivory px-10 py-4 text-xs uppercase tracking-[0.15em] font-body font-medium hover:border-champagne-gold hover:text-champagne-gold transition-colors duration-300 inline-block"
            >
              View Portfolio
            </a>
          </div>
          <p className="text-soft-beige/50 text-[10px] uppercase tracking-[0.25em] mt-10 font-body">
            Portraits &middot; Events &middot; Products &middot; Brands &middot; Lifestyle &middot; Weddings &middot; Graduations
          </p>
        </div>
      </div>
    </div>
  );
}
