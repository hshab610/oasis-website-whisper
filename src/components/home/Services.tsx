
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Truck, ArrowRight, Home, MapPin, Package, 
  SlidersHorizontal, Tv, Trash2, Heart 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Truck size={24} />,
      title: 'Local Moving',
      description: 'Professional moving services within Ohio at $120/hour with a 2-hour minimum.',
      link: '/services'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Long Distance Moving',
      description: 'Reliable moving services for longer distances with custom quotes tailored to your needs.',
      link: '/services'
    },
    {
      icon: <SlidersHorizontal size={24} />,
      title: 'Furniture Assembly',
      description: 'Expert assembly and disassembly services at flat rates of $90 (up to 5 items) or $120 (over 5 items).',
      link: '/services'
    },
    {
      icon: <Tv size={24} />,
      title: 'TV Mounting',
      description: 'Professional TV mounting service for $60 flat rate (customer provides wall mount).',
      link: '/services'
    },
    {
      icon: <Trash2 size={24} />,
      title: 'Hauling & Junk Removal',
      description: 'Efficient junk removal services at a $150 flat rate (potential dumping fees may apply).',
      link: '/services'
    },
    {
      icon: <Heart size={24} />,
      title: 'Donation Pickup & Dropoff',
      description: 'Convenient donation services at a $150 flat rate to support your charitable giving.',
      link: '/services'
    },
    {
      icon: <Package size={24} />,
      title: 'Storage Solutions',
      description: 'Secure storage options for your belongings. Contact us for pricing and availability.',
      link: '/services'
    },
    {
      icon: <Home size={24} />,
      title: 'Full Service Solutions',
      description: 'Comprehensive moving services tailored to your specific needs. Get in touch for a custom quote.',
      link: '/services'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            We offer a wide range of moving and storage services to meet all your needs.
            From local moves to long-distance relocations, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Link 
                to={service.link} 
                className="inline-flex items-center text-primary font-medium group-hover:underline"
              >
                Learn More
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/services">
            <Button className="cta-button">
              View All Services & Pricing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
