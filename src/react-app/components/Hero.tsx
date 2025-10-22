import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <Sparkles className="h-6 w-6 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-yellow-400 font-semibold tracking-wide uppercase text-sm">
                Coleção Exclusiva
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6">
              <span className="text-white">Moda Masculina</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-6 lg:mb-8 leading-relaxed max-w-2xl">
              Descubra nossa coleção exclusiva de camisas masculinas. 
              Qualidade premium, design sofisticado e estilo incomparável 
              para o homem moderno.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-200"
              >
                Ver Coleção
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <a className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-200" href="#about">
                Sobre nós
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">2025</div>
                <div className="text-xs sm:text-sm text-gray-400">Loja Nova</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">Algodão</div>
                <div className="text-xs sm:text-sm text-gray-400">Tecido Premium</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">Premium</div>
                <div className="text-xs sm:text-sm text-gray-400">Qualidade Garantida</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="../../assets/img/logo-site.jpeg"
                alt="Logo do nosso site LG"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold shadow-lg animate-bounce">
                Novo!
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-2xl blur-3xl transform scale-110"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
