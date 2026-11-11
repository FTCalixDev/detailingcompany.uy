import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  SERVICES,
  ServiceItem,
  VehicleCategory,
  VEHICLE_CATEGORY_LABELS,
  BookingFormInput,
  ConfirmedBooking,
  STUDIO_INFO,
  getServiceById,
  calculateServicePrice,
  formatUyuCurrency,
  validateBookingInput,
  buildWhatsAppUrl,
} from '../utils/bookingLogic';

interface BookingSectionProps {
  selectedServiceId: ServiceItem['id'];
  onChangeServiceId: (id: ServiceItem['id']) => void;
  selectedCategory: VehicleCategory;
  onChangeCategory: (category: VehicleCategory) => void;
  confirmedBookings: ConfirmedBooking[];
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STUDIO_ADDONS = [
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

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServiceId,
  onChangeServiceId,
  selectedCategory,
  onChangeCategory,
  confirmedBookings,
  onBookingConfirmed,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-11-18');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormInput, string>>>({});
  const [latestConfirmed, setLatestConfirmed] = useState<ConfirmedBooking | null>(null);

  const currentService = getServiceById(selectedServiceId);
  const basePrice = calculateServicePrice(selectedServiceId, selectedCategory);
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const found = STUDIO_ADDONS.find((a) => a.id === id);
    return sum + (found ? found.priceUyu : 0);
  }, 0);
  const currentPrice = basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input: BookingFormInput = {
      clientName: clientName.trim(),
      phone: phone.trim(),
      vehicleModel: vehicleModel.trim(),
      vehicleCategory: selectedCategory,
      serviceId: selectedServiceId,
      preferredDate,
    };

    const validation = validateBookingInput(input);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const addonNames = STUDIO_ADDONS.filter((a) => selectedAddons.includes(a.id)).map(
      (a) => a.label
    );
    const combinedTitle =
      addonNames.length > 0
        ? `${currentService.title} + ${addonNames.join(', ')}`
        : currentService.title;

    const whatsappUrl = buildWhatsAppUrl({
      serviceTitle: combinedTitle,
      vehicleCategory: selectedCategory,
      vehicleModel: input.vehicleModel,
      clientName: input.clientName,
      preferredDate: input.preferredDate,
      estimatedPriceUyu: currentPrice,
    });

    const newBooking: ConfirmedBooking = {
      ...input,
      id: `DC-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceTitle: combinedTitle,
      estimatedPriceUyu: currentPrice,
      estimatedDuration: currentService.duration,
      createdAt: new Date().toLocaleTimeString('es-UY', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      whatsappUrl,
    };

    setLatestConfirmed(newBooking);
    onBookingConfirmed(newBooking);
  };

  return (
    <section id="agendar" className="bg-black py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium mb-3">
            04 · COTIZADOR Y RESERVA DE TURNO
          </p>
          <h2 className="font-display uppercase text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[0.96]">
            AGENDAR TURNO EN MONTEVIDEO.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light mt-3 max-w-xl">
            Completá los datos de tu vehículo para cotizar y coordinar tu ingreso en nuestro estudio de Duvimioso Terra 2341.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-6"
            >
              {/* Service Selection */}
              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2"
                >
                  Tratamiento solicitado
                </label>
                <select
                  id="booking-service"
                  value={selectedServiceId}
                  onChange={(e) => onChangeServiceId(e.target.value as ServiceItem['id'])}
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} — {formatUyuCurrency(s.basePriceUyu[selectedCategory])} UYU
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Category Selection */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2">
                  Porte del vehículo
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['hatch_sedan', 'suv', 'pickup'] as VehicleCategory[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => onChangeCategory(cat)}
                      className={`min-h-[42px] px-3 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap truncate cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-neutral-400 border-white/15 hover:text-white'
                      }`}
                    >
                      {VEHICLE_CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Studio Add-ons */}
              <div>
                <span className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2">
                  Adicionales de estudio (opcional)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STUDIO_ADDONS.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`min-h-[46px] px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                          checked
                            ? 'bg-neutral-900 border-white text-white'
                            : 'bg-black border-white/15 text-neutral-300 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddon(addon.id)}
                            className="accent-white w-4 h-4 rounded shrink-0"
                          />
                          <span>{addon.label}</span>
                        </div>
                        <span className="font-semibold text-white tabular-nums shrink-0">
                          +{formatUyuCurrency(addon.priceUyu)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Client Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2"
                  >
                    Nombre y apellido
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (errors.clientName) setErrors({ ...errors, clientName: undefined });
                    }}
                    placeholder="Ej. Martín Rodríguez"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  {errors.clientName && (
                    <p role="alert" className="text-xs text-red-400 mt-1.5">
                      {errors.clientName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2"
                  >
                    Celular de contacto
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="Ej. 099 123 456"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors tabular-nums"
                  />
                  {errors.phone && (
                    <p role="alert" className="text-xs text-red-400 mt-1.5">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Vehicle Model & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-vehicle"
                    className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2"
                  >
                    Marca y modelo del vehículo
                  </label>
                  <input
                    id="booking-vehicle"
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => {
                      setVehicleModel(e.target.value);
                      if (errors.vehicleModel) setErrors({ ...errors, vehicleModel: undefined });
                    }}
                    placeholder="Ej. Peugeot 208 GT / BMW X1"
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  {errors.vehicleModel && (
                    <p role="alert" className="text-xs text-red-400 mt-1.5">
                      {errors.vehicleModel}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs uppercase tracking-wider font-medium text-neutral-300 mb-2"
                  >
                    Fecha preferida
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => {
                      setPreferredDate(e.target.value);
                      if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                    }}
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-black border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors tabular-nums"
                  />
                  {errors.preferredDate && (
                    <p role="alert" className="text-xs text-red-400 mt-1.5">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Price Summary Bar inside Form */}
              <div className="p-5 rounded-xl bg-black border border-white/15 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                    {currentService.title} · {VEHICLE_CATEGORY_LABELS[selectedCategory]}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Tiempo estimado: {currentService.duration} · {currentService.warranty}
                  </p>
                </div>
                <div className="text-right">
                  <motion.span
                    key={currentPrice}
                    initial={{ opacity: 0.5, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block font-display text-3xl font-bold text-white tabular-nums"
                  >
                    {formatUyuCurrency(currentPrice)}
                  </motion.span>
                  <span className="block text-[11px] text-neutral-400">Pesos Uruguayos</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[50px] py-3.5 px-7 rounded-full bg-white text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Confirmar Solicitud de Turno</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </form>
          </motion.div>

          {/* Right Summary & Studio Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Confirmed Booking Card if submitted */}
            <AnimatePresence>
              {latestConfirmed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-neutral-950 border border-white/40 p-6 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-400 tabular-nums">
                          Solicitud registrada · Código {latestConfirmed.id}
                        </p>
                        <h3 className="font-display uppercase text-xl font-bold text-white mt-0.5">
                          Turno pre-agendado para {latestConfirmed.clientName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-300 space-y-1.5 pt-3 border-t border-white/10 tabular-nums">
                    <p>
                      <span className="text-neutral-400">Servicio:</span>{' '}
                      {latestConfirmed.serviceTitle} ({formatUyuCurrency(latestConfirmed.estimatedPriceUyu)} UYU)
                    </p>
                    <p>
                      <span className="text-neutral-400">Vehículo:</span>{' '}
                      {latestConfirmed.vehicleModel} ({VEHICLE_CATEGORY_LABELS[latestConfirmed.vehicleCategory]})
                    </p>
                    <p>
                      <span className="text-neutral-400">Fecha solicitada:</span>{' '}
                      {latestConfirmed.preferredDate}
                    </p>
                  </div>

                  <a
                    href={latestConfirmed.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] py-2.5 px-5 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 fill-black text-black shrink-0" />
                    <span>Enviar Confirmación por WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Studio Location & Direct Info */}
            <div className="rounded-2xl bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3.5">
                <img
                  src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
                  alt="Logo Detailing Company"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-white/20 shrink-0"
                />
                <div>
                  <h3 className="font-display uppercase text-xl font-bold text-white tracking-wide">
                    ESTUDIO DETAILING COMPANY
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Atención personalizada con agenda previa
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white uppercase tracking-wider">
                      Ubicación en Montevideo
                    </p>
                    <p className="text-neutral-400 mt-1">{STUDIO_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white uppercase tracking-wider">
                      Horario de Estudio
                    </p>
                    <p className="text-neutral-400 mt-1 tabular-nums">{STUDIO_INFO.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white uppercase tracking-wider">
                      WhatsApp Directo
                    </p>
                    <p className="text-neutral-400 mt-1 tabular-nums">
                      +598 99 050 602 ({STUDIO_INFO.phoneDisplay})
                    </p>
                  </div>
                </div>
              </div>

              {confirmedBookings.length > 0 && (
                <div className="pt-4 border-t border-white/10 text-xs text-neutral-400 tabular-nums">
                  Turnos solicitados en esta sesión: {confirmedBookings.length}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
