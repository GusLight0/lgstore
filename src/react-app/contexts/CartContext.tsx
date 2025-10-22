import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/shared/products';

export type CartItem = Product & { quantity: number; size?: string; cartId: string };

interface CartContextType {
  cartItems: CartItem[];
  favorites: Product[];
  addToCart: (product: Product & { size?: string }) => void;
  addToCartWithQuantity: (product: Product & { size?: string }, quantity: number) => void;
  removeFromCart: (cartIdOrId: string | number) => void;
  updateQuantity: (cartIdOrId: string | number, quantity: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  isInCart: (productId: number | string, size?: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const makeCartId = (product: Product & { size?: string }) =>
    `${product.id}-${product.size ?? 'default'}`;

  const addToCart = (product: Product & { size?: string }) => {
    const cartId = makeCartId(product);
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.cartId === cartId);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...product, quantity: 1, size: product.size, cartId }];
    });
  };

  const addToCartWithQuantity = (product: Product & { size?: string }, quantity: number) => {
    if (quantity <= 0) return;
    const cartId = makeCartId(product);
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.cartId === cartId);
      if (idx > -1) {
        const copy = [...prev];
        const newQuantity = copy[idx].quantity + quantity;
        copy[idx] = { ...copy[idx], quantity: newQuantity };
        return copy;
      }
      return [...prev, { ...product, quantity, size: product.size, cartId }];
    });
  };

  const removeFromCart = (cartIdOrId: string | number) => {
    setCartItems(prev => {
      if (typeof cartIdOrId === 'number' || /^\d+$/.test(String(cartIdOrId))) {
        // backward-compatible: remove by product id
        return prev.filter(i => String(i.id) !== String(cartIdOrId));
      }
      return prev.filter(i => i.cartId !== String(cartIdOrId));
    });
  };

  const updateQuantity = (cartIdOrId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartIdOrId);
      return;
    }
    setCartItems(prev =>
      prev.map(i => {
        const match =
          typeof cartIdOrId === 'number' || /^\d+$/.test(String(cartIdOrId))
            ? String(i.id) === String(cartIdOrId)
            : i.cartId === String(cartIdOrId);
        return match ? { ...i, quantity: Math.max(1, quantity) } : i;
      })
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === product.id);
      if (exists) return prev.filter(f => f.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (productId: number) => favorites.some(f => f.id === productId);

  const isInCart = (productId: number | string, size?: string) =>
    cartItems.some(i => String(i.id) === String(productId) && (size ? i.size === size : true));

  const getTotalItems = () => cartItems.reduce((t, i) => t + i.quantity, 0);

  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favorites,
        addToCart,
        addToCartWithQuantity,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        isFavorite,
        isInCart,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
}
// ...existing code...
