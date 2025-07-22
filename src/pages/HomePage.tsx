import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import BlogSection from '../components/BlogSection';
import TestimonialSection from '../components/TestimonialSection';
import FeaturedCarousel from '../components/FeaturedCarousel';

const HomePage: React.FC = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 35, 73, 0.7), rgba(0, 35, 73, 0.7)), url(https://www.kcpquarry.com/images/service/readyrmix-1.jpg)'
        }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Kenya's Trusted Source for Quality Construction Materials & Precast Products
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                Quality drainage systems, paving materials, wall coping and more — delivered fast and reliable across Kiambu County.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/products"
                  className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Why Choose Voitto Company Limited?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've been serving Kenya's construction industry with quality precast products and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery across Nairobi and surrounding areas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All materials tested and certified to meet industry standards</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your construction needs</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">20+ Years Experience</h3>
              <p className="text-gray-600">Decades of experience serving Kenya's construction industry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for your construction project, delivered to your site
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="bg-slate-50 hover:bg-orange-50 p-6 rounded-lg text-center transition-colors group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <FeaturedCarousel />

      {/* About Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                About Voitto Company Limited
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2015, Voitto Company Limited started with a clear purpose: to deliver quality 
                construction materials that builders can rely on. Over the past eight years, we've grown 
                through consistency, hard work, and a commitment to serving our customers well.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We work with homeowners, contractors, and developers across Kenya — supporting projects 
                ranging from residential builds to large-scale infrastructure. Our focus remains the same: 
                providing reliable materials, fair pricing, and honest service.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors group"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="relative">
              <img
                src="https://www.kcpquarry.com/images/service/4x9-Solid-Concrete-Block.jpg"
                alt="Construction site"
                loading="lazy"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Blog Section */}
      <BlogSection />
    </div>
  );
};

export default HomePage;