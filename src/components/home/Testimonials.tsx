
import { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: 'Thomas R.',
    location: 'Westerville, OH',
    text: 'Oasis Moving & Storage LLC exceeded all my expectations. The crew was extremely professional and treated my belongings with the utmost care. They wrapped all my furniture thoroughly and were careful navigating narrow hallways. I recommend them to anyone looking for dependable movers.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Elizabeth M.',
    location: 'Columbus, OH',
    text: 'My experience with Oasis Moving & Storage LLC was exceptional from start to finish. The team arrived early, worked efficiently, and handled a particularly challenging piano move with impressive skill. Their communication throughout the process gave me complete peace of mind.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David L.',
    location: 'Dublin, OH',
    text: 'I needed storage between moves and Oasis Moving & Storage LLC provided the perfect solution. Their facility was clean, secure, and climate-controlled. When it came time to deliver my items, everything was in the exact same condition. I couldn\'t be happier with their service.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Katherine P.',
    location: 'Gahanna, OH',
    text: 'The furniture assembly service from Oasis Moving & Storage LLC saved me days of frustration. Their technician expertly assembled my complex entertainment center and mounted my TVs perfectly. The attention to detail was impressive - everything was level, secure, and exactly where I wanted it.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setActiveTestimonial(testimonials[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setActiveTestimonial(testimonials[newIndex]);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setActiveTestimonial(testimonials[index]);
  };

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Oasis Moving & Storage LLC.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-md relative">
            <div className="absolute -top-6 left-8 bg-primary text-white p-3 rounded-full">
              <Quote size={24} />
            </div>
            
            <div className="mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 h-5 w-5 fill-yellow-500" />
                ))}
              </div>
            </div>
            
            <p className="text-lg mb-6 italic">{activeTestimonial.text}</p>
            
            <div className="flex items-center">
              <div>
                <p className="font-semibold">{activeTestimonial.name}</p>
                <p className="text-sm text-muted-foreground">{activeTestimonial.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="bg-white/80 hover:bg-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="bg-white/80 hover:bg-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/testimonials">
            <Button variant="outline">
              View All Reviews
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
