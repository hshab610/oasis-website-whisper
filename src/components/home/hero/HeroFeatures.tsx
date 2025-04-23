
import { Truck, Package, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroFeatures = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto w-[90%] sm:w-full">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm min-h-[48px]">
          <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
            <feature.icon size={isMobile ? 16 : 20} className="text-primary" />
          </div>
          <span className="font-medium text-center text-sm sm:text-base leading-tight">{feature.label}</span>
        </div>
      ))}
    </div>
  );
};

const features = [
  { label: 'Local & Long Distance', icon: Truck },
  { label: 'Storage Solutions', icon: Package },
  { label: 'Fully Insured', icon: Shield }
];

export default HeroFeatures;
