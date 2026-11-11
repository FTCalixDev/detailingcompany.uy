import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { STUDIO_INFO } from '../utils/bookingLogic';

interface PortfolioWork {
  id: string;
  vehicle: string;
  serviceCategory: 'ceramico' | 'pulido' | 'interior';
  serviceName: string;
  outcome: string;
  assetPath: string;
  leftOffset: string;
  topOffset: string;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 'peugeot-208-gt',
    vehicle: 'Peugeot 208 GT Negro',
    serviceCategory: 'ceramico',
    serviceName: 'Tratamiento Cerámico 9H',
    outcome: 'Corrección de barniz + sellado vitrificado 36 meses con efecto espejo profundo.',
    assetPath: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    leftOffset: '-310%',
    topOffset: '-8%',
  },
  {
    id: 'golf-gti',
    vehicle: 'Volkswagen Golf GTI',
    serviceCategory: 'pulido',
    serviceName: 'Pulido de Pintura Multi-Etapa',
    outcome: 'Eliminación del 95% de swirls bajo iluminación hexagonal y sellado sintético.',
    assetPath: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    leftOffset: '-2%',
    topOffset: '-8%',
  },
  {
    id: 'bmw-x1',
    vehicle: 'BMW X1 Alpine White',
    serviceCategory: 'ceramico',
    serviceName: 'Tratamiento Cerámico Integral',
    outcome: 'Descontaminado férrico y protección contra rayos UV, lluvia ácida y suciedad.',
    assetPath: '/assets/aistudio/_98C8490D-A956-4363-B46B-8C3DCD321928__8e02e82e.png',
    leftOffset: '-206%',
    topOffset: '-8%',
  },
  {
    id: 'mini-countryman',
    vehicle: 'MINI Cooper S Countryman',
    serviceCategory: 'interior',
    serviceName: 'Detailing Interior + Abrillantado',
    outcome: 'Higienización al vapor de cabina, nutrición de cueros y sellado exterior.',
    assetPath: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    leftOffset: '-206%',
    topOffset: '-106%',
  },
];

const STUDIO_STEPS = [
  {
    step: '01',
    title: 'Descontaminado Químico y Férrico',
    detail: 'Limpieza profunda de poros del barniz, llantas y emblemas con pH neutro y Clay Bar.',
  },
  {
    step: '02',
    title: 'Inspección y Corrección Hexagonal',
    detail: 'Nivelación micrométrica de la laca para erradicar swirls, hologramas y oxidación.',
  },
  {
    step: '03',
    title: 'Vitrificado Cerámico 9H / Interior',
    detail: 'Aplicación en cabina controlada de recubrimiento cristalino UV e hidrofobia extrema.',
  },
  {
    step: '04',
    title: 'Curado y Entrega Protocolizada',
    detail: 'Control final bajo túnel de luz y guía de mantenimiento para conservar el brillo.',
  },
];

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ceramico' | 'pulido' | 'interior'>('all');
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);

  const filteredWorks =
    activeFilter === 'all'
      ? PORTFOLIO_WORKS
      : PORTFOLIO_WORKS.filter((item) => item.serviceCategory === activeFilter);

  return (
    <section id="trabajos" className="bg-neutral-950 py-16 sm:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-3">
              03 · PORTAFOLIO DEL ESTUDIO
            </p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[0.96]">
              RESULTADOS REALES EN MONTEVIDEO.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light mt-3 max-w-xl">
              Trabajos documentados en nuestro estudio de {STUDIO_INFO.address.split(',')[0]}.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="group"
            aria-label="Filtrar trabajos por especialidad"
            className="w-full sm:w-auto grid grid-cols-4 gap-1 p-1 bg-black border border-white/15 rounded-full"
          >
            {[
              { id: 'all', label: 'Todos' },
              { id: 'ceramico', label: 'Cerámico' },
              { id: 'pulido', label: 'Pulido' },
              { id: 'interior', label: 'Interior' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`min-h-[38px] px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap truncate cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid with Animated Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                className="rounded-2xl bg-neutral-900/75 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-white/25 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={work.assetPath}
                    alt={`${work.vehicle} — ${work.serviceName}`}
                    referrerPolicy="no-referrer"
                    className="absolute max-w-none select-none group-hover:scale-[1.03] transition-transform duration-500"
                    style={{
                      width: '416%',
                      height: '212%',
                      left: work.leftOffset,
                      top: work.topOffset,
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedWork(work)}
                    aria-label={`Ver detalle de ${work.vehicle}`}
                    className="absolute bottom-4 right-4 min-h-[38px] px-4 py-2 rounded-full bg-black/85 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Inspeccionar</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1.5">
                    {work.serviceName} · {STUDIO_INFO.instagramHandle}
                  </p>
                  <h3 className="font-display uppercase text-2xl font-bold text-white tracking-tight">
                    {work.vehicle}
                  </h3>
                  <p className="text-sm text-neutral-400 font-light mt-2 leading-relaxed">
                    {work.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4-Step Studio Protocol Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="pt-10 border-t border-white/10"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-6">
            PROTOCOLO DE TRABAJO EN ESTUDIO
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-black/60 border border-white/10"
              >
                <span className="font-display text-2xl font-bold text-white/50 tabular-nums">
                  {item.step}.
                </span>
                <h3 className="font-display uppercase text-lg font-bold text-white mt-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Modal for inspecting studio portfolio */}
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-modal-title"
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                className="bg-neutral-950 border border-white/15 rounded-2xl max-w-2xl w-full overflow-hidden p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400">
                      {selectedWork.serviceName}
                    </p>
                    <h3
                      id="portfolio-modal-title"
                      className="font-display uppercase text-2xl font-bold text-white mt-1"
                    >
                      {selectedWork.vehicle}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedWork(null)}
                    aria-label="Cerrar vista de detalle"
                    className="min-h-[40px] min-w-[40px] rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden bg-black border border-white/10 mb-4 max-h-[380px]">
                  <img
                    src={selectedWork.assetPath}
                    alt={`Galería completa de ${selectedWork.vehicle}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                  {selectedWork.outcome}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-neutral-400">
                  <span>Estudio: {STUDIO_INFO.address}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedWork(null)}
                    className="px-5 py-2 rounded-full bg-white text-black font-semibold cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
