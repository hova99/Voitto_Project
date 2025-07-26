// src/components/Footer.tsx

import { Link } from "react-router-dom";
import { Mail, MessageCircle, Facebook, Instagram, Video, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-white pt-20 pb-10 overflow-hidden">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full rotate-180 overflow-hidden leading-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block w-full h-[150px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
              82.39-16.72,168.19-17.73,250.45-.39C823.78,31,
              906.67,72,985.66,92.83c70.05,18.48,146.53,
              26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,
              321.39,56.44Z"
            className="fill-slate-900"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Voitto Company Ltd</h3>
            <p className="text-sm text-slate-300">
              Supplying quality construction materials to Kenya since 2017. Built on trust, service,
              and solid foundations.
            </p>
            <div className="mt-4 text-sm text-slate-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <p>P.O. Box 941-00217, Limuru.</p>
            </div>
            <div className="mt-2 text-sm text-slate-300 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <p>Tel: 0721 748851</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-orange-500">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
              <li><Link to="/products" className="hover:text-orange-400">Products</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-orange-500">Contact Us</h4>
            <p className="text-sm text-slate-300 flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" /> voittoltd2023@gmail.com
            </p>
            <p className="text-sm text-slate-300 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> +254 727 530944
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-orange-500">Follow Us</h4>
            <div className="flex gap-4">
              <Link to="#" className="hover:text-orange-400" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="#" className="hover:text-orange-400" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="#" className="hover:text-orange-400" aria-label="TikTok">
                <Video className="w-5 h-5" />
              </Link>
              <Link
                to="https://wa.me/254727530944"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Voitto Company Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
