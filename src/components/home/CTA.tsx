
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-nile-gradient"></div>
      
      <div className="absolute inset-0">
        <img 
          src="/public/lovable-uploads/47292459-4120-44c2-8f4a-ce4648a96e90.png" 
          alt="Background" 
          className="w-full h-full object-cover mix-blend-overlay opacity-10"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Journey Today</h2>
          <p className="text-lg mb-8 text-white/90">
            Let us handle the heavy lifting while you focus on your new beginnings.
            Contact us today to schedule your move or get a free quote.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-sandGold text-pharaohBlue hover:bg-sandGold/90 px-8 py-3 rounded-md font-medium w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300">
                Request Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <a href="tel:+16147400275" aria-label="Call us at 614-740-0275">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" />
                Call 614-740-0275
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements inspired by Egyptian patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white/5"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/5"></div>
        
        <div className="absolute bottom-0 left-0 w-full h-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#DFC9A5" fillOpacity="0.15" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,170.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CTA;
