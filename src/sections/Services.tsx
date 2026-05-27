import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Portrait Sessions',
    subtitle: 'Studio & Outdoor',
    description: 'Clean personal portraits for birthdays, graduations, profiles, and lifestyle moments that tell your story.',
    image: '/images/portrait_01.jpg',
    includes: ['Studio portraits', 'Outdoor portraits', 'Birthday shoots', 'Graduation shoots', 'LinkedIn headshots'],
    message: WHATSAPP_MESSAGES.portrait,
  },
  {
    title: 'Event Coverage',
    subtitle: 'Weddings & Celebrations',
    description: 'Professional coverage for events, parties, ceremonies, and corporate moments worth remembering.',
    image: '/images/wedding_01.jpg',
    includes: ['Event coverage', 'Edited photo gallery', 'Highlight images', 'Group photos', 'Same-day previews'],
    message: WHATSAPP_MESSAGES.event,
  },
  {
    title: 'Brand Shoots',
    subtitle: 'For Creators & Businesses',
    description: 'Premium visuals for entrepreneurs, creators, and businesses that want to look unmistakably professional.',
    image: '/images/fashion_01.jpg',
    includes: ['Brand portraits', 'Social media content', 'Website photos', 'Product-in-use', 'Team photos'],
    message: WHATSAPP_MESSAGES.brand,
  },
  {
    title: 'Product Photography',
    subtitle: 'E-commerce & Luxury',
    description: 'Clean product images designed to help online stores look more trustworthy and convert better.',
    image: '/images/product_01.jpg',
    includes: ['Multi-angle shots', 'Creative direction', 'Social media exports', 'Website-ready files', 'Premium retouching'],
    message: WHATSAPP_MESSAGES.product,
  },
  {
    title: 'Fashion & Beauty',
    subtitle: 'Editorial & Campaign',
    description: 'Editorial-style images for fashion brands, makeup artists, wig sellers, and beauty creatives.',
    image: '/images/beauty_01.jpg',
    includes: ['Editorial shoots', 'Beauty close-ups', 'Lookbook photos', 'Campaign visuals', 'Studio lighting'],
    message: WHATSAPP_MESSAGES.fashion,
  },
  {
    title: 'Corporate Photography',
    subtitle: 'Professional & Polished',
    description: 'Professional headshots, team photos, office shots, and business content that elevates your brand.',
    image: '/images/corporate_01.jpg',
    includes: ['Executive headshots', 'Team photos', 'Office environments', 'Conference coverage', 'LinkedIn packages'],
    message: WHATSAPP_MESSAGES.corporate,
  },
];

const packages = [
  {
    name: 'Mini Session',
    description: 'Best for quick portraits or personal content.',
    image: '/images/portrait_01.jpg',
    features: ['30-45 minutes shoot', '1 outfit', '5 edited pictures', 'Online gallery', 'Basic retouching'],
    price: 'From $150',
    message: WHATSAPP_MESSAGES.miniSession,
    cta: 'Book Mini Session',
  },
  {
    name: 'Premium Portrait Session',
    description: 'Best for birthdays, graduation, and personal branding.',
    image: '/images/graduation_01.jpg',
    features: ['1-2 hours shoot', '2-3 outfits', '15 edited pictures', 'Studio or outdoor option', 'Retouching', 'Online gallery'],
    price: 'From $400',
    message: WHATSAPP_MESSAGES.premiumSession,
    cta: 'Book Premium Session',
  },
  {
    name: 'Brand / Product Package',
    description: 'Best for businesses and online stores.',
    image: '/images/skincare_01.jpg',
    features: ['Product or brand shoot', 'Creative direction', 'Multiple product angles', '20+ edited images', 'Social media-ready exports', 'Website-ready exports'],
    price: 'From $800',
    message: WHATSAPP_MESSAGES.brandPackage,
    cta: 'Start Brand Shoot',
  },
  {
    name: 'Event Coverage',
    description: 'Best for parties, ceremonies, and business events.',
    image: '/images/event_01.jpg',
    features: ['Hourly coverage', 'Edited event gallery', 'Highlight photos', 'Group shots', 'Delivery timeline'],
    price: 'From $300/hr',
    message: WHATSAPP_MESSAGES.eventPackage,
    cta: 'Request Event Quote',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const packagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      serviceCardsRef.current.forEach((card, i) => {
        if (!card) return;
        const img = card.querySelector('.service-img');
        const content = card.querySelector('.service-content');

        gsap.fromTo(img,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );

        gsap.fromTo(content,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1 + 0.3, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });

      packagesRef.current.forEach((pkg, i) => {
        if (!pkg) return;
        gsap.fromTo(pkg,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: pkg, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Services Section - Image-Driven */}
      <section id="services" className="bg-warm-ivory py-32 md:py-44 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-champagne-gold text-xl md:text-2xl mb-4" style={{ fontFamily: '"Allura", cursive' }}>
              Our Expertise
            </p>
            <h2 className="text-deep-black text-4xl md:text-6xl font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
              Photography Services for<br />Every Important Moment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <a
                key={i}
                href={getWhatsAppLink(service.message)}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => { serviceCardsRef.current[i] = el; }}
                className="group relative overflow-hidden block"
                style={{ height: '520px' }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-img absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-champagne-gold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="service-content absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-champagne-gold text-[10px] uppercase tracking-[0.2em] font-body mb-2">
                    {service.subtitle}
                  </p>
                  <h3 className="text-warm-ivory text-2xl md:text-3xl font-medium mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-warm-ivory/70 text-xs font-body leading-relaxed mb-4 max-w-[280px]">
                    {service.description}
                  </p>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
                    <ul className="space-y-1 pt-2">
                      {service.includes.map((item, fi) => (
                        <li key={fi} className="text-warm-ivory/60 text-[10px] uppercase tracking-wide font-body flex items-center gap-2">
                          <span className="text-champagne-gold">&#9679;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-champagne-gold text-[10px] uppercase tracking-[0.15em] font-body mt-4 flex items-center gap-2">
                      <span>Chat on WhatsApp</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="bg-[#090909] py-32 md:py-44 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-champagne-gold text-xl md:text-2xl mb-4" style={{ fontFamily: '"Allura", cursive' }}>
              Investment
            </p>
            <h2 className="text-warm-ivory text-4xl md:text-6xl font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
              Packages Tailored to Your Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg, i) => (
              <div
                key={i}
                ref={(el) => { packagesRef.current[i] = el; }}
                className="group border border-charcoal hover:border-champagne-gold/40 transition-all duration-500 overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <p className="text-champagne-gold text-[10px] uppercase tracking-[0.2em] font-body mb-1">
                    {pkg.price}
                  </p>
                  <h3 className="text-warm-ivory text-xl font-medium mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {pkg.name}
                  </h3>
                  <p className="text-soft-beige/50 text-xs font-body leading-relaxed mb-5">
                    {pkg.description}
                  </p>
                  <ul className="space-y-2 mb-7">
                    {pkg.features.map((feature, fi) => (
                      <li key={fi} className="text-soft-beige/70 text-[11px] font-body flex items-start gap-2">
                        <span className="text-champagne-gold mt-0.5">&#9679;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={getWhatsAppLink(pkg.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-warm-ivory text-deep-black py-3.5 text-xs uppercase tracking-[0.15em] font-body font-medium hover:bg-champagne-gold transition-colors duration-300"
                  >
                    {pkg.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
