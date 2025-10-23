import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/shared/products';
import { useCart } from '@/react-app/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

export default function ProductCard({ product, onViewProduct }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img // Usar a primeira imagem do array
          src={product.images[0] || ''} // Adicionado fallback para string vazia caso o array esteja vazio
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Minimalist Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <div className="flex space-x-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onViewProduct(product);
              }}
              className="px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-110 shadow-lg text-sm font-medium"
              title="Visualizar produto"
            >
              VER PRODUTO
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleFavorite(product);
              }}
              className={`p-3 backdrop-blur-md rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
                isFavorite(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-black/40 text-white hover:bg-red-500'
              }`}
              title={isFavorite(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addToCart(product);
              }}
              className="p-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 shadow-lg"
              title="Adicionar ao carrinho"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-1.5 rounded-full font-bold text-base shadow-lg group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300">
          R$ {product.price.toFixed(2)}
        </div>
      </div>
      
      {/* Content with subtle dark overlay on hover */}
      <div className="relative p-4 sm:p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-yellow-700/80 transition-colors duration-300">
            {product.description}
          </p>
        </div>
        
        {/* Visual Element */}
        <div className="mt-4 flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm text-gray-600 font-medium">Estilo Premium</span>
        </div>
      </div>
      
      {/* Subtle Golden Border Glow */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-yellow-400/30 transition-all duration-500"></div>
    </div>
  );
}
