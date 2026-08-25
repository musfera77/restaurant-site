export interface MenuItem {
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  badge?: string;
  isSpicy?: boolean;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  tagline: string;
  description: string;
  bannerImage: string;
  items: MenuItem[];
}

export interface BranchLocation {
  id: string;
  name: string;
  sector: string;
  address: string;
  phone: string;
  hours: { day: string; time: string }[];
  diningType: string;
  features: string[];
  image: string;
  googleMapsUrl: string;
  seatingCapacity: string;
}

export interface UserLocationPreference {
  orderType: 'delivery' | 'pickup';
  city: 'Islamabad';
  sector: string;
  streetAddress?: string;
  pickupBranchId?: string;
  customerName?: string;
  customerPhone?: string;
  specialInstructions?: string;
}

export interface CartItem {
  price: number;
  qty: number;
}

export type ActivePage = 'home' | 'visit' | 'about';
