
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300">
      <div className="text-primary mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default ValueCard;
