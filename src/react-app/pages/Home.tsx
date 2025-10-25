import { useState, useEffect } from 'react';
import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import ProductGrid from '@/react-app/components/ProductGrid';
import About from '@/react-app/components/About';
import Footer from '@/react-app/components/Footer';
import ProductModal from '@/react-app/components/ProductModal';
import CartSidebar from '@/react-app/components/CartSidebar';
import { Product } from '@/shared/products';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleShopNow = () => {    
    // Smooth scroll to products section
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionChange = (section: string) => {
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observer para detectar qual seção está ativa baseado no scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && sectionId !== 'footer') {
              setCurrentSection(sectionId);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Trigger quando a seção está 20% visível do topo
        threshold: 0.1
      }
    );

    // Observar todas as seções
    const sections = ['home', 'products', 'about'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onCartOpen={handleCartOpen}
      />
      
      <main>
        {/* Home Section */}
        <section id="home" className="pt-16">
          <Hero onShopNow={handleShopNow} />
        </section>
        {/* Products Section */}
        <section id="products">
          <ProductGrid searchQuery={searchQuery} onViewProduct={handleViewProduct} />
        </section>
        {/* About Section */}
        <section id="about">
          <About />
        </section>
      </main>

      {/* Footer Section */}
      <section id="footer">
        <Footer />
      </section>

      {/* Modals and Sidebars */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCartClose}
      />
    </div>
  );
}
