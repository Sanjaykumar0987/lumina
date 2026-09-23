export type FlavorId = 'void' | 'strawberry' | 'badam' | 'rose' | 'geerthanda' | 'chocolate';

export interface FlavorProduct {
  id: FlavorId;
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  price: number;
  description: string;
  bottleImage: string;
  studioImage: string;
  accentColor: string;
  accentRgb: [number, number, number]; // 0.0 - 1.0 for WebGL
  glowColor: string;
  bgGradient: string;
  ingredients: string[];
  details: {
    volume: string;
    shelfLife: string;
    coldPressed: boolean;
    flavorNotes: string[];
    energy: string;
  };
  servingNotes: string[];
  icon: string;
}

export interface CartItem {
  product: FlavorProduct;
  quantity: number;
}

export interface OrderFormData {
  email: string;
  newsletter: boolean;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
}

export type ActiveScreen = 'hero' | 'collection' | 'lab' | 'checkout';
