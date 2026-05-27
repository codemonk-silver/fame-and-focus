import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: 'Birthday shoots', image: '/images/birthday_01.jpg', message: WHATSAPP_MESSAGES.birthday },
  { name: 'Graduation shoots', image: '/images/graduation_01.jpg', message: WHATSAPP_MESSAGES.graduation },
  { name: 'Fashion brands', image: '/images/fashion_01.jpg', message: WHATSAPP_MESSAGES.fashion },
  { name: 'Beauty brands', image: '/images/beauty_01.jpg', message: WHATSAPP_MESSAGES.fashion },
  { name: 'Product sellers', image: '/images/product_01.jpg', message: WHATSAPP_MESSAGES.product },
  { name: 'Restaurants', image: '/images/food_01.jpg', message: WHATSAPP_MESSAGES.product },
  { name: 'Wedding coverage', image: '/images/wedding_01.jpg', message: WHATSAPP_MESSAGES.wedding },
  { name: 'Family portraits', image: '/images/family_01.jpg', message: WHATSAPP_MESSAGES.family },
  { name: 'Real estate', image: '/images/realestate_01.jpg', message: WHATSAPP_MESSAGES.general },
  { name: 'Corporate teams', image: '/images/corporate_01.jpg', message: WHATSAPP_MESSAGES.corporate },
  { name: 'Content creators', image: '/images/lifestyle_01.jpg', message: WHATSAPP_MESSAGES.brand },
  { name: 'Engagement shoots', image: '/images/couple_01.jpg', message: WHATSAPP_MESSAGES.general },
];

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.industries-header'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' }
        }
      );

      const items = section.querySelectorAll('.industry-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#090909] py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="industries-header text-center mb-24">
          <p className="text-champagne-gold text-xl md:text-2xl mb-4" style={{ fontFamily: '"Allura", cursive' }}>
            Who We Serve
          </p>
          <h2 className="text-warm-ivory text-4xl md:text-6xl font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
            Perfect for Personal,<br />Business &amp; Creative Shoots
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <a
              key={i}
              href={getWhatsAppLink(ind.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="industry-item group relative overflow-hidden block"
              style={{ height: '280px' }}
            >
              <img
                src={ind.image}
                alt={ind.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#090909]/60 group-hover:bg-[#090909]/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="w-10 h-px bg-champagne-gold mx-auto mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="text-warm-ivory text-sm font-body tracking-wide block mb-2">
                    {ind.name}
                  </span>
                  <span className="text-champagne-gold/0 group-hover:text-champagne-gold/80 text-[9px] uppercase tracking-[0.15em] font-body transition-colors duration-500 flex items-center justify-center gap-1">
                    <span>Book via WhatsApp</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 border border-charcoal group-hover:border-champagne-gold/30 transition-colors duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
