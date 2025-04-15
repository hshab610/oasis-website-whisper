
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import About from '@/components/home/About';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import ContactForm from '@/components/home/ContactForm';
import CTA from '@/components/home/CTA';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Oasis Moving & Storage | Professional Moving Services in Westerville, Ohio</title>
        <meta name="description" content="Professional moving and storage services in Westerville, Ohio. Local and long-distance moving, furniture assembly, junk removal, and more." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <Services />
          <About />
          <Pricing />
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
