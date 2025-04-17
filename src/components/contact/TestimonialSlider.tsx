
import { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample testimonials - these could be fetched from an API
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Westerville, OH',
    service: 'Local Moving',
    date: 'March 15, 2023',
    text: 'Oasis Moving made our local move so easy! The team was professional, efficient, and careful with all of our belongings. I was especially impressed with how they handled our antique furniture.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    location: 'Columbus, OH',
    service: 'Long Distance Moving',
    date: 'February 3, 2023',
    text: 'I was dreading my move across the state, but Oasis Moving turned it into a stress-free experience. Their pricing was transparent, and the movers were friendly and hardworking.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Chen',
    location: 'Dublin, OH',
    service: 'Storage Solutions',
    date: 'January 12, 2023',
    text: 'The storage solutions provided by Oasis Moving were perfect for my situation. I needed to store my belongings for three months between moves, and everything was kept in excellent condition.',
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
              className={`h-4 w-4 ${i < currentTestimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
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
