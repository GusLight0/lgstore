import { Shield, Award, Truck, Users } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Qualidade Premium',
      description: 'Tecidos de alta qualidade selecionados criteriosamente para durabilidade e conforto.'
    },
    {
      icon: Award,
      title: 'Design Exclusivo',
      description: 'Modelos únicos desenvolvidos por uma loja parceira especializadas em modas.'
    },
    {
      icon: Truck,
      title: 'Retirada na Loja',
      description: 'Teremos uma ponto de retirada na nossa loja localizada na Liana Store, nossa loja ainda não possuí envios de camisas.'
    },
    {
      icon: Users,
      title: 'Atendimento VIP',
      description: 'Suporte personalizado para garantir a melhor experiência de compra.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              Sobre a <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">LG Store</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                A LG Store nasceu da paixão por oferecer moda masculina de alta qualidade 
                com design sofisticado e preços justos. Acreditamos que todo homem merece 
                se vestir bem e se sentir confiante.
              </p>
              
              <p>
                Nossa missão é democratizar o acesso à moda premium, oferecendo camisas 
                masculinas que combinam estilo, conforto e durabilidade. Cada peça é 
                cuidadosamente selecionada pensando no homem moderno que valoriza qualidade.
              </p>
              
              <p>
                Com foco na excelência e no atendimento personalizado, construímos 
                relacionamentos duradouros com nossos clientes, sempre buscando superar 
                expectativas e criar experiências memoráveis.
              </p>

              <p>
                Vamos iniciar nossos projetos começando pela revenda de camisas 100% algodão com estilos incríveis,
                conforme o avanço da loja, criaremos nossas próprias camisas estilos Oversized e Streetwear, e por último
                nossa loja física exclusiva.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nossa Visão</h3>
              <p className="text-gray-700">
                Ser reconhecida como a principal referência em moda masculina premium no Brasil, 
                transformando a forma como os homens se relacionam com o vestuário.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
              alt="Loja LG Store"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
            />
            
            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">2025</div>
                  <div className="text-sm text-gray-600">Recentemente</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">100%</div>
                  <div className="text-sm text-gray-600">Aprovado</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 hover:scale-105 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
            Nossa <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Equipe</span>
          </h3>
          
          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: 'Gustavo Soares',
                role: 'Fundador & Design',
                image: './assets/img/foto-minha.png'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
