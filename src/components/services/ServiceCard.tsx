
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  actionText?: string;
  actionUrl?: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  actionText = "Learn More",
  actionUrl = "#",
  className,
}) => {
  return (
    <div className={`content-card p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="flex items-start mb-4">
        <div className="mr-4 text-2xl sm:text-3xl text-primary bg-primary/5 p-2 rounded-lg">{icon}</div>
        <h3 className="text-lg sm:text-xl font-semibold text-pharaohBlue">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4 text-sm sm:text-base">{description}</p>
      {features && features.length > 0 && (
        <ul className="list-disc pl-5 mb-4 space-y-1.5">
          {features.map((feature, index) => (
            <li key={index} className="text-xs sm:text-sm text-muted-foreground">{feature}</li>
          ))}
        </ul>
      )}
      <Button asChild className="mt-2 hover:translate-x-1 transition-transform min-h-[48px]">
        <a href={actionUrl} className="inline-flex items-center gap-1.5">
          {actionText}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export default ServiceCard;
