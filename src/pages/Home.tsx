import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '../sections/Navigation';
import ScatteredCollage from '../sections/ScatteredCollage';
import SpotlightText from '../sections/SpotlightText';
import PortfolioShowcase from '../sections/PortfolioShowcase';
import FloatingAlbums from '../sections/FloatingAlbums';
import Services from '../sections/Services';
import TactileMemory from '../sections/TactileMemory';
import WhyChooseUs from '../sections/WhyChooseUs';
import Gallery from '../sections/Gallery';
import Industries from '../sections/Industries';
import BookYourShoot from '../sections/BookYourShoot';
import Footer from '../sections/Footer';
import CustomCursor from '../sections/CustomCursor';
import FloatingWhatsApp from '../sections/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.inOut' });
    return () => { lenis.destroy(); };
  }, []);

  return (
    <>
      <CustomCursor />
      <FloatingWhatsApp />
      <Navigation />
      <main ref={mainRef} style={{ opacity: 0 }}>
        {/* Section 1: Hero - Draggable polaroid collage */}
        <section className="relative" style={{ height: '100vh' }}>
          <ScatteredCollage />
        </section>

        {/* Section 2: Spotlight text reveal */}
        <SpotlightText />

        {/* Section 3: Horizontal scrolling portfolio showcase */}
        <PortfolioShowcase />

        {/* Section 4: 3D floating albums */}
        <FloatingAlbums />

        {/* Section 5: Services & Packages - WhatsApp linked */}
        <Services />

        {/* Section 6: Tactile memory interaction */}
        <TactileMemory />

        {/* Section 7: Why us + Process + Testimonials */}
        <WhyChooseUs />

        {/* Section 8: Masonry gallery with filters */}
        <Gallery />

        {/* Section 9: Image-driven industries grid */}
        <Industries />

        {/* Section 10: Booking form → WhatsApp */}
        <BookYourShoot />

        {/* Section 11: Footer with image strip + WhatsApp/IG */}
        <Footer />
      </main>
    </>
  );
}
