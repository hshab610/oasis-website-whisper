
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
