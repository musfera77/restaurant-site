import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Offers } from '@/components/Offers';
import { MenuSection } from '@/components/MenuSection';
import { VisitUsPage } from '@/components/VisitUsPage';
import { AboutUsPage } from '@/components/AboutUsPage';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { LocationModal } from '@/components/LocationModal';
import { useCart } from '@/hooks/useCart';
import { ISLAMABAD_BRANCHES } from '@/data/locations';
import type { UserLocationPreference, ActivePage } from '@/types';

const LOCATION_STORAGE_KEY = 'foodiehub_location_pref';
const LOCATION_SET_KEY = 'foodiehub_location_set';

const DEFAULT_PREF: UserLocationPreference = {
  orderType: 'delivery',
  city: 'Islamabad',
  sector: 'I-8 Markaz',
  pickupBranchId: 'i8-markaz',
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(true);

  const [locationPref, setLocationPref] = useState<UserLocationPreference>(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PREF;
  });

  // Check initial site visit to pop up location selector
  useEffect(() => {
    try {
      const isSet = localStorage.getItem(LOCATION_SET_KEY);
      if (!isSet) {
        setHasVisitedBefore(false);
        setLocationModalOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveLocationPref = (pref: UserLocationPreference) => {
    setLocationPref(pref);
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(pref));
      localStorage.setItem(LOCATION_SET_KEY, 'true');
    } catch {
      // ignore
    }
    setHasVisitedBefore(true);
  };

  const handleSelectBranchForOrder = (branchId: string) => {
    const branch = ISLAMABAD_BRANCHES.find((b) => b.id === branchId) || ISLAMABAD_BRANCHES[0];
    const newPref: UserLocationPreference = {
      ...locationPref,
      orderType: 'pickup',
      pickupBranchId: branch.id,
      sector: branch.sector,
    };
    handleSaveLocationPref(newPref);
    setActivePage('home');
    setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Determine current hotline number based on preference
  const currentBranch =
    ISLAMABAD_BRANCHES.find((b) => b.id === locationPref.pickupBranchId) || ISLAMABAD_BRANCHES[0];
  const primaryPhone = currentBranch.phone;

  const {
    cart,
    toast,
    addToCart,
    decrement,
    increment,
    remove,
    clear,
    itemCount,
    subtotal,
  } = useCart();

  return (
    <div className="min-h-screen bg-white font-sans text-ink antialiased">
      {/* Top Navbar Header */}
      <Header
        itemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
        locationPref={locationPref}
        onOpenLocationModal={() => setLocationModalOpen(true)}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main Page Routing */}
      <main>
        {activePage === 'home' && (
          <>
            <Hero
              phone={primaryPhone}
              locationPref={locationPref}
              onOpenLocationModal={() => setLocationModalOpen(true)}
            />
            <Offers />
            <MenuSection
              cart={cart}
              onAdd={addToCart}
              onDecrement={decrement}
            />
          </>
        )}

        {activePage === 'visit' && (
          <VisitUsPage onSelectBranchForOrder={handleSelectBranchForOrder} />
        )}

        {activePage === 'about' && (
          <AboutUsPage onExploreMenu={() => setActivePage('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        phone={primaryPhone}
        onNavigate={setActivePage}
        onOpenLocationModal={() => setLocationModalOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        subtotal={subtotal}
        itemCount={itemCount}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
        onClear={clear}
        phone={primaryPhone}
        locationPref={locationPref}
        onOpenLocationModal={() => setLocationModalOpen(true)}
      />

      {/* Location Selector Pop-up Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentPref={locationPref}
        onSave={handleSaveLocationPref}
        canDismiss={hasVisitedBefore}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-2xl border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
