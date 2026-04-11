'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fade in the messengers card when the section reaches the bottom of the viewport
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container,
          start: "top 50%",
          toggleActions: "play none none reverse",
          refreshPriority: -2
        }
      }
    );

    // Stagger in the central title
    gsap.fromTo(".title-part",
      { y: 50, opacity: 0, rotate: -5 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          refreshPriority: -2
        }
      }
    );

    // Stagger in the booking text words
    gsap.fromTo(".booking-word",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          refreshPriority: -2
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center">

      {/* Top Right Booking CTA */}
      <p className="absolute top-8 right-8 md:top-12 md:right-12 z-50 text-white font-sans text-xs md:text-sm font-bold tracking-widest uppercase">
        {"For booking dm us on WhatsApp".split(' ').map((word, i) => (
          <span key={i} className="booking-word inline-block">{word}&nbsp;</span>
        ))}
      </p>

      {/* Central Titles */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center pointer-events-none -mt-32 px-4">
        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-widest uppercase text-center w-full">
          {"JOIN US AT".split(' ').map((word, i) => (
            <span key={i} className="title-part inline-block">{word}&nbsp;</span>
          ))}
        </h2>
      </div>

      {/* Bottom Popup Card */}
      <div
        ref={cardRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] md:w-full max-w-4xl bg-white rounded-t-[40px] px-6 py-12 md:px-16 md:py-16 shadow-2xl flex flex-col items-center z-20"
      >
        <h3 className="font-display text-3xl md:text-5xl font-bold text-stone-900 text-center uppercase tracking-tight leading-tight">
          Messengers <br />
          <span className="font-light text-xl md:text-3xl mt-2 block opacity-80">And Social Media Links</span>
        </h3>

        <div className="flex items-center justify-center gap-6 md:gap-12 mt-10 md:mt-14 w-full">
          {/* WhatsApp */}
          <Link href="https://wa.me/919552979224" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-stone-900 rounded-full flex items-center justify-center text-white group-hover:bg-saffron group-hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </Link>

          {/* Facebook */}
          <Link href="https://www.facebook.com/profile.php?id=61555271851953&sfnsn=wa" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-stone-900 rounded-full flex items-center justify-center text-white group-hover:bg-saffron group-hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
          </Link>

          {/* Instagram */}
          <Link href="https://www.instagram.com/vr.mangoville?igsh=MXI3czkxY2M0NjBy" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-stone-900 rounded-full flex items-center justify-center text-white group-hover:bg-saffron group-hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
