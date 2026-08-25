import { useState } from 'react';
import { ShoppingBag, MapPin, Menu as MenuIcon, X, ChevronDown, Building2, BookOpen, Utensils } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import type { UserLocationPreference, ActivePage } from '@/types';

interface HeaderProps {
  itemCount: number;
  onCartClick: () => void;
  locationPref: UserLocationPreference;
  onOpenLocationModal: () => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export function Header({
  itemCount,
  onCartClick,
  locationPref,
  onOpenLocationModal,
  activePage,
  onNavigate,
}: HeaderProps) {
  const scrolled = useScrolled(30);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayLocationText =
    locationPref.orderType === 'delivery'
      ? `Delivery • ${locationPref.sector || 'Islamabad'}`
      : `Pick-Up • ${locationPref.sector || 'Islamabad'}`;

  const navItems = [
    { id: 'home' as ActivePage, label: 'Menu & Food', icon: Utensils },
    { id: 'visit' as ActivePage, label: 'Visit Us', icon: Building2 },
    { id: 'about' as ActivePage, label: 'About Us', icon: BookOpen },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('home')}
                className="group flex items-center gap-2.5 text-left"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                  FH
                </span>
                <div>
                  <span className="font-display text-2xl font-black text-primary md:text-3xl tracking-tight">
                    Foodie Hub
                  </span>
                  <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-ink-muted -mt-1">
                    Islamabad • Steakhouse &amp; BBQ
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1.5 lg:gap-3 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary-50 text-primary font-bold shadow-sm'
                        : 'text-ink-soft hover:bg-gray-100 hover:text-primary'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Location Pill + Cart Button + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Selector Display Pill (Replaces Call to Order button) */}
              <button
                onClick={onOpenLocationModal}
                className="flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary-50/70 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-md group max-w-[160px] sm:max-w-[220px]"
                title="Change dining mode or Islamabad sector"
              >
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary group-hover:text-white" />
                <span className="truncate">{displayLocationText}</span>
                <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 opacity-70 group-hover:text-white" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={onCartClick}
                className="relative flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Bag</span>
                {itemCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-black text-ink">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full p-2 text-ink-soft hover:bg-gray-100 hover:text-primary md:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-gray-200 bg-white px-4 py-4 md:hidden shadow-xl animate-in slide-in-from-top duration-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-ink-soft hover:bg-gray-100 hover:text-primary'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLocationModal();
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-primary-50 px-4 py-3 text-sm font-bold text-primary"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location: {locationPref.sector}</span>
                  </div>
                  <span className="text-xs uppercase underline">Change</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
