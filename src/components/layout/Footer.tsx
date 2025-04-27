
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Oasis Moving & Storage LLC</h3>
            <p className="text-muted-foreground mb-4">
              Professional moving services you can trust. We make your relocation smooth and stress-free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Local Moving
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Long Distance Moving
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Furniture Assembly
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Storage Solutions
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Hauling & Junk Removal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Our Location</strong>
                  <span className="text-muted-foreground">Westerville, Ohio</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Phone</strong>
                  <a href="tel:+16147400275" className="text-muted-foreground hover:text-primary transition-colors">
                    (614) 740-0275
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-medium">Email</strong>
                  <a href="mailto:zay@oasismovingandstorage.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>On-Time Service</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
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
