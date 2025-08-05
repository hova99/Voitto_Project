import { useState, useMemo, useCallback, useTransition, useRef, useEffect } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp, Grid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { debounce } from "../utils/debounce";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Category display names mapping
  const categoryDisplayNames = {
    all: "All Categories",
    drainage: "Drainage & Culverts",
    paving: "Paving & Slabs",
    coping: "Coping & Edging",
    window: "Window & Ventilation",
    balustrade: "Balustrades & Railings",
    garden: "Garden & Landscaping",
    fencing: "Fencing & Posts",
    aggregates: "Aggregates & Materials",
    miscellaneous: "Miscellaneous"
  };

  function getCategoryDisplayName(category: string): string {
    return categoryDisplayNames[category as keyof typeof categoryDisplayNames] || 
           category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Enhanced search with real-time suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];
    
    const suggestions = new Set<string>();
    const searchLower = searchTerm.toLowerCase();
    
    products.forEach(product => {
      // Add product names that match
      if (product.name.toLowerCase().includes(searchLower)) {
        suggestions.add(product.name);
      }
      
      // Add category names that match
      if (product.category.toLowerCase().includes(searchLower)) {
        suggestions.add(product.category);
      }
      
      // Add words from description
      const words = product.description.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.includes(searchLower) && word.length > 3) {
          suggestions.add(word);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm]);

  // Debounced search with enhanced performance
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      startTransition(() => {
        setSearchTerm(value);
      });
    }, 100),
    []
  );

  // Advanced filtering with multiple criteria
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Enhanced search filtering
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const descMatch = product.description.toLowerCase().includes(searchLower);
        const categoryMatch = product.category.toLowerCase().includes(searchLower);
        const unitMatch = product.unit.toLowerCase().includes(searchLower);
        
        return nameMatch || descMatch || categoryMatch || unitMatch;
      });
    }

    // Category filtering
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Advanced sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "category":
          return a.category.localeCompare(b.category);
        case "newest":
          return 0; // Could be based on product ID or date
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Enhanced categories with counts
  const categoriesWithCounts = useMemo(() => {
    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return [
      { value: "all", label: "All Categories", count: products.length },
      ...uniqueCategories.map(cat => ({
        value: cat,
        label: getCategoryDisplayName(cat),
        count: categoryCounts[cat] || 0
      }))
    ];
  }, []);

  // Enhanced event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
  }, [debouncedSetSearchTerm]);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    // Delay to allow clicking on suggestions
    setTimeout(() => setSearchFocused(false), 200);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchTerm(suggestion);
    setSearchFocused(false);
    if (searchRef.current) {
      searchRef.current.value = suggestion;
    }
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      setSelectedCategory(e.target.value);
    });
  }, []);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      setSortBy(e.target.value);
    });
  }, []);

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setSearchTerm("");
      setSelectedCategory("all");
      setSortBy("name");
      if (searchRef.current) {
        searchRef.current.value = "";
      }
    });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  }, []);

  // Keyboard navigation for search suggestions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchFocused) {
        setSearchFocused(false);
        searchRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchFocused]);

  // Get current category display name
  const currentCategoryName = getCategoryDisplayName(selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dnv6mjhxv/image/upload/f_auto,q_auto,w_1200,h_600,c_fill/v1753614756/abstract-wall-with-3d-shapes_1_p5oyqx.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality precast concrete products
          </p>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar with Suggestions */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder={`Search products, categories, or descriptions...`}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                defaultValue={searchTerm}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {searchFocused && searchSuggestions.length > 0 && (
              <div className="search-suggestions">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="search-suggestion-item"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Category Filter */}
            <div className="relative">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer appearance-none custom-select"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '3rem'
                }}
              >
                {categoriesWithCounts.map((category) => (
                  <option 
                    key={category.value} 
                    value={category.value}
                    className="py-2 px-3 hover:bg-gray-100"
                  >
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer appearance-none custom-select"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '3rem'
                }}
              >
                <option value="name">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="category">Category</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-end">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  View Mode
                </label>
                <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 px-4 py-3 flex items-center justify-center transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 px-4 py-3 flex items-center justify-center transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-all duration-200 border-2 border-red-200 hover:border-red-300 flex items-center justify-center"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== "all" || searchTerm) && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Active filters:</span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {currentCategoryName}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    Search: "{searchTerm}"
                    <button
                      onClick={clearSearch}
                      className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Results Count */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{" "}
                <span className="font-semibold text-gray-900">{products.length}</span> products
                {searchTerm && (
                  <span className="text-blue-600"> for "{searchTerm}"</span>
                )}
                {selectedCategory !== "all" && (
                  <span className="text-blue-600"> in {currentCategoryName}</span>
                )}
              </p>
              {filteredProducts.length > 0 && (
                <p className="text-xs text-gray-500">
                  {viewMode === "grid" ? "Grid view" : "List view"} • Sorted by {sortBy.replace("-", " ")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {isPending && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Updating results...</span>
            </div>
          </div>
        )}

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-gray-400 text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? `No products match "${searchTerm}" in ${currentCategoryName}`
                : `No products available in ${currentCategoryName}`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                View All Categories
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                enableImageToggle={true}
                isCritical={index < 6}
                minimal={viewMode === "list"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;