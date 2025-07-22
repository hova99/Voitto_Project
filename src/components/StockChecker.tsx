import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StockChecker: React.FC = () => {
  const [location, setLocation] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    available: boolean;
    eta: string;
    message: string;
  } | null>(null);

  const checkAvailability = async () => {
    if (!location.trim()) return;
    
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const isAvailable = Math.random() > 0.2; // 80% availability rate
      const eta = isAvailable ? 
        ['Same day', '1-2 hours', '2-4 hours', 'Next day'][Math.floor(Math.random() * 4)] :
        'Contact us for availability';
      
      setResult({
        available: isAvailable,
        eta,
        message: isAvailable ? 
          'Great! We can deliver to your location.' :
          'Limited stock in your area. Please contact us for alternatives.'
      });
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        Check Stock & Delivery
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter your location (e.g., Kiambu, Thika, Nairobi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            onKeyPress={(e) => e.key === 'Enter' && checkAvailability()}
          />
        </div>
        <button
          onClick={checkAvailability}
          disabled={isChecking || !location.trim()}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
        >
          {isChecking ? 'Checking...' : 'Check Availability'}
        </button>
      </div>
      
      {result && (
        <div className={`mt-4 p-4 rounded-lg ${result.available ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
          <div className="flex items-start space-x-3">
            {result.available ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${result.available ? 'text-green-800' : 'text-yellow-800'}`}>
                {result.message}
              </p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Estimated delivery: {result.eta}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockChecker;