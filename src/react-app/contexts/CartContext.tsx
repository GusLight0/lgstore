import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/shared/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isFav = prev.some(fav => fav.id === product.id);
      if (isFav) {
        return prev.filter(fav => fav.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
      isFavorite,
      isInCart,
      getTotalItems,
      getTotalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
