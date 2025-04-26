
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
      <div className="absolute inset-0 bg-gradient-to-r from-nileTeal/5 via-nileTeal/10 to-nileTeal/5"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%2220%22%20viewBox%3D%220%200%20100%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M21.184%2020c.357-.13.72-.264.888-.14%201.652-1.1%202.782-2.752%203.112-4.83.33-2.077-.014-4.335-.902-6.164C23.507%207.327%2022.602%206%2021.5%206a2.5%202.5%200%200%200-2.5%202.5c0%201.276.958%202.33%202.197%202.487-.43.13-.888.264-1.378.14-1.65-1.1-2.782-2.752-3.112-4.83-.33-2.077.014-4.335.902-6.164C18.493.673%2019.398%200%2020.5%200c1.923%200%203.33%202.234%203.43%205m1.5%200c.357-.13.72-.264.888-.14%201.652-1.1%202.782-2.752%203.112-4.83.33-2.077-.014-4.335-.902-6.164C28.323%207.327%2027.402%206%2026.3%206c-1.923%200-3.33%202.234-3.43%205m12.523%200c.6.113.92.275%201.015.49.028-.036.057-.073.087-.11.276-.322.47-.705.477-1.14.01-.438-.155-.856-.44-1.163-.57-.607-1.398-.868-2.16-.936-.762-.07-1.523.17-2.115.56.168-.17.32-.36.455-.56a2.83%202.83%200%200%200%20.43-1.282c.02-.47-.07-.92-.29-1.33.466.19.977.207%201.455.095.477-.114.87-.38%201.14-.703a1.982%201.982%200%200%200%20.236-.376%203.456%203.456%200%200%200%20.515-1.86c0-1.077-.493-2.052-1.284-2.7-.786-.644-1.86-1-3.028-1H32.4c.712%200%201.208.45%201.208%201s-.496%201-1.208%201H30.64c-.598%200-1.068.435-1.068.998%200%20.562.47.998%201.07.998h1.408c.712%200%201.208.45%201.208%201s-.496%201-1.208%201H28.64c-.598%200-1.068.435-1.068.998%200%20.562.47.998%201.07.998h1.408c.712%200%201.208.45%201.208%201s-.496%201-1.208%201H27.44c-.598%200-1.068.435-1.068.998%200%20.562.47.998%201.07.998h1.208c.712%200%201.208.45%201.208%201s-.496%201-1.208%201H25.15c2.058%200%203.618%201.995%203.645%204.5.13.104.17.208.22.312%200-.038.01-.074.01-.11%22%20fill%3D%22%2373A6AD%22%20fill-opacity%3D%220.05%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] opacity-10"></div>
      
      {/* Nile flowing elements */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-nileTeal/10 via-nileTeal/30 to-nileTeal/10 animate-wave opacity-20"></div>
      <div className="absolute bottom-12 left-0 right-0 h-6 bg-gradient-to-r from-nileTeal/5 via-nileTeal/20 to-nileTeal/5 animate-wave opacity-15" style={{ animationDelay: '1.5s', animationDuration: '18s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
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
