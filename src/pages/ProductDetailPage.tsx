import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products" className="text-orange-600 hover:text-orange-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price === 0) {
      return 'Contact for pricing';
    }
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-orange-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image with Carousel */}
            <div className="p-8">
              <ProductCard 
                product={product} 
                showCarousel={true}
                minimal={false}
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-blue-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(42 reviews)</span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-900">
                  {product.price === 0 ? 'Contact for pricing' : formatPrice(product.price)}
                </span>
                <span className="text-lg text-gray-600 ml-2">
                  {product.unit}
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Enhanced Quantity Selector */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Quantity</h3>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4">
                    <span className="text-base font-medium text-gray-700 min-w-[80px]">Quantity:</span>
                    <div className="flex items-center border-2 border-gray-300 rounded-lg bg-white shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 transition-colors rounded-l-md border-r border-gray-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-5 w-5 text-gray-600" />
                      </button>
                      <span className="px-6 py-3 text-xl font-bold text-gray-900 min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100 transition-colors rounded-r-md border-l border-gray-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Quantity Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[1, 5, 10, 20].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setQuantity(qty)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          quantity === qty
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Summary */}
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Selected Quantity: {quantity}
                    </span>
                    <span className="text-sm text-gray-600">
                      {product.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                    product.inStock
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>
                    {product.inStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
                  </span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                  <Truck className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Fast Delivery</div>
                    <div className="text-sm text-gray-600">Same-day delivery</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                  <Shield className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Quality Assured</div>
                    <div className="text-sm text-gray-600">Certified materials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-blue-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      loading="lazy"
                      className="w-full h-32 object-cover hover:scale-105 transition-transform"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-orange-600 font-bold mt-2">
                      {relatedProduct.price === 0 ? 'Contact for pricing' : formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;