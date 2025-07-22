import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              Voitto <span className="text-orange-500">Company Limited</span>
            </div>
            <p className="text-slate-300 mb-4">
              Kenya's trusted supplier of quality construction materials and precast products. 
              Building stronger foundations for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-slate-300 hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="/products" className="text-slate-300 hover:text-orange-500 transition-colors">Products</a></li>
              <li><a href="/about" className="text-slate-300 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-slate-300 hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Concrete Mix</span></li>
              <li><span className="text-slate-300">Cabros</span></li>
              <li><span className="text-slate-300">Cement</span></li>
              <li><span className="text-slate-300">Steel Rods</span></li>
              <li><span className="text-slate-300">Sand & Gravel</span></li>
              <li><span className="text-slate-300">Roofing Materials</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-slate-300">+254 721 748851</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span className="text-slate-300">info@voittoconcrete.co.ke</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-slate-300">Mashambani, Banana, Kiambu</span>
              </div>
              <a 
                href="https://wa.me/254721748851" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2025 Voitto Concrete Construction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;