
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import QuickEstimate from '@/components/home/QuickEstimate';
import CTA from '@/components/home/CTA';
import ContactForm from '@/components/home/ContactForm';
import Pricing from '@/components/home/Pricing';
import Services from '@/components/home/Services';
import MovingProcess from '@/components/home/MovingProcess';
import PromoBanner from '@/components/promotion/PromoBanner';
import PromoPopup from '@/components/promotion/PromoPopup';
import ChatWidget from '@/components/chat/ChatWidget';
import { TrustBadge } from '@/components/ui/trust-badge'; 

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Oasis Moving & Storage | Owner-Supervised Moving Services in Westerville, Ohio</title>
        <meta 
          name="description" 
          content="Work directly with Zay, who personally oversees your move from start to finish. We combine hands-on management with certified hauling partners for a premium moving experience in Westerville, Ohio." 
        />
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
          
          <div className="bg-white/80 py-3 shadow-sm border-y border-nileTeal/10">
            <div className="container mx-auto flex flex-wrap justify-center gap-3">
              <TrustBadge type="rating" value="4.8★ Westerville" />
              <TrustBadge type="insured" />
              <TrustBadge type="ontime" />
              <TrustBadge type="dot" />
            </div>
          </div>
          
          <MovingProcess />
          
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
      
      <PromoPopup trigger="exit" />
    </>
  );
};

export default Index;
