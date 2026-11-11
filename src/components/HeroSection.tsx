import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Sparkles, Star, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../utils/bookingLogic';

interface HeroSectionProps {
  onExploreServices: () => void;
  onBookNow: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onBookNow,
}) => {
  return (
    <section id="inicio" className="w-full bg-black border-b border-white/10">
      {/* First Viewport Fold */}
      <div className="relative min-h-[calc(100vh-5rem)] w-full flex items-center overflow-hidden">
        {/* Full-bleed atmospheric dark studio automotive backdrop with subtle scale entrance */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-black">
          <motion.img
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.42, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            src="/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png"
            alt=""
            referrerPolicy="no-referrer"
            className="absolute max-w-none select-none grayscale contrast-125"
            style={{
              width: '380%',
              height: '215%',
              left: '-185%',
              top: '-8%',
              objectFit: 'cover',
            }}
          />
          {/* Layered radial and linear dark gradients for dramatic editorial contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/85" />
        </div>

        {/* Main Hero Content Container with bottom clearance for the floating pill */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-24 sm:pb-28">
          {/* Top Unboxed Metadata Kicker Line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE_OUT_EXPO }}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] sm:text-xs tracking-[0.22em] uppercase text-neutral-300 font-medium mb-5"
          >
            <span>MONTEVIDEO, URUGUAY</span>
            <span aria-hidden="true">·</span>
            <span>DETAIL &amp; PROTECTION STUDIO</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">WHATSAPP {STUDIO_INFO.phoneDisplay}</span>
          </motion.div>

          {/* Tall Condensed Uppercase Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_EXPO }}
            className="font-display uppercase text-5xl sm:text-7xl lg:text-[84px] font-bold tracking-[-0.01em] text-white leading-[1.05] sm:leading-[1.0] max-w-4xl mb-6"
          >
            PROTECCIÓN Y ESTÉTICA
            <br />
            AL MÁS ALTO NIVEL.
          </motion.h1>

          {/* Refined Light-Weight Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-xl mb-10"
          >
            Especialistas en Tratamientos Cerámicos, Corrección de Pintura,
            Limpiezas Profundas y Láminas de Seguridad en Montevideo.
          </motion.p>

          {/* Bottom CTA Button + Unboxed Technical Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT_EXPO }}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreServices}
                className="min-h-[50px] px-7 py-3.5 rounded-full bg-neutral-950/90 hover:bg-white text-white hover:text-black border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explorar Tratamientos</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={onBookNow}
                className="min-h-[50px] px-5 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Cotizar Mi Vehículo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 tracking-wide">
              <span>Sellado Cerámico 9H</span>
              <span aria-hidden="true">·</span>
              <span>Corrección de Barniz Multi-Etapa</span>
              <span aria-hidden="true">·</span>
              <span>Garantía hasta 3 Años</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Width Architectural Key Studio Strip directly below the Hero fold */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="w-full border-t border-white/10 bg-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 py-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-white fill-white shrink-0 mt-0.5" />
            <div>
              <p className="font-display uppercase text-lg font-bold text-white tracking-wide tabular-nums leading-none">
                5.0 ★ EN GOOGLE
              </p>
              <p className="text-xs text-neutral-400 mt-1 tabular-nums">
                Más de 300 reseñas verificadas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-display uppercase text-lg font-bold text-white tracking-wide leading-none">
                PROTECCIÓN 9H UV
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Vitrificado contra lluvia ácida y sol
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-display uppercase text-lg font-bold text-white tracking-wide tabular-nums leading-none">
                CABINA HEXAGONAL
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Inspección lumínica de micro-rayas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-display uppercase text-lg font-bold text-white tracking-wide leading-none">
                ESTUDIO MONTEVIDEO
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Duvimioso Terra 2341 · Tres Cruces
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
