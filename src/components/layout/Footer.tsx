
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Oasis Moving & Storage LLC</h3>
            <p className="text-muted-foreground mb-4">
              Professional moving services you can trust. We make your relocation smooth and stress-free.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                aria-label="Facebook" 
                className="text-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center" 
                target="_blank" 
                rel="noopener"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                aria-label="Instagram" 
                className="text-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center" 
                target="_blank" 
                rel="noopener"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                aria-label="Twitter" 
                className="text-foreground hover:text-primary transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center" 
                target="_blank" 
                rel="noopener"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Local Moving', 'Long Distance Moving', 'Furniture Assembly', 'Storage Solutions', 'Hauling & Junk Removal'].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services" 
                    className="text-muted-foreground hover:text-primary transition-colors block py-2"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services & Pricing', path: '/services' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary transition-colors block py-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Our Location</strong>
                  <address className="text-muted-foreground not-italic">
                    315 S State St<br />
                    Westerville, OH 43081
                  </address>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Phone</strong>
                  <a href="tel:+16147400275" className="text-muted-foreground hover:text-primary transition-colors block">
                    (614) 740-0275
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Email</strong>
                  <a href="mailto:zay@oasismovingandstorage.com" className="text-muted-foreground hover:text-primary transition-colors text-sm break-all">
                    zay@oasismovingandstorage.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Hours</strong>
                  <span className="text-muted-foreground text-sm">Mon - Sat: 8AM - 7PM<br />Sunday: 9AM - 5PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 mb-4`}>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
              <span>Licensed & Insured • DOT #3498216</span>
            </div>
            {!isMobile && <div className="hidden sm:block">•</div>}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
              <span>On-Time Service</span>
            </div>
            {!isMobile && <div className="hidden sm:block">•</div>}
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
              <a href="tel:6147400275" className="hover:text-primary transition-colors">
                (614) 740-0275
              </a>
            </div>
          </div>
          <p>
            © {new Date().getFullYear()} Oasis Moving & Storage LLC • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
