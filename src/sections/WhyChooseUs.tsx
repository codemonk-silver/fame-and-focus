import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const points = [
  { icon: '✦', title: 'Clean professional editing', desc: 'Every image hand-retouched with precision' },
  { icon: '✦', title: 'Fast photo delivery', desc: 'Online gallery within 5-7 business days' },
  { icon: '✦', title: 'Creative posing guidance', desc: 'We direct you every step of the way' },
  { icon: '✦', title: 'Premium lighting setup', desc: 'Studio-quality light, anywhere' },
  { icon: '✦', title: 'High-resolution images', desc: 'Print-ready files in full resolution' },
  { icon: '✦', title: 'Website & social ready', desc: 'Sized perfectly for every platform' },
  { icon: '✦', title: 'Friendly booking process', desc: 'Simple forms, quick responses' },
  { icon: '✦', title: 'Clear pricing & packages', desc: 'No hidden fees, ever' },
];

const processSteps = [
  { num: '01', title: 'Choose Your Shoot', desc: 'Select portrait, event, product, brand, or fashion photography.' },
  { num: '02', title: 'Book Your Date', desc: 'Send your details through the booking form or WhatsApp.' },
  { num: '03', title: 'Plan the Look', desc: 'We discuss outfits, location, mood, poses, and inspiration.' },
  { num: '04', title: 'Shoot Day', desc: 'You come ready, and we guide you through the process.' },
  { num: '05', title: 'Receive Your Photos', desc: 'Edited photos delivered through a clean online gallery.' },
];

const testimonials = [
  { text: 'The photos came out so clean. I didn\'t even know how to pose, but the direction made everything easy.', client: 'Birthday Client', image: '/images/birthday_01.jpg' },
  { text: 'Our product pictures looked more professional and helped us update our online store.', client: 'Skincare Brand', image: '/images/skincare_01.jpg' },
  { text: 'The event coverage was sharp, clean, and delivered faster than expected.', client: 'Event Planner', image: '/images/event_01.jpg' },
  { text: 'My graduation shoot looked premium. The editing was natural and beautiful.', client: 'Graduate 2024', image: '/images/graduation_01.jpg' },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Points
      const items = document.querySelectorAll('.point-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' }
          }
        );
      });

      // Process
      const steps = document.querySelectorAll('.process-step');
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%' }
          }
        );
      });

      // Testimonials
      const cards = document.querySelectorAll('.testimonial-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Why Choose Us — Image + Text Layout */}
      <section className="bg-warm-ivory py-32 md:py-44">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Large image */}
            <div className="relative overflow-hidden group" style={{ height: '650px' }}>
              <img
                src="/images/couple_01.jpg"
                alt="Frame & Focus Studio"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              {/* Decorative frame */}
              <div className="absolute inset-6 border border-warm-ivory/30 pointer-events-none" />
              <div className="absolute top-8 left-8 text-warm-ivory/80 text-[10px] uppercase tracking-[0.2em] font-body">
                Est. 2019
              </div>
              <div
                className="absolute bottom-8 right-8 text-warm-ivory text-3xl"
                style={{ fontFamily: '"Allura", cursive' }}
              >
                Frame & Focus
              </div>
            </div>

            {/* Content */}
            <div>
              <p
                className="text-champagne-gold text-xl mb-4"
                style={{ fontFamily: '"Allura", cursive' }}
              >
                Why Choose Us
              </p>
              <h2
                className="text-deep-black text-4xl md:text-5xl font-medium leading-tight mb-10"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                More Than Pictures —<br />A Complete Visual Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {points.map((point, i) => (
                  <div key={i} className="point-item group">
                    <div className="flex items-start gap-3">
                      <span className="text-champagne-gold text-xs mt-0.5">{point.icon}</span>
                      <div>
                        <p className="text-deep-black text-sm font-body font-medium mb-1">{point.title}</p>
                        <p className="text-charcoal/60 text-[11px] font-body">{point.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Dark */}
      <section className="bg-[#090909] py-32 md:py-44 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p
              className="text-champagne-gold text-xl mb-4"
              style={{ fontFamily: '"Allura", cursive' }}
            >
              Simple & Seamless
            </p>
            <h2
              className="text-warm-ivory text-4xl md:text-6xl font-medium"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="process-step text-center group">
                <span
                  className="text-champagne-gold/20 text-6xl md:text-7xl font-display block mb-6 group-hover:text-champagne-gold/40 transition-colors duration-500"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-warm-ivory text-lg font-medium mb-3"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-soft-beige/50 text-xs font-body leading-relaxed">
                  {step.desc}
                </p>
                {i < 4 && (
                  <div className="hidden md:block absolute right-0 top-1/2 w-px h-12 bg-charcoal" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Cards with images */}
      <section className="bg-warm-ivory py-32 md:py-44 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p
              className="text-champagne-gold text-xl mb-4"
              style={{ fontFamily: '"Allura", cursive' }}
            >
              Client Stories
            </p>
            <h2
              className="text-deep-black text-4xl md:text-6xl font-medium"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              What Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card group overflow-hidden"
              >
                {/* Image header */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.client}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Quote */}
                <div className="p-7 border border-t-0 border-soft-beige">
                  <p
                    className="text-charcoal text-sm leading-relaxed italic mb-6"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-champagne-gold" />
                    <p className="text-soft-beige text-[10px] uppercase tracking-[0.15em] font-body">
                      {t.client}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
