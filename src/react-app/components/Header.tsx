import { Search, ShoppingBag, Menu } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/react-app/contexts/CartContext';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  currentSection: string;
  onSectionChange: (section: string) => void;
  onCartOpen: () => void;
}

export default function Header({ onSearchChange, searchQuery, currentSection, onSectionChange, onCartOpen }: HeaderProps) {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Início' },
    { id: 'products', label: 'Camisas Masculinas' },
    { id: 'about', label: 'Sobre Nossa Loja' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => onSectionChange('home')}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-black to-yellow-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow group-hover:scale-105 transition-transform duration-200">
              LG's
            </h1>
            <p className="text-xs text-gray-600 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Moda Masculina Premium
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  currentSection === section.id
                    ? 'text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar camisas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-48 lg:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:border-yellow-400"
              />
            </div>

            {/* Cart */}
            <button 
              onClick={onCartOpen}
              className="relative p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-2">
              {/* Mobile Search */}
              <div className="relative sm:hidden mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar camisas..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    currentSection === section.id
                      ? 'text-yellow-600 bg-yellow-50'
                      : 'text-gray-700 hover:text-yellow-600 hover:bg-yellow-50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
