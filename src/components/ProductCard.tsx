import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../contexts/CartContext";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { ImageOptimizer } from "../utils/imageOptimizer";

interface ProductCardProps {
  product: Product;
  minimal?: boolean;
  showCarousel?: boolean;
  enableImageToggle?: boolean;
  isCritical?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  minimal = false,
  showCarousel = false,
  enableImageToggle = false,
  isCritical = false,
}) => {
  const { dispatch } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Memoize images array to prevent unnecessary re-renders
  const images = useMemo(() => {
    const imgArray = [product.image];
    if (product.image2 && (showCarousel || enableImageToggle)) {
      imgArray.push(product.image2);
    }
    return imgArray;
  }, [product.image, product.image2, showCarousel, enableImageToggle]);

  // Memoize optimized URLs and picture sources
  const optimizedImages = useMemo(() => {
    return images.map((img) => ImageOptimizer.validateAndOptimizeUrl(img));
  }, [images]);

  const pictureSources = useMemo(() => {
    return images.map((img) => ImageOptimizer.generatePictureSources(img));
  }, [images]);

  // Memoize responsive data for current image
  const currentImageSrcSet = useMemo(() => {
    return ImageOptimizer.generateProductSrcSet(images[currentImageIndex]);
  }, [images, currentImageIndex]);

  const currentImageSizes = useMemo(() => {
    return ImageOptimizer.generateSizes([
      { maxWidth: 640, width: "100vw" },
      { maxWidth: 768, width: "50vw" },
      { maxWidth: 1024, width: "33vw" },
      { maxWidth: 1440, width: "25vw" },
    ]);
  }, []);

  const isLCPImage = useMemo(
    () => isCritical && currentImageIndex === 0,
    [isCritical, currentImageIndex]
  );

  // Optimized event handlers with useCallback
  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: "ADD_ITEM",
        payload: { ...product, quantity: 1 },
      });
    },
    [dispatch, product]
  );

  const nextImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

  const prevImage = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    },
    [images.length]
  );

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
    setIsImageError(false);
  }, []);

  const handleImageError = useCallback(
    (index: number) => {
      console.warn(`Failed to load image ${index} for ${product.name}`);
      setLoadedImages((prev) => new Set([...prev, index]));

      if (index === 0) {
        setIsImageError(true);
        setIsImageLoaded(false);
      }
    },
    [product.name]
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, images.length]);

  const handleMouseEnter = useCallback(() => {
    if (images.length > 1) {
      setShowNavigation(true);
    }
  }, [images.length]);

  const handleMouseLeave = useCallback(() => {
    setShowNavigation(false);
  }, []);

  const handleImageClick = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImageIndex(index);
    },
    []
  );

  // Memoized utility functions
  const getImageContainerClasses = useCallback(() => {
    if (minimal) {
      return "relative w-full h-64 sm:h-72 md:h-80 bg-gray-50 overflow-hidden flex items-center justify-center";
    }
    return "relative w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-50 overflow-hidden flex items-center justify-center";
  }, [minimal]);

  const getImageDimensions = useCallback(() => {
    if (minimal) {
      return { width: "400", height: "320" };
    }
    return { width: "600", height: "480" };
  }, [minimal]);



  const getObjectFitClass = useCallback(() => {
    // Always use object-contain to show full images without cropping
    return "object-contain object-center"; // Show full image for all products
  }, []);

  const getFallbackImage = useCallback(() => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='320' viewBox='0 0 400 320'%3E%3Crect width='400' height='320' fill='%23f3f4f6'/%3E%3Ctext x='200' y='160' text-anchor='middle' fill='%239ca3af' font-family='Arial, sans-serif' font-size='16'%3EImage unavailable%3C/text%3E%3C/svg%3E";
  }, []);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(price);
  }, []);

  // Preload images on mount with high priority
  useEffect(() => {
    const preloadImages = async () => {
      const newLoadedImages = new Set<number>();

      const imagePromises = optimizedImages.map((imageSrc, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();

          if (index === 0 || isCritical) {
            img.fetchPriority = "high";
          }

          img.onload = () => {
            newLoadedImages.add(index);
            resolve();
          };

          img.onerror = () => {
            console.warn(
              `Failed to preload image ${index} for ${product.name}`
            );
            resolve();
          };

          img.loading = "eager";
          img.decoding = "async";
          img.src = imageSrc;
        });
      });

      try {
        await Promise.all(imagePromises);
        setLoadedImages(newLoadedImages);
        if (newLoadedImages.has(0)) {
          setIsImageLoaded(true);
        }
      } catch (error) {
        console.warn(`Error preloading images for ${product.name}:`, error);
      }
    };

    preloadImages();
  }, [optimizedImages, product.name, isCritical]);

  // Render optimized image with picture element for modern browsers
  const renderOptimizedImage = useCallback(
    (imageSrc: string, index: number) => {
      const isCurrentImage = index === currentImageIndex;
      const optimizedSrc = optimizedImages[index];
      const { width, height } = getImageDimensions();
      const objectFitClass = getObjectFitClass();
      const sources = pictureSources[index];

      return (
        <picture
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isCurrentImage && (isImageLoaded || loadedImages.has(index))
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {/* AVIF format for modern browsers */}
          <source
            srcSet={sources.avif}
            type="image/avif"
            media="(min-width: 768px)"
          />
          {/* WebP format for modern browsers */}
          <source
            srcSet={sources.webp}
            type="image/webp"
          />
          {/* Fallback for older browsers */}
          <img
            src={optimizedSrc}
            srcSet={currentImageSrcSet}
            sizes={currentImageSizes}
            alt={`${product.name} - ${
              index === 0 ? "Front" : "Back"
            } View`}
            className={`w-full h-full ${objectFitClass} transition-all duration-300`}
            onLoad={() => {
              if (index === 0) handleImageLoad();
              setLoadedImages((prev) => new Set([...prev, index]));
            }}
            onError={() => handleImageError(index)}
            width={width}
            height={height}
            fetchPriority={
              isLCPImage ? "high" : index === 0 ? "high" : "low"
            }
            loading="eager"
            decoding="async"
          />
        </picture>
      );
    },
    [
      currentImageIndex,
      optimizedImages,
      pictureSources,
      currentImageSrcSet,
      currentImageSizes,
      getImageDimensions,
      getObjectFitClass,
      isImageLoaded,
      loadedImages,
      product.name,
      handleImageLoad,
      handleImageError,
      isLCPImage,
    ]
  );

  if (minimal) {
    return (
      <div
        ref={cardRef}
        className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden w-full max-w-xs transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative group"
      >
        <Link to={`/product/${product.id}`} className="block">
          <div
            className="relative overflow-hidden"
            onTouchStart={images.length > 1 ? handleTouchStart : undefined}
            onTouchMove={images.length > 1 ? handleTouchMove : undefined}
            onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={getImageContainerClasses()}
              role="img"
              aria-label={`${product.name} product images`}
            >
              {!isImageLoaded && !isImageError && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}

              {isImageError && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <img
                    src={getFallbackImage()}
                    alt="Image unavailable"
                    className="w-full h-full object-contain object-center"
                    width="400"
                    height="320"
                  />
                </div>
              )}

              {images.map((imageSrc, index) => renderOptimizedImage(imageSrc, index))}
            </div>

            {enableImageToggle && images.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full transition-opacity duration-200 z-30">
                {currentImageIndex === 0
                  ? "Click to view back"
                  : "Click to view front"}
              </div>
            )}

            {enableImageToggle && images.length > 1 && (
              <div
                className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-200 z-20 ${
                  showNavigation ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={prevImage}
                  className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-200 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-black mt-1">
              {product.price === 0
                ? "Contact for pricing"
                : formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden max-w-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="relative overflow-hidden bg-gray-50"
          onTouchStart={images.length > 1 ? handleTouchStart : undefined}
          onTouchMove={images.length > 1 ? handleTouchMove : undefined}
          onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={getImageContainerClasses()}
            role="img"
            aria-label={`${product.name} product images`}
          >
            {!isImageLoaded && !isImageError && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}

            {isImageError && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <img
                  src={getFallbackImage()}
                  alt="Image unavailable"
                  className="w-full h-full object-contain"
                  width="600"
                  height="480"
                />
              </div>
            )}

            {images.map((imageSrc, index) => renderOptimizedImage(imageSrc, index))}
          </div>

          {images.length > 1 && showCarousel && (
            <>
              <button
                onClick={prevImage}
                className={`absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg z-30 ${
                  showNavigation ? "opacity-100" : "opacity-0"
                }`}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className={`absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg z-30 ${
                  showNavigation ? "opacity-100" : "opacity-0"
                }`}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={handleImageClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 shadow-lg ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/70 hover:bg-white/90"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {images.length > 1 && enableImageToggle && !showCarousel && (
            <>
              <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full transition-opacity duration-200 z-30">
                {currentImageIndex === 0
                  ? "Click to view back"
                  : "Click to view front"}
              </div>

              <div
                className={`absolute inset-0 flex items-center justify-between px-3 transition-opacity duration-200 z-20 ${
                  showNavigation ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={prevImage}
                  className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full z-30">
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}

          {(!showCarousel || images.length === 1) && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-30">
              <div className="w-3 h-3 rounded-full bg-white/70 shadow-lg"></div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-black mt-1">
            {product.price === 0
              ? "Contact for pricing"
              : formatPrice(product.price)}
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-1 ${
                  product.inStock ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-200 ${
          product.inStock
            ? "bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-110"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        }`}
        aria-label={`Add ${product.name} to cart`}
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCard;
