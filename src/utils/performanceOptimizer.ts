// Performance Optimization Utility for Core Web Vitals
export class PerformanceOptimizer {
  private static criticalResources: string[] = [];
  private static preloadedResources = new Set<string>();
  private static isInitialized = false;

  // Initialize performance optimizations
  static initialize() {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    
    // Set up performance monitoring
    this.setupPerformanceMonitoring();
    
    // Optimize critical rendering path
    this.optimizeCriticalRenderingPath();
    
    // Preload critical resources
    this.preloadCriticalResources();
  }

  // Set up performance monitoring
  private static setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Monitor LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Monitor CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Monitor INP (Interaction to Next Paint)
        const inpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.log('INP:', entry.processingEnd - entry.startTime);
          });
        });
        inpObserver.observe({ entryTypes: ['interaction'] });
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }

  // Optimize critical rendering path
  private static optimizeCriticalRenderingPath() {
    // Add resource hints for faster loading
    this.addResourceHints();
    
    // Optimize font loading
    this.optimizeFontLoading();
    
    // Preconnect to external domains
    this.preconnectToExternalDomains();
  }

  // Add resource hints for faster loading
  private static addResourceHints() {
    const hints = [
      { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    ];

    hints.forEach(({ rel, href }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Optimize font loading
  private static optimizeFontLoading() {
    // Add font-display: swap for better performance
    const fontLinks = document.querySelectorAll('link[rel="stylesheet"][href*="fonts"]');
    fontLinks.forEach((link) => {
      link.setAttribute('media', 'print');
      link.setAttribute('onload', "this.media='all'");
    });
  }

  // Preconnect to external domains
  private static preconnectToExternalDomains() {
    const domains = [
      'https://res.cloudinary.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    domains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Preload critical resources
  private static preloadCriticalResources() {
    const criticalImages = [
      'https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754409797/IBD2_eepz4h.jpg',
      'https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754409797/IBD6_ilfn8f.jpg',
      'https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_800,h_600,c_fill,fl_progressive,fl_force_strip/v1754409797/IBD9_ilfn8f.jpg',
    ];

    criticalImages.forEach((src) => {
      this.preloadResource(src, 'image');
    });
  }

  // Preload a specific resource
  static preloadResource(url: string, type: 'image' | 'script' | 'style' | 'font') {
    if (this.preloadedResources.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    link.fetchPriority = 'high';

    if (type === 'image') {
      link.type = 'image/webp';
    }

    document.head.appendChild(link);
    this.preloadedResources.add(url);
  }

  // Optimize image loading for better LCP
  static optimizeImageLoading(imageElement: HTMLImageElement) {
    // Set loading priority
    imageElement.fetchPriority = 'high';
    imageElement.loading = 'eager';
    imageElement.decoding = 'async';

    // Add error handling
    imageElement.onerror = () => {
      console.warn('Failed to load image:', imageElement.src);
    };

    // Add load event for performance tracking
    imageElement.onload = () => {
      // Mark as loaded for performance tracking
      imageElement.dataset.loaded = 'true';
    };
  }

  // Reduce layout shifts by reserving space
  static reserveImageSpace(width: number, height: number, aspectRatio?: number) {
    const ratio = aspectRatio || width / height;
    return {
      paddingBottom: `${(1 / ratio) * 100}%`,
      position: 'relative' as const,
    };
  }

  // Optimize scroll performance
  static optimizeScrollPerformance() {
    // Use passive event listeners for better scroll performance
    const addPassiveEventListener = (element: Element, event: string, handler: EventListener) => {
      element.addEventListener(event, handler, { passive: true });
    };

    // Optimize scroll events
    addPassiveEventListener(window, 'scroll', () => {
      // Throttle scroll events for better performance
      requestAnimationFrame(() => {
        // Handle scroll optimizations
      });
    });

    // Optimize resize events
    addPassiveEventListener(window, 'resize', () => {
      // Debounce resize events
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(() => {
        // Handle resize optimizations
      }, 100);
    });
  }

  // Optimize animations for better performance
  static optimizeAnimations() {
    // Use transform and opacity for better performance
    const style = document.createElement('style');
    style.textContent = `
      .optimized-animation {
        will-change: transform, opacity;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      .smooth-transition {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .fast-transition {
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);
  }

  // Optimize JavaScript execution
  static optimizeJavaScriptExecution() {
    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      const idleCallback = (window as any).requestIdleCallback;
      
      // Defer non-critical operations
      idleCallback(() => {
        // Perform non-critical optimizations
        this.cleanupUnusedResources();
      });
    }
  }

  // Clean up unused resources
  private static cleanupUnusedResources() {
    // Clear unused image cache entries
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          if (cacheName.includes('image-cache')) {
            caches.delete(cacheName);
          }
        });
      });
    }
  }

  // Get performance metrics
  static getPerformanceMetrics() {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const metrics = {
            lcp: 0,
            fid: 0,
            cls: 0,
            inp: 0,
          };

          entries.forEach((entry: any) => {
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.lcp = entry.startTime;
            } else if (entry.entryType === 'first-input') {
              metrics.fid = entry.processingStart - entry.startTime;
            } else if (entry.entryType === 'layout-shift') {
              metrics.cls += entry.value;
            } else if (entry.entryType === 'interaction') {
              metrics.inp = entry.processingEnd - entry.startTime;
            }
          });

          resolve(metrics);
        });

        observer.observe({
          entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'interaction'],
        });
      } else {
        resolve({
          lcp: 0,
          fid: 0,
          cls: 0,
          inp: 0,
        });
      }
    });
  }

  // Optimize for mobile devices
  static optimizeForMobile() {
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
      document.head.appendChild(viewport);
    }

    // Optimize touch interactions
    const touchOptimizations = `
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea {
        -webkit-user-select: text;
        -khtml-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `;

    const style = document.createElement('style');
    style.textContent = touchOptimizations;
    document.head.appendChild(style);
  }
}

// Export initialization function
export const initializePerformanceOptimizer = () => {
  PerformanceOptimizer.initialize();
}; 