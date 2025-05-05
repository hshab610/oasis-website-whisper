
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/contact/ContactSection';
import ChatWidget from '@/components/chat/ChatWidget';
import { BadgePercent } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Oasis Moving & Storage LLC</title>
        <meta name="description" content="Contact Oasis Moving & Storage LLC for professional moving services. Get a free quote and book your move today!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#DFC9A5" />
      </Helmet>
      
      <ChatWidget />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow py-12 lg:py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-lg text-muted-foreground">
                We'd love to hear from you! Fill out the form below to book your move or ask any questions.
              </p>
              <div className="mt-2 inline-block bg-primary/10 py-1 px-3 rounded-full">
                <p className="text-sm font-medium text-primary flex items-center">
                  <BadgePercent className="h-4 w-4 mr-1.5 text-primary" />
                  Westerville's Most Reliable Loading Crew - Since 2024
                </p>
              </div>
            </div>
            
            <ContactSection />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
