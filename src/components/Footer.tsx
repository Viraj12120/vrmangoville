'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Magnetic from './Magnetic';
import { FOOTER_QUOTE } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reveal animation for massive typography
    gsap.fromTo(
      textRef.current?.querySelectorAll('.char') || [],
      { y: 150, opacity: 0, rotate: 10 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} className="relative w-full min-h-[70vh] bg-white flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 overflow-hidden z-0">

      {/* Top Section: Back to Top */}
      <div className="w-full flex flex-row justify-end items-center relative z-10">
        <Magnetic>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-stone-200 hover:border-saffron hover:bg-saffron transition-all duration-500 ease-out flex-shrink-0"
          >
            <span className="font-sans text-xs md:text-sm text-stone-500 font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-500">
              Top
            </span>
          </button>
        </Magnetic>
      </div>

      {/* Middle Links */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 mt-32 mb-24 px-8 relative z-10">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-stone-400 font-sans text-xs font-bold uppercase tracking-widest mb-2">Location</span>
          <p className="text-stone-600 font-sans text-sm md:text-base">Gujarat, India</p>
          <p className="text-stone-600 font-sans text-sm md:text-base">Organic Orchards</p>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-stone-400 font-sans text-xs font-bold uppercase tracking-widest mb-2">Connect</span>
          <a href="#" className="text-stone-600 font-sans text-sm md:text-base hover:text-saffron transition-colors">Instagram</a>
          <a href="#" className="text-stone-600 font-sans text-sm md:text-base hover:text-saffron transition-colors">Facebook</a>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-stone-400 font-sans text-xs font-bold uppercase tracking-widest mb-2">Legal</span>
          <a href="#" className="text-stone-600 font-sans text-sm md:text-base hover:text-saffron transition-colors">Privacy Policy</a>
          <a href="#" className="text-stone-600 font-sans text-sm md:text-base hover:text-saffron transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Massive Bottom Text */}
      <div className="w-full mt-auto relative z-10 flex flex-col items-center">
        <h1
          ref={textRef}
          className="font-display text-[14vw] leading-[0.8] font-bold text-stone-900 tracking-tighter uppercase w-full text-center"
        >
          {"MANGOVILLE".split('').map((char, i) => (
            <span key={i} className="char inline-block">{char}</span>
          ))}
        </h1>

        <div className="w-full flex justify-between items-center border-t border-stone-200 mt-8 pt-6">
          <p className="text-stone-400 font-sans text-xs md:text-sm">&copy; {new Date().getFullYear()} VR Mangoville. All rights reserved.</p>
          <p className="text-stone-400 font-sans text-xs md:text-sm hidden md:block">Handcrafted with care.</p>
        </div>
      </div>

    </footer>
  );
}
