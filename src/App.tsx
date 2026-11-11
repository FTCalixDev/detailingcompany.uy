/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { SocialProofSection } from './components/SocialProofSection';
import { BookingSection } from './components/BookingSection';
import { StickyBottomBar } from './components/StickyBottomBar';
import {
  ServiceItem,
  VehicleCategory,
  ConfirmedBooking,
  STUDIO_INFO,
} from './utils/bookingLogic';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceItem['id']>('ceramico');
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('hatch_sedan');
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const scrollToSection = (sectionId: string, serviceId?: ServiceItem['id']) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* 1. Full-Width Minimalist Architectural Navbar with Official Logo */}
      <Navbar onPrimaryAction={() => scrollToSection('agendar')} />

      {/* Main Content */}
      <main>
        {/* 2. Full-Bleed Dark Studio Hero Section */}
        <HeroSection
          onExploreServices={() => scrollToSection('servicios')}
          onBookNow={() => scrollToSection('agendar')}
        />

        {/* 3. Architectural Services Grid */}
        <ServicesSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectServiceForBooking={(serviceId) => scrollToSection('agendar', serviceId)}
        />

        {/* 4. Certifications, Social Proof & FAQ Accordion */}
        <SocialProofSection />

        {/* 5. Real Studio Portfolio Showcase & 4-Step Protocol */}
        <PortfolioSection />

        {/* 6. Interactive Cotizador & Turno Booking */}
        <BookingSection
          selectedServiceId={selectedServiceId}
          onChangeServiceId={setSelectedServiceId}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          confirmedBookings={confirmedBookings}
          onBookingConfirmed={(booking) =>
            setConfirmedBookings((prev) => [booking, ...prev])
          }
        />
      </main>

      {/* Quiet Architectural Footer with Official Logo */}
      <footer className="bg-neutral-950 border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
              alt="Logo oficial Detailing Company"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
            />
            <div>
              <p className="font-display text-base font-bold text-white tracking-[0.14em] uppercase">
                {STUDIO_INFO.name}
              </p>
              <p className="mt-0.5">
                {STUDIO_INFO.address} · WhatsApp {STUDIO_INFO.phoneDisplay}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#servicios" className="hover:text-white transition-colors">
              Servicios
            </a>
            <span aria-hidden="true">·</span>
            <a href="#resenas" className="hover:text-white transition-colors">
              Certificaciones
            </a>
            <span aria-hidden="true">·</span>
            <a href="#trabajos" className="hover:text-white transition-colors">
              Portafolio
            </a>
            <span aria-hidden="true">·</span>
            <a href="#agendar" className="hover:text-white transition-colors">
              Cotizador
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Centered White Pill CTA Bar ("Cotizar Vehículo por WhatsApp ↗") */}
      <StickyBottomBar
        isModalOpen={isWhatsAppModalOpen}
        onOpenModal={() => setIsWhatsAppModalOpen(true)}
        onCloseModal={() => setIsWhatsAppModalOpen(false)}
        onSelectServiceAndScroll={(serviceId) => scrollToSection('agendar', serviceId)}
      />
    </div>
  );
}
