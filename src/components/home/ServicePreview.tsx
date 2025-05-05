
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, PackageOpen, Truck, Home
} from 'lucide-react';
import { PyramidDivider } from '@/components/ui/pyramid-divider';

const ServicePreview = () => {
  const services = [
    {
      icon: <PackageOpen size={24} />,
      title: 'All-in-One Moving Package',
      description: 'Complete moving solution with optional add-ons for donation services and junk removal.',
      link: '/services',
      featured: true
    },
    {
      icon: <Truck size={24} />,
      title: 'Local Moving',
      description: 'Professional moving services within Ohio at $120/hour with a 2-hour minimum.',
      link: '/services'
    },
    {
      icon: <Home size={24} />,
      title: 'Full-Service Moving',
      description: 'Premium full-service moves including packing, loading, transportation, and unloading.',
      link: '/services'
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5e8c9] to-[#e4d5a8] opacity-50" />
      <div className="absolute inset-0 hieroglyphic-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <PyramidDivider variant="bold" className="mb-6" />
          <p className="text-lg text-muted-foreground">
            Professional moving services in Westerville and throughout Central Ohio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card group ${service.featured ? 'bg-primary/5 border-primary/20' : ''}`}
            >
              <div className={`text-primary mb-4 ${service.featured ? 'bg-primary/10 p-3 rounded-full' : ''}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Link 
                to={service.link} 
                className="inline-flex items-center font-medium group-hover:underline text-primary"
              >
                Learn More
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button className="nile-button">
              View All Services & Pricing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicePreview;
