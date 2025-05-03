
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Oasis Moving & Storage</title>
        <meta name="description" content="Privacy policy for Oasis Moving & Storage - We respect your privacy and are committed to protecting your personal data." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">Introduction</h2>
                <p className="mb-4">
                  Oasis Moving & Storage ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you how we look after your personal data when you visit our website and tell you about your privacy rights.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
                <p className="mb-3">We may collect the following types of information when you use our website:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email address, phone number, address)</li>
                  <li>Moving details (current location, destination, move date, etc.)</li>
                  <li>Communications you send to us</li>
                  <li>Technical data (IP address, browser type and version, time zone setting, etc.)</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">How We Use Your Information</h2>
                <p className="mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and manage our services to you</li>
                  <li>Communicate with you about your move or inquiries</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business. We may also release your information when we believe release is appropriate to comply with the law or protect our rights.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">Cookies</h2>
                <p>
                  Our website may use cookies to enhance your experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Request rectification of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-3">
                  <p><strong>Email:</strong> zay@oasismovingandstorage.com</p>
                  <p><strong>Phone:</strong> (614) 740-0275</p>
                  <p><strong>Address:</strong> 315 S State St, Westerville, OH 43081</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-4">Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">Last Updated: May 03, 2025</p>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
