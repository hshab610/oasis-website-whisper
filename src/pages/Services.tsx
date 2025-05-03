
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTA from '@/components/home/CTA';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceCard from '@/components/services/ServiceCard';
import { AdditionalFees } from '@/components/pricing/AdditionalFees';
import { services } from '@/data/pricing';
import { 
  PackageOpen, Truck, SlidersHorizontal, Tv, Trash2, Home
} from 'lucide-react';

const Services = () => {
  const mappedServices = [
    {
      icon: <Truck size={24} />,
      title: 'Local Moving',
      description: 'Professional moving services in Westerville and surrounding areas.',
      price: '$120 per hour',
      details: [
        '2-hour minimum',
        'Fully equipped moving truck',
        'Professional movers',
        'Basic furniture protection',
        'Free disassembly/reassembly of standard furniture'
      ]
    },
    {
      icon: <Home size={24} />,
      title: 'STRESS-FREE FULL SERVICE MOVES',
      description: 'Our premium full-service moves include start-to-finish handling: packing, loading, transportation, and unloading.',
      price: 'Custom Quote',
      details: [
        'Complete packing services',
        'Loading and unloading',
        'Transportation to destination',
        'Basic unpacking at destination',
        'One point of contact from start to finish',
        'Serving Central Ohio from our Westerville (43081) base'
      ],
      footnote: 'For clients who need trucking services, we utilize trusted local providers operating under their own authority to ensure your move is fully insured and compliant with Ohio regulations.'
    },
    {
      icon: <PackageOpen size={24} />,
      title: 'All-in-One Moving Package',
      description: 'Our most popular package with complete moving services.',
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
      icon: <SlidersHorizontal size={24} />,
      title: 'Furniture Assembly',
      description: 'Expert assembly and disassembly services for all types of furniture.',
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
      description: 'Professional TV installation and mounting services.',
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
      description: 'Efficient removal and disposal of unwanted items.',
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
        <meta name="description" content="Explore our professional moving services in Westerville, Ohio including local moving, furniture assembly, TV mounting, and junk removal." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <ServicesHero />
          
          <section className="py-16 bg-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Professional Services</h2>
                <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground">
                  Oasis Moving & Storage offers comprehensive moving solutions in Westerville and surrounding areas.
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
                    footnote={service.footnote}
                    actionText="Get Quote"
                    actionUrl="/contact"
                    className={index === 0 ? "border-2 border-primary/20 bg-primary/5" : ""}
                  />
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-white/80 backdrop-blur-sm border-y border-nileTeal/10">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Additional Information</h2>
                <AdditionalFees />
                <div className="mt-8 text-sm text-muted-foreground text-center">
                  <p>Full-service transportation provided through Oasis-approved local carriers.</p>
                  <p className="mt-2">We vet all equipment providers to meet our standards.</p>
                </div>
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
