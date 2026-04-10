'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(".contact-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: container, start: "top 75%" } }
    );

    gsap.fromTo(".contact-right",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: container, start: "top 65%" } }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative flex flex-col w-full min-h-[60svh] lg:min-h-[85vh] bg-[#fdfbf7] overflow-hidden pt-16 md:pt-24 pb-8 md:pb-12 border-t border-stone-200/50">

      <div className="flex-1 max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col">
        {/* Top Section - Large Contact Title */}
        <div className="w-full flex-shrink-0">

          <h2 className="contact-title font-display text-[16vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] font-bold text-stone-900 tracking-tighter">
            Contact
          </h2>
        </div>

        {/* Bottom Section - Right Aligned Info */}
        <div className="w-full flex-1 flex flex-col justify-end items-end mt-24">
          <div className="contact-right flex flex-col w-full md:w-auto items-end text-right">
            <h3 className="font-display text-2xl md:text-4xl font-bold text-stone-900 mb-6">
              Social
            </h3>

            <div className="flex flex-col gap-2 font-sans text-base md:text-lg text-stone-600 font-light mb-16 lg:mb-32">
              <p>E-mail: <a href="mailto:vrmangoville@gmail.com" className="hover:text-saffron transition-colors">vrmangoville@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/919552979224" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors text-stone-800">+91 9552979224</a></p>
            </div>

            {/* Social Links (Typography) */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 lg:justify-end mt-16 md:mt-24 lg:mt-32 pt-8">
              <Link href="https://wa.me/919552979224" target="_blank" rel="noopener noreferrer" className="group relative py-2 overflow-hidden">
                <span className="font-display font-semibold text-lg md:text-xl tracking-widest uppercase text-stone-900 transition-colors hover:text-saffron">
                  WhatsApp
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>

              <Link href="https://www.instagram.com/vr.mangoville?igsh=MXI3czkxY2M0NjBy" target="_blank" rel="noopener noreferrer" className="group relative py-2 overflow-hidden">
                <span className="font-display font-semibold text-lg md:text-xl tracking-widest uppercase text-stone-900 transition-colors hover:text-saffron">
                  Instagram
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>

              <Link href="https://www.facebook.com/profile.php?id=61555271851953&sfnsn=wa" target="_blank" rel="noopener noreferrer" className="group relative py-2 overflow-hidden">
                <span className="font-display font-semibold text-lg md:text-xl tracking-widest uppercase text-stone-900 transition-colors hover:text-saffron">
                  Facebook
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
