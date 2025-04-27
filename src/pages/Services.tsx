
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTA from '@/components/home/CTA';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceCard from '@/components/services/ServiceCard';
import { AdditionalFees } from '@/components/pricing/AdditionalFees';
import { services } from '@/data/pricing';
import { 
  PackageOpen, Truck, SlidersHorizontal, Tv, Trash2
} from 'lucide-react';

const Services = () => {
  // Map the service data to the format expected by ServiceCard component
  const mappedServices = [
    {
      icon: <PackageOpen size={24} />,
      title: 'All-in-One Moving Package',
      description: 'Best value! Complete moving solution with optional add-ons',
      price: '$249 + $100 per hour',
      details: [
        'Professional local moving service',
        'Assembly of up to 5 furniture items',
        'One TV mounting installation',
        'Add stairs service for $20 per staircase',
        'Add donation service for $100',
        'Add junk removal for $100',
        'Save over $120 on combined services'
      ]
    },
    {
      icon: <Truck size={24} />,
      title: 'Local Moving',
      description: 'Includes mileage and travel time within Ohio',
      price: '$120 per hour',
      details: [
        '2-hour minimum',
        'Fully equipped moving truck',
        'Professional movers',
        'Basic furniture protection'
      ]
    },
    {
      icon: <SlidersHorizontal size={24} />,
      title: 'Furniture Assembly',
      description: 'Assembly or disassembly services',
      price: '$90 / $120 flat rate',
      details: [
        '$90 for up to 5 items',
        '$120 for over 5 items',
        'Professional tools and equipment',
        'Expert assembly technicians'
      ]
    },
    {
      icon: <Tv size={24} />,
      title: 'TV Mounting',
      description: 'Professional TV installation',
      price: '$60 flat rate',
      details: [
        'Customer provides wall mount',
        'Cable management',
        'Professional installation',
        'Mounting on various wall types'
      ]
    },
    {
      icon: <Trash2 size={24} />,
      title: 'Junk Removal',
      description: 'Hauling services for unwanted items',
      price: '$150 flat rate',
      details: [
        'Potential dumping fees may apply',
        'Eco-friendly disposal when possible',
        'Removal of furniture and appliances',
        'Quick and efficient service'
      ]
    }
  ];

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
          
          <section className="py-16 bg-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Comprehensive Moving Solutions</h2>
                <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground">
                  From local moves to specialized services, we offer everything you need for a successful relocation.
                </p>
              </div>
              
              <div className="space-y-12">
                {mappedServices.map((service, index) => (
                  <ServiceCard 
                    key={index} 
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    features={service.details}
                    actionText="Learn More"
                    actionUrl="#"
                    className={index === 0 ? "border-2 border-primary/20 bg-primary/5" : ""}
                  />
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-accent/50 backdrop-blur-sm">
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
