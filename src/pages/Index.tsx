
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import QuickEstimate from '@/components/home/QuickEstimate';
import CTA from '@/components/home/CTA';
import ContactForm from '@/components/home/ContactForm';
import Pricing from '@/components/home/Pricing';
import Services from '@/components/home/Services';
import PromoBanner from '@/components/promotion/PromoBanner';
import PromoPopup from '@/components/promotion/PromoPopup';
import ChatWidget from '@/components/chat/ChatWidget';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Oasis Moving & Storage | Professional Moving Services in Westerville, Ohio</title>
        <meta name="description" content="Get an instant quote or book your move in minutes. Professional moving and storage services in Westerville, Ohio with 10% off for new customers." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#DFC9A5" />
      </Helmet>
      
      <PromoBanner />
      <PromoPopup trigger="timer" />
      <PromoPopup trigger="exit" />
      <ChatWidget />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <QuickEstimate />
          <CTA />
          <Services />
          <Pricing />
          <ContactForm />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
