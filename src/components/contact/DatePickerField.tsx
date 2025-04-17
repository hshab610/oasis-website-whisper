
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerFieldProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
  label?: string;
  required?: boolean;
  description?: string;
  disablePastDates?: boolean;
  disabledDates?: Date[];
}

const DatePickerField = ({
  date,
  onDateChange,
  error,
  label = "Date",
  required = false,
  description,
  disablePastDates = true,
  disabledDates = []
}: DatePickerFieldProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate dates that should be highlighted (next 3 available dates)
  const getNextThreeAvailableDates = () => {
    const dates: Date[] = [];
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // Start with tomorrow
    
    while (dates.length < 3) {
      const isDisabled = disabledDates.some(
        disabledDate => 
          disabledDate.getFullYear() === current.getFullYear() && 
          disabledDate.getMonth() === current.getMonth() && 
          disabledDate.getDate() === current.getDate()
      );
      
      // Skip weekends (0 is Sunday, 6 is Saturday)
      const isWeekend = current.getDay() === 0 || current.getDay() === 6;
      
      if (!isDisabled && !isWeekend) {
        dates.push(new Date(current));
      }
      
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };
  
  const suggestedDates = getNextThreeAvailableDates();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="date" className={error ? "text-destructive" : ""}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            disabled={(date) => {
              // Disable past dates
              if (disablePastDates && date < today) {
                return true;
              }
              
              // Disable specific dates
              return disabledDates.some(
                disabledDate => 
                  disabledDate.getFullYear() === date.getFullYear() && 
                  disabledDate.getMonth() === date.getMonth() && 
                  disabledDate.getDate() === date.getDate()
              );
            }}
            modifiers={{
              highlighted: suggestedDates
            }}
            modifiersStyles={{
              highlighted: { backgroundColor: "rgba(155, 135, 245, 0.15)" }
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
          
          <div className="p-3 border-t">
            <p className="text-sm font-medium mb-2">Available dates:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedDates.map((suggestedDate, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => onDateChange(suggestedDate)}
                >
                  {format(suggestedDate, "EEE, MMM d")}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default DatePickerField;
