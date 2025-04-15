
import { Button } from '@/components/ui/button';

const ServicesHero = () => {
  return (
    <section className="bg-accent py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services & Pricing</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover our comprehensive range of moving and storage services designed to make your transition smooth and stress-free.
          </p>
          <div className="flex justify-center">
            <Button className="cta-button">Get a Quote Today</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
