
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Calendar, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-primary mb-6"></div>
            
            <p className="text-lg text-muted-foreground mb-8">
              Have questions or ready to start planning your move? Reach out to us using the form or contact information below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Our Location</h3>
                  <p className="text-muted-foreground">Westerville, Ohio</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Phone Number</h3>
                  <p className="text-muted-foreground">614-740-0275</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email Address</h3>
                  <p className="text-muted-foreground">info@oasismoving.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Saturday: 8AM - 7PM</p>
                  <p className="text-muted-foreground">Sunday: 9AM - 5PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Booking</h3>
                  <p className="text-muted-foreground">
                    $100 deposit required to confirm booking.
                    The deposit will be applied toward your final bill.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md border border-border">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="Your Name" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="Your Email" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="Your Phone" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="service">Service Interested In</Label>
                  <Select onValueChange={handleSelectChange} value={formData.service}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Moving Services</SelectLabel>
                        <SelectItem value="local">Local Moving</SelectItem>
                        <SelectItem value="long-distance">Long Distance Moving</SelectItem>
                        <SelectItem value="furniture">Furniture Assembly</SelectItem>
                        <SelectItem value="tv">TV Mounting</SelectItem>
                        <SelectItem value="junk">Hauling & Junk Removal</SelectItem>
                        <SelectItem value="donation">Donation Pickup & Dropoff</SelectItem>
                        <SelectItem value="storage">Storage Solutions</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder="Tell us about your moving needs..." 
                    rows={4} 
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
