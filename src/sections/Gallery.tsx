import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Portraits', 'Events', 'Products', 'Fashion', 'Brands', 'Graduations', 'Weddings', 'Birthdays', 'Lifestyle', 'Family', 'Corporate'];

const galleryImages = [
  { src: '/images/portrait_01.jpg', category: 'Portraits', title: 'Golden Hour Portrait', size: 'tall' },
  { src: '/images/graduation_01.jpg', category: 'Graduations', title: 'The Graduate', size: 'normal' },
  { src: '/images/wedding_01.jpg', category: 'Weddings', title: 'Garden Romance', size: 'tall' },
  { src: '/images/birthday_01.jpg', category: 'Birthdays', title: 'Birthday Glow', size: 'normal' },
  { src: '/images/product_01.jpg', category: 'Products', title: 'Noir Essence', size: 'wide' },
  { src: '/images/fashion_01.jpg', category: 'Fashion', title: 'Industrial Editorial', size: 'tall' },
  { src: '/images/event_01.jpg', category: 'Events', title: 'Evening Celebration', size: 'normal' },
  { src: '/images/beauty_01.jpg', category: 'Fashion', title: 'Golden Gaze', size: 'normal' },
  { src: '/images/food_01.jpg', category: 'Products', title: 'Chocolate Indulgence', size: 'wide' },
  { src: '/images/couple_01.jpg', category: 'Portraits', title: 'Rooftop Love', size: 'tall' },
  { src: '/images/corporate_01.jpg', category: 'Corporate', title: 'Executive Presence', size: 'normal' },
  { src: '/images/lifestyle_01.jpg', category: 'Lifestyle', title: 'Slow Morning', size: 'normal' },
  { src: '/images/family_01.jpg', category: 'Family', title: 'Togetherness', size: 'tall' },
  { src: '/images/realestate_01.jpg', category: 'Brands', title: 'Penthouse Living', size: 'wide' },
  { src: '/images/skincare_01.jpg', category: 'Products', title: 'Radiance', size: 'normal' },
  { src: '/images/album_cover_1.jpg', category: 'Brands', title: 'Echoes of Silence', size: 'normal' },
  { src: '/images/album_cover_3.jpg', category: 'Fashion', title: 'The Quiet Bloom', size: 'tall' },
  { src: '/images/tactile_hero.jpg', category: 'Lifestyle', title: 'Through the Lens', size: 'normal' },
  { src: '/images/album_cover_2.jpg', category: 'Brands', title: 'Golden Age', size: 'normal' },
  { src: '/images/graduation_01.jpg', category: 'Graduations', title: 'Class of 2024', size: 'normal' },
];

const categoryMessageMap: Record<string, string> = {
  'Portraits': WHATSAPP_MESSAGES.portrait,
  'Events': WHATSAPP_MESSAGES.event,
  'Products': WHATSAPP_MESSAGES.product,
  'Fashion': WHATSAPP_MESSAGES.fashion,
  'Brands': WHATSAPP_MESSAGES.brand,
  'Graduations': WHATSAPP_MESSAGES.graduation,
  'Weddings': WHATSAPP_MESSAGES.wedding,
  'Birthdays': WHATSAPP_MESSAGES.birthday,
  'Lifestyle': WHATSAPP_MESSAGES.portrait,
  'Family': WHATSAPP_MESSAGES.family,
  'Corporate': WHATSAPP_MESSAGES.corporate,
};

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.fromTo(
      section.querySelector('.gallery-header'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' }
      }
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.gallery-item');
    gsap.fromTo(items,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const getMessageForCategory = (category: string) => {
    return categoryMessageMap[category] || WHATSAPP_MESSAGES.general;
  };

  const getHeight = (size: string) => {
    switch (size) {
      case 'tall': return 'h-[450px] md:h-[500px]';
      case 'wide': return 'h-[300px] md:h-[350px]';
      default: return 'h-[350px] md:h-[380px]';
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#090909] py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="gallery-header text-center mb-20">
          <p className="text-champagne-gold text-xl md:text-2xl mb-4" style={{ fontFamily: '"Allura", cursive' }}>
            Our Portfolio
          </p>
          <h2 className="text-warm-ivory text-4xl md:text-6xl font-medium mb-14" style={{ fontFamily: '"Playfair Display", serif' }}>
            Recent Work
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-body py-2.5 px-4 md:px-6 transition-all duration-300 ${
                  activeFilter === cat
                    ? 'text-deep-black bg-champagne-gold'
                    : 'text-soft-beige/50 hover:text-warm-ivory border border-charcoal hover:border-champagne-gold/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <a
              key={`${img.src}-${i}`}
              href={getWhatsAppLink(getMessageForCategory(img.category))}
              target="_blank"
              rel="noopener noreferrer"
              className={`gallery-item break-inside-avoid group relative overflow-hidden block ${getHeight(img.size)}`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-champagne-gold text-[9px] uppercase tracking-[0.2em] font-body mb-1">
                  {img.category}
                </p>
                <p className="text-warm-ivory text-lg font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {img.title}
                </p>
                <p className="text-warm-ivory/50 text-[10px] font-body mt-2 flex items-center gap-2">
                  <span>Inquire on WhatsApp</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-champagne-gold/0 group-hover:border-champagne-gold/60 transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
