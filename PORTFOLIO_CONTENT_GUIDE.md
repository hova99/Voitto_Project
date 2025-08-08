# Portfolio Content Guide

## How to Add Your Portfolio Content

### 1. **Update Portfolio Data**

Edit `src/data/portfolio.ts` to add your actual projects:

```typescript
{
  id: 7, // Next available ID
  title: "Your Project Title",
  category: "Machinery Rental", // or "Infrastructure", "Road Construction", etc.
  description: "Brief description (1-2 sentences)",
  image: "your-image-url.jpg", // Your actual image URL
  type: "image", // or "video"
  videoUrl: "your-video-url.mp4", // Only if type is "video"
  details: "Detailed description of the project, process, and results",
  location: "Project location",
  duration: "Project duration"
}
```

### 2. **Image Optimization**

For best performance, use these image specifications:

#### **Portfolio Card Images:**

- **Size**: 600x400 pixels
- **Format**: WebP (preferred) or JPG
- **Quality**: 85%
- **Aspect Ratio**: 3:2 (landscape)

#### **Modal/Detail Images:**

- **Size**: 1200x800 pixels
- **Format**: WebP (preferred) or JPG
- **Quality**: 90%
- **Aspect Ratio**: 3:2 (landscape)

### 3. **Video Optimization**

For videos in your portfolio:

#### **Video Specifications:**

- **Format**: WebM (preferred) or MP4
- **Resolution**: 1280x720 (HD)
- **Quality**: High
- **Duration**: Keep under 2 minutes for portfolio cards
- **File Size**: Optimize for web (under 10MB for portfolio cards)

### 4. **Content Categories**

Use these categories for your projects:

- **Machinery Rental**: Excavators, tippers, tractors
- **Infrastructure**: Culverts, drainage systems
- **Road Construction**: Road cabros, paving
- **Residential**: Home projects, driveways
- **Material Supply**: Stone delivery, material transport
- **Quarry Services**: Stone excavation, quarry operations

### 5. **Project Examples to Add**

#### **Excavator & Tipper Services:**

- Images of your excavators and tippers in action
- Before/after photos of excavation work
- Video clips of machinery operations

#### **Culvert Installation:**

- Process photos: digging, installation, completion
- Before/after shots showing drainage improvement
- Video of installation process

#### **Road Cabros Installation:**

- Step-by-step process: excavation → preparation → installation
- Before/after road conditions
- Video of cabros placement and compacting

#### **Wet Concrete Cabros:**

- Residential project photos
- Different patterns and finishes
- Completed driveway/walkway shots

#### **Darufo Stones Delivery:**

- Loading and delivery process
- Placement and installation
- Completed projects using the stones

#### **Tractor Quarry Operations:**

- Quarry site photos
- Tractor in action
- Video of excavation process

### 6. **Image Upload Process**

1. **Optimize your images** using the provided utilities
2. **Upload to Cloudinary** or your preferred CDN
3. **Use the optimized URLs** in your portfolio data
4. **Test the portfolio** to ensure images load properly

### 7. **Video Upload Process**

1. **Compress videos** to web-optimized format
2. **Upload to Cloudinary** or video hosting service
3. **Get the video URL** and add to portfolio data
4. **Test video playback** in the portfolio modal

### 8. **Content Best Practices**

- **High Quality**: Use clear, professional photos
- **Consistent Style**: Maintain similar lighting and composition
- **Process Documentation**: Show before, during, and after
- **Professional Descriptions**: Focus on results and quality
- **Location Details**: Include project locations when relevant
- **Client Privacy**: Don't include identifiable client information without permission

### 9. **Performance Tips**

- **Lazy Loading**: Images load as users scroll
- **Progressive Loading**: Images load in stages
- **Responsive Images**: Different sizes for different screens
- **Video Optimization**: Compressed videos for faster loading
- **CDN Usage**: Use Cloudinary or similar for fast delivery

### 10. **Testing Your Portfolio**

1. **Check all images load** properly
2. **Test video playback** in modals
3. **Verify responsive design** on mobile
4. **Test modal functionality** (open/close)
5. **Check loading performance** with actual content

## Quick Start

1. **Prepare your images/videos** according to specifications
2. **Upload to Cloudinary** or your CDN
3. **Update `src/data/portfolio.ts`** with your content
4. **Test the portfolio section** on your website
5. **Optimize further** based on performance

The portfolio section is now ready for your content! The structure is professional, interactive, and optimized for performance.
