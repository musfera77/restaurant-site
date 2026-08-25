import { useState, useEffect } from 'react';
import { MapPin, Navigation, Truck, Store, Check, X, ShieldCheck, Clock, Phone, Loader2 } from 'lucide-react';
import { ISLAMABAD_SECTORS, ISLAMABAD_BRANCHES } from '@/data/locations';
import type { UserLocationPreference } from '@/types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPref: UserLocationPreference;
  onSave: (pref: UserLocationPreference) => void;
  canDismiss?: boolean;
}

export function LocationModal({
  isOpen,
  onClose,
  currentPref,
  onSave,
  canDismiss = true,
}: LocationModalProps) {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>(currentPref.orderType || 'delivery');
  const [selectedCity] = useState<'Islamabad'>('Islamabad');
  const [sector, setSector] = useState(currentPref.sector || ISLAMABAD_SECTORS[0]);
  const [pickupBranchId, setPickupBranchId] = useState(
    currentPref.pickupBranchId || ISLAMABAD_BRANCHES[0].id
  );
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoFeedback, setGeoFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setOrderType(currentPref.orderType || 'delivery');
      setSector(currentPref.sector || ISLAMABAD_SECTORS[0]);
      setPickupBranchId(currentPref.pickupBranchId || ISLAMABAD_BRANCHES[0].id);
      setGeoFeedback(null);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, currentPref]);

  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    setGeoLocating(true);
    setGeoFeedback(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setGeoLocating(false);
          setSector(ISLAMABAD_SECTORS[0]); // Defaults smoothly to primary Islamabad central sector
          setGeoFeedback('Current location detected: Islamabad (I-8 Markaz)');
        },
        () => {
          // Fallback if permission denied or unavailable
          setGeoLocating(false);
          setSector(ISLAMABAD_SECTORS[0]);
          setGeoFeedback('Location set to: Islamabad (I-8 Markaz)');
        },
        { timeout: 5000 }
      );
    } else {
      setGeoLocating(false);
      setSector(ISLAMABAD_SECTORS[0]);
      setGeoFeedback('Location set to: Islamabad (I-8 Markaz)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPref: UserLocationPreference = {
      orderType,
      city: 'Islamabad',
      sector: orderType === 'delivery' ? sector : (ISLAMABAD_BRANCHES.find(b => b.id === pickupBranchId)?.sector || 'I-8 Markaz'),
      pickupBranchId: orderType === 'pickup' ? pickupBranchId : undefined,
    };
    onSave(updatedPref);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (canDismiss) onClose();
        }}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light px-6 py-6 text-white sm:px-8">
          {canDismiss && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
              <MapPin className="h-5 w-5 text-accent-light" />
            </span>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent-light">
              <ShieldCheck className="h-3.5 w-3.5" />
              Islamabad Capital Territory
            </div>
          </div>

          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Select Your Dining Experience
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Choose your preferred delivery sector or pick-up branch.
          </p>

          {/* Mode Switcher */}
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-black/20 p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                orderType === 'delivery'
                  ? 'bg-white text-primary shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Truck className="h-4 w-4" />
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                orderType === 'pickup'
                  ? 'bg-white text-primary shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Store className="h-4 w-4" />
              Pick-Up
            </button>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto p-6 sm:p-8">
          {orderType === 'delivery' ? (
            <div className="space-y-4">
              {/* Use Current Location Button */}
              <div>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={geoLocating}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-primary-50/60 px-4 py-3 text-sm font-bold text-primary transition-all hover:bg-primary-50 hover:border-primary/40 active:scale-[0.99] disabled:opacity-70"
                >
                  {geoLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <Navigation className="h-4 w-4 text-primary" />
                  )}
                  {geoLocating ? 'Detecting Location...' : 'Use Current Location'}
                </button>
                {geoFeedback && (
                  <p className="mt-1.5 text-center text-xs font-semibold text-emerald-700">
                    ✓ {geoFeedback}
                  </p>
                )}
              </div>

              {/* Select City Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Select City <span className="text-primary">*</span>
                </label>
                <select
                  value={selectedCity}
                  disabled
                  className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm font-semibold text-ink shadow-xs"
                >
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>

              {/* Select Sector Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                  Select Sector <span className="text-primary">*</span>
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  {ISLAMABAD_SECTORS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Primary Select Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl active:scale-[0.99]"
                >
                  <Check className="h-5 w-5" />
                  Select
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-soft mb-2">
                  Select Islamabad Branch <span className="text-primary">*</span>
                </label>
                <div className="space-y-2.5">
                  {ISLAMABAD_BRANCHES.map((b) => (
                    <label
                      key={b.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition-all ${
                        pickupBranchId === b.id
                          ? 'border-primary bg-primary-50/50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="branch"
                        value={b.id}
                        checked={pickupBranchId === b.id}
                        onChange={() => setPickupBranchId(b.id)}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-ink">{b.name}</p>
                          {pickupBranchId === b.id && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-ink-muted">{b.address}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-ink-soft">
                          <span className="inline-flex items-center gap-1 font-semibold text-primary">
                            <Phone className="h-3 w-3" />
                            {b.phone}
                          </span>
                          <span className="inline-flex items-center gap-1 text-ink-muted">
                            <Clock className="h-3 w-3" />
                            {b.hours[0]?.time}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Primary Confirm Branch Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-xl active:scale-[0.99]"
                >
                  <Check className="h-5 w-5" />
                  Confirm Branch
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
