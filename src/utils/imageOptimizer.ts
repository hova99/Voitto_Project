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
        const optimizedUrl = `${baseUrl}f_auto,q_auto,w_${width},fl_progressive,fl_force_strip/${path}`;
        return `${optimizedUrl} ${width}w`;
      })
      .join(", ");
  }

  // Generate sizes attribute for responsive images
  static generateSizes(
    breakpoints: { maxWidth: number; width: string }[] = [
      { maxWidth: 600, width: "100vw" },
      { maxWidth: 1024, width: "50vw" },
      { maxWidth: 1440, width: "33vw" },
    ]
  ): string {
    return breakpoints
      .map(({ maxWidth, width }) => `(max-width: ${maxWidth}px) ${width}`)
      .join(", ") + `, ${breakpoints[breakpoints.length - 1]?.width || "25vw"}`;
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
    // Hero images and first few product images
    "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto/v1754409797/IBD2_eepz4h.jpg",
    "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto/v1754410077/IBD6_ilfn8f.jpg",
    "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto/v1754411615/culvert900_t40svv.jpg",
    "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto/v1754317362/road_krbs_adlteh.jpg",
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
