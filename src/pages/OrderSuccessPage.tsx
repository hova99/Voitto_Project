import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Phone } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for choosing Voitto Concrete Construction. Your order has been received 
            and will be processed shortly.
          </p>
          
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">What happens next?</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-2 rounded-full">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Order Confirmation</div>
                  <div className="text-sm text-gray-600">You'll receive an SMS and email confirmation</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Delivery Coordination</div>
                  <div className="text-sm text-gray-600">Our team will call to schedule delivery</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Fast Delivery</div>
                  <div className="text-sm text-gray-600">Materials delivered to your site</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Need immediate assistance? Contact us:
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <a
                href="tel:+254721748851"
                className="inline-flex items-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us
              </a>
              
              <a
                href="https://wa.me/254727530944"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
            </div>
            
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;