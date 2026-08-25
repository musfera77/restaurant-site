import { useState, useEffect, useRef } from 'react';
import { Plus, Check, Minus, Flame, Sparkles } from 'lucide-react';
import { MENU } from '@/data/menu';
import type { CartItem } from '@/types';
import { ImageWithFallback } from '@/components/ImageWithFallback';

interface MenuSectionProps {
  cart: Record<string, CartItem>;
  onAdd: (name: string, price: number) => void;
  onDecrement: (name: string) => void;
}

export function MenuSection({ cart, onAdd, onDecrement }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(MENU[0].id);
  const isClickingScroll = useRef(false);

  const scrollToCategory = (id: string) => {
    isClickingScroll.current = true;
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Header & sticky category bar offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => {
      isClickingScroll.current = false;
    }, 800);
  };

  // Scroll spy to highlight active category pill when scrolling through sections
  useEffect(() => {
    const handleScroll = () => {
      if (isClickingScroll.current) return;
      const scrollPos = window.scrollY + 200;

      for (let i = MENU.length - 1; i >= 0; i--) {
        const cat = MENU[i];
        const el = document.getElementById(cat.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveCategory(cat.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="menu" className="bg-gray-50/70 pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Complete Menu Directory
          </span>
          <h2 className="mt-3 font-display text-4xl font-black text-ink sm:text-5xl">
            Explore All Categories
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-ink-muted">
            All dishes are prepared fresh daily using prime aged beef, farm-fresh produce, and authentic live flame grilling.
          </p>
        </div>

        {/* Sticky Category Quick-Scroll Bar */}
        <div className="sticky top-16 md:top-20 z-30 mb-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-white/95 backdrop-blur-md border-y border-gray-200 shadow-sm">
          <div className="mx-auto max-w-7xl flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
            {MENU.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                      : 'border border-gray-200 bg-white text-ink-soft hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Continuous Category Sections with Custom Banners */}
        <div className="space-y-20">
          {MENU.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-36">
              {/* Category Header Banner */}
              <div className="relative mb-8 overflow-hidden rounded-3xl bg-ink shadow-lg">
                <div className="relative h-48 sm:h-56 md:h-64 w-full">
                  <ImageWithFallback
                    src={category.bannerImage}
                    alt={category.label}
                    className="h-full w-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-12 text-white max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-light">
                      {category.tagline}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold sm:text-4xl text-white">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-white/80 line-clamp-2 sm:line-clamp-3">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Grid for this Category */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item) => {
                  const inCart = cart[item.name]?.qty ?? 0;
                  return (
                    <article
                      key={item.name}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                    >
                      {/* Item Image with Fallback */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        {/* Price Badge */}
                        <span className="absolute right-3 top-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs sm:text-sm font-black text-primary shadow-md">
                          {item.priceLabel}
                        </span>

                        {/* Top Badges (Popular, Spicy, Chef Special) */}
                        <div className="absolute left-3 top-3 flex flex-col gap-1">
                          {item.badge && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md">
                              <Sparkles className="h-3 w-3" />
                              {item.badge}
                            </span>
                          )}
                          {item.isSpicy && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                              <Flame className="h-3 w-3" />
                              Spicy
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="mt-1.5 flex-1 text-xs sm:text-sm leading-relaxed text-ink-muted">
                          {item.description}
                        </p>

                        {/* Order Controls */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          {inCart === 0 ? (
                            <button
                              onClick={() => onAdd(item.name, item.price)}
                              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md active:scale-95"
                            >
                              <Plus className="h-4 w-4" />
                              Add to Order
                            </button>
                          ) : (
                            <div className="flex items-center justify-between rounded-full bg-primary-50 px-2 py-1">
                              <button
                                onClick={() => onDecrement(item.name)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-transform hover:scale-105 active:scale-95"
                                aria-label={`Remove one ${item.name}`}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="flex items-center gap-1 text-xs sm:text-sm font-black text-primary">
                                <Check className="h-3.5 w-3.5" />
                                {inCart} added
                              </span>
                              <button
                                onClick={() => onAdd(item.name, item.price)}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
                                aria-label={`Add one ${item.name}`}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
