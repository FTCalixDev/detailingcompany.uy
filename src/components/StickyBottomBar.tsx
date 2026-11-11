import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, ArrowUpRight, Check } from 'lucide-react';
import {
  ServiceItem,
  StudioInfoConfig,
  buildWhatsAppUrl,
  calculateServicePrice,
  formatUyuCurrency,
} from '../utils/bookingLogic';

interface StickyBottomBarProps {
  services: ServiceItem[];
  studioInfo: StudioInfoConfig;
  defaultCategoryId: string;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onSelectServiceAndScroll: (serviceId: string) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  services,
  studioInfo,
  defaultCategoryId,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onSelectServiceAndScroll,
}) => {
  const directWhatsAppHref = buildWhatsAppUrl({
    phoneInternational: studioInfo.phoneInternational,
  });

  return (
    <>
      {/* Floating Centered White Pill CTA Bar with entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.4, ease: EASE_OUT_EXPO }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[500px] pointer-events-none"
      >
        <button
          type="button"
          onClick={onOpenModal}
          className="pointer-events-auto w-full h-12 sm:h-13 px-6 rounded-full bg-white text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
          <span>Cotizar Vehículo por WhatsApp</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" />
        </button>
      </motion.div>

      {/* Interactive WhatsApp Consultation Sheet / Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-sheet-title"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
              className="bg-neutral-950 border-t sm:border border-white/15 rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
                    alt={studioInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div>
                    <h3
                      id="whatsapp-sheet-title"
                      className="font-display uppercase tracking-wide text-lg font-bold text-white"
                    >
                      Cotización Directa por WhatsApp
                    </h3>
                    <p className="text-xs text-neutral-400 tabular-nums">
                      {studioInfo.phoneDisplay} · {studioInfo.address}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onCloseModal}
                  aria-label="Cerrar ventana de WhatsApp"
                  className="min-h-[40px] min-w-[40px] rounded-full bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-400">
                  Seleccioná un tratamiento para cotizar o agendar:
                </p>
                {services.map((service) => {
                  const price = calculateServicePrice(service.id, defaultCategoryId, services);
                  return (
                    <div
                      key={service.id}
                      className="p-3.5 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{service.title}</p>
                        <p className="text-[11px] text-neutral-400 tabular-nums">
                          Desde {formatUyuCurrency(price)} UYU · {service.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onCloseModal();
                            onSelectServiceAndScroll(service.id);
                          }}
                          className="min-h-[36px] px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Cotizar</span>
                        </button>
                        <a
                          href={buildWhatsAppUrl({
                            serviceTitle: service.title,
                            estimatedPriceUyu: price,
                            phoneInternational: studioInfo.phoneInternational,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[36px] px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold flex items-center gap-1 hover:bg-neutral-200 transition-colors"
                        >
                          <span>WhatsApp</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] py-3 px-5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
                  <span>Abrir Chat Directo ({studioInfo.phoneDisplay})</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
