import { useEffect } from "react";

// Enhanced Image Optimization Utility with Blazing-Fast Performance
export class ImageOptimizer {
  private static imageCache = new Map<string, HTMLImageElement>();
  private static preloadQueue: string[] = [];
  private static isProcessing = false;
  private static criticalImages = new Set<string>();
  private static maxConcurrentRequests = 4; // Increased for better performance
  private static activeRequests = 0;
  private static cloudinaryCloudName = 'dnv6mjhxv'; // Your Cloudinary cloud name

  // Preload critical images with high priority
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
          this.preloadQueue.unshift(url);
        } else {
          this.preloadQueue.push(url);
        }
      }
    });

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  // Process queue with optimized concurrent requests
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

    if (this.preloadQueue.length > 0) {
      setTimeout(() => this.processQueue(), 25); // Reduced delay for faster processing
    }
  }

  // Load individual image with optimized settings
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

      // Optimized loading attributes
      img.loading = "eager";
      img.decoding = "async";
      img.fetchPriority = "high";

      img.src = url;
    });
  }

  // Enhanced Cloudinary URL optimization with WebP/AVIF support
  static validateAndOptimizeUrl(url: string): string {
    if (!url.includes("cloudinary.com")) {
      return url;
    }

    // Special products that need full image display without optimization
    const specialProducts = [
      "ball_sjs7h0.jpg",
      "1950626f-fc13-495a-94a2-2a8f813925a2_enqifz.jpg",
      "ws9_rernom.jpg",
      "ws6_f0rtwi.jpg",
      "straigh_irvg3x.jpg",
    ];

    const isSpecialProduct = specialProducts.some((product) =>
      url.includes(product)
    );
    
    if (isSpecialProduct) {
      return url;
    }

    // Check if URL already has optimization parameters
    if (url.includes("/f_auto,q_auto/")) {
      return url;
    }

    // Add comprehensive optimization parameters
    const baseUrl = url.split("/upload/")[0] + "/upload/";
    const path = url.split("/upload/")[1];

    return `${baseUrl}f_auto,q_auto,fl_progressive,fl_force_strip/${path}`;
  }

  // Get optimized URL with specific transformations
  static getOptimizedUrl(
    url: string,
    width?: number,
    height?: number,
    quality: number = 85
  ): string {
    if (!url.includes("cloudinary.com")) {
      return url;
    }

    let optimizedUrl = this.validateAndOptimizeUrl(url);

    if (width) {
      optimizedUrl = optimizedUrl.replace(
        "/f_auto,q_auto,fl_progressive,fl_force_strip/",
        `/f_auto,q_auto,w_${width},fl_progressive,fl_force_strip,`
      );
    }

    if (height) {
      optimizedUrl = optimizedUrl.replace(
        "/f_auto,q_auto,fl_progressive,fl_force_strip/",
        `/f_auto,q_auto,h_${height},fl_progressive,fl_force_strip,`
      );
    }

    optimizedUrl = optimizedUrl.replace("q_auto", `q_${quality}`);

    return optimizedUrl;
  }

  // Generate responsive srcSet with WebP/AVIF support
  static generateSrcSet(
    originalUrl: string,
    widths: number[] = [400, 600, 800, 1000, 1200, 1600]
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
      { maxWidth: 640, width: "100vw" },
      { maxWidth: 768, width: "50vw" },
      { maxWidth: 1024, width: "33vw" },
      { maxWidth: 1440, width: "25vw" },
    ]
  ): string {
    return (
      breakpoints
        .map(({ maxWidth, width }) => `(max-width: ${maxWidth}px) ${width}`)
        .join(", ") +
      `, ${breakpoints[breakpoints.length - 1]?.width || "20vw"}`
    );
  }

  // Generate mobile-first srcSet for product images with optimal quality
  static generateProductSrcSet(originalUrl: string): string {
    if (!originalUrl.includes("cloudinary.com")) {
      return "";
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    // Mobile-first approach with optimal quality for full image visibility
    const sizes = [
      { width: 480, height: 360 }, // Mobile (1x) - high quality
      { width: 640, height: 480 }, // Mobile (1.5x) - very high quality
      { width: 768, height: 576 }, // Tablet (1x) - excellent quality
      { width: 1024, height: 768 }, // Desktop (1x) - premium quality
      { width: 1280, height: 960 }, // Desktop (1.5x) - ultra quality
      { width: 1600, height: 1200 }, // Desktop (2x for retina) - maximum quality
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

    // Hero images with 16:9 aspect ratio for optimal background coverage
    const sizes = [
      { width: 640, height: 360 }, // Mobile (1x)
      { width: 1024, height: 576 }, // Tablet (1x)
      { width: 1440, height: 810 }, // Desktop (1x)
      { width: 1920, height: 1080 }, // Desktop (2x for retina)
    ];

    return sizes
      .map(({ width, height }) => {
        const optimizedUrl = `${baseUrl}f_auto,q_auto,w_${width},h_${height},c_fill,fl_progressive,fl_force_strip/${path}`;
        return `${optimizedUrl} ${width}w`;
      })
      .join(", ");
  }

  // Preload images for a specific product with high priority
  static preloadProductImages(productImages: string[]) {
    productImages.forEach((url) => {
      if (!this.imageCache.has(url)) {
        const img = new Image();
        img.fetchPriority = "high";
        img.loading = "eager";
        img.decoding = "async";
        img.src = url;
        this.imageCache.set(url, img);
      }
    });
  }

  // Generate picture element sources for modern browsers
  static generatePictureSources(originalUrl: string): {
    webp: string;
    avif: string;
    fallback: string;
  } {
    if (!originalUrl.includes("cloudinary.com")) {
      return {
        webp: originalUrl,
        avif: originalUrl,
        fallback: originalUrl,
      };
    }

    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const path = originalUrl.split("/upload/")[1];

    const webpUrl = `${baseUrl}f_webp,q_auto,fl_progressive,fl_force_strip/${path}`;
    const avifUrl = `${baseUrl}f_avif,q_auto,fl_progressive,fl_force_strip/${path}`;
    const fallbackUrl = `${baseUrl}f_auto,q_auto,fl_progressive,fl_force_strip/${path}`;

    return {
      webp: webpUrl,
      avif: avifUrl,
      fallback: fallbackUrl,
    };
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
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754409797/IBD2_eepz4h.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754409797/IBD6_ilfn8f.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754409797/IBD9_ilfn8f.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754410077/culvert300_t40svv.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754411615/culvert900_t40svv.jpg",
      "https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754317362/road_krbs_adlteh.jpg",
    ];

    criticalImages.forEach((url) => {
      this.criticalImages.add(url);
    });

    criticalImages.forEach((url) => {
      this.queueForPreload(url, "high");
    });

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
  widths: number[] = [400, 600, 800, 1000, 1200]
) => {
  const srcSet = ImageOptimizer.generateSrcSet(imageUrl, widths);
  const sizes = ImageOptimizer.generateSizes();
  const pictureSources = ImageOptimizer.generatePictureSources(imageUrl);

  return {
    src: ImageOptimizer.getOptimizedUrl(imageUrl),
    srcSet,
    sizes,
    pictureSources,
  };
};

// Export the initialize function
export const initializeImageOptimizer = () => {
  ImageOptimizer.initializeImageOptimizer();
};
