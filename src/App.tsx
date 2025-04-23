
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
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <PromotionProvider>
          <Helmet>
            <title>Oasis Moving & Storage | Professional Moving Services</title>
            <meta name="description" content="Professional moving and storage services in Westerville, Ohio. Local and long-distance moving, furniture assembly, and more." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
            <meta name="theme-color" content="#DFC9A5" />
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
              <Route path="/admin" element={
                <AuthGuard adminOnly={true}>
                  <Admin />
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

export default App;
