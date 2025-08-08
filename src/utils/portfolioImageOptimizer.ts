export interface OptimizedImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
  fit?: "cover" | "contain" | "fill";
}

export interface OptimizedVideoConfig {
  quality?: "auto" | "high" | "medium" | "low";
  format?: "webm" | "mp4";
  width?: number;
  height?: number;
}

/**
 * Optimize image URLs for portfolio display
 * Uses Cloudinary transformation parameters for optimal performance
 */
export const optimizePortfolioImage = (
  originalUrl: string,
  config: OptimizedImageConfig = {}
): string => {
  const {
    width = 800,
    height = 600,
    quality = 80,
    format = "webp",
    fit = "cover",
  } = config;

  // If it's already a Cloudinary URL, add transformations
  if (originalUrl.includes("cloudinary.com")) {
    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const imagePath = originalUrl.split("/upload/")[1];

    const transformations = [
      `f_${format}`,
      `q_${quality}`,
      `w_${width}`,
      `h_${height}`,
      `c_${fit}`,
      "fl_progressive",
    ].join(",");

    return `${baseUrl}${transformations}/${imagePath}`;
  }

  // For external URLs, return as is (you might want to proxy through your own CDN)
  return originalUrl;
};

/**
 * Optimize video URLs for portfolio display
 */
export const optimizePortfolioVideo = (
  originalUrl: string,
  config: OptimizedVideoConfig = {}
): string => {
  const {
    quality = "auto",
    format = "webm",
    width = 1280,
    height = 720,
  } = config;

  // If it's already a Cloudinary URL, add transformations
  if (originalUrl.includes("cloudinary.com")) {
    const baseUrl = originalUrl.split("/upload/")[0] + "/upload/";
    const videoPath = originalUrl.split("/upload/")[1];

    const transformations = [
      `f_${format}`,
      `q_${quality}`,
      `w_${width}`,
      `h_${height}`,
      "fl_progressive",
    ].join(",");

    return `${baseUrl}${transformations}/${videoPath}`;
  }

  return originalUrl;
};

/**
 * Generate responsive image URLs for different screen sizes
 */
export const generateResponsiveImageUrls = (originalUrl: string) => {
  return {
    thumbnail: optimizePortfolioImage(originalUrl, { width: 400, height: 300 }),
    medium: optimizePortfolioImage(originalUrl, { width: 800, height: 600 }),
    large: optimizePortfolioImage(originalUrl, { width: 1200, height: 900 }),
    original: originalUrl,
  };
};

/**
 * Generate responsive video URLs for different screen sizes
 */
export const generateResponsiveVideoUrls = (originalUrl: string) => {
  return {
    thumbnail: optimizePortfolioVideo(originalUrl, {
      width: 400,
      height: 300,
      quality: "medium",
    }),
    medium: optimizePortfolioVideo(originalUrl, {
      width: 800,
      height: 600,
      quality: "high",
    }),
    large: optimizePortfolioVideo(originalUrl, {
      width: 1280,
      height: 720,
      quality: "high",
    }),
    original: originalUrl,
  };
};

/**
 * Get optimized image URL for portfolio cards
 */
export const getPortfolioCardImage = (originalUrl: string): string => {
  return optimizePortfolioImage(originalUrl, {
    width: 600,
    height: 400,
    quality: 85,
    format: "webp",
  });
};

/**
 * Get optimized image URL for portfolio modal
 */
export const getPortfolioModalImage = (originalUrl: string): string => {
  return optimizePortfolioImage(originalUrl, {
    width: 1200,
    height: 800,
    quality: 90,
    format: "webp",
  });
};

/**
 * Get optimized video URL for portfolio modal
 */
export const getPortfolioModalVideo = (originalUrl: string): string => {
  return optimizePortfolioVideo(originalUrl, {
    width: 1280,
    height: 720,
    quality: "high",
    format: "webm",
  });
};
