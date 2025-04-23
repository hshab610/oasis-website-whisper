
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCanceled = () => {
  const location = useLocation();
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    setBookingId(params.get('booking'));
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Payment Canceled | Oasis Moving & Storage</title>
        <meta name="description" content="Your payment was canceled. You can try again when you're ready." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="bg-gray-50 p-6 text-center border-b">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="h-10 w-10 text-gray-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Canceled</h1>
              <p className="text-gray-600 mt-2">
                Your payment was not processed. No charges were made to your account.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h2 className="font-medium text-blue-700">Need help with your booking?</h2>
                      <p className="text-blue-600 text-sm mt-1">
                        If you experienced any issues or have questions about your booking, 
                        please don't hesitate to contact our support team at (555) 123-4567.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="font-semibold text-gray-700">What would you like to do next?</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to={bookingId ? `/booking?id=${bookingId}` : "/contact"} className="w-full">
                      <Button variant="default" className="w-full">
                        Try Again
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <Link to="/" className="w-full">
                      <Button variant="outline" className="w-full">
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PaymentCanceled;
