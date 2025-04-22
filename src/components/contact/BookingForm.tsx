
import { usePromotion } from '@/contexts/PromotionContext';
import PersonalInfoFields from './booking/PersonalInfoFields';
import MoveDetailsFields from './booking/MoveDetailsFields';
import ServiceDetailsFields from './booking/ServiceDetailsFields';
import SubmitButton from './booking/SubmitButton';
import DatePickerField from './DatePickerField';
import TimeSelect from './TimeSelect';
import SuccessMessage from './booking/SuccessMessage';
import FormHeader from './booking/FormHeader';
import PromoApplied from './booking/PromoApplied';
import { useBookingForm } from '@/hooks/use-booking-form';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';

const BookingForm = () => {
  const { isPromotionActive } = usePromotion();
  const {
    formData,
    selectedDate,
    errors,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    resetForm
  } = useBookingForm();

  // Auto-scroll to top when form is submitted
  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [formSubmitted]);

  if (formSubmitted) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
        <SuccessMessage onRequestAnother={resetForm} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
      <FormHeader />
      
      {isPromotionActive && <PromoApplied />}
      
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <Loader className="h-8 w-8 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium">Submitting your request...</p>
            <p className="text-sm text-muted-foreground mt-1">Please wait, this may take a moment.</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoFields 
          formData={formData} 
          onChange={handleChange} 
          errors={errors}
        />
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <DatePickerField
            date={selectedDate}
            onDateChange={handleDateChange}
            error={errors.move_date}
            label="Move Date"
            required={true}
            description="Select your preferred moving date"
            disablePastDates={true}
          />
          
          <div>
            <TimeSelect
              value={formData.move_time}
              onChange={(value) => handleSelectChange('move_time', value)}
              error={errors.move_time}
              label="Preferred Time"
              required={true}
              description="Select your preferred time slot"
            />
          </div>
        </div>
        
        <MoveDetailsFields 
          formData={formData} 
          onChange={handleChange}
          onTimeChange={(value) => handleSelectChange('move_time', value)}
          errors={errors}
        />
        
        <ServiceDetailsFields 
          formData={formData} 
          onChange={handleChange}
          onPackageChange={(value) => handleSelectChange('package_type', value)}
          errors={errors}
        />
        
        <div className="pt-2">
          <SubmitButton isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
