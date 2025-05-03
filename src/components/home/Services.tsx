
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Truck, ArrowRight, Home, MapPin, Package, 
  SlidersHorizontal, Tv, Trash2, Heart, PackageOpen, Badge, Sparkles
} from 'lucide-react';
import { PyramidDivider } from '@/components/ui/pyramid-divider';

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
      icon: <Home size={24} />,
      title: 'Full-Service Moving',
      description: 'Our premium full-service moves include start-to-finish handling: packing, loading, transportation, and unloading.',
      link: '/services',
      note: 'For clients who need trucking services, we utilize trusted local providers operating under their own authority to ensure your move is fully insured and compliant with Ohio regulations.'
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
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Cairo skyline overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5e8c9] to-[#e4d5a8] opacity-50" />
      <div className="absolute inset-0 hieroglyphic-pattern opacity-5"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 right-0 h-40 md:h-60 bg-contain bg-repeat-x bg-bottom" 
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1000 120%22 preserveAspectRatio=%22none%22%3E%3Cpath d=%22M0,100 L50,70 L100,90 L150,50 L200,80 L250,30 L300,70 L350,20 L400,60 L450,40 L500,80 L550,30 L600,60 L650,50 L700,90 L750,40 L800,70 L850,20 L900,60 L950,30 L1000,50 L1000,120 L0,120 Z%22 fill=%22%23007791%22 opacity=%220.08%22/%3E%3C/svg%3E')",
            opacity: "0.15"
          }} 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <PyramidDivider variant="bold" className="mb-6" />
          <p className="text-lg text-muted-foreground">
            We've handled every move type - from studio apartments to grand pianos.
            With 15+ years combined moving experience, Zay & Jay deliver exceptional service.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Serving Central Ohio from our Westerville (43081) base
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
              {service.note && (
                <div className="bg-primary/5 p-3 rounded-md mb-4">
                  <p className="text-sm text-muted-foreground">{service.note}</p>
                </div>
              )}
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
          <PyramidDivider variant="gradient" className="mb-8" />
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

export default Services;
