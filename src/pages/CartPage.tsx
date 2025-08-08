import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();

  const formatPrice = (price: number) => {
    if (price === 0 || isNaN(price)) return "Contact for pricing";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  };

  // Check if any items have price 0
  const hasContactPricing = state.items.some((item) => item.price === 0);

  // Calculate subtotal for items with actual prices
  const subtotal = state.items.reduce((sum, item) => {
    if (item.price === 0) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Start shopping for quality construction materials
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-xl text-blue-200">Review your selected items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items (
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.unit}
                        </p>
                        <p className="text-lg font-bold text-orange-600 mt-2">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Enhanced Quantity Selector */}
                      <div className="flex flex-col items-center space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Quantity
                        </label>
                        <div className="cart-quantity-selector">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="cart-quantity-button rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <div className="cart-quantity-display">
                            <span>{item.quantity}</span>
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="cart-quantity-button rounded-r-lg"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Item Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                        title="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-4 text-right">
                      <span className="text-lg font-semibold text-gray-900">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    {hasContactPricing
                      ? "Contact for pricing"
                      : formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">
                    Contact for details
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">
                      {hasContactPricing
                        ? "Contact for pricing"
                        : formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors mb-4 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Complete Order Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
