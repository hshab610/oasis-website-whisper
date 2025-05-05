
import React from 'react';
import { Shield, Phone, CheckCircle, Clock, Star } from 'lucide-react';

interface HeroTrustBadgesProps {
  showRating?: boolean;
  ratingValue?: string;
}

const HeroTrustBadges: React.FC<HeroTrustBadgesProps> = ({
  showRating = true,
  ratingValue = "5★ Westerville"
}) => {
  return (
    <>
      <div className="mb-4 flex flex-col items-center">
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg mb-3 shadow-sm inline-flex items-center border border-nileTeal/10">
          <Shield className="text-primary h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Oasis Moving LLC</span>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex items-center">
            <Phone className="h-3.5 w-3.5 mr-1 text-primary" />
            <a href="tel:6147400275" className="font-semibold text-sm hover:text-primary transition-colors">(614) 740-0275</a>
          </div>
        </div>
      </div>

      {showRating && (
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
          <span className="font-medium ml-1.5 text-sm">{ratingValue}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
        <div className="flex items-center text-xs text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <CheckCircle className="h-3.5 w-3.5 text-primary mr-1.5" />
          <span>Owner-Supervised</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <CheckCircle className="h-3.5 w-3.5 text-primary mr-1.5" />
          <span>Fully Insured</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <Clock className="h-3.5 w-3.5 text-primary mr-1.5" />
          <span>On-Time Service</span>
        </div>
      </div>
    </>
  );
};

export default HeroTrustBadges;
