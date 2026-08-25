import { Phone, Clock, ShieldCheck } from 'lucide-react';
import { ISLAMABAD_BRANCHES } from '@/data/locations';
import type { ActivePage } from '@/types';

interface FooterProps {
  phone: string;
  onNavigate: (page: ActivePage) => void;
  onOpenLocationModal: () => void;
}

export function Footer({ phone, onNavigate, onOpenLocationModal }: FooterProps) {
  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-200 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-black text-lg">
                FH
              </span>
              <span className="font-display text-2xl font-black text-white">
                Foodie Hub
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Islamabad’s premier steakhouse &amp; live flame BBQ. Serving aged tenderloin cuts, hand-smashed brioche burgers, loaded fries, and refreshing smoothies.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-accent-light font-semibold">
              <ShieldCheck className="h-4 w-4" />
              100% Halal Certified Prime Cuts
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-4">
              Explore Foodie Hub
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="transition-colors hover:text-white hover:underline"
                >
                  Menu &amp; Online Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visit')}
                  className="transition-colors hover:text-white hover:underline"
                >
                  Visit Us (Branches &amp; Lounges)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="transition-colors hover:text-white hover:underline"
                >
                  About Our Flame Grill Craft
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLocationModal}
                  className="transition-colors text-accent-light font-semibold hover:text-white"
                >
                  Change Islamabad Sector / Location
                </button>
              </li>
            </ul>
          </div>

          {/* Branches Summary */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-4">
              Islamabad Branches
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              {ISLAMABAD_BRANCHES.map((b) => (
                <li key={b.id} className="border-b border-white/10 pb-2">
                  <p className="font-bold text-white">{b.name}</p>
                  <p className="text-gray-400 mt-0.5">{b.sector}</p>
                  <a
                    href={`tel:${b.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-accent-light font-semibold hover:underline block mt-0.5"
                  >
                    {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Hotline */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-4">
              Order Hotline &amp; Hours
            </h4>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/15">
              <p className="text-xs text-gray-300">Direct Order Line:</p>
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="mt-1 flex items-center gap-2 text-base font-black text-white hover:text-accent-light"
              >
                <Phone className="h-4 w-4 text-accent" />
                {phone}
              </a>

              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-300 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-200">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span>Mon – Sun: 12:00 PM – 01:30 AM</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Fast delivery across all Islamabad sectors
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Foodie Hub Islamabad. All rights reserved.</p>
          <div className="flex items-center gap-1 text-gray-300">
            <span>Flame-Grilled in the Heart of Islamabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
