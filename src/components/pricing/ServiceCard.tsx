
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
      <div className={`p-8 relative ${featured ? 'bg-primary/5' : ''}`}>
        {featured && (
          <div className="flex items-center gap-2 mb-6">
            <PackageOpen size={24} className="text-primary" />
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-base font-medium">
              Most Popular
            </span>
          </div>
        )}
        <h3 className={`font-playfair ${featured ? 'text-3xl' : 'text-2xl'} font-semibold mb-3`}>
          {name}
        </h3>
        <div className="flex items-end gap-2 mb-4">
          <span className={`font-bold ${featured ? 'text-5xl text-primary' : 'text-4xl'}`}>
            {price}
          </span>
          <span className="text-muted-foreground text-xl mb-1">{unit}</span>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      <div className="p-8">
        <ul className="space-y-4">
          {features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start gap-3">
              <div className={`p-2 rounded-full mt-0.5 ${
                featured ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
                {featured ? 
                  <Sparkles size={18} className="text-primary" /> :
                  <DollarSign size={18} className="text-primary" />
                }
              </div>
              <span className="text-base leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>
    </div>
  );
};
