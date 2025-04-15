
import ContactInfo from '@/components/contact/ContactInfo';
import BookingForm from '@/components/contact/BookingForm';

const ContactForm = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
