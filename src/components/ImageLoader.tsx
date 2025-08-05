import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ImageOptimizer } from '../utils/imageOptimizer';

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'sync' | 'async' | 'auto';
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallback,
  onLoad,
  onError,
  objectFit = 'cover',
  sizes,
  loading = 'eager',
  decoding = 'async',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Memoize optimized image data
  const imageData = useMemo(() => {
    const optimizedSrc = ImageOptimizer.validateAndOptimizeUrl(src);
    const pictureSources = ImageOptimizer.generatePictureSources(src);
    const srcSet = ImageOptimizer.generateProductSrcSet(src);
    const defaultSizes = ImageOptimizer.generateSizes();

    return {
      optimizedSrc,
      pictureSources,
      srcSet,
      sizes: sizes || defaultSizes,
    };
  }, [src, sizes]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
    
    if (fallback && fallback !== currentSrc) {
      setCurrentSrc(fallback);
    }
    
    onError?.();
  }, [fallback, currentSrc, onError]);

  // Optimize image loading
  useEffect(() => {
    if (imgRef.current) {
      ImageOptimizer.optimizeImageLoading(imgRef.current);
    }
  }, []);

  // Set initial source
  useEffect(() => {
    setCurrentSrc(imageData.optimizedSrc);
  }, [imageData.optimizedSrc]);

  // Preload image if priority is high
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.fetchPriority = 'high';
      img.loading = 'eager';
      img.decoding = 'async';
      img.onload = () => {
        setIsLoaded(true);
        setHasError(false);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoaded(false);
      };
      img.src = imageData.optimizedSrc;
    }
  }, [priority, imageData.optimizedSrc]);

  // Generate container styles for aspect ratio preservation
  const containerStyles = useMemo(() => {
    if (width && height) {
      const aspectRatio = width / height;
      return {
        position: 'relative' as const,
        width: '100%',
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
      };
    }
    return {};
  }, [width, height]);

  // Generate image styles
  const imageStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      objectFit,
      transition: 'opacity 0.3s ease-in-out',
      opacity: isLoaded ? 1 : 0,
    };

    if (width && height) {
      return {
        ...baseStyles,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      };
    }

    return baseStyles;
  }, [objectFit, isLoaded, width, height]);

  // Loading placeholder
  const LoadingPlaceholder = () => (
    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  // Error placeholder
  const ErrorPlaceholder = () => (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm">Image unavailable</p>
      </div>
    </div>
  );

  // If we have width and height, use aspect ratio container
  if (width && height) {
    return (
      <div style={containerStyles} className={className}>
        {!isLoaded && !hasError && <LoadingPlaceholder />}
        {hasError && <ErrorPlaceholder />}
        
        <picture className="absolute inset-0">
          {/* AVIF format for modern browsers */}
          <source
            srcSet={imageData.pictureSources.avif}
            type="image/avif"
            media="(min-width: 768px)"
          />
          {/* WebP format for modern browsers */}
          <source
            srcSet={imageData.pictureSources.webp}
            type="image/webp"
          />
          {/* Fallback for older browsers */}
          <img
            ref={imgRef}
            src={currentSrc}
            srcSet={imageData.srcSet}
            sizes={imageData.sizes}
            alt={alt}
            style={imageStyles}
            className={`w-full h-full ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            width={width}
            height={height}
            fetchPriority={priority ? 'high' : 'low'}
            loading={loading}
            decoding={decoding}
          />
        </picture>
      </div>
    );
  }

  // Standard image without aspect ratio container
  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && <LoadingPlaceholder />}
      {hasError && <ErrorPlaceholder />}
      
      <picture>
        {/* AVIF format for modern browsers */}
        <source
          srcSet={imageData.pictureSources.avif}
          type="image/avif"
          media="(min-width: 768px)"
        />
        {/* WebP format for modern browsers */}
        <source
          srcSet={imageData.pictureSources.webp}
          type="image/webp"
        />
        {/* Fallback for older browsers */}
        <img
          ref={imgRef}
          src={currentSrc}
          srcSet={imageData.srcSet}
          sizes={imageData.sizes}
          alt={alt}
          style={imageStyles}
          className={`w-full h-full ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          width={width}
          height={height}
          fetchPriority={priority ? 'high' : 'low'}
          loading={loading}
          decoding={decoding}
        />
      </picture>
    </div>
  );
};

export default ImageLoader; 