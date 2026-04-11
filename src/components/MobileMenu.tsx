'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { useExperienceStore } from '@/lib/store';
import { NAV_LINKS } from '@/lib/data';
import Magnetic from './Magnetic';

export default function MobileMenu() {
  const { isMenuOpen, setMenuOpen, startVideo } = useExperienceStore();
  const container = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(container.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1.2,
        ease: 'power4.inOut'
      });
      
      gsap.fromTo(menuItemsRef.current?.children || [], 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 1, 
          ease: 'elastic.out(1, 0.5)', 
          delay: 0.4 
        }
      );
    } else {
      gsap.to(container.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, { dependencies: [isMenuOpen], scope: container });

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      ref={container}
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center pointer-events-auto"
      style={{ clipPath: 'circle(0% at 100% 0%)' }}
    >
      {/* Close button */}
      <div className="absolute top-8 right-8">
        <Magnetic>
          <button 
            onClick={() => setMenuOpen(false)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </Magnetic>
      </div>

      <nav ref={menuItemsRef} className="flex flex-col items-center gap-8">
        {NAV_LINKS.map((link) => (
          <Magnetic key={link.label}>
            <button 
              onClick={() => handleLinkClick(link.href)}
              className="text-4xl md:text-6xl font-display font-bold text-stone-900 hover:text-saffron transition-colors"
            >
              {link.label}
            </button>
          </Magnetic>
        ))}
        
        <Magnetic>
          <button 
            onClick={() => {
              setMenuOpen(false);
              setTimeout(() => { startVideo() }, 600);
            }}
            className="text-4xl md:text-6xl font-display font-bold text-stone-900 hover:text-saffron transition-colors mt-4"
          >
            EXPERIENCE
          </button>
        </Magnetic>
      </nav>

      {/* Social Links */}
      <div className="absolute bottom-12 flex gap-8">
        <a href="https://www.instagram.com/vr.mangoville?igsh=MXI3czkxY2M0NjBy" target="_blank" rel="noopener noreferrer" className="font-display font-medium text-stone-400 hover:text-saffron tracking-widest text-sm transition-colors">
          INSTAGRAM
        </a>
        <a href="https://www.facebook.com/profile.php?id=61555271851953&sfnsn=wa" target="_blank" rel="noopener noreferrer" className="font-display font-medium text-stone-400 hover:text-saffron tracking-widest text-sm transition-colors">
          FACEBOOK
        </a>
      </div>
    </div>
  );
}
