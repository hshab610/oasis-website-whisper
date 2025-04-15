
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  service: string;
  date: string;
  text: string;
  rating: number;
}

const TestimonialCard = ({ name, location, service, date, text, rating }: TestimonialCardProps) => {
  return (
    <div className="bg-card p-8 rounded-lg shadow-sm border border-border relative">
      <div className="absolute top-8 right-8 text-primary">
        <Quote size={24} />
      </div>
      
      <div className="mb-4">
        <div className="flex">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="text-yellow-500 h-5 w-5 fill-yellow-500" />
          ))}
          {[...Array(5 - rating)].map((_, i) => (
            <Star key={i + rating} className="text-gray-300 h-5 w-5" />
          ))}
        </div>
      </div>
      
      <p className="mb-6 text-foreground">{text}</p>
      
      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">{service}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
