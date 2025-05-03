
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// Import main pages
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import BookingAdmin from './pages/BookingAdmin';
import PrivacyPolicy from './pages/PrivacyPolicy';
// Import payment pages
import PaymentPortal from './pages/PaymentPortal';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCanceled from './pages/PaymentCanceled';
// Import components
import AuthGuard from './components/auth/AuthGuard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AuthGuard><Admin /></AuthGuard>} />
        <Route path="/bookings" element={<AuthGuard><BookingAdmin /></AuthGuard>} />
        
        {/* Payment routes */}
        <Route path="/payment" element={<PaymentPortal />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/canceled" element={<PaymentCanceled />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
