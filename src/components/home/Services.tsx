
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Truck, ArrowRight, Home, MapPin, Package, 
  SlidersHorizontal, Tv, Trash2, Heart, PackageOpen, Badge, Sparkles
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <PackageOpen size={24} />,
      title: 'All-in-One Moving Package',
      description: 'Ultimate value! Complete moving solution with optional add-ons for donation services and junk removal.',
      link: '/services',
      featured: true,
      pricing: [
        'Base package: $249 + $100/hour',
        'Add stairs service: +$20 per staircase',
        'Add donation service: +$100',
        'Add junk removal: +$100'
      ]
    },
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
              className={`service-card group ${service.featured ? 'col-span-full lg:col-span-2 bg-primary/5 border-primary/20' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`text-primary mb-4 ${service.featured ? 'bg-primary/10 p-3 rounded-full' : ''}`}>
                  {service.icon}
                </div>
                {service.featured && (
                  <div className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Most Value</span>
                  </div>
                )}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${service.featured ? 'text-2xl' : ''}`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              {service.featured && service.pricing && (
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Package Options:</h4>
                  <ul className="space-y-2">
                    {service.pricing.map((price, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Badge className="h-2 w-2 rounded-full" />
                        {price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link 
                to={service.link} 
                className={`inline-flex items-center font-medium group-hover:underline
                  ${service.featured ? 'text-primary' : 'text-primary/80'}`}
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
