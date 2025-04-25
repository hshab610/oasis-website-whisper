
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { queryBookingDeposits } from '@/utils/supabaseHelper';
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Split, DollarSign, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import type { Booking } from "@/types/booking";

type TipOption = "15%" | "20%" | "25%" | "custom";

const PaymentPortal = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [moveTotal, setMoveTotal] = useState(0); // In cents
  const [balanceAmount, setBalanceAmount] = useState(0); // In cents
  const [tipOption, setTipOption] = useState<TipOption>("20%");
  const [customTipAmount, setCustomTipAmount] = useState(0); // In cents
  const [tipAmount, setTipAmount] = useState(0); // In cents
  const [paymentMode, setPaymentMode] = useState<"full" | "split">("full");
  const [crew, setCrew] = useState([
    { name: "John", role: "Driver" },
    { name: "Maria", role: "Mover" },
    { name: "Carlos", role: "Mover" }
  ]);

  useEffect(() => {
    if (!bookingId) {
      toast({
        title: "Error",
        description: "Invalid booking reference",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    fetchBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    // Calculate tip amount whenever tipOption or moveTotal changes
    if (tipOption === "15%") {
      setTipAmount(Math.round(moveTotal * 0.15));
    } else if (tipOption === "20%") {
      setTipAmount(Math.round(moveTotal * 0.20));
    } else if (tipOption === "25%") {
      setTipAmount(Math.round(moveTotal * 0.25));
    } else {
      setTipAmount(customTipAmount);
    }
  }, [tipOption, moveTotal, customTipAmount]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch booking data
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();
      
      if (bookingError) throw bookingError;
      if (!bookingData) throw new Error("Booking not found");
      
      setBooking(bookingData);
      
      // For demo purposes, set a default move total
      const basePriceInCents = 49900; // $499.00
      setMoveTotal(basePriceInCents);
      
      // Check if deposit was paid
      const { data: depositData, error: depositError } = await queryBookingDeposits()
        .select('amount, status')
        .eq('booking_id', bookingId)
        .eq('status', 'paid')
        .maybeSingle();
      
      if (depositError) throw depositError;
      
      // Calculate remaining balance (total - deposit)
      const depositAmount = depositData?.amount ?? 0;
      setBalanceAmount(basePriceInCents - depositAmount);
      
    } catch (error: any) {
      console.error("Error fetching booking:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load booking details",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amountInCents = Math.round(parseFloat(e.target.value || "0") * 100);
    setCustomTipAmount(amountInCents);
  };

  const handlePaymentSubmit = async () => {
    try {
      setLoading(true);
      
      // Calculate total payment amount (balance + tip)
      const totalAmount = balanceAmount + tipAmount;
      
      // Call our payment function
      const response = await fetch("/functions/v1/create-payment", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          email: booking?.email || "",
          amount: totalAmount,
          purpose: "Oasis Moving Balance Payment",
          bookingId: bookingId,
          tipDetails: {
            amount: tipAmount,
            crewSize: crew.length,
            splitMode: paymentMode
          }
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Payment creation failed");
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("Invalid response from payment service");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Payment failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const tipPerCrewMember = crew.length > 0 ? Math.floor(tipAmount / crew.length) : 0;

  const formatMoney = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">Loading payment details...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Complete Your Payment | Oasis Moving & Storage</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Complete Your Payment</h1>
            {booking && (
              <p className="text-muted-foreground mt-2">
                Moving service on {new Date(booking.move_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            )}
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Balance Payment</CardTitle>
                <CardDescription>
                  Complete payment for your recent move
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {booking && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium">Move Summary</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span> {booking.name}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span> {booking.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span> {booking.phone}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Address:</span> {booking.address}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Service:</span> {booking.package_type}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Booking Reference:</span> {bookingId?.substring(0, 8)}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Tabs defaultValue="full" onValueChange={(v) => setPaymentMode(v as any)}>
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="full">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Full Amount
                        </TabsTrigger>
                        <TabsTrigger value="split">
                          <Split className="h-4 w-4 mr-2" />
                          Split Payment
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="full">
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div>
                              <Label htmlFor="balanceAmount">Balance Due</Label>
                              <div className="flex items-center mt-1.5 relative">
                                <DollarSign className="h-4 w-4 absolute left-3 text-muted-foreground" />
                                <Input 
                                  id="balanceAmount"
                                  value={(balanceAmount / 100).toFixed(2)}
                                  className="pl-10"
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="split">
                        <div className="space-y-4 border border-amber-200 bg-amber-50 p-4 rounded-md">
                          <div className="flex items-center gap-2 text-amber-700">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="font-medium">Split payment coming soon</span>
                          </div>
                          <p className="text-sm text-amber-700">
                            Our split payment feature is under development. For now, please use the single payment option.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <Separator />
                  
                  {/* Tip Section */}
                  <div>
                    <h3 className="font-medium text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Add a Tip for the Crew
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tip is split equally among all crew members who helped with your move
                    </p>
                    
                    <div className="space-y-4">
                      <RadioGroup 
                        value={tipOption} 
                        onValueChange={v => setTipOption(v as TipOption)}
                        className="flex flex-col sm:flex-row gap-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="15%" id="tip-15" />
                          <Label htmlFor="tip-15">15% ({formatMoney(moveTotal * 0.15)})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="20%" id="tip-20" />
                          <Label htmlFor="tip-20">20% ({formatMoney(moveTotal * 0.20)})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="25%" id="tip-25" />
                          <Label htmlFor="tip-25">25% ({formatMoney(moveTotal * 0.25)})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="tip-custom" />
                          <Label htmlFor="tip-custom">Custom</Label>
                        </div>
                      </RadioGroup>
                      
                      {tipOption === "custom" && (
                        <div>
                          <Label htmlFor="customTip">Custom Tip Amount</Label>
                          <div className="flex items-center mt-1.5 relative">
                            <DollarSign className="h-4 w-4 absolute left-3 text-muted-foreground" />
                            <Input
                              id="customTip"
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-10"
                              value={(customTipAmount / 100).toFixed(2)}
                              onChange={handleCustomTipChange}
                            />
                          </div>
                        </div>
                      )}
                      
                      {tipAmount > 0 && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                          <h4 className="font-medium">Tip Summary</h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>Total Tip:</span>
                              <span className="font-medium">{formatMoney(tipAmount)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Will be divided equally among:</p>
                            <ul className="text-sm space-y-1">
                              {crew.map((member, idx) => (
                                <li key={idx} className="flex justify-between">
                                  <span>• {member.name} ({member.role})</span>
                                </li>
                              ))}
                            </ul>
                            <div className="pt-2 border-t border-border flex justify-between mt-2">
                              <span className="font-medium">Each crew member receives:</span>
                              <span className="font-medium">{formatMoney(tipPerCrewMember)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col items-stretch gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Balance Due:</span>
                    <span>{formatMoney(balanceAmount)}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Tip:</span>
                    <span>{formatMoney(tipAmount)}</span>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-border font-medium">
                    <span>Total:</span>
                    <span>{formatMoney(balanceAmount + tipAmount)}</span>
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  disabled={loading || balanceAmount <= 0}
                  onClick={handlePaymentSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 h-auto"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-5 w-5" />
                  )}
                  Pay {formatMoney(balanceAmount + tipAmount)}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPortal;
