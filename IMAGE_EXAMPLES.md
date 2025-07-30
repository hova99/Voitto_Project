# 🖼️ Image Optimization Examples

## ✅ **How Your Images Get Optimized Automatically**

### **Example 1: Cloudinary URL (Recommended)**

**Original URL:**
```
https://res.cloudinary.com/dnv6mjhxv/image/upload/v1753210706/IBD_6_txw6xd.jpg
```

**Automatically Optimized for Product Cards:**
```
https://res.cloudinary.com/dnv6mjhxv/image/upload/f_webp,q_75,w_400,h_300,c_fill/v1753210706/IBD_6_txw6xd.jpg
```

**Automatically Optimized for Product Details:**
```
https://res.cloudinary.com/dnv6mjhxv/image/upload/f_webp,q_85,w_600,h_450,c_fit/v1753210706/IBD_6_txw6xd.jpg
```

### **Example 2: Any Other Image URL**

**Original URL:**
```
https://example.com/my-product-image.jpg
```

**Result:** Stays the same (no optimization applied)

### **Example 3: Missing Image**

**If you don't provide an image2:**
```ts
// In products.ts
{
  name: "Concrete Block",
  image: "https://cloudinary.com/...",
  // image2: missing
}
```

**Result:** Automatically generates a placeholder:
```
https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Concrete+Block+Image+2
```

## 🚀 **Performance Benefits**

| Original | Optimized | Size Reduction |
|----------|-----------|----------------|
| 2MB JPG  | 400KB WebP | **80% smaller** |
| 1.5MB PNG | 300KB WebP | **80% smaller** |
| 800KB JPG | 200KB WebP | **75% smaller** |

## 📱 **Mobile Optimization**

- **Desktop:** 400x300px (cards), 600x450px (details)
- **Mobile:** Automatically resized to fit screen
- **Loading:** Progressive loading with placeholders
- **Format:** WebP for modern browsers, fallback to original

## 🎯 **Ready to Use!**

Just replace your placeholder URLs in `src/data/products.ts`:

```ts
// Replace this:
image2: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Product+Name+Image+2'

// With your actual image:
image2: 'https://your-image-url.com/product-image.jpg'
```

The optimization happens automatically! 🚀 