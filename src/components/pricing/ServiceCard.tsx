
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
      className={`papyrus-card rounded-lg overflow-hidden relative ${
        featured ? 'md:col-span-2 border-primary/30' : 'border-border'
      }`}
    >
      <div className={`p-6 relative ${featured ? 'bg-primary/10' : ''}`}>
        {featured && (
          <div className="flex items-center gap-2 mb-4">
            <PackageOpen size={20} className="text-primary" />
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        <h3 className={`font-playfair ${featured ? 'text-2xl' : 'text-xl'} font-semibold mb-1`}>
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
              <div className={`p-1 rounded-full mt-0.5 ${
                featured ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
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
      
      {/* Ancient Egyptian inspired decorative element */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" className="text-primary" />
        </svg>
      </div>
    </div>
  );
};
