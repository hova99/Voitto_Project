import React from 'react';
import { Download, Printer, FileText } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const QuoteExporter: React.FC = () => {
  const { state } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const generateQuoteContent = () => {
    const date = new Date().toLocaleDateString('en-KE');
    const quoteNumber = `VCC-${Date.now().toString().slice(-6)}`;
    
    return `
VOITTO CONCRETE CONSTRUCTION
Mashambani, Banana, Kiambu
Phone: +254 727 530944
Email: voittoltd2023@gmail.com

QUOTATION
Quote #: ${quoteNumber}
Date: ${date}

ITEMS:
${state.items.map(item => 
  `${item.name} - Qty: ${item.quantity} ${item.unit} @ ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
).join('\n')}

TOTAL: ${formatPrice(state.total)}

Terms & Conditions:
- Prices are in Kenyan Shillings (KES)
- Free delivery within Kiambu County
- Payment terms: Cash on delivery or M-PESA
- Quote valid for 30 days
- Quality guaranteed

Thank you for choosing Voitto Concrete Construction!
    `.trim();
  };

  const downloadPDF = () => {
    const content = generateQuoteContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Voitto-Quote-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printQuote = () => {
    const content = generateQuoteContent();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Voitto Concrete Construction - Quote</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
              h1 { color: #002349; }
              .header { text-align: center; margin-bottom: 30px; }
              .items { margin: 20px 0; }
              .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>VOITTO CONCRETE CONSTRUCTION</h1>
            </div>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (state.items.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Export Quote
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadPDF}
          className="flex items-center justify-center px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Quote
        </button>
        
        <button
          onClick={printQuote}
          className="flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteExporter;