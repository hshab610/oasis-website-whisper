
import React from 'react';
import { Shield, Phone, CheckCircle, Clock, Star } from 'lucide-react';

interface HeroTrustBadgesProps {
  showRating?: boolean;
  ratingValue?: string;
}

const HeroTrustBadges: React.FC<HeroTrustBadgesProps> = ({
  showRating = true,
  ratingValue = "4.8★ Rated in Westerville"
}) => {
  return (
    <>
      <div className="mb-6 flex flex-col items-center">
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full mb-3 shadow-sm inline-flex items-center border border-desertGold/10">
          <Shield className="text-primary h-4 w-4 mr-1.5" />
          <span className="text-xs font-medium">Oasis Moving LLC</span>
          <span className="mx-2 text-gray-300">|</span>
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-1 text-primary" />
            <a href="tel:6147400275" className="font-semibold text-xs hover:text-primary transition-colors">(614) 740-0275</a>
          </div>
        </div>
      </div>

      {showRating && (
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`${i === 4 ? 'text-yellow-400' : 'text-yellow-500'} h-5 w-5 ${i < 4 ? 'fill-yellow-500' : 'fill-yellow-400/50'}`} />
          ))}
          <span className="font-medium ml-1.5 text-base md:text-lg">{ratingValue}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 mb-5">
        <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <CheckCircle className="h-4 w-4 text-primary mr-2" />
          <span>Owner-Supervised</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <CheckCircle className="h-4 w-4 text-primary mr-2" />
          <span>Fully Insured</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <CheckCircle className="h-4 w-4 text-primary mr-2" />
          <span>Same-Day Quotes</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full">
          <Clock className="h-4 w-4 text-primary mr-2" />
          <span>On-Time Service</span>
        </div>
      </div>
    </>
  );
};

export default HeroTrustBadges;
