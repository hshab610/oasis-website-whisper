
import ContactInfo from '@/components/contact/ContactInfo';
import BookingForm from '@/components/contact/BookingForm';
import TestimonialSlider from '@/components/contact/TestimonialSlider';
import QuoteButton from '@/components/contact/QuoteButton';

const ContactSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      <div className="order-2 lg:order-1">
        <ContactInfo />
        
        <div className="mt-8">
          <TestimonialSlider />
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
          <QuoteButton className="w-full sm:w-auto" />
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <BookingForm />
      </div>
    </div>
  );
};

export default ContactSection;
