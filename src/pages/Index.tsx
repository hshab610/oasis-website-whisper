
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import Testimonials from '@/components/home/Testimonials';
import PricingSection from '@/components/pricing/PricingSection';
import ContactForm from '@/components/home/ContactForm';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Oasis Moving & Storage | Professional Moving Services in Westerville, Ohio</title>
        <meta name="description" content="Professional moving and storage services in Westerville, Ohio. Local and long-distance moving, furniture assembly, junk removal, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#DFC9A5" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <Services />
          <About />
          <PricingSection />
          <Testimonials />
          <ContactForm />
          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
