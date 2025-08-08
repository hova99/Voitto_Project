import { useEffect, Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { initializeImageOptimizer } from "./utils/imageOptimizer";
import { initializePerformanceOptimizer } from "./utils/performanceOptimizer";

// Lazy load all pages for better performance with preloading
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));

// Enhanced loading component with better UX
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
      <p className="text-gray-400 text-sm mt-2">Please wait while we prepare your experience</p>
    </div>
  </div>
);

// Error boundary component for better error handling
const ErrorFallback = ({ resetError }: { error: Error; resetError: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this page.</p>
      <button
        onClick={resetError}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Navigation tracking component
const NavigationTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track navigation for analytics
    console.log('Navigation to:', location.pathname);
    
    // Preload critical resources for next page
    if (location.pathname === '/') {
      // Preload products page resources
      import("./pages/ProductsPage");
    } else if (location.pathname === '/products') {
      // Preload home page resources
      import("./pages/HomePage");
    }
  }, [location]);

  return null;
};

// Enhanced App component with better performance
function App() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize image optimizer on app mount
    initializeImageOptimizer();
    
    // Initialize performance optimizer
    initializePerformanceOptimizer();

    // Add error boundary for unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      setError(event.error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setError(new Error(event.reason));
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Preload critical pages
    const preloadCriticalPages = async () => {
      try {
        // Preload the most commonly accessed pages
        await Promise.all([
          import("./pages/HomePage"),
          import("./pages/ProductsPage"),
        ]);
      } catch (error) {
        console.warn('Failed to preload some pages:', error);
      }
    };

    preloadCriticalPages();

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  if (hasError && error) {
    return <ErrorFallback error={error} resetError={resetError} />;
  }

  return (
    <CartProvider>
      <Router>
        <NavigationTracker />
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <HomePage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/products" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ProductsPage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/product/:id" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ProductDetailPage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/about" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <AboutPage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ContactPage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/cart" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <CartPage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <CheckoutPage />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/order-success" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <OrderSuccessPage />
                    </Suspense>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;