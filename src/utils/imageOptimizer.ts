import { useEffect } from "react";

// Enhanced Image Optimization Utility with Responsive Loading
export class ImageOptimizer {
  private static imageCache = new Map<string, HTMLImageElement>();
  private static preloadQueue: string[] = [];
  private static isProcessing = false;
  private static criticalImages = new Set<string>();
  private static maxConcurrentRequests = 3; // Limit concurrent requests
  private static activeRequests = 0;

  // Preload critical images with priority
  static preloadCriticalImages(imageUrls: string[]) {
    imageUrls.forEach((url) => {
      this.criticalImages.add(url);
      this.queueForPreload(url, "high");
    });
  }

  // Queue images for preloading with priority
  static queueForPreload(
    imageUrls: string | string[],
    priority: "high" | "low" = "low"
  ) {
    const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

    urls.forEach((url) => {
      if (!this.imageCache.has(url) && !this.preloadQueue.includes(url)) {
        if (priority === "high") {
          this.preloadQueue.unshift(url); // Add to front for high priority
        } else {
          this.preloadQueue.push(url); // Add to back for low priority
        }
      }
    });

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process queue with limited concurrent requests
  private static async processQueue() {
    if (this.isProcessing || this.preloadQueue.length === 0) return;

    this.isProcessing = true;

    while (
      this.preloadQueue.length > 0 &&
      this.activeRequests < this.maxConcurrentRequests
    ) {
      const url = this.preloadQueue.shift();
      if (!url) continue;

      this.activeRequests++;

      try {
        await this.loadImage(url);
      } catch (error) {
        console.warn(`Failed to load image: ${url}`, error);
      } finally {
        this.activeRequests--;
      }
    }

    this.isProcessing = false;

    // Continue processing if there are more items
    if (this.preloadQueue.length > 0) {
      setTimeout(() => this.processQueue(), 50); // Small delay to prevent overwhelming
    }
  }

  // Load individual image with error handling
  private static loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.imageCache.set(url, img);
        resolve();
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`));
      };

      // Set loading attributes for better performance
      img.loading = "eager";
      img.decoding = "async";

      img.src = url;
    });
  }

  // Validate and optimize Cloudinary URLs
  static validateAndOptimizeUrl(url: string): string {
    if (!url.includes("cloudinary.com")) {
      return url;
    }

    // Special products that should show full images without optimization
    const specialProducts = [
      "ball_sjs7h0.jpg", // Ball Head first image
      "1950626f-fc13-495a-94a2-2a8f813925a2_enqifz.jpg", // Ball Head second image
      "ws9_rernom.jpg", // Window Seal 9
      "ws6_f0rtwi.jpg", // Window Seal 6
      "straigh_irvg3x.jpg", // Fencing Post Straight
    ];

    // Check if this is a special product that should not be optimized
    const isSpecialProduct = specialProducts.some((product) =>
      url.includes(product)
    );
    if (isSpecialProduct) {
      // Return the original URL without any optimization parameters
      return url;
    }

    // Check if URL already has optimization parameters
    if (url.includes("/f_auto,q_auto/")) {
      return url;
    }

    // Add optimization parameters if missing
    const baseUrl = url.split("/upload/")[0] + "/upload/";
    const path = url.split("/upload/")[1];

    return `${baseUrl}f_auto,q_auto/${path}`;
  }

  // Get optimized URL with specific transformations
  static getOptimizedUrl(
    url: string,
    width?: number,
    height?: number,
    quality: number = 80
  ): string {
    if (!url.includes("cloudinary.com")) {
      return url;
    }

    // Ensure base optimization parameters
    let optimizedUrl = this.validateAndOptimizeUrl(url);

    // Add width transformation if specified
    if (width) {
      optimizedUrl = optimizedUrl.replace(
        "/f_auto,q_auto/",
        `/f_auto,q_auto,w_${width},`
      );
    }

    // Add height transformation if specified
    if (height) {
      optimizedUrl = optimizedUrl.replace(
        "/f_auto,q_auto/",
        `/f_auto,q_auto,h_${height},`
      );
    }

    // Add quality transformation
    optimizedUrl = optimizedUrl.replace("q_auto", `q_${quality}`);

    return optimizedUrl;
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
        const optimizedUrl = `${baseUrl}f_auto,q_auto,w_${width},h_${Math.round(
          width * 0.75
        )},c_fill,fl_progressive,fl_force_strip/${path}`;
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
    return (
      breakpoints
        .map(({ maxWidth, width }) => `(max-width: ${maxWidth}px) ${width}`)
        .join(", ") +
      `, ${breakpoints[breakpoints.length - 1]?.width || "25vw"}`
    );
  }

  // Generate mobile-first srcSet for product images
  static generateProductSrcSet(originalUrl: string): string {
    if (!originalUrl.includes("cloudinary.com")) {
      return "";
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    // Mobile-first approach with better quality settings for full image visibility
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

  // Initialize image optimizer with critical images
  static initializeImageOptimizer() {
    // Preload critical product images with optimized settings
    const criticalImages = [
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754409797/IBD2_eepz4h.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754409797/IBD6_ilfn8f.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754409797/IBD9_ilfn8f.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754410077/culvert300_t40svv.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754411615/culvert900_t40svv.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_600,h_400,c_fill/v1754317362/road_krbs_adlteh.jpg",
    ];

    // Add critical images to the set
    criticalImages.forEach((url) => {
      this.criticalImages.add(url);
    });

    // Preload critical images immediately
    criticalImages.forEach((url) => {
      this.queueForPreload(url, "high");
    });

    // Start processing the queue
    this.processQueue();
  }
}

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

// Export the initialize function
export const initializeImageOptimizer = () => {
  ImageOptimizer.initializeImageOptimizer();
};
