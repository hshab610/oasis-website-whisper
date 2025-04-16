
import { LucideIcon } from 'lucide-react';
import { CheckCircle, DollarSign, Info } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  details: string[];
}

const ServiceCard = ({ icon: Icon, title, description, price, details }: ServiceCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
        <div className="p-4 sm:p-5 lg:p-6 lg:border-r border-border flex flex-col">
          <div className="text-sunsetOrange mb-3">
            <Icon size={28} className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{description}</p>
          <div className="bg-sunsetOrange/10 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-sunsetOrange" aria-hidden="true" />
              <span className="font-medium">Pricing:</span>
            </div>
            <p className="font-semibold text-sm">{price}</p>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 p-4 sm:p-5 lg:p-6 bg-muted/30">
          <h4 className="flex items-center text-base font-medium mb-3">
            <Info size={16} className="text-sunsetOrange mr-2" aria-hidden="true" />
            Service Details
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-sunsetOrange mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
