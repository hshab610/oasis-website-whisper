
import { User, Shield, Truck, BadgeCheck } from 'lucide-react';
import { H2 } from '@/components/ui/typography';

const MovingProcess = () => {
  const steps = [
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "Personal Oversight",
      description: "Work directly with Zay, who personally supervises your entire move from start to finish"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Quality Control",
      description: "Rigorous quality inspections and move planning tailored to your needs"
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Certified Partners",
      description: "Transportation by fully insured, background-checked hauling partners"
    }
  ];

  return (
    <section className="py-16 bg-accent relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <H2 className="mb-4">The Oasis Moving Difference</H2>
          <p className="text-muted-foreground">
            Experience our hybrid model combining personal service with professional hauling partners.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-primary">
              <BadgeCheck className="h-4 w-4" />
              <span>$1M+ Partner Insurance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <BadgeCheck className="h-4 w-4" />
              <span>Owner-Supervised Moves</span>
            </div>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg shadow-sm border border-border max-w-2xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-2">Personal Service Guarantee</h3>
              <p className="text-muted-foreground mb-3">
                "As owner, I personally oversee every move to ensure a smooth, stress-free experience."
              </p>
              <div className="text-sm font-medium">- Zay, Owner</div>
              <a href="tel:6147400275" className="text-primary hover:underline mt-1 block">
                Direct Line: (614) 740-0275
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingProcess;
