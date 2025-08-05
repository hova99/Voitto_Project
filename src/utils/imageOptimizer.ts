import { useEffect } from "react";

// Enhanced Image Optimization Utility
export class ImageOptimizer {
  private static imageCache = new Map<string, HTMLImageElement>();
  private static preloadQueue: string[] = [];
  private static isProcessing = false;

  // Preload critical images immediately
  static preloadCriticalImages(imageUrls: string[]) {
    imageUrls.forEach((url) => {
      if (!this.imageCache.has(url)) {
        const img = new Image();
        img.src = url;
        this.imageCache.set(url, img);
      }
    });
  }

  // Add images to preload queue
  static queueForPreload(imageUrls: string[]) {
    this.preloadQueue.push(...imageUrls);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process preload queue with throttling
  private static async processQueue() {
    if (this.isProcessing || this.preloadQueue.length === 0) return;

    this.isProcessing = true;

    while (this.preloadQueue.length > 0) {
      const batch = this.preloadQueue.splice(0, 3); // Process 3 at a time

      await Promise.all(
        batch.map((url) => {
          if (!this.imageCache.has(url)) {
            return new Promise<void>((resolve) => {
              const img = new Image();
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

      // Small delay to prevent blocking
      await new Promise((resolve) => setTimeout(resolve, 50));
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
    ];

    if (width) {
      optimizations.push(`w_${width}`);
    }

    if (quality) {
      optimizations.push(`q_${quality}`);
    }

    return `${baseUrl}${optimizations.join(",")}/${path}`;
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
    };
  }
}

// Initialize with critical images
export const initializeImageOptimizer = () => {
  // Preload critical images that are likely to be viewed first
  const criticalImages = [
    // Add your most important product images here
  ];

  ImageOptimizer.preloadCriticalImages(criticalImages);
};

// Hook for component-level image optimization
export const useImageOptimizer = (imageUrls: string[]) => {
  useEffect(() => {
    ImageOptimizer.queueForPreload(imageUrls);
  }, [imageUrls]);
};
