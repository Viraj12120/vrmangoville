'use client';

import Image from 'next/image';
import { NAV_LINKS } from '@/lib/data';
import { useExperienceStore } from '@/lib/store';
import Magnetic from './Magnetic';

export default function Navbar() {
  const { isVideoActive, setMenuOpen, startVideo } = useExperienceStore();

  return (
    <header className="absolute top-0 left-0 w-full h-24 md:h-32 z-[100] pointer-events-none">
      
      {/* Left Side: Logo */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-16 pointer-events-auto">
        <Magnetic>
          <Image
            src="/logo.png"
            alt="VR Mangoville Logo"
            width={180}
            height={180}
            className="w-20 md:w-24 lg:w-28 h-auto object-contain cursor-pointer drop-shadow-md transition-transform duration-500 hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </Magnetic>
      </div>

      {/* Center: Desktop Nav Links */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-auto">
        <nav className={`hidden lg:flex justify-center gap-12 items-center transition-colors duration-1000 h-full ${isVideoActive ? 'text-white' : 'text-foreground'}`}>
          {NAV_LINKS.map((item, idx) => (
            <Magnetic key={idx}>
              <button
                onClick={() => document.getElementById(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                className="relative interactive py-2 font-display font-bold text-base tracking-widest px-2"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  window.dispatchEvent(new CustomEvent('magnetize-stick', {
                    detail: { hover: true, x: rect.left, y: rect.bottom, width: rect.width },
                  }));
                }}
                onMouseLeave={() => {
                  window.dispatchEvent(new CustomEvent('magnetize-stick', {
                    detail: { hover: false },
                  }));
                }}
              >
                {item.label}
              </button>
            </Magnetic>
          ))}
          
          <Magnetic>
            <button
              onClick={startVideo}
              className="relative interactive py-2 font-display font-bold text-base tracking-widest px-2"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                window.dispatchEvent(new CustomEvent('magnetize-stick', {
                  detail: { hover: true, x: rect.left, y: rect.bottom, width: rect.width },
                }));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('magnetize-stick', {
                  detail: { hover: false },
                }));
              }}
            >
              EXPERIENCE
            </button>
          </Magnetic>
        </nav>
      </div>

      {/* Right Side: Hamburger (Mobile) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-12 lg:right-16 pointer-events-auto">
        <div className="flex lg:hidden">
          <Magnetic>
            <button
              onClick={() => setMenuOpen(true)}
              className={`flex flex-col gap-1.5 p-2 transition-colors ${isVideoActive ? 'text-white' : 'text-foreground'}`}
            >
              <div className="w-6 h-[2px] bg-current" />
              <div className="w-6 h-[2px] bg-current" />
              <div className="w-4 h-[2px] bg-current self-end" />
            </button>
          </Magnetic>
        </div>
      </div>

    </header>
  );
}
