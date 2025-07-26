import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const ProductCarousel: React.FC = () => {
  const featuredProducts = products.slice(0, 7);

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Our Products
        </h2>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] flex-shrink-0 shadow-lg rounded-2xl bg-gray-50 p-4"
            >
              <ProductCard product={product} minimal />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
