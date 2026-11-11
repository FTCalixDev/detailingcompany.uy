import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Sparkles,
  SprayCan,
  BadgeCheck,
  Check,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import {
  ServiceItem,
  ServiceIconType,
  VehicleCategory,
  VehicleCategoryItem,
  getCategoryLabel,
  calculateServicePrice,
  formatUyuCurrency,
} from '../utils/bookingLogic';

interface ServicesSectionProps {
  services: ServiceItem[];
  vehicleCategories: VehicleCategoryItem[];
  selectedCategory: VehicleCategory;
  onSelectCategory: (category: VehicleCategory) => void;
  onSelectServiceForBooking: (serviceId: ServiceItem['id']) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICE_ICONS: Record<ServiceIconType, React.ReactNode> = {
  ceramico: <Shield className="w-5 h-5 text-white" strokeWidth={1.6} />,
  pulido: <Sparkles className="w-5 h-5 text-white" strokeWidth={1.6} />,
  interior: <SprayCan className="w-5 h-5 text-white" strokeWidth={1.6} />,
  preventa: <BadgeCheck className="w-5 h-5 text-white" strokeWidth={1.6} />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  vehicleCategories,
  selectedCategory,
  onSelectCategory,
  onSelectServiceForBooking,
}) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const selectedCategoryLabel = getCategoryLabel(selectedCategory, vehicleCategories);

  return (
    <section id="servicios" className="bg-neutral-950 py-16 sm:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        {/* Section Header + Vehicle Size Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-3">
              01 · TRATAMIENTOS Y ESPECIALIDADES
            </p>
            <h2 className="font-display uppercase text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[0.96]">
              SERVICIOS DE ESTÉTICA Y PROTECCIÓN.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light mt-3 max-w-xl">
              Seleccioná el porte de tu vehículo para consultar el arancel estimado en nuestro estudio de Montevideo.
            </p>
          </div>

          {/* Interactive Segmented Control for Vehicle Size */}
          <div
            role="group"
            aria-label="Seleccionar porte del vehículo"
            className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-black border border-white/15 rounded-2xl sm:rounded-full"
          >
            {vehicleCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex-1 sm:flex-initial min-h-[40px] px-3 sm:px-5 py-2 text-xs font-semibold tracking-wide rounded-full transition-colors whitespace-nowrap truncate cursor-pointer ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Clean Architectural Services Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const price = calculateServicePrice(service.id, selectedCategory, services);
            const [leftOffset, topOffset] = (service.imageCropStyle.origin || '-2% -8%').split(' ');
            const isExpanded = expandedServiceId === service.id;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: EASE_OUT_EXPO,
                }}
                className="rounded-2xl bg-neutral-900/75 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-colors"
              >
                <div>
                  {/* Card Top Row: Studio Photo Thumbnail + Metadata + Title */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-18 h-18 rounded-xl overflow-hidden bg-black border border-white/15 shrink-0 relative">
                      <img
                        src={service.imageAsset}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="absolute max-w-none select-none"
                        style={{
                          width: '416%',
                          height: '212%',
                          left: leftOffset,
                          top: topOffset,
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] tracking-[0.16em] uppercase text-neutral-400 tabular-nums">
                          {String(index + 1).padStart(2, '0')} · {service.duration} · {service.warranty}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-black border border-white/15 flex items-center justify-center shrink-0">
                          {SERVICE_ICONS[service.iconType || 'ceramico']}
                        </div>
                      </div>
                      <h3 className="font-display uppercase text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight leading-none">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  {/* Key Checklist Items */}
                  <ul className="space-y-2.5 mb-5 pt-5 border-t border-white/10">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-xs text-neutral-300"
                      >
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Technical Specification Toggle */}
                  <div className="mb-5">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedServiceId(isExpanded ? null : service.id)
                      }
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                    >
                      <span>
                        {isExpanded ? 'Ocultar ficha técnica' : 'Ver alcance técnico del estudio'}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                          className="mt-3 p-4 rounded-xl bg-black/80 border border-white/10 text-xs text-neutral-300 leading-relaxed"
                        >
                          {service.fullDescription}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card Footer: Price + Rounded Pill Button */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-neutral-400">
                      Arancel ({selectedCategoryLabel})
                    </span>
                    <motion.span
                      key={`${service.id}-${selectedCategory}-${price}`}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block font-display text-2xl sm:text-3xl font-bold text-white tabular-nums"
                    >
                      {formatUyuCurrency(price)}{' '}
                      <span className="font-sans text-xs font-normal text-neutral-400">
                        UYU
                      </span>
                    </motion.span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="min-h-[44px] px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-semibold tracking-wide flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Agendar Turno</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
