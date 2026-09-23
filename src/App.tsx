/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, CartItem, FlavorId, FlavorProduct, OrderFormData } from './types';
import { FLAVOR_PRODUCTS } from './data/products';
import { BackgroundShader } from './components/BackgroundShader';
import { Navbar } from './components/Navbar';
import { HeroScreen } from './components/HeroScreen';
import { CollectionScreen } from './components/CollectionScreen';
import { FlavorLabScreen } from './components/FlavorLabScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { StoryScienceModal } from './components/StoryScienceModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('hero');
  const [selectedFlavorId, setSelectedFlavorId] = useState<FlavorId>('strawberry');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'story' | 'science' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Prepopulate cart with items from the initial design reference (Strawberry x 2, Badam x 1)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const strawberry = FLAVOR_PRODUCTS.find((p) => p.id === 'strawberry');
    const badam = FLAVOR_PRODUCTS.find((p) => p.id === 'badam');
    const initial: CartItem[] = [];
    if (strawberry) initial.push({ product: strawberry, quantity: 2 });
    if (badam) initial.push({ product: badam, quantity: 1 });
    return initial;
  });

  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    form: OrderFormData;
    items: CartItem[];
    total: number;
  } | null>(null);

  // Scroll to top on screen transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  // Active product derived from selectedFlavorId
  const selectedProduct: FlavorProduct =
    selectedFlavorId === 'void'
      ? {
          ...FLAVOR_PRODUCTS[0],
          id: 'void',
          subtitle: 'The Void',
          name: 'The Void Reserve',
          category: 'Absolute Origin',
          tagline: 'Zero light, infinite depth.',
          description:
            'A nocturnal botanical extract distilled in total darkness. Notes of roasted black sesame, charred cocoa bean, and cold glacial mineral water.',
          accentColor: '#ffffff',
          accentRgb: [0.15, 0.15, 0.18],
          glowColor: 'rgba(255, 255, 255, 0.25)',
        }
      : FLAVOR_PRODUCTS.find((p) => p.id === selectedFlavorId) || FLAVOR_PRODUCTS[0];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: FlavorProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setToastMessage(`Added ${quantity} × ${product.subtitle} to your collection bag`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setToastMessage('Item removed from bag');
  };

  // WhatsApp Order formatting
  const handleOrderWhatsAppSingle = (product: FlavorProduct, quantity: number = 1) => {
    const text = `Hello LUMINA,%20I%20would%20like%20to%20order%20${quantity}%20x%20${encodeURIComponent(
      product.name
    )}%20($${(product.price * quantity).toFixed(2)}).%20Please%20confirm%20availability.`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleOrderWhatsAppCart = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map((item) => `• ${item.quantity}x ${item.product.subtitle} ($${(item.product.price * item.quantity).toFixed(2)})`)
      .join('%0A');
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const text = `Hello LUMINA,%20I%20would%20like%20to%20order%20via%20WhatsApp:%0A${itemsList}%0A%0ASubtotal:%20$${subtotal.toFixed(
      2
    )}%0APlease%20provide%20delivery%20coordinates.`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Place Order Handler
  const handlePlaceOrder = (formData: OrderFormData) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8.0;
    const total = subtotal + shipping;
    const orderId = `LUMINA-${Math.floor(10000 + Math.random() * 90000)}-VOID`;

    setCompletedOrder({
      orderId,
      form: formData,
      items: [...cart],
      total,
    });
    setCart([]);
  };

  return (
    <div className="relative min-h-screen bg-[#0e0e0e] text-[#e5e2e1] selection:bg-[#c9c6c5] selection:text-[#141313] flex flex-col font-sans">
      {/* Real WebGL fluid/smoke background shader tinted by active flavor */}
      <BackgroundShader accentRgb={selectedProduct.accentRgb} />

      {/* Shared Luxury Navigation Bar */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={(screen) => setActiveScreen(screen)}
        cartCount={totalCartCount}
        onOpenCart={() => setActiveScreen('checkout')}
        onOpenStory={() => setModalMode('story')}
        onOpenScience={() => setModalMode('science')}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Screen Views Container */}
      <main className="flex-1 relative z-10">
        {activeScreen === 'hero' && (
          <HeroScreen
            selectedFlavor={selectedProduct}
            onSelectFlavorId={(id) => setSelectedFlavorId(id)}
            onExploreCollection={() => setActiveScreen('collection')}
            onOpenLab={() => setActiveScreen('lab')}
          />
        )}

        {activeScreen === 'collection' && (
          <CollectionScreen
            products={FLAVOR_PRODUCTS}
            onSelectFlavor={(product) => {
              setSelectedFlavorId(product.id);
              setActiveScreen('lab');
            }}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onOrderWhatsApp={(product) => handleOrderWhatsAppSingle(product, 1)}
          />
        )}

        {activeScreen === 'lab' && (
          <FlavorLabScreen
            products={FLAVOR_PRODUCTS}
            selectedProduct={selectedProduct}
            onSelectFlavorId={(id) => setSelectedFlavorId(id)}
            onAddToCartWithQty={(product, qty) => handleAddToCart(product, qty)}
            onOrderWhatsAppWithQty={(product, qty) => handleOrderWhatsAppSingle(product, qty)}
            onGoToCheckout={() => setActiveScreen('checkout')}
          />
        )}

        {activeScreen === 'checkout' && (
          <CheckoutScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onPlaceOrder={handlePlaceOrder}
            onWhatsAppCheckout={handleOrderWhatsAppCart}
            onContinueShopping={() => setActiveScreen('collection')}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={(screen) => setActiveScreen(screen)}
        onOpenStory={() => setModalMode('story')}
        onOpenScience={() => setModalMode('science')}
      />

      {/* Story & Science Informational Dialog */}
      <StoryScienceModal
        mode={modalMode}
        onClose={() => setModalMode(null)}
      />

      {/* Order Confirmation Modal */}
      <OrderSuccessModal
        orderData={completedOrder}
        onClose={() => {
          setCompletedOrder(null);
          setActiveScreen('collection');
        }}
      />

      {/* Cart Feedback Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          actionText="View Bag"
          onAction={() => setActiveScreen('checkout')}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
