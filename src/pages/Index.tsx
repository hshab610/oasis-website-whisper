
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#DFC9A5" />
      </Helmet>
      
      <PromoBanner />
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        
        <main className="flex-grow">
          <section className="contain-content">
            <Hero />
          </section>
          
          <section id="quick-estimate" className="contain-content">
            <QuickEstimate />
          </section>
          
          <section className="contain-content">
            <CTA />
          </section>
          
          <section className="contain-content">
            <Services />
          </section>
          
          <section className="contain-content">
            <Pricing />
          </section>
          
          <section id="contact" className="contain-content">
            <ContactForm />
          </section>
        </main>
        
        <Footer />
      </div>
      
      <ChatWidget />
      
      {/* Only show one kind of popup - either timer or exit, not both */}
      <PromoPopup trigger="exit" />
    </div>
  );
};

export default Index;
