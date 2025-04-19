
import { CalendarCheck, Clock, Mail } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <h3 className="text-2xl font-semibold text-center md:text-left">Request a Quote</h3>
      <p className="text-muted-foreground text-sm">
        Fill out the form below to get a free, no-obligation quote for your move.
        Our team will contact you within 24 hours.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4 text-primary" />
          <span>Book as early as tomorrow</span>
        </div>
        <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground"></div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>Free same-day quotes</span>
        </div>
        <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground"></div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <span>Instant notifications to our team</span>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
