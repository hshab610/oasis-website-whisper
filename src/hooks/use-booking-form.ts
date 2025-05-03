import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormspree } from '@/hooks/use-formspree';
import { supabase } from '@/integrations/supabase/client';

// Define the gtag property on the Window interface
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
  }
}

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
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
    promo_code: '',
    discount: 0
  });
  
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const { submitToFormspree, isSubmitting } = useFormspree('mnnpyppa');

  const validateForm = () => {
    const newErrors: BookingFormErrors = {};
    
    // Enhanced name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }
    
    // Enhanced email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
    }
    
    // Enhanced phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for booking requests';
    } else if (!/^[\d\+\-\(\) ]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Move date validation
    if (!formData.move_date) {
      newErrors.move_date = 'Move date is required';
    } else {
      // Validate date is in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.move_date);
      if (selectedDate <= today) {
        newErrors.move_date = 'Move date must be in the future';
      }
    }
    
    // Time validation
    if (!formData.move_time) {
      newErrors.move_time = 'Move time is required';
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < 5) {
      newErrors.address = 'Please enter a complete address';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address must be less than 200 characters';
    }
    
    // Package type validation
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
      
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    const enhancedFormData = {
      ...formData,
      type: 'booking',
      submission_time: new Date().toISOString(),
      _cc: 'zay@oasismovingandstorage.com',
      promo_applied: 'None'
    };
    
    const success = await submitToFormspree(enhancedFormData);
    
    if (success) {
      // Create booking record in Supabase
      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            move_date: formData.move_date,
            move_time: formData.move_time,
            address: formData.address,
            package_type: formData.package_type,
            additional_services: formData.additional_services || null,
            notes: formData.notes || null,
            status: 'new'
          })
          .select('id')
          .single();
          
        if (error) {
          console.error("Error creating booking record:", error);
        } else if (data) {
          setBookingId(data.id);
        }
      } catch (error) {
        console.error("Exception creating booking record:", error);
      }
      
      toast({
        title: "Booking request sent successfully!",
        description: "We'll get back to you as soon as possible to confirm your booking.",
      });
      
      setFormSubmitted(true);
      
      // Track conversion for analytics (if implemented)
      if (typeof window !== 'undefined' && window.gtag) {
        try {
          window.gtag('event', 'booking_submitted', {
            event_category: 'form',
            event_label: formData.package_type,
            value: 1
          });
        } catch (e) {
          console.error('Analytics tracking error:', e);
        }
      }
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

  const resetForm = () => {
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
      promo_code: '',
      discount: 0
    });
    setSelectedDate(undefined);
    setErrors({});
    setFormSubmitted(false);
    setBookingId(null);
  };

  return {
    formData,
    selectedDate,
    errors,
    isSubmitting,
    formSubmitted,
    bookingId,
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    resetForm
  };
};
