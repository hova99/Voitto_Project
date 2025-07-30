// Image Optimization Utility
// This utility helps optimize image URLs for better performance

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale';
}

export class ImageOptimizer {
  // Cloudinary optimization
  static optimizeCloudinary(url: string, options: ImageOptimizationOptions = {}): string {
    if (!url.includes('cloudinary.com')) return url;
    
    const {
      width = 400,
      height = 400,
      quality = 80,
      format = 'webp',
      crop = 'fit'
    } = options;

    // Parse Cloudinary URL
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return url;
    
    // Check if optimization parameters already exist
    const existingParams = urlParts[uploadIndex + 1];
    if (existingParams && existingParams.includes('f_')) {
      // URL already optimized, return as is
      return url;
    }
    
    // Insert optimization parameters
    const optimizedParams = `f_${format},q_${quality},w_${width},h_${height},c_${crop}`;
    urlParts.splice(uploadIndex + 1, 0, optimizedParams);
    
    return urlParts.join('/');
  }

  // Generic image optimization for any URL
  static optimizeImage(url: string, options: ImageOptimizationOptions = {}): string {
    // If it's already a Cloudinary URL, use Cloudinary optimization
    if (url.includes('cloudinary.com')) {
      return this.optimizeCloudinary(url, options);
    }

    // For other URLs, return as-is (you can add more optimizers here)
    return url;

    // If it's already a Cloudinary URL, use Cloudinary optimization
    if (url.includes('cloudinary.com')) {
      return this.optimizeCloudinary(url, options);
    }

    // For other URLs, return as-is (you can add more optimizers here)
    return url;
  }

  // Generate placeholder for missing images
  static getPlaceholder(productName: string, imageNumber: number = 1): string {
    const encodedName = encodeURIComponent(productName);
    const colors = ['4F46E5', '059669', 'DC2626', 'EA580C', '7C3AED'];
    const color = colors[imageNumber % colors.length];
    
    return `https://via.placeholder.com/400x300/${color}/FFFFFF?text=${encodedName}+Image+${imageNumber}`;
  }

  // Check if image URL is valid
  static isValidImageUrl(url: string): boolean {
    if (!url) return false;
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    const hasValidExtension = imageExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    );
    
    return hasValidExtension || url.includes('cloudinary.com') || url.includes('placeholder.com');
  }

  // Get optimized image URLs for a product
  static getOptimizedProductImages(
    image1: string, 
    image2?: string, 
    options: ImageOptimizationOptions = {}
  ): { image1: string; image2: string } {
    const optimizedImage1 = this.isValidImageUrl(image1) 
      ? this.optimizeImage(image1, options)
      : this.getPlaceholder('Product', 1);
    
    const optimizedImage2 = image2 && this.isValidImageUrl(image2)
      ? this.optimizeImage(image2, options)
      : this.getPlaceholder('Product', 2);

    return {
      image1: optimizedImage1,
      image2: optimizedImage2
    };
  }
}

// Predefined optimization presets
export const ImagePresets = {
  // For product cards (optimized for better visibility)
  card: {
    width: 400,
    height: 400,
    quality: 80,
    format: 'webp' as const,
    crop: 'fit' as const
  },
  
  // For product detail pages (larger, higher quality)
  detail: {
    width: 600,
    height: 600,
    quality: 85,
    format: 'webp' as const,
    crop: 'fit' as const
  },
  
  // For thumbnails (very small, very fast)
  thumbnail: {
    width: 200,
    height: 200,
    quality: 70,
    format: 'webp' as const,
    crop: 'fit' as const
  }
}; 