
import { DollarSign, Sparkles, PackageOpen } from 'lucide-react';
import type { ReactNode } from 'react';

interface ServiceCardProps {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const ServiceCard = ({ name, price, unit, description, features, featured }: ServiceCardProps) => {
  return (
    <div 
      className={`bg-card rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-md
        ${featured ? 
          'col-span-full lg:col-span-2 border-primary/20 bg-primary/5' : 
          'border-border'}`}
    >
      <div className={`p-6 ${featured ? 'bg-primary/10' : 'bg-primary/10'}`}>
        {featured && (
          <div className="flex items-center gap-2 mb-4">
            <PackageOpen size={20} className="text-primary" />
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        <h3 className={`text-xl font-semibold mb-1 ${featured ? 'text-2xl' : ''}`}>
          {name}
        </h3>
        <div className="flex items-end gap-1 mb-3">
          <span className={`font-bold ${featured ? 'text-4xl text-primary' : 'text-3xl'}`}>
            {price}
          </span>
          <span className="text-muted-foreground">{unit}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div className="p-6">
        <ul className="space-y-3">
          {features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-2">
              <div className={`p-1 rounded-full mt-0.5
                ${featured ? 'bg-primary/20' : 'bg-primary/10'}`}>
                {featured ? 
                  <Sparkles size={14} className="text-primary" /> :
                  <DollarSign size={14} className="text-primary" />
                }
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
