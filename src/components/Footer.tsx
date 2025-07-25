// src/components/Footer.tsx

import { Link } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-white pt-20 pb-10">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[150px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
            250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,
            214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-900"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* ... company info, links, contact, WhatsApp ... */}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; 2025 Voitto Company Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
