
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
      <div className="w-24 h-1 bg-primary mb-6"></div>
      
      <p className="text-lg text-muted-foreground mb-8">
        Have questions or ready to start planning your move? Reach out to us using the form or contact information below.
      </p>
      
      <div className="space-y-6">
        <ContactInfoItem
          icon={<MapPin className="text-primary h-5 w-5" />}
          title="Our Location"
          content={<p className="text-muted-foreground">Westerville, Ohio</p>}
        />
        
        <ContactInfoItem
          icon={<Phone className="text-primary h-5 w-5" />}
          title="Phone Number"
          content={
            <a href="tel:+16147400275" className="text-muted-foreground hover:text-primary transition-colors">
              614-740-0275
            </a>
          }
        />
        
        <ContactInfoItem
          icon={<Mail className="text-primary h-5 w-5" />}
          title="Email Address"
          content={
            <a href="mailto:zay@oasismovingandstorage.com" className="text-muted-foreground hover:text-primary transition-colors">
              zay@oasismovingandstorage.com
            </a>
          }
        />
        
        <ContactInfoItem
          icon={<MapPin className="text-primary h-5 w-5" />}
          title="Website"
          content={
            <a href="https://oasismovingandstorage.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              oasismovingandstorage.com
            </a>
          }
        />
        
        <ContactInfoItem
          icon={<Clock className="text-primary h-5 w-5" />}
          title="Business Hours"
          content={
            <>
              <p className="text-muted-foreground">Monday - Saturday: 8AM - 7PM</p>
              <p className="text-muted-foreground">Sunday: 9AM - 5PM</p>
            </>
          }
        />
        
        <ContactInfoItem
          icon={<Calendar className="text-primary h-5 w-5" />}
          title="Booking"
          content={
            <p className="text-muted-foreground">
              $100 deposit required to confirm booking.
              The deposit will be applied toward your final bill.
            </p>
          }
        />
      </div>
    </div>
  );
};

type ContactInfoItemProps = {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => (
  <div className="flex items-start space-x-4">
    <div className="bg-primary/10 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      {content}
    </div>
  </div>
);

export default ContactInfo;
