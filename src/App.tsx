/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { SocialProofSection } from './components/SocialProofSection';
import { BookingSection } from './components/BookingSection';
import { StickyBottomBar } from './components/StickyBottomBar';
import { SecretAdminModal } from './components/SecretAdminModal';
import {
  StudioConfig,
  VehicleCategory,
  ConfirmedBooking,
  loadStudioConfig,
  saveStudioConfig,
  resetStudioConfig,
  isSecretWordMatch,
} from './utils/bookingLogic';

export default function App() {
  const [config, setConfig] = useState<StudioConfig>(() => loadStudioConfig());
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    () => loadStudioConfig().services[0]?.id ?? 'ceramico'
  );
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>(
    () => loadStudioConfig().vehicleCategories[0]?.id ?? 'hatch_sedan'
  );
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>([]);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isSecretAdminOpen, setIsSecretAdminOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('admin') === '1';
    }
    return false;
  });

  const keyBufferRef = useRef('');
  const footerClickCountRef = useRef(0);
  const footerClickTimerRef = useRef<number | null>(null);

  // Ensure selectedServiceId and selectedCategory stay valid when services or categories are edited/deleted
  useEffect(() => {
    if (
      config.services.length > 0 &&
      !config.services.some((s) => s.id === selectedServiceId)
    ) {
      setSelectedServiceId(config.services[0].id);
    }
    if (
      config.vehicleCategories.length > 0 &&
      !config.vehicleCategories.some((c) => c.id === selectedCategory)
    ) {
      setSelectedCategory(config.vehicleCategories[0].id);
    }
  }, [config.services, config.vehicleCategories, selectedServiceId, selectedCategory]);

  // Listen for secret key combination (Ctrl+Shift+D / Alt+Shift+D) or typing secret keyword ("detailing" or "admin")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Combination 1: Ctrl + Shift + D, Cmd + Shift + D, or Alt + Shift + D
      if (
        (e.ctrlKey || e.metaKey || e.altKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === 'd'
      ) {
        e.preventDefault();
        setIsSecretAdminOpen((prev) => !prev);
        keyBufferRef.current = '';
        return;
      }

      // Escape closes the secret modal if open
      if (e.key === 'Escape' && isSecretAdminOpen) {
        setIsSecretAdminOpen(false);
        return;
      }

      // Combination 2: Typing "detailing" or "admin" anywhere outside form inputs
      const activeTag = document.activeElement?.tagName.toUpperCase();
      const isEditingField =
        activeTag === 'INPUT' ||
        activeTag === 'TEXTAREA' ||
        activeTag === 'SELECT' ||
        (document.activeElement as HTMLElement | null)?.isContentEditable;

      if (isEditingField) {
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const nextBuffer = (keyBufferRef.current + e.key.toLowerCase()).slice(-20);
        keyBufferRef.current = nextBuffer;
        if (isSecretWordMatch(nextBuffer)) {
          setIsSecretAdminOpen(true);
          keyBufferRef.current = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSecretAdminOpen]);

  const handleSaveConfig = (nextConfig: StudioConfig) => {
    setConfig(nextConfig);
    saveStudioConfig(nextConfig);
  };

  const handleResetConfig = () => {
    const restored = resetStudioConfig();
    setConfig(restored);
  };

  const handleFooterSecretTrigger = () => {
    footerClickCountRef.current += 1;
    if (footerClickTimerRef.current) {
      window.clearTimeout(footerClickTimerRef.current);
    }
    if (footerClickCountRef.current >= 3) {
      footerClickCountRef.current = 0;
      setIsSecretAdminOpen(true);
      return;
    }
    footerClickTimerRef.current = window.setTimeout(() => {
      footerClickCountRef.current = 0;
    }, 900);
  };

  const scrollToSection = (sectionId: string, serviceId?: string) => {
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
      <Navbar
        studioInfo={config.studioInfo}
        onPrimaryAction={() => scrollToSection('agendar')}
      />

      {/* Main Content */}
      <main>
        {/* 2. Full-Bleed Dark Studio Hero Section */}
        <HeroSection
          studioInfo={config.studioInfo}
          onExploreServices={() => scrollToSection('servicios')}
          onBookNow={() => scrollToSection('agendar')}
        />

        {/* 3. Architectural Services Grid */}
        <ServicesSection
          services={config.services}
          vehicleCategories={config.vehicleCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectServiceForBooking={(serviceId) => scrollToSection('agendar', serviceId)}
        />

        {/* 4. Certifications, Social Proof & FAQ Accordion */}
        <SocialProofSection
          studioInfo={config.studioInfo}
          faqs={config.faqs}
        />

        {/* 5. Real Studio Portfolio Showcase & 4-Step Protocol */}
        <PortfolioSection
          portfolio={config.portfolio}
          studioInfo={config.studioInfo}
        />

        {/* 6. Interactive Cotizador & Turno Booking */}
        <BookingSection
          services={config.services}
          vehicleCategories={config.vehicleCategories}
          addons={config.addons}
          studioInfo={config.studioInfo}
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

      {/* Quiet Architectural Footer with Official Logo (Triple-click on logo also opens Secret Menu) */}
      <footer className="bg-neutral-950 border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/_D7A35198-53D8-41F5-81EF-65BEE1C9E390__e118badc.png"
              alt={`Logo oficial ${config.studioInfo.name}`}
              referrerPolicy="no-referrer"
              onClick={handleFooterSecretTrigger}
              className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0 select-none"
            />
            <div>
              <p className="font-display text-base font-bold text-white tracking-[0.14em] uppercase">
                {config.studioInfo.name}
              </p>
              <p className="mt-0.5">
                {config.studioInfo.address} · WhatsApp {config.studioInfo.phoneDisplay}
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
        services={config.services}
        studioInfo={config.studioInfo}
        defaultCategoryId={selectedCategory}
        isModalOpen={isWhatsAppModalOpen}
        onOpenModal={() => setIsWhatsAppModalOpen(true)}
        onCloseModal={() => setIsWhatsAppModalOpen(false)}
        onSelectServiceAndScroll={(serviceId) => scrollToSection('agendar', serviceId)}
      />

      {/* Hidden Secret Configuration Menu (Ctrl+Shift+D, typing "detailing" or "admin", or triple-click footer logo) */}
      <SecretAdminModal
        isOpen={isSecretAdminOpen}
        config={config}
        onClose={() => setIsSecretAdminOpen(false)}
        onUpdateConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
