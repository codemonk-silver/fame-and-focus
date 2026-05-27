import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../config/contact';

gsap.registerPlugin(ScrollTrigger);

const shootTypes = [
  'Portrait Photography',
  'Event Photography',
  'Brand Photography',
  'Product Photography',
  'Fashion & Beauty Photography',
  'Corporate Photography',
  'Graduation Shoot',
  'Wedding Coverage',
  'Birthday Shoot',
  'Family Portrait',
];

const budgetRanges = [
  'Below $200',
  '$200 - $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500+',
];

export default function BookYourShoot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootType: '',
    date: '',
    location: '',
    outfits: '',
    budget: '',
    notes: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector('.book-content'),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' }
      }
    );

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hi Frame & Focus Studio! I'd like to book a photography session.

*Name:* ${formData.name || 'Not provided'}
*Phone:* ${formData.phone || 'Not provided'}
*Email:* ${formData.email || 'Not provided'}
*Shoot Type:* ${formData.shootType || 'Not selected'}
*Preferred Date:* ${formData.date || 'Not specified'}
*Location:* ${formData.location || 'Not specified'}
*Outfits/Products:* ${formData.outfits || 'Not specified'}
*Budget:* ${formData.budget || 'Not specified'}
*Notes:* ${formData.notes || 'None'}

Please let me know your availability. Thank you!`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section id="book" ref={sectionRef} className="bg-[#090909] py-32 md:py-44 px-6 md:px-12">
      <div className="book-content max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-champagne-gold text-xl md:text-2xl mb-4" style={{ fontFamily: '"Allura", cursive' }}>
            Booking
          </p>
          <h2 className="text-warm-ivory text-4xl md:text-6xl font-medium mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
            Book Your Shoot
          </h2>
          <p className="text-soft-beige/60 text-sm font-body max-w-lg mx-auto">
            Fill out the form and we&apos;ll redirect you to WhatsApp to complete your booking.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="border border-charcoal p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Name *</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Phone Number *</label>
              <input
                type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Shoot Type *</label>
              <select name="shootType" required value={formData.shootType} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select shoot type</option>
                {shootTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Preferred Date</label>
              <input
                type="date" name="date" value={formData.date} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Preferred Location</label>
              <input
                type="text" name="location" value={formData.location} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors"
                placeholder="Studio / Outdoor / Your location"
              />
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Outfits / Products</label>
              <input
                type="number" name="outfits" min={1} value={formData.outfits} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Budget Range</label>
              <select name="budget" value={formData.budget} onChange={handleChange}
                className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select budget</option>
                {budgetRanges.map((range, i) => (
                  <option key={i} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Extra Notes</label>
            <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange}
              className="w-full bg-charcoal border border-charcoal text-warm-ivory px-4 py-3 text-sm font-body focus:outline-none focus:border-champagne-gold transition-colors resize-none"
              placeholder="Tell us about your vision, inspiration, or any special requests..."
            />
          </div>

          <div className="mb-8">
            <label className="block text-soft-beige/60 text-[10px] uppercase tracking-[0.15em] font-body mb-2">Upload Inspiration Image</label>
            <div className="border border-dashed border-charcoal px-4 py-6 text-center cursor-pointer hover:border-champagne-gold/50 transition-colors">
              <p className="text-soft-beige/40 text-xs font-body">Drag and drop or click to upload</p>
              <p className="text-soft-beige/20 text-[10px] font-body mt-1">You can also share inspiration images on WhatsApp after submitting</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-warm-ivory text-deep-black py-4 text-xs uppercase tracking-[0.15em] font-body font-medium hover:bg-champagne-gold transition-colors duration-300 flex items-center justify-center gap-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Send via WhatsApp
            </button>
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-warm-ivory/30 text-warm-ivory py-4 text-xs uppercase tracking-[0.15em] font-body font-medium hover:border-champagne-gold hover:text-champagne-gold transition-colors duration-300 flex items-center justify-center gap-3 text-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Quick Chat on WhatsApp
            </a>
          </div>

          <p className="text-soft-beige/30 text-[10px] font-body text-center mt-6">
            You can also DM us on Instagram for faster responses
          </p>
        </form>
      </div>
    </section>
  );
}
