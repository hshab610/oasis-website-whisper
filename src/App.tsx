
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
  // Enhanced background image application on load
  useEffect(() => {
    // Apply Nile theme by default
    document.body.classList.add("nile-theme");
    localStorage.setItem("nile-theme-enabled", "true");
    
    // Ensure background image is properly loaded
    const ensureBackgroundVisibility = () => {
      console.log('Ensuring background visibility...');
      
      // Apply a direct style to force the background image if needed
      const style = document.createElement('style');
      style.textContent = `
        body::before {
          content: "" !important;
          background-image: url('/lovable-uploads/d9454fb5-aa86-4aeb-88fe-1f48b1375dcc.png') !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-attachment: fixed !important;
          opacity: 0.7 !important;  /* Enhanced opacity for visibility */
          z-index: -1 !important;
          pointer-events: none !important;
          filter: contrast(1.1) brightness(1.05) !important;
        }
        
        html, body, #root {
          background: transparent !important;
        }
        
        main, .content-visibility-auto {
          background: transparent !important;
        }
        
        /* Add Nile wave animation */
        .nile-wave {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 15vh;
          background: linear-gradient(to top, rgba(0, 119, 145, 0.15), transparent);
          z-index: -1;
          animation: nileWave 15s infinite ease-in-out;
        }
        
        @keyframes nileWave {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
      `;
      document.head.appendChild(style);
      
      // Add the wave element to the DOM
      if (!document.querySelector('.nile-wave')) {
        const waveElement = document.createElement('div');
        waveElement.className = 'nile-wave';
        document.body.appendChild(waveElement);
      }
      
      // Remove any potential background color blockers
      document.querySelectorAll('main, div, section').forEach(el => {
        const element = el as HTMLElement; // Cast to HTMLElement which has style property
        
        // Skip elements that need background (like cards, etc)
        if (element.classList.contains('card') || 
            element.classList.contains('nile-card') || 
            element.classList.contains('content-overlay') ||
            element.classList.contains('bg-white')) {
          return;
        }
        
        // Check if the element has a non-transparent background
        if (window.getComputedStyle(element).backgroundColor !== 'transparent' &&
            window.getComputedStyle(element).backgroundColor !== 'rgba(0, 0, 0, 0)') {
          element.style.backgroundColor = 'transparent';
        }
      });
    };
    
    // Run immediately and after short delays to catch any elements that might load later
    ensureBackgroundVisibility();
    setTimeout(ensureBackgroundVisibility, 500);
    setTimeout(ensureBackgroundVisibility, 1500);
    
    // Add interval to ensure background stays visible even after dynamic content loads
    const interval = setInterval(ensureBackgroundVisibility, 5000);
    return () => clearInterval(interval);
    
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <PromotionProvider>
            <Helmet>
              <title>Oasis Moving & Storage | Professional Moving Services in Westerville, Ohio</title>
              <meta name="description" content="Owner-supervised professional moving and storage services in Westerville, Ohio. Local and long-distance moving, furniture assembly, and more." />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
              <meta name="theme-color" content="#007791" />
            </Helmet>
            
            <div className="content-visibility-auto" style={{ background: 'transparent' }}>
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
