
import { Truck, Package, Shield } from 'lucide-react';

const HeroFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
          <Truck size={20} className="text-primary" />
        </div>
        <span className="font-medium text-center">Local & Long Distance</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
          <Package size={20} className="text-primary" />
        </div>
        <span className="font-medium text-center">Storage Solutions</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
        <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
          <Shield size={20} className="text-primary" />
        </div>
        <span className="font-medium text-center">Fully Insured</span>
      </div>
    </div>
  );
};

export default HeroFeatures;
