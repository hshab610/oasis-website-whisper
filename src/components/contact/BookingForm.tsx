import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormspree } from '@/hooks/use-formspree';
import PersonalInfoFields from './booking/PersonalInfoFields';
import MoveDetailsFields from './booking/MoveDetailsFields';
import ServiceDetailsFields from './booking/ServiceDetailsFields';
import SubmitButton from './booking/SubmitButton';
import DatePickerField from './DatePickerField';
import TimeSelect from './TimeSelect';
import QuoteButton from './QuoteButton';
import SuccessMessage from './booking/SuccessMessage';
import { CalendarCheck, Clock } from 'lucide-react';

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    move_date: '',
    move_time: '',
    address: '',
    package_type: '',
    additional_services: '',
    notes: ''
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    move_date?: string;
    move_time?: string;
    address?: string;
    package_type?: string;
  }>({});
  
  const { submitToFormspree, isSubmitting } = useFormspree('mnnpyppa');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, move_date: formattedDate }));
      
      if (errors.move_date) {
        setErrors(prev => ({ ...prev, move_date: undefined }));
      }
    } else {
      setFormData(prev => ({ ...prev, move_date: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      move_date?: string;
      move_time?: string;
      address?: string;
      package_type?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for booking requests';
    } else if (!/^[\d\+\-\(\) ]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.move_date) {
      newErrors.move_date = 'Move date is required';
    }
    
    if (!formData.move_time) {
      newErrors.move_time = 'Move time is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.package_type) {
      newErrors.package_type = 'Please select a package type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Submitting booking form with data:", formData);
    
    const enhancedFormData = {
      ...formData,
      type: 'booking',
      submission_time: new Date().toISOString(),
      _cc: 'zay@oasismovingandstorage.com'
    };
    
    const success = await submitToFormspree(enhancedFormData);
    
    if (success) {
      toast({
        title: "Booking request sent successfully!",
        description: "We'll get back to you as soon as possible to confirm your booking.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        move_date: '',
        move_time: '',
        address: '',
        package_type: '',
        additional_services: '',
        notes: ''
      });
      setSelectedDate(undefined);
      setFormSubmitted(true);
    }
  };

  if (formSubmitted) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
        <SuccessMessage onRequestAnother={() => setFormSubmitted(false)} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-border">
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
        </div>
      </div>
      
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
