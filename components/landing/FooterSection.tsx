import React from "react";

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
              <h3 className="text-xl font-bold text-white">FinanciaPYME</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Impulsando el crecimiento de PYMEs argentinas con soluciones
              financieras accesibles.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Productos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Préstamos PYME
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Línea de Crédito
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Leasing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nuestro Equipo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>📞 0800-123-4567</li>
              <li>✉️ ayuda@financiapyme.com</li>
              <li>📍 Av. Corrientes 1234, CABA</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2025 FinanciaPYME. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
