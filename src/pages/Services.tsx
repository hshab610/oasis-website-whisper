
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTA from '@/components/home/CTA';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, SlidersHorizontal, Tv, Trash2, Heart, Package, Info, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

const Services = () => {
  const servicesData = [
    {
      icon: <Truck size={32} />,
      title: 'Local Moving',
      description: 'Our local moving service covers Westerville and surrounding areas in Ohio. We provide professional movers who are trained to handle your belongings with care.',
      price: '$120 per hour',
      details: [
        '2-hour minimum',
        'Includes mileage and travel time within Ohio',
        'Fully equipped moving truck',
        'Professional and experienced movers',
        'Basic furniture protection included',
        'Efficient loading and unloading',
        'Careful handling of all items'
      ]
    },
    {
      icon: <MapPin size={32} />,
      title: 'Long Distance Moving',
      description: 'Relocating to another state? Our long-distance moving services are customized to meet your specific needs and ensure a smooth transition to your new home.',
      price: 'Custom quotes',
      details: [
        'Personalized moving plans',
        'Dedicated moving coordinator',
        'Tracking of your shipment',
        'Flexible scheduling options',
        'Various insurance coverage options',
        'Interstate moving expertise',
        'Timely delivery guarantees'
      ]
    },
    {
      icon: <SlidersHorizontal size={32} />,
      title: 'Furniture Assembly/Disassembly',
      description: 'Let our experienced technicians handle the assembly or disassembly of your furniture, saving you time and ensuring everything is put together correctly.',
      price: '$90 for up to 5 items, $120 for over 5 items',
      details: [
        'Professional assembly/disassembly',
        'Proper tools and equipment',
        'Experienced technicians',
        'All furniture types handled',
        'Careful attention to detail',
        'Can be combined with moving services',
        'Assembly of new furniture purchases'
      ]
    },
    {
      icon: <Tv size={32} />,
      title: 'TV Mounting',
      description: 'Our professional TV mounting service ensures your television is securely and properly installed on your wall for optimal viewing experience.',
      price: '$60 flat rate (customer provides wall mount)',
      details: [
        'Professional installation',
        'Proper mounting techniques',
        'Cable management',
        'Level mounting guaranteed',
        'Various wall types accommodated',
        'Safety checks performed',
        'Clean work area upon completion'
      ]
    },
    {
      icon: <Trash2 size={32} />,
      title: 'Hauling & Junk Removal',
      description: 'Need to get rid of unwanted items? Our junk removal service provides efficient hauling of furniture, appliances, and other unwanted items.',
      price: '$150 flat rate (potential dumping fees may apply)',
      details: [
        'Removal of unwanted items',
        'Responsible disposal methods',
        'Eco-friendly options when possible',
        'Heavy items handled safely',
        'Fast and efficient service',
        'Indoor and outdoor junk removal',
        'Various item types accepted'
      ]
    },
    {
      icon: <Heart size={32} />,
      title: 'Donation Pickup & Dropoff',
      description: 'Supporting charitable giving, we'll pick up items you wish to donate and deliver them to your charity of choice.',
      price: '$150 flat rate',
      details: [
        'Convenient pickup from your location',
        'Delivery to donation centers',
        'Handling of furniture and boxed items',
        'Receipt collection available',
        'Careful handling of donatable items',
        'Scheduling flexibility',
        'Support for various charitable organizations'
      ]
    },
    {
      icon: <Package size={32} />,
      title: 'Storage Solutions',
      description: 'We offer secure storage options for your belongings, whether you need short-term or long-term storage during your move or renovation.',
      price: 'Contact for pricing',
      details: [
        'Climate-controlled options',
        'Secure facility with surveillance',
        'Short and long-term options',
        'Various unit sizes available',
        'Easy access to your belongings',
        'Inventory management',
        'Pickup and delivery services available'
      ]
    }
  ];

  const additionalFees = [
    { name: 'Travel Fee', description: 'For locations outside our service area', price: '$50+' },
    { name: 'Heavy Item Fee', description: 'Per item (pianos, safes, etc.)', price: '$30+' },
    { name: 'Stairs Fee', description: 'Per floor (applies to buildings without elevators)', price: '$20' },
    { name: 'Last Minute Booking', description: 'For bookings with less than 48 hours notice', price: '$50' }
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
          {/* Hero Section */}
          <section className="bg-accent py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services & Pricing</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover our comprehensive range of moving and storage services designed to make your transition smooth and stress-free.
                </p>
                <div className="flex justify-center">
                  <Button className="cta-button">Get a Quote Today</Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Services List */}
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
                {servicesData.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-card rounded-lg shadow-sm overflow-hidden border border-border"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="p-8 md:border-r border-border flex flex-col">
                        <div className="text-primary mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                        <div className="bg-primary/10 p-4 rounded-md">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign size={18} className="text-primary" />
                            <span className="font-medium">Pricing:</span>
                          </div>
                          <p className="font-semibold">{service.price}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-2 p-8 bg-muted/30">
                        <h4 className="flex items-center text-lg font-medium mb-4">
                          <Info size={18} className="text-primary mr-2" />
                          Service Details
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Additional Fees */}
          <section className="py-16 bg-accent">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-start gap-4 mb-8">
                  <AlertCircle size={24} className="text-primary mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Additional Fees</h2>
                    <p className="text-muted-foreground">
                      The following fees may apply depending on your specific moving requirements:
                    </p>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {additionalFees.map((fee, index) => (
                      <div key={index} className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{fee.name}</h3>
                          <span className="text-primary font-bold">{fee.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{fee.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Deposit Required</h3>
                      <p className="text-muted-foreground">
                        A $100 deposit is required to confirm your booking. This amount will be applied toward your final bill.
                      </p>
                    </div>
                  </div>
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
