
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
import { Loader, BadgePercent } from 'lucide-react';
import { useEffect, useState } from 'react';
import DepositButton from '@/components/payment/DepositButton';
import DepositStatus from '@/components/payment/DepositStatus';

const BookingForm = () => {
  const { isPromotionActive, discountPercentage } = usePromotion();
  const {
    formData,
    selectedDate,
    errors,
    isSubmitting,
    formSubmitted,
    bookingId, // Now we're exposing bookingId from the hook
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    resetForm
  } = useBookingForm();

  const [showDepositPayment, setShowDepositPayment] = useState(false);

  // Auto-scroll to top when form is submitted
  useEffect(() => {
    if (formSubmitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Show deposit payment option after booking is submitted
      setShowDepositPayment(true);
    }
  }, [formSubmitted]);

  if (formSubmitted) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border space-y-6">
        <SuccessMessage onRequestAnother={resetForm} />
        
        {/* Deposit Payment Section */}
        {showDepositPayment && bookingId && (
          <div className="mt-8 border-t pt-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-primary">Secure Your Move Date</h3>
              <p className="text-muted-foreground mt-1">
                Pay a $100 fully-refundable deposit to lock in your moving date and crew
              </p>
            </div>
            
            <DepositButton
              email={formData.email}
              name={formData.name}
              bookingId={bookingId}
              moveDate={formData.move_date}
              phone={formData.phone}
              address={formData.address}
              className="max-w-md mx-auto"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
      {isPromotionActive && (
        <div className="mb-6 -mt-2 bg-sunsetOrange/10 py-2 px-4 rounded-md flex items-center justify-center text-sm font-medium text-primary">
          <BadgePercent className="h-4 w-4 mr-2 animate-pulse" />
          New customer booking discount: <span className="font-bold ml-1">{discountPercentage}% OFF</span>
        </div>
      )}
      
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
