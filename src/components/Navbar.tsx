import React from 'react';
import { motion } from 'motion/react';
import { STUDIO_INFO } from '../utils/bookingLogic';

interface NavbarProps {
  onPrimaryAction: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPrimaryAction }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 h-16 sm:h-20 bg-black/85 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto h-full px-5 sm:px-10 lg:px-14 flex items-center justify-between gap-8">
        {/* Zone 1: Official Detailing Company Logo + Condensed Bold Brand Wordmark */}
        <a
          href="#inicio"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-white"
        >
          <img
            src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
            alt="Logo oficial Detailing Company"
            referrerPolicy="no-referrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/25 group-hover:scale-105 transition-transform duration-200 shrink-0"
          />
          <span className="font-display text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-white">
            {STUDIO_INFO.name}
          </span>
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-normal text-neutral-300"
        >
          <a
            href="#servicios"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
          >
            Servicios
          </a>
          <a
            href="#resenas"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
          >
            Certificaciones
          </a>
          <a
            href="#trabajos"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
          >
            Portafolio
          </a>
          <a
            href="#agendar"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all"
          >
            Cotizador
          </a>
        </nav>

        {/* Zone 3: Solid White Pill CTA Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="min-h-[40px] px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold tracking-wider uppercase hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            AGENDAR
          </button>
        </div>
      </div>
    </motion.header>
  );
};
