
import { Users, Shield, Trophy, Heart } from 'lucide-react';
import ValueCard from './ValueCard';

const CoreValues = () => {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize your needs and satisfaction above all else, ensuring a positive experience from start to finish.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Count on us to show up on time, handle your belongings with care, and deliver on our promises.'
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We strive for excellence in every move, paying attention to details and going the extra mile for our customers.'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'We're proud to be part of the Westerville community and contribute positively to the areas we serve.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground">
            These principles guide everything we do and every decision we make.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
