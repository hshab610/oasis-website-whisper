
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CTA from '@/components/home/CTA';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Truck } from 'lucide-react';
import AboutHero from '@/components/about/AboutHero';
import CoreValues from '@/components/about/CoreValues';

const About = () => {
  const whyChooseUs = [
    'Professional and experienced movers',
    'Transparent pricing with no hidden fees',
    'Fully insured and licensed company',
    'Careful handling of your belongings',
    'Flexible scheduling options',
    'Comprehensive moving services',
    'Positive customer testimonials',
    'Local company with community focus'
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Oasis Moving & Storage</title>
        <meta name="description" content="Learn about Oasis Moving & Storage, our mission, values, and commitment to providing exceptional moving services in Westerville, Ohio." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <AboutHero />
          
          {/* Our Story */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <div className="w-24 h-1 bg-primary mb-6"></div>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Oasis Moving & Storage was founded with a simple mission: to provide exceptional moving services that eliminate the stress and hassle typically associated with relocation.
                    </p>
                    <p>
                      Our journey began in Westerville, Ohio, where we identified a need for a moving company that truly cares about its customers and their belongings. Since our founding, we've grown steadily by focusing on quality service and word-of-mouth recommendations from satisfied customers.
                    </p>
                    <p>
                      Today, we're proud to have helped hundreds of families and businesses successfully relocate within Ohio and beyond. Our team consists of trained professionals who are passionate about what they do and committed to making your move as smooth as possible.
                    </p>
                    <p>
                      At Oasis Moving & Storage, we understand that we're not just moving boxes and furniture – we're helping you transition to a new chapter in your life. That's why we approach every job with care, respect, and attention to detail.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/contact">
                      <Button className="cta-button">
                        Get in Touch
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2 relative">
                  <div className="pattern-divider absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 opacity-50 z-0"></div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1600518464441-9306b00c4746?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Our Team" 
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                  
                  <div className="absolute -bottom-5 -left-5 bg-primary text-white p-4 rounded-md shadow-md max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={20} />
                      <span className="font-medium">Since 2018</span>
                    </div>
                    <p className="text-sm">Serving the Westerville community with pride and dedication</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Values */}
          <CoreValues />
          
          {/* Why Choose Us */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="pattern-divider absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 opacity-50 z-0"></div>
                  
                  <div className="relative z-10 arch-top bg-white p-6 shadow-lg rounded-lg overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-24 bg-primary/10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1581608169427-91183a578d02?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Moving Truck" 
                      className="relative z-10 rounded-lg w-full h-auto object-cover"
                    />
                    <div className="relative z-20 -mt-16 mx-auto text-center">
                      <div className="inline-block bg-white p-4 rounded-full shadow-lg">
                        <Clock size={32} className="text-primary" />
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <p className="font-medium text-lg mb-2">Quick Response Time</p>
                      <p className="text-muted-foreground text-sm">We respond to inquiries within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4">Why Choose Oasis Moving</h2>
                  <div className="w-24 h-1 bg-primary mb-6"></div>
                  
                  <p className="text-muted-foreground mb-8">
                    When it comes to entrusting your possessions to a moving company, we understand you have options. Here's why customers consistently choose Oasis Moving & Storage for their relocation needs:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {whyChooseUs.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="text-primary mt-1 flex-shrink-0" size={18} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/testimonials">
                      <Button variant="outline" className="gap-2">
                        See What Customers Say
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
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

export default About;
