
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/contact/ContactSection';
import { MapPin, Clock, CalendarCheck, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Contact = () => {
  const faqs = [
    {
      question: "How far in advance should I book my move?",
      answer: "We recommend booking at least 2-3 weeks in advance for local moves and 4-6 weeks for long-distance moves, especially during peak moving season (May-September). However, we understand that sometimes moves happen unexpectedly, and we'll do our best to accommodate last-minute requests when possible."
    },
    {
      question: "Is there a deposit required to book a move?",
      answer: "Yes, we require a $100 deposit to confirm your booking. This deposit will be applied toward your final bill. The deposit is fully refundable with 48 hours notice of cancellation."
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept cash, credit cards (Visa, MasterCard, American Express, Discover), debit cards, and electronic payment methods like Zelle and Venmo. Payment is expected in full upon completion of services."
    },
    {
      question: "Do I need to empty my drawers before the move?",
      answer: "Yes, we recommend emptying all drawers before moving. This makes furniture lighter and safer to move, prevents items from shifting or breaking during transit, and protects both your belongings and our movers."
    },
    {
      question: "Are there any items you won't move?",
      answer: "For safety and legal reasons, we cannot transport hazardous materials (including paint, gasoline, propane tanks, aerosols), perishable items, plants, and certain valuables like cash or important documents. We recommend transporting these items yourself."
    },
    {
      question: "Do you provide packing services?",
      answer: "Yes, we offer packing services at an additional hourly rate. We can pack your entire home or just specific items. We use high-quality packing materials to ensure your belongings are well-protected during the move."
    },
    {
      question: "Are your movers insured?",
      answer: "Yes, Oasis Moving & Storage is fully licensed and insured. We carry liability insurance and offer basic valuation coverage at no additional cost. Additional valuation coverage options are available upon request."
    },
    {
      question: "What areas do you serve?",
      answer: "We primarily serve Westerville and surrounding areas in Ohio, including Columbus, Dublin, Worthington, Gahanna, New Albany, and more. We also provide long-distance moving services throughout the continental United States."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Oasis Moving & Storage</title>
        <meta name="description" content="Get in touch with Oasis Moving & Storage for all your moving and storage needs. Contact us for a free quote or to schedule your service." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-accent py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  We're here to help with all your moving and storage needs. Reach out to us to discuss your upcoming move or get a free quote.
                </p>
              </div>
            </div>
          </section>
          
          {/* Contact Information Cards */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Our Location</h2>
                  <p className="text-muted-foreground">Westerville, Ohio</p>
                  <p className="text-muted-foreground">Serving the greater Columbus area</p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Clock className="text-primary h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
                  <p className="text-muted-foreground">Monday - Saturday: 8AM - 7PM</p>
                  <p className="text-muted-foreground">Sunday: 9AM - 5PM</p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <CalendarCheck className="text-primary h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Booking Information</h2>
                  <p className="text-muted-foreground">$100 deposit required</p>
                  <p className="text-muted-foreground">48-hour cancellation policy</p>
                </div>
              </div>
              
              <ContactSection />
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-8">
                  <HelpCircle className="text-primary mr-3" size={28} />
                  <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
