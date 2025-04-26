
import { LucideIcon } from 'lucide-react';
import { CheckCircle, DollarSign, Info, Star, Shield, Clock } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  details: string[];
}

const ServiceCard = ({ icon: Icon, title, description, price, details }: ServiceCardProps) => {
  return (
    <div className="card-papyrus rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-desertGold/20 hover:border-desertGold/40 transition-all duration-300 transform hover:-translate-y-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
        <div className="p-4 sm:p-5 lg:p-6 lg:border-r border-desertGold/20 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <div className="text-desertGold">
              <Icon size={28} className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium ml-1">4.8</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
          <div className="bg-nileDeep/5 p-3 rounded-md border border-desertGold/10">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-desertGold" />
              <span className="font-medium">Pricing:</span>
            </div>
            <p className="font-semibold text-sm">{price}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3 mr-1 text-primary/80" />
              <span>Same-day quotes available</span>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 p-4 sm:p-5 lg:p-6 bg-white/60">
          <h4 className="flex items-center text-base font-medium mb-3">
            <Info size={16} className="text-desertGold mr-2" />
            Service Details
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-desertGold mt-1 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{detail}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-desertGold/10 flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Shield className="h-3 w-3 mr-1" />
              <span>Licensed & Insured</span>
            </div>
            <div className="text-xs font-medium text-primary">
              <a href="/contact" className="flex items-center hover:underline">
                Book Now <ArrowRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
