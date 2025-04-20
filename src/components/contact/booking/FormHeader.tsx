
import { CalendarCheck, Clock, Shield, Mail } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="flex flex-col space-y-4 mb-8">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold">Book Your Move in 2 Minutes</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Fast booking • No obligation • Instant confirmation
        </p>
      </div>

      <div className="bg-primary/10 rounded-lg p-4">
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
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span>Your data is secure</span>
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
