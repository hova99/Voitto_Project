import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../contexts/CartContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  minimal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, minimal = false }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', product });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (minimal) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-xs transition hover:shadow-lg">
        <Link to={`/product/${product.id}`}>
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
          </div>

          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
            <p className="text-lg font-bold text-black mt-1">
              {product.price === 0 ? 'Contact for pricing' : formatPrice(product.price)}
            </p>
          </div>
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition ${
            product.inStock
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-sm transition hover:shadow-xl relative">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === 0 ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-xl font-bold text-black mt-1">
            {product.price === 0 ? 'Contact for pricing' : formatPrice(product.price)}
          </p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3">
            <span className="text-sm font-medium text-gray-500">Colors</span>
            <div className="flex space-x-2 mt-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 border border-white shadow"></span>
              <span className="w-4 h-4 rounded-full bg-gray-400 border border-white shadow"></span>
              <span className="w-4 h-4 rounded-full bg-orange-400 border border-white shadow"></span>
            </div>
          </div>
        </div>
      </Link>

      {/* Floating Add to Cart Icon */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition ${
          product.inStock
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
            : 'bg-gray-300 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCard;
