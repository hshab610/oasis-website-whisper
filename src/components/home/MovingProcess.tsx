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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"100\" height=\"20\" viewBox=\"0 0 100 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M21.184 20c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.014-4.335-.902-6.164C23.507 7.327 22.602 6 21.5 6a2.5 2.5 0 0 0-2.5 2.5c0 1.276.958 2.33 2.197 2.487-.43.13-.888.264-1.378.14-1.65-1.1-2.782-2.752-3.112-4.83-.33-2.077.014-4.335.902-6.164C18.493.673 19.398 0 20.5 0c1.923 0 3.33 2.234 3.43 5m1.5 0c.357-.13.72-.264.888-.14 1.652-1.1 2.782-2.752 3.112-4.83.33-2.077-.014-4.335-.902-6.164C28.323 7.327 27.402 6 26.3 6c-1.923 0-3.33 2.234-3.43 5m12.523 0c.6.113.92.275 1.015.49.028-.036.057-.073.087-.11.276-.322.47-.705.477-1.14.01-.438-.155-.856-.44-1.163-.57-.607-1.398-.868-2.16-.936-.762-.07-1.523.17-2.115.56.168-.17.32-.36.455-.56a2.83 2.83 0 0 0 .43-1.282c.02-.47-.07-.92-.29-1.33.466.19.977.207 1.455.095.477-.114.87-.38 1.14-.703a1.982 1.982 0 0 0 .236-.376 3.456 3.456 0 0 0 .515-1.86c0-1.077-.493-2.052-1.284-2.7-.786-.644-1.86-1-3.028-1H32.4c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H30.64c-.598 0-1.068.435-1.068.998 0 .562.47.998 1.07.998h1.408c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H28.64c-.598 0-1.068.435-1.068.998 0 .562.47.998 1.07.998h1.408c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H27.44c-.598 0-1.068.435-1.068.998 0 .562.47.998 1.07.998h1.208c.712 0 1.208.45 1.208 1s-.496 1-1.208 1H25.15c2.058 0 3.618 1.995 3.645 4.5.13.104.17.208.22.312 0-.038.01-.074.01-.11\" fill=\"%2373A6AD\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')] opacity-10"></div>

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
