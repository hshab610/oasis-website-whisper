
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle, ArrowRight, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const location = useLocation();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  
  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    setBookingId(params.get('booking'));
    setSessionId(params.get('session_id'));
    
    const amountParam = params.get('amount');
    if (amountParam) {
      setAmount(parseInt(amountParam, 10));
    }
    
    // Track conversion for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'purchase', {
          transaction_id: sessionId,
          value: amount ? amount / 100 : undefined,
          currency: 'USD',
        });
      } catch (e) {
        console.error('Analytics tracking error:', e);
      }
    }
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Payment Successful | Oasis Moving & Storage</title>
        <meta name="description" content="Your payment was successful. Thank you for choosing Oasis Moving & Storage." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-100">
            <div className="bg-green-50 p-6 text-center border-b border-green-100">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-800">Payment Successful!</h1>
              <p className="text-green-700 mt-2">
                Thank you for your payment. Your transaction has been completed.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="font-semibold text-gray-700 mb-3">Payment Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sessionId && (
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-medium">{sessionId}</p>
                      </div>
                    )}
                    {amount && (
                      <div>
                        <p className="text-sm text-gray-500">Amount Paid</p>
                        <p className="font-medium">${(amount / 100).toFixed(2)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">Credit Card (via Stripe)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium text-green-600">Completed</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="font-semibold text-gray-700">Next Steps</h2>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Prepare for your move</p>
                      <p className="text-sm text-gray-600">We'll be in touch soon to confirm all details for your upcoming move.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Download className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Check your email</p>
                      <p className="text-sm text-gray-600">
                        We've sent you a receipt and detailed invoice to your email address.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button variant="default" className="w-full sm:w-auto">
                      Return to Home
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  {bookingId && (
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Booking Details
                    </Button>
                  )}
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

export default PaymentSuccess;
