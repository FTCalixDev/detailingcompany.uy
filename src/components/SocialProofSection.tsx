import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle2, ChevronDown } from 'lucide-react';
import { StudioInfoConfig, FaqItem } from '../utils/bookingLogic';

interface SocialProofSectionProps {
  studioInfo: StudioInfoConfig;
  faqs: FaqItem[];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TESTIMONIALS = [
  {
    id: 'rev-1',
    author: 'Sebastián Méndez',
    vehicle: 'Volkswagen Golf GTI · Montevideo',
    service: 'Tratamiento Cerámico 9H',
    quote:
      'Llevé el auto con bastantes marcas de lavadero. Después del pulido y el sellado cerámico quedó con un brillo superior a cuando salió 0km. Atención impecable en Duvimioso Terra.',
  },
  {
    id: 'rev-2',
    author: 'Camila Echeverría',
    vehicle: 'Peugeot 2008 Allure · Pocitos',
    service: 'Servicio Pre-Venta ($9.500)',
    quote:
      'Hice el servicio pre-venta completo (interior, tapizados y abrillantado exterior) y vendí la camioneta en 4 días al primer interesado que vino a verla.',
  },
  {
    id: 'rev-3',
    author: 'Gonzalo Pereyra',
    vehicle: 'BMW X1 sDrive · Carrasco',
    service: 'Limpieza Interior + Cerámico',
    quote:
      'Profesionalismo total. Cumplieron los tiempos pactados, me enviaron videos del proceso bajo las luces del estudio y el efecto hidrofóbico con la lluvia es increíble.',
  },
];

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({
  studioInfo,
  faqs,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="resenas" className="bg-black py-16 sm:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        {/* Trust & Certification Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="rounded-2xl bg-neutral-950 border border-white/10 p-6 sm:p-10 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-3">
                <span>02 · CERTIFICACIONES Y RESPALDO</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">CALIFICACIÓN {studioInfo.googleRating} / 5.0</span>
              </div>

              <div
                aria-label="Calificación 5 de 5 estrellas"
                className="flex items-center gap-1.5 mb-3"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-white fill-white" />
                ))}
              </div>

              <h2 className="font-display uppercase text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[0.96]">
                {studioInfo.googleBannerTitle}
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-light mt-3 max-w-2xl">
                Estudio verificado con más de {studioInfo.instagramFollowers} seguidores en{' '}
                <span className="text-white font-normal">{studioInfo.instagramHandle}</span>{' '}
                y estándares de iluminación hexagonal para control de calidad en Montevideo.
              </p>
            </div>

            {/* Verified Instagram Profile Lockup */}
            <div className="flex items-center gap-4 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/10 shrink-0">
              <img
                src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
                alt={studioInfo.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border border-white/20 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-white">
                    {studioInfo.instagramHandle.replace('@', '')}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                </div>
                <p className="text-xs text-neutral-400 mt-1 tabular-nums">
                  {studioInfo.instagramFollowers} seguidores · 84 publicaciones · Montevideo
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attributable Client Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TESTIMONIALS.map((item, idx) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
              className="rounded-2xl bg-neutral-950/80 border border-white/10 p-6 flex flex-col justify-between hover:border-white/25 transition-colors"
            >
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                “{item.quote}”
              </p>
              <footer className="pt-4 border-t border-white/10 text-xs">
                <p className="font-semibold text-white uppercase tracking-wider">
                  {item.author}
                </p>
                <p className="text-neutral-400 mt-1">
                  {item.vehicle} · {item.service}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Interactive Preguntas Frecuentes (FAQ) Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="pt-10 border-t border-white/10"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-6">
            PREGUNTAS FRECUENTES DE CLIENTES
          </p>
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/50 transition-colors cursor-pointer"
                  >
                    <span className="font-display uppercase text-lg sm:text-xl font-bold text-white tracking-wide">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                        className="px-5 sm:px-6 pb-6 text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5 pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
