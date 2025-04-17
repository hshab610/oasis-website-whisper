
import ContactInfo from '@/components/contact/ContactInfo';
import BookingForm from '@/components/contact/BookingForm';

const ContactSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      <div className="order-2 lg:order-1">
        <ContactInfo />
      </div>
      <div className="order-1 lg:order-2">
        <BookingForm />
      </div>
    </div>
  );
};

export default ContactSection;
