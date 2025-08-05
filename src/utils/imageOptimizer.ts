import { useEffect } from "react";

// Enhanced Image Optimization Utility with Responsive Loading
export class ImageOptimizer {
  private static imageCache = new Map<string, HTMLImageElement>();
  private static preloadQueue: string[] = [];
  private static isProcessing = false;
  private static criticalImages = new Set<string>();

  // Preload critical images immediately
  static preloadCriticalImages(imageUrls: string[]) {
    imageUrls.forEach((url) => {
      this.criticalImages.add(url);
      if (!this.imageCache.has(url)) {
        const img = new Image();
        img.fetchPriority = "high";
        img.loading = "eager";
        img.src = url;
        this.imageCache.set(url, img);
      }
    });
  }

  // Add images to preload queue with high priority
  static queueForPreload(
    imageUrls: string[],
    priority: "high" | "low" = "low"
  ) {
    if (priority === "high") {
      // High priority images go to the front of the queue
      this.preloadQueue.unshift(...imageUrls);
    } else {
      this.preloadQueue.push(...imageUrls);
    }

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process preload queue with aggressive loading
  private static async processQueue() {
    if (this.isProcessing || this.preloadQueue.length === 0) return;

    this.isProcessing = true;

    while (this.preloadQueue.length > 0) {
      const batch = this.preloadQueue.splice(0, 5); // Process 5 at a time for faster loading

      await Promise.all(
        batch.map((url) => {
          if (!this.imageCache.has(url)) {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.fetchPriority = this.criticalImages.has(url) ? "high" : "low";
              img.loading = "eager";
              img.onload = () => {
                this.imageCache.set(url, img);
                resolve();
              };
              img.onerror = () => resolve();
              img.src = url;
            });
          }
          return Promise.resolve();
        })
      );

      // Minimal delay to prevent blocking
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    this.isProcessing = false;
  }

  // Get optimized Cloudinary URL with best performance settings
  static getOptimizedUrl(
    originalUrl: string,
    width?: number,
    quality?: number
  ): string {
    if (!originalUrl.includes("cloudinary.com")) {
      return originalUrl;
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    const optimizations = [
      "f_auto", // Auto format
      "q_auto", // Auto quality
      "fl_progressive", // Progressive loading
      "fl_force_strip", // Remove metadata
      "fl_attachment", // Prevent download
    ];

    if (width) {
      optimizations.push(`w_${width}`);
    }

    if (quality) {
      optimizations.push(`q_${quality}`);
    }

    return `${baseUrl}${optimizations.join(",")}/${path}`;
  }

  // Generate responsive srcSet for Cloudinary images
  static generateSrcSet(
    originalUrl: string,
    widths: number[] = [400, 800, 1200, 1600]
  ): string {
    if (!originalUrl.includes("cloudinary.com")) {
      return "";
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    return widths
      .map((width) => {
        const optimizedUrl = `${baseUrl}f_auto,q_auto,w_${width},h_${Math.round(width * 0.75)},c_fill,fl_progressive,fl_force_strip/${path}`;
        return `${optimizedUrl} ${width}w`;
      })
      .join(", ");
  }

  // Generate sizes attribute for responsive images
  static generateSizes(
    breakpoints: { maxWidth: number; width: string }[] = [
      { maxWidth: 640, width: "100vw" }, // Mobile
      { maxWidth: 1024, width: "50vw" }, // Tablet
      { maxWidth: 1440, width: "33vw" }, // Desktop
    ]
  ): string {
    return breakpoints
      .map(({ maxWidth, width }) => `(max-width: ${maxWidth}px) ${width}`)
      .join(", ") + `, ${breakpoints[breakpoints.length - 1]?.width || "25vw"}`;
  }

  // Generate mobile-first srcSet for product images
  static generateProductSrcSet(originalUrl: string): string {
    if (!originalUrl.includes("cloudinary.com")) {
      return "";
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    // Mobile-first approach with better quality settings
    const sizes = [
      { width: 400, height: 300 }, // Mobile (1x) - better quality
      { width: 600, height: 450 }, // Tablet (1x) - good quality
      { width: 800, height: 600 }, // Desktop (1x) - high quality
      { width: 1200, height: 900 }, // Desktop (2x for retina) - best quality
    ];

    return sizes
      .map(({ width, height }) => {
        const optimizedUrl = `${baseUrl}f_auto,q_auto,w_${width},h_${height},c_fill,fl_progressive,fl_force_strip/${path}`;
        return `${optimizedUrl} ${width}w`;
      })
      .join(", ");
  }

  // Generate hero image srcSet for background images
  static generateHeroSrcSet(originalUrl: string): string {
    if (!originalUrl.includes("cloudinary.com")) {
      return "";
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    // Hero images with 2:1 aspect ratio for background covers
    const sizes = [
      { width: 640, height: 320 }, // Mobile (1x)
      { width: 1024, height: 512 }, // Tablet (1x)
      { width: 1440, height: 720 }, // Desktop (1x)
      { width: 1920, height: 960 }, // Desktop (2x for retina)
    ];

    return sizes
      .map(({ width, height }) => {
        const optimizedUrl = `${baseUrl}f_auto,q_auto,w_${width},h_${height},c_fill,fl_progressive,fl_force_strip/${path}`;
        return `${optimizedUrl} ${width}w`;
      })
      .join(", ");
  }

  // Preload images for a specific product
  static preloadProductImages(productImages: string[]) {
    productImages.forEach((url) => {
      if (!this.imageCache.has(url)) {
        const img = new Image();
        img.fetchPriority = "high";
        img.loading = "eager";
        img.src = url;
        this.imageCache.set(url, img);
      }
    });
  }

  // Clear cache to free memory
  static clearCache() {
    this.imageCache.clear();
  }

  // Get cache stats
  static getCacheStats() {
    return {
      cachedImages: this.imageCache.size,
      queueLength: this.preloadQueue.length,
      isProcessing: this.isProcessing,
      criticalImages: this.criticalImages.size,
    };
  }
}

  // Initialize with critical images
  export const initializeImageOptimizer = () => {
    // Preload critical images that are likely to be viewed first
    const criticalImages = [
      // LCP image (highest priority)
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754409797/IBD2_eepz4h.jpg",
      // First 6 product images for instant loading
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754410077/IBD6_ilfn8f.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754411615/culvert900_t40svv.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754317362/road_krbs_adlteh.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754316306/paving2x2_o7sqxt.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754316529/paving18x18_ymssyg.webp",
    ];

    ImageOptimizer.preloadCriticalImages(criticalImages);
  };

// Hook for component-level image optimization
export const useImageOptimizer = (
  imageUrls: string[],
  priority: "high" | "low" = "low"
) => {
  useEffect(() => {
    ImageOptimizer.queueForPreload(imageUrls, priority);
  }, [imageUrls, priority]);
};

// Hook for instant product image loading
export const useInstantProductImages = (productImages: string[]) => {
  useEffect(() => {
    ImageOptimizer.preloadProductImages(productImages);
  }, [productImages]);
};

// Hook for responsive image optimization
export const useResponsiveImage = (
  imageUrl: string,
  widths: number[] = [400, 800, 1200]
) => {
  const srcSet = ImageOptimizer.generateSrcSet(imageUrl, widths);
  const sizes = ImageOptimizer.generateSizes();

  return {
    src: ImageOptimizer.getOptimizedUrl(imageUrl),
    srcSet,
    sizes,
  };
};
