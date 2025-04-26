
import { LucideIcon } from 'lucide-react';
import { ArrowRight, CheckCircle, DollarSign, Info, Star, Shield, Clock } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  details: string[];
}

const ServiceCard = ({ icon: Icon, title, description, price, details }: ServiceCardProps) => {
  return (
    <div className="card-papyrus rounded-lg shadow-lg hover:shadow-xl overflow-hidden border border-desertGold/20 hover:border-desertGold/40 transition-all duration-300 transform hover:-translate-y-1 hover-lift">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
        <div className="p-5 lg:p-6 lg:border-r border-desertGold/20 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="text-desertGold bg-nileDeep/5 p-2.5 rounded-full">
              <Icon size={28} className="w-7 h-7" />
            </div>
            <div className="flex items-center bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-100">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium ml-1 text-yellow-700">4.8</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2.5 font-playfair text-pharaohBlue">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
          <div className="bg-nileDeep/5 p-4 rounded-md border border-desertGold/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-desertGold" />
              <span className="font-medium text-pharaohBlue">Pricing:</span>
            </div>
            <p className="font-semibold text-base text-primary">{price}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-2.5">
              <Clock className="h-3 w-3 mr-1.5 text-primary/80" />
              <span>Same-day quotes available</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 p-5 lg:p-6 bg-white/70 backdrop-blur-sm">
          <h4 className="flex items-center text-base font-medium mb-4 text-pharaohBlue">
            <Info size={16} className="text-desertGold mr-2" />
            Service Details
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-primary/5 p-2.5 rounded-md">
                <CheckCircle size={16} className="text-desertGold mt-0.5 flex-shrink-0" />
                <span className="text-sm">{detail}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-5 pt-3 border-t border-desertGold/10 flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Shield className="h-3 w-3 mr-1.5" />
              <span>Licensed & Insured</span>
            </div>
            <div className="text-sm font-medium">
              <a href="/contact" className="flex items-center text-primary hover:text-primary/80 transition-colors group">
                Book Now <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
