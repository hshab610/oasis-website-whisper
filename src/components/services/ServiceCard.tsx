
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
    <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
        <div className="p-4 sm:p-6 lg:p-8 lg:border-r border-border flex flex-col">
          <div className="text-primary mb-4">
            <Icon size={28} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-grow">{description}</p>
          <div className="bg-primary/10 p-3 sm:p-4 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} className="text-primary" />
              <span className="font-medium">Pricing:</span>
            </div>
            <p className="font-semibold text-sm sm:text-base">{price}</p>
          </div>
        </div>
        
        <div className="col-span-1 lg:col-span-2 p-4 sm:p-6 lg:p-8 bg-muted/30">
          <h4 className="flex items-center text-base sm:text-lg font-medium mb-4">
            <Info size={16} className="text-primary mr-2" />
            Service Details
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-primary mt-1 flex-shrink-0" />
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
