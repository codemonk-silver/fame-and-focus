import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

const showcases = [
  { img: '/images/graduation_01.jpg', title: 'Graduations', subtitle: 'Caps, Gowns & New Beginnings', desc: 'Celebrate your academic achievements with portraits that capture the pride and promise of your future.', message: WHATSAPP_MESSAGES.graduation },
  { img: '/images/wedding_01.jpg', title: 'Weddings', subtitle: 'Love Stories in Every Frame', desc: 'From the first look to the last dance, we preserve every emotion of your most important day.', message: WHATSAPP_MESSAGES.wedding },
  { img: '/images/birthday_01.jpg', title: 'Birthdays', subtitle: 'Another Year of Beautiful You', desc: 'Milestone celebrations deserve stunning portraits that you will treasure for years to come.', message: WHATSAPP_MESSAGES.birthday },
  { img: '/images/family_01.jpg', title: 'Family', subtitle: 'The Love That Binds Us', desc: 'Warm, authentic family sessions that capture the joy and connection you share together.', message: WHATSAPP_MESSAGES.family },
  { img: '/images/beauty_01.jpg', title: 'Fashion & Beauty', subtitle: 'Editorial Elegance', desc: 'Bold, artistic imagery for brands and creatives who want to make a statement.', message: WHATSAPP_MESSAGES.fashion },
  { img: '/images/realestate_01.jpg', title: 'Real Estate', subtitle: 'Spaces That Inspire', desc: 'Luxury property photography that showcases architecture, design, and the art of living well.', message: WHATSAPP_MESSAGES.general },
  { img: '/images/food_01.jpg', title: 'Food & Product', subtitle: 'Tempting Visuals That Sell', desc: 'Mouth-watering food and premium product photography that elevates your brand presence.', message: WHATSAPP_MESSAGES.product },
  { img: '/images/couple_01.jpg', title: 'Engagements', subtitle: 'The Beginning of Forever', desc: 'Romantic, intimate portraits that tell the story of your love and commitment.', message: WHATSAPP_MESSAGES.general },
];

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.fromTo(
      section.querySelector('.showcase-header'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' }
      }
    );

    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#090909] overflow-hidden">
      <div className="showcase-header text-center pt-32 pb-20 px-6">
        <p className="text-champagne-gold text-xl md:text-2xl mb-4" style={{ fontFamily: '"Allura", cursive' }}>
          Explore by Category
        </p>
        <h2 className="text-warm-ivory text-4xl md:text-6xl font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
          A Portfolio of Moments
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-6 pl-6 md:pl-12 pr-[50vw] will-change-transform pb-32">
        {showcases.map((item, i) => (
          <a
            key={i}
            href={getWhatsAppLink(item.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 relative overflow-hidden block"
            style={{ width: '420px', height: '580px' }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-[#090909]/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-champagne-gold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-champagne-gold text-[9px] uppercase tracking-[0.2em] font-body mb-2">
                {item.subtitle}
              </p>
              <h3 className="text-warm-ivory text-3xl font-medium mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
                {item.title}
              </h3>
              <p className="text-warm-ivory/60 text-xs font-body leading-relaxed max-w-[320px] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {item.desc}
              </p>
              <p className="text-champagne-gold text-[10px] uppercase tracking-[0.15em] font-body mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                <span>Book this on WhatsApp</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </p>
            </div>
            <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-champagne-gold/0 group-hover:border-champagne-gold/50 transition-all duration-700" />
            <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-champagne-gold/0 group-hover:border-champagne-gold/50 transition-all duration-700" />
          </a>
        ))}
      </div>
    </section>
  );
}
