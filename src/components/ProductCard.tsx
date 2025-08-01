import { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../contexts/CartContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  minimal?: boolean;
  showCarousel?: boolean; // Show carousel on product detail page
  enableImageToggle?: boolean; // Enable image toggle on product list page
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  minimal = false, 
  showCarousel = false,
  enableImageToggle = false
}) => {
  const { dispatch } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Get all available images for this product - USE ORIGINAL URLs for reliability
  const images = [product.image];
  if (product.image2 && (showCarousel || enableImageToggle)) {
    images.push(product.image2);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', product });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsImageError(false);
  };

  const handleImageError = () => {
    setIsImageLoaded(true);
    setIsImageError(true);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable touch for products with multiple images
    if (images.length > 1) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Only enable touch for products with multiple images
    if (images.length > 1) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    // Only process touch for products with multiple images
    if (!touchStart || !touchEnd || images.length <= 1) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe && images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Reset image state when product changes
  useEffect(() => {
    setIsImageLoaded(false);
    setIsImageError(false);
    // Always start with first image, and ensure single-image products stay at index 0
    setCurrentImageIndex(0);
  }, [product.id, product.image2]);

  // Auto-switch image on hover for products with multiple images
  const handleMouseEnter = () => {
    if (images.length > 1 && enableImageToggle) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    if (images.length > 1 && enableImageToggle) {
      setCurrentImageIndex(0);
    }
  };



  if (minimal) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden w-full max-w-xs transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative group">
        <Link to={`/product/${product.id}`}>
          <div 
            className="relative overflow-hidden product-card-image-toggle"
            onTouchStart={images.length > 1 ? handleTouchStart : undefined}
            onTouchMove={images.length > 1 ? handleTouchMove : undefined}
            onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image Container - Only show current image */}
            <div className="relative w-full h-40 sm:h-48 bg-gray-50 overflow-hidden" role="img" aria-label={`${product.name} product images`}>
              {/* Loading placeholder */}
              {!isImageLoaded && !isImageError && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Current Image */}
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} - ${currentImageIndex === 0 ? 'Front' : 'Back'} View`}
                className={`w-full h-full object-contain transition-opacity duration-200 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-105`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
                width="300"
                height="300"
              />
            </div>
            {!isImageLoaded && !isImageError && (
              <div className="absolute inset-0 bg-gray-50 animate-shimmer flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Image Toggle Indicator for Minimal Cards */}
            {enableImageToggle && images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 toggle-indicator">
                {currentImageIndex === 0 ? 'Hover to view back' : 'Hover to view front'}
              </div>
            )}
            
            {/* Image Toggle Buttons for Minimal Cards */}
            {enableImageToggle && images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 toggle-buttons">
                <button
                  onClick={prevImage}
                  className="bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <div className="p-2 sm:p-3">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-black mt-1">
              {product.price === 0 ? 'Contact for pricing' : formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden max-w-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative group">
      <Link to={`/product/${product.id}`}>
        <div 
          className="relative overflow-hidden product-card-image-toggle bg-gray-50"
          onTouchStart={images.length > 1 ? handleTouchStart : undefined}
          onTouchMove={images.length > 1 ? handleTouchMove : undefined}
          onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image Container - Only show current image */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gray-50 overflow-hidden" role="img" aria-label={`${product.name} product images`}>
            {/* Loading placeholder */}
            {!isImageLoaded && !isImageError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Current Image */}
            <img
              src={images[currentImageIndex]}
              alt={`${product.name} - ${currentImageIndex === 0 ? 'Front' : 'Back'} View`}
              className={`w-full h-full object-contain transition-opacity duration-200 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-105`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              width="500"
              height="500"
            />
          </div>

          {/* Loading Spinner */}
          {!isImageLoaded && !isImageError && (
            <div className="absolute inset-0 bg-gray-50 animate-shimmer flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Carousel Navigation (for product detail page) */}
          {images.length > 1 && showCarousel && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Image Toggle for Product List Page */}
          {images.length > 1 && enableImageToggle && !showCarousel && (
            <>
              {/* Image Toggle Indicator */}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 toggle-indicator">
                {currentImageIndex === 0 ? 'Hover to view back' : 'Hover to view front'}
              </div>

              {/* Image Toggle Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 toggle-buttons">
                <button
                  onClick={prevImage}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}

          {/* Single Image Indicator (when not showing carousel) */}
          {(!showCarousel || images.length === 1) && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-white/50 shadow-lg"></div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-black mt-1">
            {product.price === 0 ? 'Contact for pricing' : formatPrice(product.price)}
          </p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-1">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mt-3 flex items-center">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-1 ${
                product.inStock ? 'bg-green-400' : 'bg-red-400'
              }`}></span>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </Link>

      {/* Floating Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-200 ${
          product.inStock
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-110'
            : 'bg-gray-300 text-gray-400 cursor-not-allowed'
        }`}
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCard;
