// ...existing code...
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, Minus, Plus, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product } from '@/shared/products';
import { useCart } from '@/react-app/contexts/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCartWithQuantity, toggleFavorite, isFavorite, isInCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      const defaultSize = product.availableSizes?.[0] ?? 'M';
      setSelectedSize(defaultSize);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const sizesToDisplay = product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes : ['P', 'M', 'G', 'GG'];
  const isFav = isFavorite(product.id); // Correctly uses isFavorite from context
  const inCartWithSize = isInCart(product.id, selectedSize); // Uses isInCart from context
  
  const handleAddToCart = () => {
    const itemToAdd = { ...product, size: selectedSize };
    addToCartWithQuantity(itemToAdd, quantity);
    setQuantity(1);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do produto ${product.name}`}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fadeInUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Detalhes do Produto</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" aria-label="Fechar">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-4">
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-2xl shadow-lg" />
              <button
                onClick={() => toggleFavorite(product)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                  isFav ? 'bg-red-500 text-white shadow-lg' : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
                aria-pressed={isFav}
                aria-label={isFav ? 'Remover favorito' : 'Adicionar favorito'}
              >
                <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg cursor-pointer hover:ring-2 hover:ring-yellow-400 transition-all duration-200">
                  <img src={product.image} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  R$ {product.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-gray-600 text-sm ml-2">(Sem avaliações)</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tamanho</h3>
              <div className="flex flex-wrap gap-2">
                {sizesToDisplay.map((size) => {
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border-2 rounded-lg font-semibold transition-all duration-200 ${
                        selectedSize === size ? 'border-yellow-500 bg-yellow-50 text-yellow-600' : 'border-gray-300 text-gray-600'
                      } hover:border-yellow-400`}
                      // No need for disabled state here, as we only render available sizes
                      // If a product has no availableSizes, it will default to P, M, G, GG
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantidade</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100 transition-colors duration-200" aria-label="Diminuir quantidade">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100 transition-colors duration-200" aria-label="Aumentar quantidade">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-600">Subtotal: R$ {(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{inCartWithSize ? 'Adicionar Mais ao Carrinho' : 'Adicionar ao Carrinho'}</span>
              </button>

              <button
                onClick={() => {
                  const message = `Olá! Gostaria de comprar:\n\n${product.name} - R$ ${product.price.toFixed(2)} (Qtd: ${quantity}) (Tam: ${selectedSize})\n\nTotal: R$ ${(product.price * quantity).toFixed(2)}`;
                  const whatsappUrl = `https://wa.me/5598991856123?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Comprar Agora
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Qualidade Premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Apenas retirada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Troca apenas com nota fiscal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Sem avaliação</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...