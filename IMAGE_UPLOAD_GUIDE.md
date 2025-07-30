# 🖼️ Product Image Upload Guide

## ✅ **Your Site is Now Ready!**

Your Voitto Concrete website is running smoothly with:
- ✅ Fixed TypeScript errors
- ✅ Optimized ProductCard component
- ✅ Dual image support for all products
- ✅ Responsive design
- ✅ Fast loading

## 📸 **How to Upload Product Images**

### **Step 1: Prepare Your Images**
- **Format:** PNG, JPG, or WebP (recommended)
- **Size:** 400x300 pixels or larger
- **Quality:** High resolution, clear photos
- **Background:** Clean, professional background

### **Step 2: Upload to Cloudinary**
1. Go to [Cloudinary.com](https://cloudinary.com)
2. Upload your images
3. Copy the image URL
4. Replace the placeholder URLs in `src/data/products.ts`

### **Step 3: Update Product Images**

**Current Placeholder Format:**
```ts
image2: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Product+Name+Image+2'
```

**Replace with Your Real Image:**
```ts
image2: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/your-image.jpg'
```

### **Step 4: Test Your Changes**
1. Save the file
2. Check your browser (should auto-refresh)
3. Go to Products page
4. Hover over product cards to see image toggle
5. Click on products to see carousel on detail page

## 🎯 **Priority Products to Update**

Start with your most popular products:
1. **IBD 600** - Main drainage product
2. **Culvert 900mm** - Large culverts
3. **Paving Slabs 2x2** - Popular paving
4. **Road Kerbs** - Road construction
5. **Wall Coping** - Building finishing

## 🚀 **Next Steps After Images**

1. **Deploy to production**
2. **Test on mobile devices**
3. **Add real customer reviews**
4. **Optimize for Google search**

## 💡 **Tips for Great Product Images**

- **Multiple angles** - Show front, side, and detail views
- **In use** - Show products installed/being used
- **Consistent lighting** - Professional, well-lit photos
- **Clean background** - White or neutral backgrounds
- **High resolution** - At least 800x600 pixels

Your site is now ready for your product images! 🎉 