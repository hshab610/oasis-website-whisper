
import { User, Users, Handshake } from 'lucide-react';

const MovingProcess = () => {
  const steps = [
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "Personalized Planning",
      description: "Dedicated move coordinator assigned to oversee your relocation"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Vetted Moving Teams",
      description: "We partner with thoroughly background-checked moving professionals"
    },
    {
      icon: <Handshake className="h-6 w-6 text-primary" />,
      title: "White-Glove Service",
      description: "Your belongings handled with exceptional care and attention"
    }
  ];

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Westerville Moving Process</h2>
          <p className="text-muted-foreground">
            Experience a seamlessly coordinated move with our dedicated team.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border border-border"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovingProcess;
