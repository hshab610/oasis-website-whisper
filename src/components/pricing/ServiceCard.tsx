
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
      className={`papyrus-card rounded-xl overflow-hidden relative ${
        featured ? 'md:col-span-2 border-primary/30' : 'border-border'
      }`}
    >
      <div className={`p-4 sm:p-6 lg:p-8 relative ${featured ? 'bg-primary/5' : ''}`}>
        {featured && (
          <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
            <PackageOpen size={20} className="text-primary" />
            <span className="bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm sm:text-base font-medium">
              Most Popular
            </span>
          </div>
        )}
        <h3 className={`font-playfair ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-semibold mb-3`}>
          {name}
        </h3>
        <div className="flex items-end gap-2 mb-4">
          <span className={`font-bold ${featured ? 'text-4xl sm:text-5xl text-primary' : 'text-3xl sm:text-4xl'}`}>
            {price}
          </span>
          <span className="text-muted-foreground text-lg sm:text-xl mb-1">{unit}</span>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8">
        <ul className="space-y-3 sm:space-y-4">
          {features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-3">
              <div className={`p-1.5 sm:p-2 rounded-full mt-0.5 ${
                featured ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
                {featured ? 
                  <Sparkles size={16} className="text-primary" /> :
                  <DollarSign size={16} className="text-primary" />
                }
              </div>
              <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>
    </div>
  );
};
