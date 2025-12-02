import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { products } from '@/shared/products';
import { useCart } from '@/react-app/contexts/CartContext';
import { useState, useEffect } from 'react';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import CartSidebar from '@/react-app/components/CartSidebar'; // We will create this file next

export default function ProductPage() {
  const { id } = useParams();
  const { addToCartWithQuantity, toggleFavorite, isFavorite, isInCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainDisplayedImage, setMainDisplayedImage] = useState<string>(''); // Novo estado para a imagem principal
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          currentSection="products"
          onSectionChange={() => {}}
          onCartOpen={() => setIsCartOpen(true)}
        />
        
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
            <p className="text-gray-600 mb-8">O produto que você está procurando não existe.</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar à Loja</span>
            </Link>
          </div>
        </div>
        
        <Footer />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    );
  }

  useEffect(() => {
    if (product) {
      // Define a primeira imagem do array como a imagem principal ao carregar o produto
      if (product.images && product.images.length > 0) {
        setMainDisplayedImage(product.images[0]);
      } else {
        setMainDisplayedImage(''); // Limpa se não houver imagens
      }
      // Verifica se o produto está sem estoque
      const hasStock = product.stockBySize && Object.values(product.stockBySize).some(stock => stock > 0);
      if (!hasStock) {
        setIsOutOfStock(true);
        setSelectedSize(''); // Limpa o tamanho selecionado
      } else {
        // Define um tamanho padrão que tenha estoque
        const firstAvailableSize = Object.keys(product.stockBySize || {}).find(size => (product.stockBySize?.[size] ?? 0) > 0);
        setSelectedSize(firstAvailableSize || '');
        setIsOutOfStock(false);
      }
    }
  }, [product]); // Este useEffect é executado quando o 'product' muda
  const sizes = ['P', 'M', 'G', 'GG'];
  const isFav = isFavorite(product.id);
  const inCart = isInCart(product.id, selectedSize);

  const stockForSelectedSize = product.stockBySize?.[selectedSize] ?? 0;
  const handleAddToCart = () => {
    addToCartWithQuantity({ ...product, size: selectedSize }, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        currentSection="products"
        onSectionChange={() => {}}
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-yellow-600 transition-colors duration-200">
              Início
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>

          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar à Loja</span>
          </Link>

          {/* Product Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative">
                <img // Usar a imagem do estado
                  src={mainDisplayedImage}
                  alt={product.name} // Alt text permanece o mesmo
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-200 shadow-lg ${
                    isFav 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2"> {/* Ajustado gap para consistência com ProductModal */}
                {product.images.map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`aspect-square bg-gray-100 rounded-lg cursor-pointer transition-all duration-200 ${ // Ajustado rounded para consistência
                      imgUrl === mainDisplayedImage ? 'ring-2 ring-yellow-500' : 'hover:ring-2 hover:ring-yellow-400'
                    }`}
                    onClick={() => setMainDisplayedImage(imgUrl)} // Ao clicar, define esta imagem como a principal
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100" // Ajustado rounded para consistência
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-gray-600 ml-2">(sem avaliação)</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tamanho</h3>
                {isOutOfStock ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                    <p className="font-semibold text-red-600">Produto Esgotado</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setQuantity(1); // Reseta a quantidade ao trocar de tamanho
                        }}
                        disabled={!product.stockBySize || (product.stockBySize[size] ?? 0) === 0}
                        className={`py-4 px-6 border-2 rounded-xl font-semibold transition-all duration-200 ${
                          selectedSize === size
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-600'
                            : 'border-gray-300 text-gray-600 hover:border-yellow-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quantidade</h3>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border-2 border-gray-300 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= stockForSelectedSize}
                      className="p-3 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="text-gray-600 text-lg">
                    Subtotal: <span className="font-semibold">R$ {(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || !selectedSize}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-5 px-8 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-lg">
                    {isOutOfStock ? 'Produto Indisponível' : (inCart ? 'Adicionar Mais ao Carrinho' : 'Adicionar ao Carrinho')}
                  </span>
                </button>
                
                <button
                  disabled={isOutOfStock || !selectedSize}
                  className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-5 px-8 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-lg disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Comprar Agora
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Características</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <Shield className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Qualidade Premium</p>
                      <p className="text-sm text-gray-600">Tecidos selecionados</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <Truck className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Não temos entrega</p>
                      <p className="text-sm text-gray-600">Tenha um boa experiência!!</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <RotateCcw className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Troca apenas com nota fiscal</p>
                      <p className="text-sm text-gray-600">Sem complicação</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sem avaliação</p>
                      <p className="text-sm text-gray-600">seja o primeiro a comprar!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
