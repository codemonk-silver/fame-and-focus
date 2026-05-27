import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INSTAGRAM_URL, getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    const strip = imageStripRef.current;
    if (!cta) return;

    gsap.fromTo(cta,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: cta, start: 'top 80%' }
      }
    );

    if (strip) {
      gsap.fromTo(strip,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: strip, start: 'top 85%' }
        }
      );
    }
  }, []);

  const footerImages = [
    '/images/portrait_01.jpg',
    '/images/wedding_01.jpg',
    '/images/graduation_01.jpg',
    '/images/fashion_01.jpg',
    '/images/birthday_01.jpg',
    '/images/family_01.jpg',
    '/images/beauty_01.jpg',
    '/images/couple_01.jpg',
  ];

  return (
    <footer className="bg-[#090909]">
      {/* Image Strip */}
      <div ref={imageStripRef} className="w-full overflow-hidden">
        <div className="flex h-40 md:h-56">
          {footerImages.map((img, i) => (
            <div key={i} className="flex-1 overflow-hidden group">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div ref={ctaRef} className="py-32 md:py-44 px-6 md:px-12 text-center border-t border-charcoal">
        <p className="text-champagne-gold text-xl md:text-2xl mb-6" style={{ fontFamily: '"Allura", cursive' }}>
          Let&apos;s Create Something Beautiful
        </p>
        <h2 className="text-warm-ivory text-4xl md:text-6xl lg:text-7xl font-medium mb-8 max-w-4xl mx-auto leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
          Ready to Create Photos<br />You&apos;ll Be Proud Of?
        </h2>
        <p className="text-soft-beige/50 text-sm font-body max-w-lg mx-auto mb-14 leading-relaxed">
          Book your portrait, event, product, or brand shoot today and get
          clean, premium visuals made to stand out.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-warm-ivory text-deep-black px-12 py-5 text-xs uppercase tracking-[0.15em] font-body font-medium hover:bg-champagne-gold transition-colors duration-300 inline-flex items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Book a Shoot
          </a>
          <a
            href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-warm-ivory/30 text-warm-ivory px-12 py-5 text-xs uppercase tracking-[0.15em] font-body font-medium hover:border-champagne-gold hover:text-champagne-gold transition-colors duration-300 inline-flex items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Instagram CTA */}
        <div className="mt-12">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-soft-beige/40 hover:text-champagne-gold transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span className="text-xs font-body tracking-wide">Follow us on Instagram for daily work</span>
          </a>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-charcoal py-14 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-warm-ivory text-2xl"
              style={{ fontFamily: '"Allura", cursive' }}
            >
              Frame &amp; Focus Studio
            </a>

            <div className="flex items-center gap-8">
              {[
                { name: 'Instagram', url: INSTAGRAM_URL },
                { name: 'WhatsApp', url: getWhatsAppLink(WHATSAPP_MESSAGES.general) },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-soft-beige/40 text-xs uppercase tracking-[0.1em] font-body hover:text-champagne-gold transition-colors duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-charcoal/50">
            <p className="text-soft-beige/20 text-[10px] font-body tracking-wide">
              Premium Photography for Moments, Brands &amp; Personal Stories
            </p>
            <p className="text-soft-beige/20 text-[10px] font-body tracking-wide">
              &copy; {new Date().getFullYear()} Frame &amp; Focus Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
