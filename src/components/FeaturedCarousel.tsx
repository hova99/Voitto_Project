import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const FeaturedCarousel: React.FC = () => {
  const featuredProducts = products.slice(0, 7); // Or however many you want to show

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Trusted materials used across Kenya
          </p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll w-[1750px]">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[250px] w-[250px] h-[100px] flex items-center justify-center px-4"
              >
                <ProductCard product={product} minimal />
              </div>
            ))}
            {featuredProducts.map((product, index) => (
              <div
                key={`duplicate-${index}`}
                className="min-w-[250px] w-[250px] h-[100px] flex items-center justify-center px-4"
              >
                <ProductCard product={product} minimal />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors group"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;