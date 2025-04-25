
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, CalendarCheck, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/promotion/CountdownTimer";

const PaymentSuccess = () => {
  const location = useLocation();
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [isDeposit, setIsDeposit] = useState(false);
  const [refundDeadline, setRefundDeadline] = useState<Date | null>(null);
  
  // Calculate time remaining until refund deadline
  const calculateTimeRemaining = (): number => {
    if (!refundDeadline) return 0;
    
    const now = new Date();
    const deadline = refundDeadline.getTime();
    return Math.max(0, deadline - now.getTime()) / 1000; // in seconds
  };
  
  // Format date with time
  const formatDateTime = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    setBookingId(params.get('booking'));
    setSessionId(params.get('session_id'));
    
    // Parse amount (if available)
    const amountParam = params.get('amount');
    if (amountParam) {
      setAmount(parseInt(amountParam, 10));
    }
    
    // Check if this was a deposit payment
    const isDepositPayment = params.get('deposit') === 'true';
    setIsDeposit(isDepositPayment);
    
    // Get refund deadline if available
    const deadlineParam = params.get('deadline');
    if (deadlineParam) {
      try {
        const deadlineDate = new Date(decodeURIComponent(deadlineParam));
        setRefundDeadline(deadlineDate);
      } catch (e) {
        console.error("Error parsing refund deadline:", e);
      }
    }
    
    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', isDepositPayment ? 'deposit_payment_completed' : 'payment_completed', {
          event_category: 'payment',
          event_label: bookingId,
          value: amount ? amount / 100 : 0
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
        <meta name="description" content="Your payment has been successfully processed. Thank you for choosing Oasis Moving & Storage." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="bg-green-50 p-6 text-center border-b">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-800">
                {isDeposit ? "Move Date Secured!" : "Payment Successful"}
              </h1>
              <p className="text-green-700 mt-2">
                {isDeposit 
                  ? "Your $100 deposit has been received. Your moving date is now reserved." 
                  : "Thank you for your payment! Your transaction has been completed successfully."}
              </p>
            </div>
            
            <div className="p-6">
              {isDeposit && refundDeadline && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h2 className="text-amber-800 font-medium flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        48-Hour Refund Policy
                      </h2>
                      <p className="text-sm text-amber-700">
                        Your $100 deposit is fully refundable until:
                      </p>
                      <p className="font-bold text-amber-900">
                        {formatDateTime(refundDeadline)}
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-3 rounded-md border border-amber-100">
                      <div className="text-xs text-amber-700 mb-1">Time remaining until non-refundable:</div>
                      <CountdownTimer
                        timeRemaining={calculateTimeRemaining()}
                        className="text-amber-600 font-bold"
                        urgencyThreshold={{ warning: 12 * 3600, critical: 4 * 3600 }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-amber-700">
                    <p>
                      After this deadline, your deposit becomes non-refundable. This policy exists because we reserve staff and equipment for your move.
                      To request a refund before the deadline, please contact our customer service team.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                    Next Steps
                  </h2>
                  
                  {isDeposit ? (
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        Your moving date has been secured with your $100 deposit. Here's what happens next:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
                        <li>You'll receive a confirmation email with all your booking details</li>
                        <li>Our scheduling team will reach out 24-48 hours before your move</li>
                        <li>The remaining balance will be due on the day of your move</li>
                      </ol>
                      <p className="text-sm text-primary font-medium mt-2">
                        Booking Reference: {bookingId || "Unknown"}
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-700">
                      <p>
                        Your payment has been processed successfully. You'll receive a receipt via email shortly.
                      </p>
                      <p className="text-sm text-primary font-medium mt-2">
                        Transaction ID: {sessionId || "Unknown"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {isDeposit ? (
                    <>
                      <Link to="/contact" className="w-full">
                        <Button variant="default" className="w-full">
                          Contact Support
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <Link to="/" className="w-full">
                        <Button variant="outline" className="w-full">
                          Return to Home
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/" className="w-full">
                      <Button variant="default" className="w-full">
                        Return to Home
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
