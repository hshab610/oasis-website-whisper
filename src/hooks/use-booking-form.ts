
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormspree } from '@/hooks/use-formspree';
import { usePromotion } from '@/contexts/PromotionContext';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  move_date: string;
  move_time: string;
  address: string;
  package_type: string;
  additional_services: string;
  notes: string;
  promo_code: string;
  discount: number;
}

export interface BookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  move_date?: string;
  move_time?: string;
  address?: string;
  package_type?: string;
}

export const useBookingForm = () => {
  const { toast } = useToast();
  const { isPromotionActive, promoCode, discountPercentage } = usePromotion();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    move_date: '',
    move_time: '',
    address: '',
    package_type: '',
    additional_services: '',
    notes: '',
    promo_code: isPromotionActive ? promoCode : '',
    discount: isPromotionActive ? discountPercentage : 0
  });
  
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const { submitToFormspree, isSubmitting } = useFormspree('mnnpyppa');

  const validateForm = () => {
    const newErrors: BookingFormErrors = {};
    
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
    
    const enhancedFormData = {
      ...formData,
      type: 'booking',
      submission_time: new Date().toISOString(),
      _cc: 'zay@oasismovingandstorage.com',
      promo_applied: isPromotionActive ? `${discountPercentage}% First Hour Discount` : 'None'
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
        notes: '',
        promo_code: isPromotionActive ? promoCode : '',
        discount: isPromotionActive ? discountPercentage : 0
      });
      setSelectedDate(undefined);
      setFormSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof BookingFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof BookingFormErrors]) {
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

  return {
    formData,
    selectedDate,
    errors,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
  };
};
