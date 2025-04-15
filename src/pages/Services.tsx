
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTA from '@/components/home/CTA';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceCard from '@/components/services/ServiceCard';
import { AdditionalFees } from '@/components/pricing/AdditionalFees';
import { services } from '@/data/pricing';

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services & Pricing | Oasis Moving & Storage</title>
        <meta name="description" content="Explore our comprehensive moving services including local and long-distance moving, furniture assembly, TV mounting, and storage solutions." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <ServicesHero />
          
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Comprehensive Moving Solutions</h2>
                <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground">
                  From local moves to specialized services, we offer everything you need for a successful relocation.
                </p>
              </div>
              
              <div className="space-y-12">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-accent">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <AdditionalFees />
              </div>
            </div>
          </section>
          
          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Services;
