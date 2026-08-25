import { RESTAURANT_FEATURES } from '@/data/locations';
import { Sparkles } from 'lucide-react';

export function Offers() {
  return (
    <section id="offers" className="bg-white py-16 sm:py-20 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Unmatched Quality &amp; Taste
          </span>
          <h2 className="mt-2 font-display text-3xl font-black text-ink sm:text-4xl">
            Why Islamabad Chooses Foodie Hub
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-ink-muted">
            From charcoal sizzlers to swift insulated delivery, we ensure every meal is a memorable celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {RESTAURANT_FEATURES.map((f, idx) => (
            <div
              key={idx}
              className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl"
            >
              <span className="text-3xl sm:text-4xl transition-transform group-hover:scale-110 flex-shrink-0">
                {f.icon}
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
