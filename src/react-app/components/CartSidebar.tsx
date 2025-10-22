import type { MouseEvent } from 'react';
import { X, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/react-app/contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Seu Carrinho</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.cartId} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
                    <p className="text-sm font-bold text-yellow-600">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <p className="text-2xl text-gray-400 mb-4">🛒</p>
              <h3 className="text-xl font-semibold text-gray-800">Seu carrinho está vazio</h3>
              <p className="text-gray-500">Adicione produtos para vê-los aqui.</p>
            </div>
          )}

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-yellow-600">R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  const itemsText = cartItems
                    .map(item => `- ${item.name} (Tam: ${item.size}, Qtd: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`)
                    .join('\n');
                  const message = `Olá! Gostaria de finalizar meu pedido:\n\n${itemsText}\n\n*Total: R$ ${getTotalPrice().toFixed(2)}*`;
                  const whatsappUrl = `https://wa.me/5598991856123?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Finalizar Compra
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-3 text-sm text-gray-600 font-medium py-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
              >
                Limpar Carrinho
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}