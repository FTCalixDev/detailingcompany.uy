export type VehicleCategory = 'hatch_sedan' | 'suv' | 'pickup';

export interface ServiceItem {
  id: 'ceramico' | 'pulido' | 'interior' | 'preventa';
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  warranty: string;
  basePriceUyu: Record<VehicleCategory, number>;
  features: string[];
  imageAsset: string;
  imageCropStyle: {
    objectPosition: string;
    scale: number;
    origin: string;
  };
}

export interface BookingFormInput {
  clientName: string;
  phone: string;
  vehicleModel: string;
  vehicleCategory: VehicleCategory;
  serviceId: ServiceItem['id'];
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

export const STUDIO_INFO = {
  name: 'DETAILING COMPANY',
  instagramHandle: '@detailingcompany.uy',
  address: 'Duvimioso Terra 2341, La Comercial / Tres Cruces, Montevideo 11800',
  phoneDisplay: '099 050 602',
  phoneInternational: '59899050602',
  hours: 'Lunes a Viernes 09:00 – 19:00 · Sábados 09:00 – 14:00',
  googleRating: '5.0',
  googleReviewsCount: 318,
  instagramFollowers: '4.234',
} as const;

export const VEHICLE_CATEGORY_LABELS: Record<VehicleCategory, string> = {
  hatch_sedan: 'Hatch / Sedán',
  suv: 'SUV / Crossover',
  pickup: 'Pick-up / 4x4',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ceramico',
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

export function getServiceById(serviceId: ServiceItem['id']): ServiceItem {
  const found = SERVICES.find((s) => s.id === serviceId);
  return found ?? SERVICES[0];
}

export function calculateServicePrice(
  serviceId: ServiceItem['id'],
  vehicleCategory: VehicleCategory
): number {
  const service = getServiceById(serviceId);
  return service.basePriceUyu[vehicleCategory];
}

export function formatUyuCurrency(amount: number): string {
  return `$${amount.toLocaleString('es-UY')}`;
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
  vehicleModel?: string;
  clientName?: string;
  preferredDate?: string;
  estimatedPriceUyu?: number;
}): string {
  const baseUrl = `https://wa.me/${STUDIO_INFO.phoneInternational}`;

  if (!params.serviceTitle) {
    const defaultMessage =
      'Hola Detailing Company, quisiera consultar disponibilidad y cotización para mi vehículo en Montevideo.';
    return `${baseUrl}?text=${encodeURIComponent(defaultMessage)}`;
  }

  const categoryLabel = params.vehicleCategory
    ? VEHICLE_CATEGORY_LABELS[params.vehicleCategory]
    : '';
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
