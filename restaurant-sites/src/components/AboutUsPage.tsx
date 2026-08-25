import { Flame, Award, HeartHandshake, Sparkles, ChefHat, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface AboutUsPageProps {
  onExploreMenu: () => void;
}

export function AboutUsPage({ onExploreMenu }: AboutUsPageProps) {
  return (
    <div className="pt-20 md:pt-24 pb-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-ink py-16 sm:py-24 text-white">
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Chef preparing flame-grilled cuts"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-light backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Our Heritage &amp; Passion
          </div>
          <h1 className="mt-4 font-display text-4xl font-black text-white sm:text-6xl tracking-tight">
            Crafting the Perfect Flame
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
            Born out of an obsession with aged prime steaks, smoky charcoal embers, and artisanal comfort food in the heart of Islamabad.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                The Foodie Hub Journey
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-ink">
                Redefining the Steakhouse Experience in Islamabad
              </h2>
              <p className="mt-4 text-base text-ink-soft leading-relaxed">
                Foodie Hub began with a simple yet uncompromising philosophy: steak is not just food—it is an art form of temperature, seasoning, smoke, and patience.
              </p>
              <p className="mt-3 text-base text-ink-muted leading-relaxed">
                Over the years, we expanded from our flagship in I-8 Markaz to upscale lounges in F-7 and DHA Phase 2, uniting meat lovers, families, and foodies across the twin cities. Every cut of beef is hand-selected, wet-aged for peak tenderness, and flame-seared over glowing charcoal grids.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-primary/15 bg-primary-50/50 p-4">
                  <div className="font-display text-2xl sm:text-3xl font-black text-primary">100%</div>
                  <p className="text-xs font-semibold text-ink-soft mt-1">Prime Halal Certified Beef &amp; Poultry</p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-primary-50/50 p-4">
                  <div className="font-display text-2xl sm:text-3xl font-black text-primary">35 Mins</div>
                  <p className="text-xs font-semibold text-ink-soft mt-1">Hot Insulated Sector Dispatch</p>
                </div>
              </div>
            </div>

            {/* Visual Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/5]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                    alt="Charcoal BBQ Grill"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/3]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                    alt="Gourmet Smash Burger"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/3]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                    alt="Dining Room Ambiance"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/5]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80"
                    alt="Chef Fillet Mignon"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Pillars */}
      <section className="bg-gray-50 py-16 sm:py-20 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Our Culinary Code
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black text-ink">
              The 4 Pillars of Every Dish
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Hardwood Charcoal</h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                We sear our steaks and skewers over red-hot natural lump charcoal to infuse authentic smokiness that gas grills cannot replicate.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Hand-Selected Cuts</h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                Only the finest tenderloin fillets, ribeyes, and chicken breasts make the grade, prepared with precision by our seasoned master butchers.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ChefHat className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Secret House Rubs</h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                Our house spice blends, chimichurri, peppercorn reduction, and smokey chipotle relishes are crafted fresh daily from scratch.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">Warm Capital Hospitality</h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                Spacious family halls, dedicated staff, attentive service, and swift doorstep delivery that respects your time and dining comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action to Explore Menu */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-primary p-8 sm:p-12 text-white shadow-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-black">
              Ready to Taste the Difference?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/90">
              Browse our complete Islamabad menu with sizzling steaks, loaded burgers, fresh pasta, and appetizers.
            </p>
            <div className="mt-6">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-primary shadow-lg transition-transform hover:scale-105"
              >
                Browse Menu &amp; Order
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
