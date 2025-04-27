
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
import TrustBadgeGroup from '@/components/ui/trust-elements/TrustBadgeGroup';

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
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Oasis Moving & Storage | Premium Westerville Moving Services" />
        <meta property="og:description" content="Get owner-supervised moving services with same-day quotes and fully insured professionals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://oasismovingandstorage.com" />
        
        {/* Additional SEO tags */}
        <meta name="keywords" content="moving services, Westerville moving, owner-supervised moving, local movers, storage solutions, Ohio movers" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://oasismovingandstorage.com" />
      </Helmet>
      
      <PromoBanner />
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        
        <main className="flex-grow">
          <section className="contain-content">
            <Hero />
          </section>
          
          <div className="bg-white/90 py-3 shadow-sm border-y border-nileTeal/10">
            <div className="container mx-auto">
              <TrustBadgeGroup variant="highlight" />
            </div>
          </div>
          
          <MovingProcess />
          
          <section id="quick-estimate" className="contain-content scroll-mt-20">
            <QuickEstimate />
          </section>
          
          <section className="contain-content">
            <CTA />
          </section>
          
          <section id="services" className="contain-content scroll-mt-20">
            <Services />
          </section>
          
          <section id="pricing" className="contain-content scroll-mt-20">
            <Pricing />
          </section>
          
          <section id="contact" className="contain-content scroll-mt-20">
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
