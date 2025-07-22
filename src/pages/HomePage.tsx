import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award, Play, Info, Camera, Mic, FlaskRound as Flask, Mail, MessageCircle } from 'lucide-react';
import FeaturedCarousel from '../components/FeaturedCarousel';

/* ========================================
   HOMEPAGE LAYOUT OVERRIDES BEGIN
   This component uses a completely new layout
   inspired by the provided HTML/CSS design
======================================== */

const HomePage: React.FC = () => {
  useEffect(() => {
    // Parallax effect
    const handleScroll = () => {
      const parallaxSections = document.querySelectorAll('.parallax-section');
      const scrollPosition = window.pageYOffset;
      
      parallaxSections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionOffset = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        
        // Only apply parallax when section is in view
        if (scrollPosition > sectionOffset - window.innerHeight && 
            scrollPosition < sectionOffset + sectionHeight) {
          const speed = 0.5;
          const yPos = -(scrollPosition - sectionOffset) * speed;
          sectionElement.style.backgroundPositionY = yPos + 'px';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Hero Section with Video Background and Fallback Image */}
<section
  className="relative h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2014/03/03/16/08/construction-279012_1280.jpg')" }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
    <div className="flex gap-4">
      <Link
        to="/products"
        className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 rounded-full font-semibold transition transform hover:scale-105 text-white text-lg"
      >
        View Products
      </Link>
      <Link
        to="/about"
        className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 rounded-full font-semibold transition transform hover:scale-105 text-white text-lg"
      >
        Learn More
      </Link>
    </div>
  </div>
</section>

        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        
      </section>

      {/* About Our Company */}
      <section className="py-20 px-4 md:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-300">Building Kenya</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 leading-relaxed">
                Founded in 2015, Voitto Company Limited started with a clear purpose: to deliver quality 
                construction materials that builders can rely on. Over the past eight years, we've grown 
                through consistency, hard work, and a commitment to serving our customers well.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                We work with homeowners, contractors, and developers across Kenya — supporting projects 
                ranging from residential builds to large-scale infrastructure. Our focus remains the same: 
                providing reliable materials, fair pricing, and honest service.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-orange-200">
                From driveways to drainage, we're proud to be part of the foundation that keeps Kenya building.
              </p>
              <div className="flex items-center mt-8">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <Truck className="text-2xl text-white h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Fast Delivery</h4>
                  <p className="text-orange-300">Available across Kiambu County</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
                alt="Construction site" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Experience quality</h3>
                <p className="text-orange-200">8+ years of excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories with Parallax */}
      <section 
        className="parallax-section py-20 bg-fixed bg-center bg-no-repeat bg-cover" 
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg')"
        }}
      >
        <div className="bg-black bg-opacity-60 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-orange-300">Our Product Categories</h2>
            <p className="text-xl text-center mb-12 text-slate-200">Everything you need for your construction project, delivered to your site</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Drainage & Culverts */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🏗️
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Drainage & Culverts</h3>
                  <p className="text-slate-300 text-center">IBD, culverts, and shallow drains for effective water management</p>
                </div>
              </div>
              
              {/* Paving & Surface Materials */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🚧
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Paving & Surface Materials</h3>
                  <p className="text-slate-300 text-center">Cabros, kerbs, and paving slabs for durable surfaces</p>
                </div>
              </div>
              
              {/* Wall & Pillar Coping */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🧱
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Wall & Pillar Coping</h3>
                  <p className="text-slate-300 text-center">Professional finishing for walls and pillars</p>
                </div>
              </div>

              {/* Window & Ventilation */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🪟
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Window & Ventilation</h3>
                  <p className="text-slate-300 text-center">Window seals and louvers for proper airflow</p>
                </div>
              </div>

              {/* Balustrades */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🪜
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Balustrades</h3>
                  <p className="text-slate-300 text-center">Decorative railings for balconies and stairs</p>
                </div>
              </div>

              {/* Garden Decor */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🌿
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Garden Decor</h3>
                  <p className="text-slate-300 text-center">Flower pots and decorative elements</p>
                </div>
              </div>

              {/* Fencing Materials */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🪵
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Fencing Materials</h3>
                  <p className="text-slate-300 text-center">Posts and supports for boundary fencing</p>
                </div>
              </div>

              {/* Stone, Sand & Aggregates */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🧱
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Stone, Sand & Aggregates</h3>
                  <p className="text-slate-300 text-center">Foundation materials and aggregates</p>
                </div>
              </div>

              {/* Miscellaneous */}
              <div className="bg-slate-800 bg-opacity-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="text-orange-400 text-4xl mb-4 text-center">
                    🧪
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 text-center">Miscellaneous</h3>
                  <p className="text-slate-300 text-center">Cement and other construction essentials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <FeaturedCarousel />

      {/* Behind the Scenes */}
      <section 
        className="parallax-section py-32 bg-fixed bg-center bg-no-repeat bg-cover" 
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg')"
        }}
      >
        <div className="bg-black bg-opacity-70 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-orange-300">Our Manufacturing Process</h2>
            <p className="text-xl max-w-3xl mx-auto mb-12">
              Our team uses state-of-the-art equipment and quality-controlled processes to ensure 
              every product meets the highest standards for durability and performance.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-slate-800 bg-opacity-80 p-6 rounded-lg">
                <div className="text-orange-400 text-4xl mb-4">
                  <Camera className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Control</h3>
                <p className="text-slate-300">
                  Every product undergoes rigorous testing to ensure it meets industry standards
                </p>
              </div>
              <div className="bg-slate-800 bg-opacity-80 p-6 rounded-lg">
                <div className="text-orange-400 text-4xl mb-4">
                  <Mic className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2">Modern Equipment</h3>
                <p className="text-slate-300">
                  State-of-the-art machinery for consistent, high-quality production
                </p>
              </div>
              <div className="bg-slate-800 bg-opacity-80 p-6 rounded-lg">
                <div className="text-orange-400 text-4xl mb-4">
                  <Flask className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                <p className="text-slate-300">
                  Experienced professionals with decades of construction industry knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-orange-300">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products, special offers, and construction tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-full bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-full font-semibold transition transform hover:scale-105 text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer with Wave */}
      <footer className="relative bg-slate-900 text-white pt-20 pb-10">
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="relative block w-full h-[150px]"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              className="fill-slate-900"
            />
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-300">Voitto Company Limited</h3>
              <p className="text-slate-400">
                Kenya's trusted supplier of quality precast concrete products and construction materials.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-300">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-slate-400 hover:text-white transition">Products</Link></li>
                <li><Link to="/about" className="text-slate-400 hover:text-white transition">About Us</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition">Contact</Link></li>
                <li><Link to="/cart" className="text-slate-400 hover:text-white transition">Cart</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-300">Products</h3>
              <ul className="space-y-2">
                <li><span className="text-slate-400">Drainage Systems</span></li>
                <li><span className="text-slate-400">Paving Materials</span></li>
                <li><span className="text-slate-400">Wall Coping</span></li>
                <li><span className="text-slate-400">Aggregates</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-300">Contact Us</h3>
              <div className="space-y-2 mb-4">
                <p className="text-slate-400">
                  <Mail className="inline h-4 w-4 mr-2" /> info@voittoconcrete.co.ke
                </p>
                <p className="text-slate-400">
                  <span className="mr-2">📍</span> Mashambani, Banana, Kiambu
                </p>
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
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
            <p>&copy; 2025 Voitto Company Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;   