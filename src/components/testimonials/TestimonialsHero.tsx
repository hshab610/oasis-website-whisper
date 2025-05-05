
import { Star } from 'lucide-react';

const TestimonialsHero = () => {
  return (
    <section className="bg-accent py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Testimonials</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Don't just take our word for it. See what our satisfied customers have to say about their experiences with Oasis Moving & Storage LLC.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center gap-1 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
              <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
              <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
              <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
              <Star className="text-yellow-500 h-5 w-5 fill-yellow-500" />
              <span className="ml-2 font-medium">Perfect 5/5 from our valued customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHero;
