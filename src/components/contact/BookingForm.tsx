
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
  } = useBookingForm();

  if (formSubmitted) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
        <SuccessMessage onRequestAnother={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
      <FormHeader />
      
      {isPromotionActive && <PromoApplied />}
      
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
