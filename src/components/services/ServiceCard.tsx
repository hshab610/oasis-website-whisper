
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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-8 md:border-r border-border flex flex-col">
          <div className="text-primary mb-4">
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          <div className="bg-primary/10 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={18} className="text-primary" />
              <span className="font-medium">Pricing:</span>
            </div>
            <p className="font-semibold">{price}</p>
          </div>
        </div>
        
        <div className="col-span-2 p-8 bg-muted/30">
          <h4 className="flex items-center text-lg font-medium mb-4">
            <Info size={18} className="text-primary mr-2" />
            Service Details
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
