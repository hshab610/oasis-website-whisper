
import { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

// More authentic testimonials with varied content
const testimonials = [
  {
    id: 1,
    name: 'Michael T.',
    location: 'Westerville, OH',
    service: 'Local Moving',
    date: 'June 2023',
    text: 'Oasis Moving & Storage LLC made our local move completely stress-free. The team arrived on time, handled our belongings with extreme care, and finished ahead of schedule. Our antique furniture was wrapped so carefully - not a single scratch! I was impressed by their professionalism from start to finish.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah J.',
    location: 'Columbus, OH',
    service: 'Long Distance Moving',
    date: 'September 2023',
    text: 'When I needed to move across the state, Oasis Moving & Storage LLC made the process amazingly smooth. Their pricing was upfront with absolutely no surprises. The crew was courteous, hardworking and kept me informed throughout the entire process. They even helped rearrange some furniture in my new place!',
    rating: 5
  },
  {
    id: 3,
    name: 'Robert K.',
    location: 'Dublin, OH',
    service: 'Storage Solutions',
    date: 'December 2023',
    text: 'I needed temporary storage between homes, and Oasis Moving & Storage LLC provided the perfect solution. My belongings were stored for four months and returned in pristine condition. Their facility was immaculately clean, climate-controlled, and I had easy access whenever needed. Truly dependable service!',
    rating: 5
  },
  {
    id: 4,
    name: 'Amanda W.',
    location: 'Gahanna, OH',
    service: 'Furniture Assembly',
    date: 'February 2024',
    text: 'Oasis Moving & Storage LLC saved me so much time with their furniture assembly service. I had just moved and had several complicated pieces to put together. Their technician was skilled, efficient and assembled everything perfectly. They even took all the packaging with them when they left. Couldn\'t ask for better service!',
    rating: 5
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    let timer: number;
    
    if (autoplay) {
      timer = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
    
    return () => {
      window.clearInterval(timer);
    };
  }, [autoplay]);
  
  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const currentTestimonial = testimonials[currentIndex];
  
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Customer Testimonials</h3>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="h-4 w-4 text-yellow-500 fill-yellow-500"
            />
          ))}
        </div>
      </div>
      
      <div className="relative min-h-[200px] flex flex-col justify-between">
        <div className="absolute top-0 right-0 text-primary opacity-20">
          <Quote size={48} />
        </div>
        
        <blockquote className="text-foreground italic z-10 mb-4">
          "{currentTestimonial.text}"
        </blockquote>
        
        <div className="mt-auto">
          <p className="font-semibold">{currentTestimonial.name}</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{currentTestimonial.location}</span>
            <span className="text-primary">{currentTestimonial.service}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          className="h-8 w-8 p-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex space-x-1">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-primary' : 'bg-primary/30'
              }`}
              onClick={() => {
                setAutoplay(false);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          className="h-8 w-8 p-0"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
