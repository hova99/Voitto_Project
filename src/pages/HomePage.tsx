import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../index.css';

const categories = [
  { name: 'Drainage & Culverts', icon: '🏗️' },
  { name: 'Paving & Surface Materials', icon: '🚧' },
  { name: 'Wall & Pillar Coping', icon: '🧱' },
  { name: 'Window & Ventilation', icon: '🪟' },
  { name: 'Balustrades', icon: '🪜' },
  { name: 'Garden Decor', icon: '🌿' },
  { name: 'Fencing Materials', icon: '🪵' },
  { name: 'Stone, Sand & Aggregates', icon: '🧱' },
  { name: 'Miscellaneous', icon: '🧪' },
];

const HomePage = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative h-[90vh] bg-black text-white flex items-center justify-center">
        {/* Placeholder for looping video background */}
        <div className="absolute inset-0">
          {/* You’ll replace this with a <video> tag later */}
          <div className="bg-gray-800 h-full w-full opacity-40" />
        </div>
        <div className="relative z-10 text-center space-y-4">
          <a
            href="/products"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
          >
            View Products
          </a>
          <a
            href="/about"
            className="bg-white text-orange-700 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
            Featured Products
          </h2>
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll w-[2500px]">
              {[...featuredProducts, ...featuredProducts].map((product, index) => (
                <div
                  key={index}
                  className="min-w-[300px] mx-3 transform transition-transform hover:scale-105 relative group"
                >
                  <ProductCard product={product} minimal />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm text-center py-1 opacity-0 group-hover:opacity-100 transition">
                    {product.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Product Categories</h2>
          <p className="text-gray-600 text-lg mb-10">
            Everything you need for your construction project, delivered to your site
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category, idx) => (
              <a
                key={idx}
                href="/products"
                className="block p-6 border rounded-lg shadow hover:bg-orange-50 transition"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-800">{category.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
