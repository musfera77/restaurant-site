import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Phone, MessageCircle, Truck, Store, Edit3, ArrowRight } from 'lucide-react';
import type { CartItem, UserLocationPreference } from '@/types';
import { ISLAMABAD_BRANCHES } from '@/data/locations';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: Record<string, CartItem>;
  subtotal: number;
  itemCount: number;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
  phone: string;
  locationPref: UserLocationPreference;
  onOpenLocationModal: () => void;
}

export function CartDrawer({
  open,
  onClose,
  cart,
  subtotal,
  itemCount,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  phone,
  locationPref,
  onOpenLocationModal,
}: CartDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const formatPrice = (n: number) => `PKR ${n.toLocaleString()}`;

  const orderLines = Object.entries(cart).map(([name, item]) => ({
    name,
    qty: item.qty,
    price: item.price,
    lineTotal: item.qty * item.price,
  }));

  const selectedBranch = ISLAMABAD_BRANCHES.find(b => b.id === locationPref.pickupBranchId) || ISLAMABAD_BRANCHES[0];
  const targetPhone = locationPref.orderType === 'pickup' && selectedBranch?.phone ? selectedBranch.phone : phone;
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');

  // Generate WhatsApp message adhering strictly to the requested format:
  // *NEW ORDER*
  // Order Type: [Delivery / Pick-Up]
  // Selected Branch / Sector: [Selected Location]
  //
  // Items:
  // - [Item Name] (x[Qty]) - PKR [Price]
  //
  // Total Subtotal: PKR [Total]
  const generateWhatsAppMessage = () => {
    const isDelivery = locationPref.orderType === 'delivery';
    const orderTypeStr = isDelivery ? 'Delivery' : 'Pick-Up';
    const selectedLocation = isDelivery
      ? (locationPref.sector || 'I-8 Markaz')
      : `${selectedBranch.name} (${selectedBranch.sector})`;

    let text = `*NEW ORDER*\n`;
    text += `Order Type: ${orderTypeStr}\n`;
    text += `Selected Branch / Sector: ${selectedLocation}\n\n`;
    text += `Items:\n`;
    orderLines.forEach((line) => {
      text += `- ${line.name} (x${line.qty}) - PKR ${line.lineTotal.toLocaleString()}\n`;
    });
    text += `\nTotal Subtotal: PKR ${subtotal.toLocaleString()}`;

    return encodeURIComponent(text);
  };

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${generateWhatsAppMessage()}`;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed right-0 top-0 z-[90] flex h-full w-full max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Your Order Bag
              </h2>
              <p className="text-xs text-ink-muted">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-ink-muted transition-colors hover:bg-gray-200 hover:text-ink"
            aria-label="Close order bag"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Location Notice Bar */}
        <div className="flex items-center justify-between border-b border-primary/15 bg-primary-50/50 px-6 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink">
            {locationPref.orderType === 'delivery' ? (
              <Truck className="h-4 w-4 text-primary flex-shrink-0" />
            ) : (
              <Store className="h-4 w-4 text-primary flex-shrink-0" />
            )}
            <span className="truncate">
              {locationPref.orderType === 'delivery'
                ? `Delivery: ${locationPref.sector}`
                : `Pick-Up: ${selectedBranch.name.split(' ')[0]}`}
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenLocationModal();
            }}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline ml-2 cursor-pointer"
          >
            <Edit3 className="h-3 w-3" />
            Change
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {itemCount === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Your Bag is Empty
              </h3>
              <p className="mt-2 text-sm text-ink-muted max-w-xs">
                Explore our sizzling steaks, artisan smash burgers, and platters to begin your feast.
              </p>
              <button
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/30 transition-transform hover:scale-105"
              >
                Browse Menu
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {orderLines.map((line) => (
                <li
                  key={line.name}
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3.5 shadow-sm transition-all hover:border-gray-300"
                >
                  <div className="flex flex-1 flex-col min-w-0">
                    <p className="text-sm font-bold text-ink truncate">
                      {line.name}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-primary">
                      {formatPrice(line.lineTotal)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-gray-100 p-1">
                    <button
                      onClick={() => onDecrement(line.name)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink shadow-xs transition-colors hover:bg-primary-50 hover:text-primary active:scale-95 cursor-pointer"
                      aria-label={`Remove one ${line.name}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-black text-ink">
                      {line.qty}
                    </span>
                    <button
                      onClick={() => onIncrement(line.name)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-xs transition-transform hover:bg-primary-dark active:scale-95 cursor-pointer"
                      aria-label={`Add one ${line.name}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemove(line.name)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    aria-label={`Remove ${line.name} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Sticky Footer with Subtotal, WhatsApp & Call to Order actions */}
        {itemCount > 0 && (
          <div className="border-t border-gray-200 bg-white px-6 py-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Subtotal
                </span>
                <p className="text-[11px] text-emerald-700 font-medium">
                  Direct live order to kitchen
                </p>
              </div>
              <span className="font-display text-2xl font-black text-primary">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* WhatsApp Order Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/30 transition-transform hover:bg-emerald-700 hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              Order via WhatsApp
            </a>

            {/* Direct Telephone Call Action */}
            <a
              href={`tel:${cleanPhone}`}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 py-3 text-xs sm:text-sm font-bold text-primary transition-colors hover:bg-primary-50"
            >
              <Phone className="h-4 w-4" />
              Call to Order ({targetPhone})
            </a>

            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={onClear}
                className="text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear Entire Bag
              </button>
              <span className="text-[11px] text-ink-muted">
                Islamabad Hot Dispatch
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
