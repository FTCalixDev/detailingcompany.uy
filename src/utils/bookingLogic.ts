export type VehicleCategory = string;

export type ServiceIconType = 'ceramico' | 'pulido' | 'interior' | 'preventa';

export interface VehicleCategoryItem {
  id: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  iconType: ServiceIconType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  warranty: string;
  basePriceUyu: Record<string, number>;
  features: string[];
  imageAsset: string;
  imageCropStyle: {
    objectPosition: string;
    scale: number;
    origin: string;
  };
}

export interface PortfolioWork {
  id: string;
  vehicle: string;
  serviceCategory: 'ceramico' | 'pulido' | 'interior';
  serviceName: string;
  outcome: string;
  assetPath: string;
  leftOffset: string;
  topOffset: string;
}

export interface StudioAddon {
  id: string;
  label: string;
  priceUyu: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StudioInfoConfig {
  name: string;
  instagramHandle: string;
  address: string;
  phoneDisplay: string;
  phoneInternational: string;
  hours: string;
  googleRating: string;
  googleReviewsCount: number;
  googleBannerTitle: string;
  instagramFollowers: string;
  heroKicker: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
}

export interface StudioConfig {
  studioInfo: StudioInfoConfig;
  vehicleCategories: VehicleCategoryItem[];
  services: ServiceItem[];
  portfolio: PortfolioWork[];
  addons: StudioAddon[];
  faqs: FaqItem[];
}

export interface BookingFormInput {
  clientName: string;
  phone: string;
  vehicleModel: string;
  vehicleCategory: VehicleCategory;
  serviceId: string;
  preferredDate: string;
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingFormInput, string>>;
}

export interface ConfirmedBooking extends BookingFormInput {
  id: string;
  serviceTitle: string;
  estimatedPriceUyu: number;
  estimatedDuration: string;
  createdAt: string;
  whatsappUrl: string;
}

export const STUDIO_INFO: StudioInfoConfig = {
  name: 'DETAILING COMPANY',
  instagramHandle: '@detailingcompany.uy',
  address: 'Duvimioso Terra 2341, La Comercial / Tres Cruces, Montevideo 11800',
  phoneDisplay: '099 050 602',
  phoneInternational: '59899050602',
  hours: 'Lunes a Viernes 09:00 – 19:00 · Sábados 09:00 – 14:00',
  googleRating: '5.0',
  googleReviewsCount: 318,
  googleBannerTitle: 'Más de 300 reseñas 5 Estrellas en Google.',
  instagramFollowers: '4.234',
  heroKicker: 'MONTEVIDEO, URUGUAY · DETAIL & PROTECTION STUDIO',
  heroHeadlineLine1: 'PROTECCIÓN Y ESTÉTICA',
  heroHeadlineLine2: 'AL MÁS ALTO NIVEL.',
  heroSubtitle:
    'Especialistas en Tratamientos Cerámicos, Corrección de Pintura, Limpiezas Profundas y Láminas de Seguridad en Montevideo.',
};

export const DEFAULT_VEHICLE_CATEGORIES: VehicleCategoryItem[] = [
  { id: 'hatch_sedan', label: 'Hatch / Sedán' },
  { id: 'suv', label: 'SUV / Crossover' },
  { id: 'pickup', label: 'Pick-up / 4x4' },
];

export const VEHICLE_CATEGORY_LABELS: Record<string, string> = {
  hatch_sedan: 'Hatch / Sedán',
  suv: 'SUV / Crossover',
  pickup: 'Pick-up / 4x4',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ceramico',
    iconType: 'ceramico',
    title: 'Tratamiento Cerámico',
    shortDescription:
      'Barrera vitrificada contra rayos UV, lluvia ácida y contaminación ambiental. Brillo profundo y efecto hidrofóbico de larga duración.',
    fullDescription:
      'Sellado cerámico de grado profesional que crea una capa cristalina sobre el barniz original, facilitando cada lavado y preservando el valor del vehículo.',
    duration: '2 a 3 días en estudio',
    warranty: 'Protección 24 a 36 meses',
    basePriceUyu: {
      hatch_sedan: 14500,
      suv: 16900,
      pickup: 19500,
    },
    features: [
      'Descontaminado férrico y mecánico con Clay Bar',
      'Corrección de barniz previa de alto brillo',
      'Sellado cerámico 9H en carrocería y ópticas',
      'Hidrofobia extrema y filtro contra rayos UV',
    ],
    imageAsset: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    imageCropStyle: {
      objectPosition: 'center',
      scale: 1,
      origin: '-308% -8%',
    },
  },
  {
    id: 'pulido',
    iconType: 'pulido',
    title: 'Pulido de Pintura',
    shortDescription:
      'Corrección de laca multi-etapa para eliminar micro-rayas, swirls y marcas de lavado, devolviendo el reflejo espejo original.',
    fullDescription:
      'Mediante iluminación hexagonal de inspección corregimos imperfecciones del barniz sin comprometer el espesor de la pintura original de fábrica.',
    duration: '1 a 2 días en estudio',
    warranty: 'Sellado sintético 6 meses',
    basePriceUyu: {
      hatch_sedan: 8900,
      suv: 10500,
      pickup: 12200,
    },
    features: [
      'Lavado técnico de detalle y descontaminado completo',
      'Eliminación de swirls, hologramas y oxidación superficial',
      'Pulido de corte y refino con compuestos alemanes',
      'Sellador polimérico de alto reflejo incluido',
    ],
    imageAsset: '/assets/aistudio/_D1D068DB-A28C-42F8-B308-54C2B473D4D7__1805113c.png',
    imageCropStyle: {
      objectPosition: 'center',
      scale: 1,
      origin: '-2% -8%',
    },
  },
  {
    id: 'interior',
    iconType: 'interior',
    title: 'Limpieza Interior',
    shortDescription:
      'Detallado profundo de cabina: limpieza de tapizados y techo, aspirado minucioso de consola y acondicionamiento satinado de plásticos.',
    fullDescription:
      'Restauración higiénica y estética de todo el habitáculo con extracción de suciedad profunda, vapor controlado y nutridor UV sin acabado graso.',
    duration: '1 jornada completa',
    warranty: 'Cabina sanitizada 100%',
    basePriceUyu: {
      hatch_sedan: 5800,
      suv: 6800,
      pickup: 7600,
    },
    features: [
      'Limpieza detallada de consola, ranuras y superficies interiores',
      'Extracción profunda en butacas de tela o nutrición de cuero',
      'Limpieza delicada de cielo raso y alfombrado completo',
      'Acondicionamiento de plásticos con protección UV mate',
    ],
    imageAsset: '/assets/aistudio/_98C8490D-A956-4363-B46B-8C3DCD321928__8e02e82e.png',
    imageCropStyle: {
      objectPosition: 'center',
      scale: 1,
      origin: '-205% -8%',
    },
  },
  {
    id: 'preventa',
    iconType: 'preventa',
    title: 'Servicio Pre-Venta',
    shortDescription:
      'Combo integral exterior e interior diseñado para maximizar el valor de reventa de tu vehículo en tiempo récord.',
    fullDescription:
      'Nuestro paquete oficial de preparación pre-venta combina descontaminado y pulido abrillantado exterior con limpieza profunda de todo el interior.',
    duration: '1 a 2 días en estudio',
    warranty: 'Listo para exhibición',
    basePriceUyu: {
      hatch_sedan: 9500,
      suv: 9500,
      pickup: 11500,
    },
    features: [
      'Descontaminado de carrocería y pulido abrillantado',
      'Limpieza detallada de consola, ranuras y superficies interiores',
      'Aspirado profundo y limpieza de tapizados y techo',
      'Acondicionamiento de plásticos interiores y neumáticos',
    ],
    imageAsset: '/assets/aistudio/_98C8490D-A956-4363-B46B-8C3DCD321928__8e02e82e.png',
    imageCropStyle: {
      objectPosition: 'center',
      scale: 1,
      origin: '-308% -8%',
    },
  },
];

export const DEFAULT_PORTFOLIO_WORKS: PortfolioWork[] = [
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

export const DEFAULT_STUDIO_ADDONS: StudioAddon[] = [
  {
    id: 'parabrisas',
    label: 'Sellado Hidrofóbico de Parabrisas',
    priceUyu: 1400,
  },
  {
    id: 'motor',
    label: 'Detallado y Acondicionado de Motor a Vapor',
    priceUyu: 1800,
  },
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cuánto demora un Tratamiento Cerámico o Servicio Pre-Venta?',
    answer:
      'La Limpieza Interior toma 1 jornada en nuestro estudio de Duvimioso Terra 2341. El Servicio Pre-Venta y el Pulido de Pintura requieren de 1 a 2 días, mientras que el Tratamiento Cerámico 9H lleva entre 2 y 3 días para asegurar un curado controlado sin exposición a humedad.',
  },
  {
    id: 'faq-2',
    question: '¿Qué incluye exactamente el Servicio Pre-Venta de $9.500 UYU?',
    answer:
      'Incluye descontaminado de carrocería, pulido abrillantado exterior, limpieza detallada de consola, ranuras y superficies interiores, aspirado profundo, limpieza de tapizados y techo, y acondicionamiento de plásticos interiores (válido para vehículos hatch, sedán y SUV).',
  },
  {
    id: 'faq-3',
    question: '¿Qué medios de pago aceptan en el estudio?',
    answer:
      'Aceptamos efectivo, transferencia bancaria (BROU, Itaú, Santander, Scotiabank) y tarjetas de débito o crédito hasta en cuotas a través de Mercado Pago.',
  },
];

export const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  studioInfo: STUDIO_INFO,
  vehicleCategories: DEFAULT_VEHICLE_CATEGORIES,
  services: SERVICES,
  portfolio: DEFAULT_PORTFOLIO_WORKS,
  addons: DEFAULT_STUDIO_ADDONS,
  faqs: DEFAULT_FAQS,
};

const STORAGE_KEY = 'detailing_company_studio_config_v1';

export function loadStudioConfig(): StudioConfig {
  if (typeof window === 'undefined' || !window.localStorage) {
    return structuredClone(DEFAULT_STUDIO_CONFIG);
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STUDIO_CONFIG);
    const parsed = JSON.parse(raw) as Partial<StudioConfig>;
    if (
      !parsed ||
      !Array.isArray(parsed.services) ||
      parsed.services.length === 0 ||
      !Array.isArray(parsed.vehicleCategories) ||
      parsed.vehicleCategories.length === 0
    ) {
      return structuredClone(DEFAULT_STUDIO_CONFIG);
    }
    return {
      studioInfo: { ...DEFAULT_STUDIO_CONFIG.studioInfo, ...(parsed.studioInfo || {}) },
      vehicleCategories: parsed.vehicleCategories,
      services: parsed.services,
      portfolio: Array.isArray(parsed.portfolio)
        ? parsed.portfolio
        : DEFAULT_STUDIO_CONFIG.portfolio,
      addons: Array.isArray(parsed.addons) ? parsed.addons : DEFAULT_STUDIO_CONFIG.addons,
      faqs: Array.isArray(parsed.faqs) ? parsed.faqs : DEFAULT_STUDIO_CONFIG.faqs,
    };
  } catch {
    return structuredClone(DEFAULT_STUDIO_CONFIG);
  }
}

export function saveStudioConfig(config: StudioConfig): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage quota errors
  }
}

export function resetStudioConfig(): StudioConfig {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  return structuredClone(DEFAULT_STUDIO_CONFIG);
}

export function getCategoryLabel(
  categoryId: string,
  categories: VehicleCategoryItem[] = DEFAULT_VEHICLE_CATEGORIES
): string {
  const found = categories.find((c) => c.id === categoryId);
  return found ? found.label : VEHICLE_CATEGORY_LABELS[categoryId] || categoryId;
}

export function getServiceById(
  serviceId: string,
  servicesList: ServiceItem[] = SERVICES
): ServiceItem {
  const found = servicesList.find((s) => s.id === serviceId);
  return found ?? servicesList[0] ?? SERVICES[0];
}

export function calculateServicePrice(
  serviceId: string,
  vehicleCategory: VehicleCategory,
  servicesList: ServiceItem[] = SERVICES
): number {
  const service = getServiceById(serviceId, servicesList);
  const price = service.basePriceUyu[vehicleCategory];
  if (typeof price === 'number' && !Number.isNaN(price)) {
    return price;
  }
  const firstAvailable = Object.values(service.basePriceUyu)[0];
  return typeof firstAvailable === 'number' ? firstAvailable : 0;
}

export function formatUyuCurrency(amount: number): string {
  return `$${amount.toLocaleString('es-UY')}`;
}

export function isSecretWordMatch(buffer: string): boolean {
  const normalized = buffer.toLowerCase();
  return normalized.endsWith('detailing') || normalized.endsWith('admin');
}

export function validateBookingInput(input: BookingFormInput): BookingValidationResult {
  const errors: Partial<Record<keyof BookingFormInput, string>> = {};

  if (!input.clientName || input.clientName.trim().length < 2) {
    errors.clientName = 'Ingresá tu nombre para agendar el turno.';
  }

  const cleanedPhone = (input.phone || '').replace(/[\s\-()]/g, '');
  if (!cleanedPhone || !/^\+?\d{7,15}$/.test(cleanedPhone)) {
    errors.phone = 'Ingresá un número de celular válido (ej. 099 123 456).';
  }

  if (!input.vehicleModel || input.vehicleModel.trim().length < 2) {
    errors.vehicleModel = 'Indicá la marca y modelo de tu vehículo (ej. VW Golf GTI).';
  }

  if (!input.preferredDate || input.preferredDate.trim().length === 0) {
    errors.preferredDate = 'Seleccioná una fecha preferida para la cita.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppUrl(params: {
  serviceTitle?: string;
  vehicleCategory?: VehicleCategory;
  vehicleCategoryLabel?: string;
  vehicleModel?: string;
  clientName?: string;
  preferredDate?: string;
  estimatedPriceUyu?: number;
  phoneInternational?: string;
}): string {
  const phone = params.phoneInternational || STUDIO_INFO.phoneInternational;
  const baseUrl = `https://wa.me/${phone}`;

  if (!params.serviceTitle) {
    const defaultMessage =
      'Hola Detailing Company, quisiera consultar disponibilidad y cotización para mi vehículo en Montevideo.';
    return `${baseUrl}?text=${encodeURIComponent(defaultMessage)}`;
  }

  const categoryLabel =
    params.vehicleCategoryLabel ||
    (params.vehicleCategory ? getCategoryLabel(params.vehicleCategory) : '');
  const priceText = params.estimatedPriceUyu
    ? ` (${formatUyuCurrency(params.estimatedPriceUyu)} UYU est.)`
    : '';

  const lines = [
    `Hola Detailing Company, quiero agendar un turno para *${params.serviceTitle}*${priceText}.`,
    params.vehicleModel ? `• Vehículo: ${params.vehicleModel} (${categoryLabel})` : null,
    params.preferredDate ? `• Fecha preferida: ${params.preferredDate}` : null,
    params.clientName ? `• Nombre: ${params.clientName}` : null,
  ].filter(Boolean);

  return `${baseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}
