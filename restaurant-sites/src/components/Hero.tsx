import { useState, useEffect } from 'react';
import { Phone, UtensilsCrossed, Sparkles, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { UserLocationPreference } from '@/types';

interface HeroProps {
  phone: string;
  locationPref: UserLocationPreference;
  onOpenLocationModal: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85',
    alt: 'Flame-sizzling prime steak platter with rosemary and roasted garlic',
    caption: 'Prime Aged Cuts & Charcoal Sizzlers',
  },
  {
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=85',
    alt: 'Live smoke and flame grilled BBQ skewers and meats',
    caption: 'Authentic Live-Grill Flavours',
  },
  {
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1920&q=85',
    alt: 'Gourmet handcrafted burgers with artisanal brioche and melted cheese',
    caption: 'Artisan Gourmet Burgers & Wraps',
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
    alt: 'Foodie Hub warm dining atmosphere and open grill room',
    caption: 'Islamabad’s Favorite Steakhouse Experience',
  },
];

export function Hero({ phone, locationPref, onOpenLocationModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="top"
      className="relative min-h-[90vh] sm:min-h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="h-full w-full object-cover transform scale-105 transition-transform duration-10000"
          />
          {/* Dark gradient overlay for pristine typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        </div>
      ))}

      {/* Slider Left / Right Navigation */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110"
        aria-label="Previous background slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110"
        aria-label="Next background slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] sm:min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6 lg:px-8">
        {/* Quality Tagline Badge - (Replaced old Foodpanda badge) */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-bold tracking-widest text-white uppercase sm:text-sm">
            Islamabad’s Prime Steakhouse &amp; BBQ
          </span>
        </div>

        <h1 className="font-display text-5xl font-black tracking-tight text-white drop-shadow-2xl sm:text-7xl md:text-8xl">
          Foodie Hub
        </h1>

        <p className="mt-3 font-display text-xl font-semibold text-accent-light sm:text-2xl md:text-3xl">
          Steakhouse &middot; Live BBQ &middot; Gourmet Comfort
        </p>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          Flame-grilled steaks, hand-smashed burgers, sizzling platters and artisanal mocktails.
          Serving all sectors across Islamabad with hot doorstep delivery and upscale dining.
        </p>

        {/* Current Location / Sector Badge in Hero */}
        <button
          onClick={onOpenLocationModal}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md border border-white/20 hover:border-accent hover:text-accent transition-colors"
        >
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span>
            {locationPref.orderType === 'delivery' ? 'Delivering to: ' : 'Pickup at: '}
            <strong className="text-white underline underline-offset-2">{locationPref.sector}</strong>
          </span>
          <span className="text-[11px] text-accent font-semibold ml-1">(Change)</span>
        </button>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col w-full sm:w-auto gap-4 sm:flex-row justify-center">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-primary/40 transition-transform hover:scale-105 hover:bg-primary-dark"
          >
            <Phone className="h-5 w-5" />
            Call to Order
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-white/15 px-8 py-3.5 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
          >
            <UtensilsCrossed className="h-5 w-5" />
            Explore Full Menu
          </a>
        </div>

        {/* Slide Indicators & Caption */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-xs font-medium tracking-wide text-white/70">
            {HERO_SLIDES[currentSlide].caption}
          </p>
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-8 bg-accent' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
