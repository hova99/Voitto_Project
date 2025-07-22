import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award, Play, Info, Camera, Mic, Flask, Mail } from 'lucide-react';

/* ========================================
   HOMEPAGE LAYOUT OVERRIDES BEGIN
   This component uses a completely new layout
   inspired by the provided HTML/CSS design
======================================== */

const HomePage: React.FC = () => {
  useEffect(() => {
    // Video upload functionality
    const videoUpload = document.getElementById('videoUpload') as HTMLInputElement;
    const resetVideo = document.getElementById('resetVideo') as HTMLButtonElement;
    const heroVideo = document.getElementById('heroVideo') as HTMLVideoElement;

    if (videoUpload) {
      videoUpload.addEventListener('change', function(e) {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const videoURL = URL.createObjectURL(file);
          
          // Remove all existing sources
          while(heroVideo.firstChild) {
            heroVideo.removeChild(heroVideo.firstChild);
          }
          
          // Add new source
          const source = document.createElement('source');
          source.src = videoURL;
          source.type = 'video/' + file.name.split('.').pop();
          heroVideo.appendChild(source);
          
          // Reload video
          heroVideo.load();
          heroVideo.play().catch(e => console.log("Autoplay prevented:", e));
          
          // Show success message
          const uploadContainer = document.getElementById('videoUploadContainer');
          const successMsg = document.createElement('p');
          successMsg.className = 'text-green-400 text-sm mt-2';
          successMsg.textContent = 'Video uploaded successfully!';
          
          // Remove any existing success messages
          const existingMsg = uploadContainer?.querySelector('.text-green-400');
          if (existingMsg) {
            existingMsg.remove();
          }
          
          uploadContainer?.appendChild(successMsg);
        }
      });
    }

    if (resetVideo) {
      resetVideo.addEventListener('click', function() {
        // Remove all existing sources
        while(heroVideo.firstChild) {
          heroVideo.removeChild(heroVideo.firstChild);
        }
        
        // Add default source
        const source = document.createElement('source');
        source.src = 'https://res.cloudinary.com/dnv6mjhxv/video/upload/v1753110507/6036438_Man_People_1280x720_m2kwaa.webm';
        source.type = 'video/webm';
        heroVideo.appendChild(source);
        
        // Reload video
        heroVideo.load();
        heroVideo.play().catch(e => console.log("Autoplay prevented:", e));
        
        // Clear file input
        if (videoUpload) videoUpload.value = '';
        
        // Remove any success messages
        const successMsg = document.querySelector('.text-green-400');
        if (successMsg) {
          successMsg.remove();
        }
        
        // Show reset message
        const uploadContainer = document.getElementById('videoUploadContainer');
        const resetMsg = document.createElement('p');
        resetMsg.className = 'text-blue-400 text-sm mt-2';
        resetMsg.textContent = 'Default video restored';
        uploadContainer?.appendChild(resetMsg);
        
        // Remove message after 3 seconds
        setTimeout(() => {
          resetMsg.remove();
        }, 3000);
      });
    }

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
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          id="heroVideo" 
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="https://res.cloudinary.com/dnv6mjhxv/video/upload/v1753110507/6036438_Man_People_1280x720_m2kwaa.webm" type="video/webm" />
          Your browser does not support HTML5 video.
        </video>
        
        {/* Video Upload Container */}
        <div id="videoUploadContainer" className="absolute top-4 right-4 bg-slate-800 bg-opacity-70 p-4 rounded-lg shadow-lg z-50 max-w-xs transition-all duration-300 hover:scale-105">
          <h3 className="text-lg font-bold mb-2">Upload Construction Video</h3>
          <input 
            type="file" 
            id="videoUpload" 
            accept="video/*" 
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer mb-2"
          />
          <p className="text-xs text-slate-300">Supported formats: MP4, WebM, Ogg</p>
          <button 
            id="resetVideo" 
            className="mt-2 px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-500 transition"
          >
            Reset to Default
          </button>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            VOITTO CONSTRUCTION
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl text-orange-100 drop-shadow-md">
            Building Kenya's future with quality precast concrete products and reliable construction materials
          </p>
          <div className="flex gap-4">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 rounded-full font-semibold transition transform hover:scale-105 text-white"
            >
              <Play className="mr-2 h-5 w-5" />
              Shop Products
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 rounded-full font-semibold transition transform hover:scale-105 text-white"
            >
              <Info className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>

      {/* About Our Company */}
      <section className="py-20 px-4 md:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-300">Building Kenya's Foundation</h2>
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
            <h2 className="text-4xl font-bold mb-12 text-center text-orange-300">Our Product Range</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Drainage Products */}
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://www.kcpquarry.com/images/service/fw-Falcon%20Floor%20Well.jpg" 
                    alt="Drainage Systems" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-orange-300">Drainage Systems</h3>
                  <p className="text-slate-300 mb-4">IBD, culverts, and shallow drains for effective water management</p>
                  <div className="flex items-center text-sm text-slate-400">
                    <span>From KES 350 - KES 5,500</span>
                  </div>
                </div>
              </div>
              
              {/* Paving Materials */}
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://www.kcpquarry.com/images/service/pb-Interlocking%20Cabro.jpg" 
                    alt="Paving Materials" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-orange-300">Paving Materials</h3>
                  <p className="text-slate-300 mb-4">Cabros, kerbs, and paving slabs for durable surfaces</p>
                  <div className="flex items-center text-sm text-slate-400">
                    <span>From KES 180 - KES 350</span>
                  </div>
                </div>
              </div>
              
              {/* Wall Coping */}
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://www.kcpquarry.com/images/service/4x9-Solid-Concrete-Block.jpg" 
                    alt="Wall Coping" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-orange-300">Wall & Pillar Coping</h3>
                  <p className="text-slate-300 mb-4">Professional finishing for walls and pillars</p>
                  <div className="flex items-center text-sm text-slate-400">
                    <span>From KES 150 - KES 400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-300">Our Journey in Numbers</h2>
          <div className="relative pl-8">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-orange-600"></div>
            
            {/* Timeline Item 1 */}
            <div className="relative pb-12">
              <div className="absolute w-5 h-5 left-[-10px] bg-orange-600 rounded-full top-0"></div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-orange-300 mb-2">2015 - Company Founded</h3>
                <p className="text-slate-300">
                  Voitto Company Limited was established with a mission to provide quality 
                  construction materials to builders across Kenya.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative pb-12">
              <div className="absolute w-5 h-5 left-[-10px] bg-orange-600 rounded-full top-0"></div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-orange-300 mb-2">2018 - Expansion</h3>
                <p className="text-slate-300">
                  Expanded our product range to include specialized drainage systems 
                  and decorative concrete products.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 3 */}
            <div className="relative pb-12">
              <div className="absolute w-5 h-5 left-[-10px] bg-orange-600 rounded-full top-0"></div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-orange-300 mb-2">2021 - Digital Innovation</h3>
                <p className="text-slate-300">
                  Launched our WhatsApp ordering system and online catalog, 
                  making it easier for customers to access our products.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 4 */}
            <div className="relative">
              <div className="absolute w-5 h-5 left-[-10px] bg-orange-600 rounded-full top-0"></div>
              <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-orange-300 mb-2">2023 - 8 Years Strong</h3>
                <p className="text-slate-300">
                  Today we serve 400+ happy clients with 50+ product categories, 
                  having completed over 200 successful projects across Kenya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <span className="mr-2">📞</span> +254 721 748851
                </p>
                <p className="text-slate-400">
                  <Mail className="inline h-4 w-4 mr-2" /> info@voittoconcrete.co.ke
                </p>
                <p className="text-slate-400">
                  <span className="mr-2">📍</span> Mashambani, Banana, Kiambu
                </p>
              </div>
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