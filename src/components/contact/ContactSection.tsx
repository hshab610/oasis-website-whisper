
import ContactInfo from '@/components/contact/ContactInfo';
import BookingForm from '@/components/contact/BookingForm';

const ContactSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ContactInfo />
      <BookingForm />
    </div>
  );
};

export default ContactSection;
