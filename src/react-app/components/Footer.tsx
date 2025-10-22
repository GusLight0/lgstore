import { MapPin, Phone, Mail, Clock } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              LG Store
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Moda masculina premium com qualidade excepcional e design sofisticado. 
              Vista-se bem, sinta-se confiante.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-yellow-600 rounded-lg transition-colors duration-200 hover:scale-110 transform"
              >
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                'Início',
                'Camisas Masculinas',
                'Sobre Nossa Loja'
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 break-words">
                    Bequimão, rua 51, qd 55<br />
                    Liana Store, São Luís - MA<br />
                    CEP: 65062-470
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300 break-words">(98) 9 9185-6123 <br /><strong>RECOMENDADO</strong></span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-gray-300 break-words">gle09062024@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Store Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Horário de Funcionamento</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="text-gray-300">
                  <p><strong>Segunda à Sexta:</strong><br />atendimento online <strong>(WhatsApp)</strong></p>
                  <p className="mt-2"><strong>Sábado:</strong><br />9h às 16h</p>
                  <p className="mt-2"><strong>Domingo:</strong><br />Fechado</p>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 LG Store. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Desenvolvido com ❤️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </footer>
  );
}
