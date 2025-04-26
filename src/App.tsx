
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PromotionProvider } from "./contexts/PromotionContext";
import AuthGuard from "./components/auth/AuthGuard";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import BookingAdmin from "./pages/BookingAdmin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import PaymentPortal from "./pages/PaymentPortal";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  // Force Nile theme application on load
  useEffect(() => {
    // Apply Nile theme by default
    document.body.classList.add("nile-theme");
    localStorage.setItem("nile-theme-enabled", "true");
    
    // Diagnostic border for testing (will be visible in dev mode only)
    if (process.env.NODE_ENV === 'development') {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        /* Force Nile theme visibility */
        header { border-bottom: 3px solid #007791 !important; }
        .cta-button { border-color: #d4a937 !important; }
        
        /* Add visible indicators */
        :root {
          --nile-deep: #007791;
          --desert-gold: #d4a937;
          --papyrus: #f0e6d2;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // Failsafe for background visibility
    const ensureBackgroundVisibility = () => {
      // Check if background is visible
      const computedStyle = window.getComputedStyle(document.body, '::after');
      const isBackgroundVisible = computedStyle.opacity !== '0' && 
                                  computedStyle.display !== 'none' && 
                                  computedStyle.visibility !== 'hidden';
      
      // If background isn't visible, apply nuclear option
      if (!isBackgroundVisible) {
        console.log('Background not visible, applying failsafe...');
        document.head.insertAdjacentHTML('beforeend', `
          <style id="forced-bg">
            body::after {
              content: "" !important;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath d='M0,256 L48,240 C96,224 192,192 288,192 C384,192 480,224 576,213.3 C672,203 768,149 864,128 C960,107 1056,117 1152,144 C1248,171 1344,213 1392,234.7 L1440,256 L1440,320 L1392,320 C1344,320 1248,320 1152,320 C1056,320 960,320 864,320 C768,320 672,320 576,320 C480,320 384,320 288,320 C192,320 96,320 48,320 L0,320 Z' fill='%23007791' fill-opacity='0.7'/%3E%3C/svg%3E") !important;
              display: block !important;
              position: fixed !important;
              width: 100vw !important;
              height: 100vh !important;
              top: 0 !important;
              left: 0 !important;
              z-index: -9999 !important;
              opacity: 0.25 !important;
              background-size: 100% auto !important;
              background-position: center bottom !important;
              background-repeat: no-repeat !important;
              pointer-events: none !important;
              filter: contrast(1.2) grayscale(30%) sepia(15%) !important;
            }
            
            #root, body, html {
              background: transparent !important;
            }
          </style>
        `);
      }
    };
    
    // Run failsafe after a short delay to ensure DOM is loaded
    setTimeout(ensureBackgroundVisibility, 1000);
    
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <PromotionProvider>
            <Helmet>
              <title>Oasis Moving & Storage | Professional Moving Services</title>
              <meta name="description" content="Professional moving and storage services in Westerville, Ohio. Local and long-distance moving, furniture assembly, and more." />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
              <meta name="theme-color" content="#007791" />
            </Helmet>
            
            <div className="content-visibility-auto">
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-canceled" element={<PaymentCanceled />} />
                <Route path="/pay/:bookingId" element={<PaymentPortal />} />
                <Route path="/admin" element={
                  <AuthGuard adminOnly={true}>
                    <Admin />
                  </AuthGuard>
                } />
                <Route path="/admin/bookings" element={
                  <AuthGuard adminOnly={true}>
                    <BookingAdmin />
                  </AuthGuard>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </PromotionProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
