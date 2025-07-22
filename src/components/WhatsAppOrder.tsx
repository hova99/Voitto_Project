import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const WhatsAppOrder: React.FC = () => {
  const { state } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const sendWhatsAppOrder = () => {
    const phoneNumber = '254721748851';
    const orderDetails = state.items.map(item => 
      `• ${item.name} - Qty: ${item.quantity} ${item.unit} @ ${formatPrice(item.price)}`
    ).join('\n');
    
    const message = `Hello Voitto Concrete Construction!

I would like to place an order:

${orderDetails}

*Total: ${formatPrice(state.total)}*

Please confirm availability and delivery details.

Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (state.items.length === 0) return null;

  return (
    <button
      onClick={sendWhatsAppOrder}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-3 mb-4"
    >
      <MessageCircle className="h-6 w-6" />
      <span>Order via WhatsApp</span>
    </button>
  );
};

export default WhatsAppOrder;