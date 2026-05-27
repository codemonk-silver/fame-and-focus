import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpotlightText() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const text =
      "Light is the language of memory. We don't just take photos; we hold time still, preserving the raw emotion and quiet beauty of your most authentic moments.";
    const words = text.split(' ');

    // Build word spans
    section.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      section.appendChild(span);
      if (i < words.length - 1) {
        section.appendChild(document.createTextNode(' '));
      }
    });

    const wordEls = section.querySelectorAll('.word');

    gsap.set(wordEls, { opacity: 0.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: false,
      },
    });

    wordEls.forEach((word, index) => {
      tl.to(
        word,
        {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.out',
        },
        index * 0.05
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section className="bg-[#090909] py-40 md:py-52 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        <p
          className="font-display text-warm-ivory text-2xl md:text-3xl lg:text-4xl leading-relaxed font-normal"
          ref={sectionRef}
          style={{ fontFamily: '"Playfair Display", serif', lineHeight: 1.7 }}
        >
          Light is the language of memory. We don&apos;t just take photos; we
          hold time still, preserving the raw emotion and quiet beauty of your
          most authentic moments.
        </p>
      </div>
    </section>
  );
}
