
import * as React from "react";
import { format, addDays, isBefore, isWeekend } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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
  const [open, setOpen] = React.useState(false);
  
  const today = React.useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);
  
  // Calculate dates that should be highlighted (next 3 available dates)
  const suggestedDates = React.useMemo(() => {
    const dates: Date[] = [];
    let current = addDays(today, 1); // Start with tomorrow
    
    while (dates.length < 3) {
      const isDisabled = disabledDates.some(
        disabledDate => 
          disabledDate.getFullYear() === current.getFullYear() && 
          disabledDate.getMonth() === current.getMonth() && 
          disabledDate.getDate() === current.getDate()
      );
      
      // Skip weekends (0 is Sunday, 6 is Saturday)
      const isWeekendDay = isWeekend(current);
      
      if (!isDisabled && !isWeekendDay) {
        dates.push(new Date(current));
      }
      
      current = addDays(current, 1);
    }
    
    return dates;
  }, [today, disabledDates]);
  
  const handleSelect = (newDate: Date | undefined) => {
    onDateChange(newDate);
    setOpen(false);
  };

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
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-12",
              !date && "text-muted-foreground",
              error ? "border-destructive" : date && "border-green-500"
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "date-error" : undefined}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              <span className="flex items-center">
                {format(date, "EEE, MMM d, yyyy")}
                {date && !error && <Check className="ml-2 h-4 w-4 text-green-500" />}
              </span>
            ) : (
              <span>Select a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              // Disable past dates
              if (disablePastDates && isBefore(date, today)) {
                return true;
              }
              
              // Optionally disable weekends
              if (isWeekend(date)) {
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
            fromMonth={today}
            toMonth={addDays(today, 90)}
          />
          
          <div className="p-3 border-t">
            <p className="text-sm font-medium mb-2">Recommended dates:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedDates.map((suggestedDate, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-xs",
                    date && suggestedDate.getTime() === date.getTime() ? "bg-primary text-primary-foreground" : ""
                  )}
                  onClick={() => handleSelect(suggestedDate)}
                >
                  {format(suggestedDate, "EEE, MMM d")}
                  {index === 0 && <Badge variant="outline" className="ml-1 text-[9px]">Best</Badge>}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {error && (
        <p id="date-error" className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default DatePickerField;
