import React from 'react';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

const productCategories = [
  'Drainage & Culverts',
  'Paving & Surface Materials',
  'Wall & Pillar Coping',
  'Window & Ventilation',
  'Balustrades',
  'Garden Decor',
  'Fencing Materials',
  'Stone, Sand & Aggregates',
  'Miscellaneous',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Placeholder for looping video */}
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black">
          {/* Replace this div with your video later */}
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            src="/video-placeholder.mp4"
          />
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="space-x-4">
            <a
              href="/products"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow transition"
            >
              View Products
            </a>
            <a
              href="/about"
              className="bg-white hover:bg-gray-200 text-orange-600 px-6 py-3 text-lg font-semibold rounded-lg shadow transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Our Product Categories
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need for your construction project, delivered to your site
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="bg-white shadow hover:shadow-md rounded-lg p-4 flex flex-col items-center justify-center text-center transition hover:bg-orange-100"
              >
                <span className="text-2xl mb-2">🏗️</span>
                <span className="text-sm font-medium text-gray-800">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Products</h2>

          <div className="overflow-hidden relative">
            <div className="flex animate-scroll w-[2000px]">
              {[...products.slice(0, 7), ...products.slice(0, 7)].map((product) => (
                <div
                  key={product.id}
                  className="min-w-[280px] w-[280px] relative group mx-2"
                >
                  <div className="shadow rounded-lg overflow-hidden transform transition hover:scale-105">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 object-cover"
                    />
                    {/* Hover name overlay */}
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm text-center py-2 opacity-0 group-hover:opacity-100 transition">
                      {product.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
