import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  Sliders,
  Car,
  Layers,
  Building2,
} from 'lucide-react';
import {
  StudioConfig,
  ServiceItem,
  ServiceIconType,
  PortfolioWork,
  StudioAddon,
  FaqItem,
  formatUyuCurrency,
} from '../utils/bookingLogic';

interface SecretAdminModalProps {
  isOpen: boolean;
  config: StudioConfig;
  onUpdateConfig: (nextConfig: StudioConfig) => void;
  onResetConfig: () => void;
  onClose: () => void;
}

type AdminTab = 'services' | 'categories' | 'portfolio' | 'studio';

const STUDIO_IMAGE_PRESETS = [
  {
    label: 'Peugeot 208 GT Negro (Estudio)',
    assetPath: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    origin: '-308% -8%',
    leftOffset: '-310%',
    topOffset: '-8%',
  },
  {
    label: 'VW Golf GTI Azul (Estudio)',
    assetPath: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    origin: '-2% -8%',
    leftOffset: '-2%',
    topOffset: '-8%',
  },
  {
    label: 'BMW X1 Blanco (Estudio)',
    assetPath: '/assets/aistudio/_98C8490D-A956-4363-B46B-8C3DCD321928__8e02e82e.png',
    origin: '-205% -8%',
    leftOffset: '-206%',
    topOffset: '-8%',
  },
  {
    label: 'Peugeot 2008 Gris (Estudio)',
    assetPath: '/assets/aistudio/_98C8490D-A956-4363-B46B-8C3DCD321928__8e02e82e.png',
    origin: '-308% -8%',
    leftOffset: '-308%',
    topOffset: '-8%',
  },
  {
    label: 'MINI Countryman Plata (Estudio)',
    assetPath: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    origin: '-206% -106%',
    leftOffset: '-206%',
    topOffset: '-106%',
  },
];

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({
  isOpen,
  config,
  onUpdateConfig,
  onResetConfig,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('services');
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const triggerSavedNotice = () => {
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 1800);
  };

  // --- Services Handlers ---
  const handleServiceChange = (
    serviceId: string,
    patch: Partial<ServiceItem>
  ) => {
    const nextServices = config.services.map((s) =>
      s.id === serviceId ? { ...s, ...patch } : s
    );
    onUpdateConfig({ ...config, services: nextServices });
  };

  const handleServicePriceChange = (
    serviceId: string,
    categoryId: string,
    newPrice: number
  ) => {
    const nextServices = config.services.map((s) => {
      if (s.id !== serviceId) return s;
      return {
        ...s,
        basePriceUyu: {
          ...s.basePriceUyu,
          [categoryId]: Number.isNaN(newPrice) ? 0 : Math.max(0, newPrice),
        },
      };
    });
    onUpdateConfig({ ...config, services: nextServices });
  };

  const handleAddService = () => {
    const defaultPrices: Record<string, number> = {};
    config.vehicleCategories.forEach((cat, idx) => {
      defaultPrices[cat.id] = 7500 + idx * 1500;
    });

    const newService: ServiceItem = {
      id: `servicio-${Date.now()}`,
      iconType: 'ceramico',
      title: 'Nuevo Tratamiento Especial',
      shortDescription:
        'Descripción breve del tratamiento para mostrar en la tarjeta principal.',
      fullDescription:
        'Especificación técnica detallada del proceso realizado en nuestro estudio de Montevideo.',
      duration: '1 a 2 días en estudio',
      warranty: 'Garantía certificada',
      basePriceUyu: defaultPrices,
      features: [
        'Descontaminado completo de superficie',
        'Aplicación profesional en cabina controlada',
        'Inspección final bajo luces hexagonales',
      ],
      imageAsset: STUDIO_IMAGE_PRESETS[0].assetPath,
      imageCropStyle: {
        objectPosition: 'center',
        scale: 1,
        origin: STUDIO_IMAGE_PRESETS[0].origin,
      },
    };

    onUpdateConfig({
      ...config,
      services: [...config.services, newService],
    });
    triggerSavedNotice();
  };

  const handleDeleteService = (serviceId: string) => {
    if (config.services.length <= 1) return;
    onUpdateConfig({
      ...config,
      services: config.services.filter((s) => s.id !== serviceId),
    });
    triggerSavedNotice();
  };

  // --- Vehicle Categories & Addons Handlers ---
  const handleCategoryLabelChange = (catId: string, label: string) => {
    const nextCategories = config.vehicleCategories.map((c) =>
      c.id === catId ? { ...c, label } : c
    );
    onUpdateConfig({ ...config, vehicleCategories: nextCategories });
  };

  const handleAddCategory = () => {
    const clean = newCategoryLabel.trim();
    if (!clean) return;
    const newId = `cat_${Date.now()}`;
    const nextCategories = [...config.vehicleCategories, { id: newId, label: clean }];
    const nextServices = config.services.map((s) => {
      const fallbackPrice = Object.values(s.basePriceUyu)[0] ?? 10000;
      return {
        ...s,
        basePriceUyu: {
          ...s.basePriceUyu,
          [newId]: fallbackPrice,
        },
      };
    });
    onUpdateConfig({
      ...config,
      vehicleCategories: nextCategories,
      services: nextServices,
    });
    setNewCategoryLabel('');
    triggerSavedNotice();
  };

  const handleDeleteCategory = (catId: string) => {
    if (config.vehicleCategories.length <= 1) return;
    const nextCategories = config.vehicleCategories.filter((c) => c.id !== catId);
    onUpdateConfig({
      ...config,
      vehicleCategories: nextCategories,
    });
    triggerSavedNotice();
  };

  const handleAddonChange = (addonId: string, patch: Partial<StudioAddon>) => {
    const nextAddons = config.addons.map((a) =>
      a.id === addonId ? { ...a, ...patch } : a
    );
    onUpdateConfig({ ...config, addons: nextAddons });
  };

  const handleAddAddon = () => {
    const newAddon: StudioAddon = {
      id: `addon_${Date.now()}`,
      label: 'Nuevo Adicional de Estudio',
      priceUyu: 1500,
    };
    onUpdateConfig({ ...config, addons: [...config.addons, newAddon] });
    triggerSavedNotice();
  };

  const handleDeleteAddon = (addonId: string) => {
    onUpdateConfig({
      ...config,
      addons: config.addons.filter((a) => a.id !== addonId),
    });
    triggerSavedNotice();
  };

  // --- Portfolio Vehicles Handlers ---
  const handlePortfolioChange = (
    workId: string,
    patch: Partial<PortfolioWork>
  ) => {
    const nextPortfolio = config.portfolio.map((w) =>
      w.id === workId ? { ...w, ...patch } : w
    );
    onUpdateConfig({ ...config, portfolio: nextPortfolio });
  };

  const handleAddPortfolioWork = () => {
    const preset = STUDIO_IMAGE_PRESETS[1];
    const newWork: PortfolioWork = {
      id: `work_${Date.now()}`,
      vehicle: 'Nuevo Vehículo Detallado',
      serviceCategory: 'ceramico',
      serviceName: 'Tratamiento Cerámico 9H',
      outcome:
        'Corrección de barniz multi-etapa y sellado vitrificado en nuestro estudio de Montevideo.',
      assetPath: preset.assetPath,
      leftOffset: preset.leftOffset,
      topOffset: preset.topOffset,
    };
    onUpdateConfig({
      ...config,
      portfolio: [newWork, ...config.portfolio],
    });
    triggerSavedNotice();
  };

  const handleDeletePortfolioWork = (workId: string) => {
    onUpdateConfig({
      ...config,
      portfolio: config.portfolio.filter((w) => w.id !== workId),
    });
    triggerSavedNotice();
  };

  // --- Studio Info & FAQs Handlers ---
  const handleStudioInfoChange = (
    key: keyof StudioConfig['studioInfo'],
    value: string | number
  ) => {
    onUpdateConfig({
      ...config,
      studioInfo: {
        ...config.studioInfo,
        [key]: value,
      },
    });
  };

  const handleFaqChange = (faqId: string, patch: Partial<FaqItem>) => {
    const nextFaqs = config.faqs.map((f) =>
      f.id === faqId ? { ...f, ...patch } : f
    );
    onUpdateConfig({ ...config, faqs: nextFaqs });
  };

  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: `faq_${Date.now()}`,
      question: '¿Nueva pregunta frecuente del estudio?',
      answer: 'Respuesta detallada para los clientes de Detailing Company.',
    };
    onUpdateConfig({ ...config, faqs: [...config.faqs, newFaq] });
    triggerSavedNotice();
  };

  const handleDeleteFaq = (faqId: string) => {
    onUpdateConfig({
      ...config,
      faqs: config.faqs.filter((f) => f.id !== faqId),
    });
    triggerSavedNotice();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="secret-admin-title"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 14 }}
            transition={{ duration: 0.25 }}
            className="bg-neutral-950 border border-white/20 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Modal Top Header */}
            <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
                  alt="Logo Detailing Company"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-white/25 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2
                      id="secret-admin-title"
                      className="font-display uppercase text-xl sm:text-2xl font-bold text-white tracking-wide"
                    >
                      PANEL DE CONFIGURACIÓN SECRETO
                    </h2>
                    {savedNotice && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Guardado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 truncate">
                    Atajo: escribiste <span className="text-white font-medium">detailing</span> / <span className="text-white font-medium">admin</span> o presionaste <span className="text-white font-medium">Ctrl + Shift + D</span>. Guardado automático activo.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onResetConfig();
                    triggerSavedNotice();
                  }}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Originales</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar panel de configuración"
                  className="min-h-[38px] px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cerrar</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 sm:px-7 py-3 bg-neutral-900/60 border-b border-white/10 flex flex-wrap items-center gap-2">
              {[
                {
                  id: 'services',
                  label: `Servicios y Precios (${config.services.length})`,
                  icon: <Sliders className="w-3.5 h-3.5" />,
                },
                {
                  id: 'categories',
                  label: `Portes y Adicionales (${config.vehicleCategories.length})`,
                  icon: <Layers className="w-3.5 h-3.5" />,
                },
                {
                  id: 'portfolio',
                  label: `Vehículos Portafolio (${config.portfolio.length})`,
                  icon: <Car className="w-3.5 h-3.5" />,
                },
                {
                  id: 'studio',
                  label: 'Textos Hero, Estudio y FAQs',
                  icon: <Building2 className="w-3.5 h-3.5" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`min-h-[38px] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'bg-black/60 text-neutral-300 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Tab Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* TAB 1: SERVICES & PRICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display uppercase text-xl font-bold text-white">
                        Gestión de Servicios, Descripciones y Tarifas
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Modificá títulos, descripciones, tiempos, garantías, ítems incluidos y precios en UYU por cada porte.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="self-start min-h-[40px] px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Añadir Servicio</span>
                    </button>
                  </div>

                  <div className="space-y-5">
                    {config.services.map((service, index) => (
                      <div
                        key={service.id}
                        className="rounded-2xl bg-neutral-900/90 border border-white/15 p-5 space-y-4"
                      >
                        <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10">
                          <span className="font-display uppercase text-lg font-bold text-white">
                            0{index + 1} · {service.title}
                          </span>
                          {config.services.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteService(service.id)}
                              aria-label={`Eliminar servicio ${service.title}`}
                              className="min-h-[34px] px-3 py-1.5 rounded-full bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Eliminar Servicio</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Nombre del Servicio
                            </label>
                            <input
                              type="text"
                              aria-label={`Nombre de ${service.title}`}
                              value={service.title}
                              onChange={(e) =>
                                handleServiceChange(service.id, { title: e.target.value })
                              }
                              className="w-full min-h-[40px] px-3.5 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Duración en Estudio
                            </label>
                            <input
                              type="text"
                              value={service.duration}
                              onChange={(e) =>
                                handleServiceChange(service.id, { duration: e.target.value })
                              }
                              className="w-full min-h-[40px] px-3.5 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Garantía / Resultado
                            </label>
                            <input
                              type="text"
                              value={service.warranty}
                              onChange={(e) =>
                                handleServiceChange(service.id, { warranty: e.target.value })
                              }
                              className="w-full min-h-[40px] px-3.5 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                            />
                          </div>
                        </div>

                        {/* Prices per Vehicle Category */}
                        <div className="p-4 rounded-xl bg-black/70 border border-white/10">
                          <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-3">
                            Precios en Pesos Uruguayos (UYU) según Porte del Vehículo
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {config.vehicleCategories.map((cat) => (
                              <div key={cat.id}>
                                <label className="block text-xs text-neutral-300 mb-1">
                                  {cat.label} ({formatUyuCurrency(service.basePriceUyu[cat.id] ?? 0)})
                                </label>
                                <input
                                  type="number"
                                  min={0}
                                  step={100}
                                  aria-label={`Precio ${service.title} para ${cat.label}`}
                                  value={service.basePriceUyu[cat.id] ?? 0}
                                  onChange={(e) =>
                                    handleServicePriceChange(
                                      service.id,
                                      cat.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full min-h-[40px] px-3.5 py-2 rounded-lg bg-neutral-950 border border-white/15 text-sm text-white tabular-nums"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Descriptions & Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Descripción Principal
                            </label>
                            <textarea
                              rows={3}
                              value={service.shortDescription}
                              onChange={(e) =>
                                handleServiceChange(service.id, {
                                  shortDescription: e.target.value,
                                })
                              }
                              className="w-full p-3 rounded-xl bg-black border border-white/15 text-xs text-white leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Ficha Técnica Desplegable
                            </label>
                            <textarea
                              rows={3}
                              value={service.fullDescription}
                              onChange={(e) =>
                                handleServiceChange(service.id, {
                                  fullDescription: e.target.value,
                                })
                              }
                              className="w-full p-3 rounded-xl bg-black border border-white/15 text-xs text-white leading-relaxed"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Ítems Incluidos (uno por línea)
                            </label>
                            <textarea
                              rows={3}
                              value={service.features.join('\n')}
                              onChange={(e) =>
                                handleServiceChange(service.id, {
                                  features: e.target.value
                                    .split('\n')
                                    .map((line) => line.trim())
                                    .filter(Boolean),
                                })
                              }
                              className="w-full p-3 rounded-xl bg-black border border-white/15 text-xs text-white leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Ícono de Especialidad
                            </label>
                            <select
                              value={service.iconType}
                              onChange={(e) =>
                                handleServiceChange(service.id, {
                                  iconType: e.target.value as ServiceIconType,
                                })
                              }
                              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-white mb-2"
                            >
                              <option value="ceramico">Escudo Cerámico</option>
                              <option value="pulido">Brillo / Pulido</option>
                              <option value="interior">Limpieza / Vapor</option>
                              <option value="preventa">Sello Pre-Venta</option>
                            </select>

                            <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                              Fotografía del Estudio
                            </label>
                            <select
                              value={service.imageCropStyle.origin}
                              onChange={(e) => {
                                const preset = STUDIO_IMAGE_PRESETS.find(
                                  (p) => p.origin === e.target.value
                                );
                                if (preset) {
                                  handleServiceChange(service.id, {
                                    imageAsset: preset.assetPath,
                                    imageCropStyle: {
                                      objectPosition: 'center',
                                      scale: 1,
                                      origin: preset.origin,
                                    },
                                  });
                                }
                              }}
                              className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-xs text-white"
                            >
                              {STUDIO_IMAGE_PRESETS.map((p) => (
                                <option key={p.label} value={p.origin}>
                                  {p.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: VEHICLE CATEGORIES & COTIZADOR ADDONS */}
              {activeTab === 'categories' && (
                <div className="space-y-8">
                  {/* Vehicle Categories */}
                  <div className="rounded-2xl bg-neutral-900/90 border border-white/15 p-5 space-y-4">
                    <div>
                      <h3 className="font-display uppercase text-xl font-bold text-white">
                        Portes / Tamaños de Vehículos
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Configurá las categorías de vehículos que aparecen en el selector de precios y en el cotizador.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {config.vehicleCategories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-black border border-white/10"
                        >
                          <input
                            type="text"
                            value={cat.label}
                            onChange={(e) =>
                              handleCategoryLabelChange(cat.id, e.target.value)
                            }
                            className="flex-1 min-h-[38px] px-3.5 py-1.5 rounded-lg bg-neutral-950 border border-white/15 text-sm text-white"
                          />
                          {config.vehicleCategories.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="min-h-[38px] px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-200 text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Quitar</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="text"
                        value={newCategoryLabel}
                        onChange={(e) => setNewCategoryLabel(e.target.value)}
                        placeholder="Nuevo porte (ej. Deportivo / Coupé)"
                        className="flex-1 min-h-[42px] px-3.5 py-2 rounded-xl bg-black border border-white/15 text-sm text-white placeholder:text-neutral-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="min-h-[42px] px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Añadir Porte</span>
                      </button>
                    </div>
                  </div>

                  {/* Studio Addons */}
                  <div className="rounded-2xl bg-neutral-900/90 border border-white/15 p-5 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-display uppercase text-xl font-bold text-white">
                          Adicionales Opcionales del Cotizador
                        </h3>
                        <p className="text-xs text-neutral-400">
                          Opcionales que el cliente puede sumar al reservar su turno.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddAddon}
                        className="min-h-[38px] px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Añadir Adicional</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {config.addons.map((addon) => (
                        <div
                          key={addon.id}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-xl bg-black border border-white/10"
                        >
                          <div className="sm:col-span-7">
                            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                              Nombre del Adicional
                            </label>
                            <input
                              type="text"
                              value={addon.label}
                              onChange={(e) =>
                                handleAddonChange(addon.id, { label: e.target.value })
                              }
                              className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/15 text-sm text-white"
                            />
                          </div>
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                              Precio (UYU)
                            </label>
                            <input
                              type="number"
                              min={0}
                              step={100}
                              value={addon.priceUyu}
                              onChange={(e) =>
                                handleAddonChange(addon.id, {
                                  priceUyu: Number(e.target.value),
                                })
                              }
                              className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/15 text-sm text-white tabular-nums"
                            />
                          </div>
                          <div className="sm:col-span-2 flex justify-end pt-4 sm:pt-0">
                            <button
                              type="button"
                              onClick={() => handleDeleteAddon(addon.id)}
                              className="min-h-[38px] px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-200 text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Borrar</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PORTFOLIO VEHICLES */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display uppercase text-xl font-bold text-white">
                        Vehículos del Portafolio Real
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Añadí, editá o eliminá los vehículos destacados en la galería de trabajos realizados.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddPortfolioWork}
                      className="self-start min-h-[40px] px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Añadir Vehículo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.portfolio.map((work) => (
                      <div
                        key={work.id}
                        className="rounded-2xl bg-neutral-900/90 border border-white/15 p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                          <span className="font-display uppercase text-base font-bold text-white">
                            {work.vehicle}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeletePortfolioWork(work.id)}
                            aria-label={`Eliminar vehículo ${work.vehicle}`}
                            className="min-h-[32px] px-2.5 py-1 rounded-full bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-200 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                            Marca y Modelo del Vehículo
                          </label>
                          <input
                            type="text"
                            value={work.vehicle}
                            onChange={(e) =>
                              handlePortfolioChange(work.id, { vehicle: e.target.value })
                            }
                            className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-black border border-white/15 text-sm text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                              Tratamiento Aplicado
                            </label>
                            <input
                              type="text"
                              value={work.serviceName}
                              onChange={(e) =>
                                handlePortfolioChange(work.id, {
                                  serviceName: e.target.value,
                                })
                              }
                              className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                              Categoría de Filtro
                            </label>
                            <select
                              value={work.serviceCategory}
                              onChange={(e) =>
                                handlePortfolioChange(work.id, {
                                  serviceCategory: e.target.value as PortfolioWork['serviceCategory'],
                                })
                              }
                              className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-white"
                            >
                              <option value="ceramico">Cerámico</option>
                              <option value="pulido">Pulido</option>
                              <option value="interior">Interior</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                            Fotografía del Estudio
                          </label>
                          <select
                            value={work.leftOffset + ' ' + work.topOffset}
                            onChange={(e) => {
                              const preset = STUDIO_IMAGE_PRESETS.find(
                                (p) => `${p.leftOffset} ${p.topOffset}` === e.target.value
                              );
                              if (preset) {
                                handlePortfolioChange(work.id, {
                                  assetPath: preset.assetPath,
                                  leftOffset: preset.leftOffset,
                                  topOffset: preset.topOffset,
                                });
                              }
                            }}
                            className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-black border border-white/15 text-xs text-white"
                          >
                            {STUDIO_IMAGE_PRESETS.map((p) => (
                              <option
                                key={p.label}
                                value={`${p.leftOffset} ${p.topOffset}`}
                              >
                                {p.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                            Resultado / Descripción del Trabajo
                          </label>
                          <textarea
                            rows={2}
                            value={work.outcome}
                            onChange={(e) =>
                              handlePortfolioChange(work.id, { outcome: e.target.value })
                            }
                            className="w-full p-2.5 rounded-lg bg-black border border-white/15 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: STUDIO INFO, HERO TEXTS & FAQS */}
              {activeTab === 'studio' && (
                <div className="space-y-8">
                  {/* Studio & Hero Texts */}
                  <div className="rounded-2xl bg-neutral-900/90 border border-white/15 p-5 space-y-4">
                    <h3 className="font-display uppercase text-xl font-bold text-white">
                      Datos del Estudio y Textos de Portada (Hero)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Nombre de la Marca
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.name}
                          onChange={(e) =>
                            handleStudioInfoChange('name', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Teléfono Visible (WhatsApp)
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.phoneDisplay}
                          onChange={(e) =>
                            handleStudioInfoChange('phoneDisplay', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white tabular-nums"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Número Internacional (wa.me)
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.phoneInternational}
                          onChange={(e) =>
                            handleStudioInfoChange('phoneInternational', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white tabular-nums"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Dirección del Estudio
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.address}
                          onChange={(e) =>
                            handleStudioInfoChange('address', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Horarios de Atención
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.hours}
                          onChange={(e) =>
                            handleStudioInfoChange('hours', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Titular Línea 1 (Hero)
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.heroHeadlineLine1}
                          onChange={(e) =>
                            handleStudioInfoChange('heroHeadlineLine1', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Titular Línea 2 (Hero)
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.heroHeadlineLine2}
                          onChange={(e) =>
                            handleStudioInfoChange('heroHeadlineLine2', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Titular Banner Google
                        </label>
                        <input
                          type="text"
                          value={config.studioInfo.googleBannerTitle}
                          onChange={(e) =>
                            handleStudioInfoChange('googleBannerTitle', e.target.value)
                          }
                          className="w-full min-h-[40px] px-3 py-2 rounded-xl bg-black border border-white/15 text-sm text-white"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                          Subtítulo Principal (Hero)
                        </label>
                        <textarea
                          rows={2}
                          value={config.studioInfo.heroSubtitle}
                          onChange={(e) =>
                            handleStudioInfoChange('heroSubtitle', e.target.value)
                          }
                          className="w-full p-3 rounded-xl bg-black border border-white/15 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* FAQs Management */}
                  <div className="rounded-2xl bg-neutral-900/90 border border-white/15 p-5 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display uppercase text-xl font-bold text-white">
                        Preguntas Frecuentes (FAQ)
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="min-h-[38px] px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Añadir Pregunta</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {config.faqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="p-4 rounded-xl bg-black border border-white/10 space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) =>
                                handleFaqChange(faq.id, { question: e.target.value })
                              }
                              className="flex-1 min-h-[36px] px-3 py-1 rounded-lg bg-neutral-950 border border-white/15 text-sm font-medium text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="min-h-[36px] px-3 py-1 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-200 text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) =>
                              handleFaqChange(faq.id, { answer: e.target.value })
                            }
                            className="w-full p-2.5 rounded-lg bg-neutral-950 border border-white/15 text-xs text-neutral-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
