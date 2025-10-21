import { useState, useMemo } from 'react';
import { products } from '@/shared/products';
import ProductCard from './ProductCard';
import { Filter, Grid3X3, List } from 'lucide-react';
import { Product } from '@/shared/products';

interface ProductGridProps {
  searchQuery: string;
  onViewProduct: (product: Product) => void;
}

export default function ProductGrid({ searchQuery, onViewProduct }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'category'>('name');

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, sortBy]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossa <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Coleção</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra nossa seleção exclusiva de camisas masculinas premium. 
            Cada peça é cuidadosamente escolhida para oferecer estilo, qualidade e conforto.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'category')}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="price">Ordenar por Preço</option>
              <option value="category">Ordenar por Categoria</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-yellow-800">
              {filteredProducts.length} resultado(s) encontrado(s) para "<strong>{searchQuery}</strong>"
            </p>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} onViewProduct={onViewProduct} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600">
              Tente buscar por outros termos ou navegue por nossa coleção completa.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
