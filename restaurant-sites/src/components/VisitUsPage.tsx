import { useState } from 'react';
import { MapPin, Phone, Clock, Sparkles, UtensilsCrossed, CheckCircle2, Compass, ExternalLink } from 'lucide-react';
import { ISLAMABAD_BRANCHES, RESTAURANT_FEATURES } from '@/data/locations';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface VisitUsPageProps {
  onSelectBranchForOrder?: (branchId: string) => void;
}

export function VisitUsPage({ onSelectBranchForOrder }: VisitUsPageProps) {
  const [selectedBranchId, setSelectedBranchId] = useState(ISLAMABAD_BRANCHES[0].id);
  const activeBranch = ISLAMABAD_BRANCHES.find((b) => b.id === selectedBranchId) || ISLAMABAD_BRANCHES[0];

  return (
    <div className="pt-20 md:pt-24 pb-20 bg-gray-50/60 min-h-screen">
      {/* Page Header Hero */}
      <section className="relative overflow-hidden bg-ink py-16 sm:py-24 text-white">
        <div className="absolute inset-0 opacity-25">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Foodie Hub fine dining interior"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-light backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Islamabad Locations &amp; Lounges
          </div>
          <h1 className="mt-4 font-display text-4xl font-black text-white sm:text-6xl">
            Visit Our Steakhouses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-white/85">
            Experience our sizzling charcoal grills, warm acoustic family dining halls, and breezy outdoor rooftop lounges across the capital.
          </p>
        </div>
      </section>

      {/* Main Branch Showcase */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-white rounded-2xl shadow-xl border border-gray-200">
          {ISLAMABAD_BRANCHES.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/30 scale-[1.02]'
                    : 'text-ink-soft hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>{branch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detail Box */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Professional Interior & Dining Photography */}
            <div className="relative h-72 lg:h-auto lg:col-span-5 bg-gray-900">
              <ImageWithFallback
                src={activeBranch.image}
                alt={activeBranch.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-black text-ink shadow-md">
                  {activeBranch.sector}
                </span>
                <p className="mt-2 text-sm font-semibold text-white/90">
                  {activeBranch.seatingCapacity}
                </p>
              </div>
            </div>

            {/* Right: Branch Info, Hours, Contact, Features */}
            <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Capital Flagship
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
                      {activeBranch.name}
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Open Daily
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Address Card */}
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      <MapPin className="h-4 w-4" />
                      Location Address
                    </div>
                    <p className="text-sm font-medium text-ink leading-relaxed">
                      {activeBranch.address}
                    </p>
                  </div>

                  {/* Contact Phone Card */}
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                      <Phone className="h-4 w-4" />
                      Direct Branch Phone
                    </div>
                    <a
                      href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-base font-bold text-primary hover:underline"
                    >
                      {activeBranch.phone}
                    </a>
                    <p className="text-xs text-ink-muted mt-1">
                      Table reservations &amp; takeaway orders
                    </p>
                  </div>

                  {/* Opening Hours */}
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:col-span-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      <Clock className="h-4 w-4" />
                      Operating &amp; Grill Hours
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {activeBranch.hours.map((h, i) => (
                        <div key={i} className="flex justify-between border-b border-gray-200 pb-1">
                          <span className="font-semibold text-ink">{h.day}:</span>
                          <span className="text-ink-muted">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dining Amenities & Features */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">
                    Branch Amenities &amp; Services
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeBranch.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-3">
                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/30 transition-transform hover:scale-105 hover:bg-primary-dark"
                >
                  <Compass className="h-4 w-4" />
                  Get Google Maps Directions
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary-50"
                >
                  <Phone className="h-4 w-4" />
                  Call {activeBranch.name.split(' ')[0]}
                </a>

                {onSelectBranchForOrder && (
                  <button
                    onClick={() => onSelectBranchForOrder(activeBranch.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ink-soft"
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                    Order Pick-Up Here
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* All Branches Overview Grid */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Full Network
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink">
              All 3 Islamabad Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ISLAMABAD_BRANCHES.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBranchId(b.id)}
                className={`cursor-pointer overflow-hidden rounded-2xl border transition-all p-5 flex flex-col justify-between ${
                  selectedBranchId === b.id
                    ? 'border-primary bg-primary-50/40 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4">
                    <ImageWithFallback
                      src={b.image}
                      alt={b.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded-full bg-black/70 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                      {b.sector}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink">{b.name}</h3>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed line-clamp-2">{b.address}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{b.phone}</span>
                  <span className="text-xs font-semibold text-ink-muted underline">
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect Features */}
        <div className="mt-20 rounded-3xl bg-white p-8 sm:p-12 border border-gray-200 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-3xl font-bold text-ink">
              The Foodie Hub Dining Experience
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Whether you are planning a weekend family dinner or a corporate lunch, here is what we guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESTAURANT_FEATURES.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-display text-base font-bold text-ink">{item.title}</h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
