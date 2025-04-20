
import { CalendarCheck, Clock, Mail } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold">Book Your Move Now</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Easy 3-step process • Takes ~2 minutes
        </p>
      </div>

      <div className="bg-primary/10 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-3">
          Fill out this form to get a free, no-obligation quote. Our team will contact you within 24 hours with detailed pricing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <CalendarCheck className="h-4 w-4 text-primary" />
            </div>
            <span>Book as early as tomorrow</span>
          </div>
          
          <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground"></div>
          
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <span>Free same-day quotes</span>
          </div>
          
          <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground"></div>
          
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <span>Instant team notification</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-primary/30"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-primary/30"></div>
        </div>
        <span className="text-sm text-muted-foreground">Step 1 of 3: Contact Information</span>
      </div>
    </div>
  );
};

export default FormHeader;
