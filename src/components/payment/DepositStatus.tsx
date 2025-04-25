
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, RefreshCw, Clock, AlertTriangle } from "lucide-react";
import CountdownTimer from "@/components/promotion/CountdownTimer";

interface DepositStatusProps {
  bookingId: string;
  className?: string;
}

interface DepositData {
  depositStatus: string;
  moveDate: string;
  refundDeadline: string;
  isRefundable: boolean;
  timeRemaining: number;
}

const DepositStatus: React.FC<DepositStatusProps> = ({ bookingId, className = "" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [depositData, setDepositData] = useState<DepositData | null>(null);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Load deposit status
  const fetchDepositStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/functions/v1/deposit-manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "check_status",
          bookingId
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to load deposit status");
      }
      
      setDepositData(data);
    } catch (err: any) {
      setError(err.message || "Error checking deposit status");
      console.error("Deposit status error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Process refund
  const processRefund = async () => {
    setRefundLoading(true);
    
    try {
      const response = await fetch("/functions/v1/deposit-manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request_refund",
          bookingId
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to process refund");
      }
      
      toast({
        title: "Refund Processed",
        description: "Your deposit refund has been processed successfully.",
      });
      
      // Update status
      fetchDepositStatus();
    } catch (err: any) {
      toast({
        title: "Refund Error",
        description: err.message || "Error processing refund request",
        variant: "destructive",
      });
      console.error("Refund error:", err);
    } finally {
      setRefundLoading(false);
      setShowRefundDialog(false);
    }
  };
  
  // Load deposit status on mount
  useEffect(() => {
    fetchDepositStatus();
    
    // Set up timer to refresh the status (especially for countdown)
    const timer = setInterval(fetchDepositStatus, 60000); // Refresh every minute
    
    return () => clearInterval(timer);
  }, [bookingId]);
  
  // Deposit status display
  const getStatusDisplay = () => {
    if (!depositData) return null;
    
    switch (depositData.depositStatus) {
      case 'paid':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span>Move Date Secured</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>Payment Pending</span>
          </div>
        );
      case 'refunded':
        return (
          <div className="flex items-center text-gray-600">
            <RefreshCw className="h-5 w-5 mr-2" />
            <span>Deposit Refunded</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-5 w-5 mr-2" />
            <span>Booking Cancelled</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>Unknown Status</span>
          </div>
        );
    }
  };
  
  if (loading) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle>Deposit Status</CardTitle>
          <CardDescription>Loading deposit information...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle>Deposit Status</CardTitle>
          <CardDescription>Error loading deposit information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-red-500 text-sm">{error}</div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={fetchDepositStatus}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (!depositData) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle>Deposit Status</CardTitle>
          <CardDescription>No deposit found for this booking</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No deposit information was found for this booking. If you've already made a deposit,
            please contact customer support.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Deposit Status</CardTitle>
            <CardDescription>$100 Move Reservation Deposit</CardDescription>
          </div>
          <Badge 
            variant={depositData.depositStatus === 'paid' ? "default" : "outline"}
            className={depositData.depositStatus === 'paid' ? "bg-green-500 hover:bg-green-500" : ""}
          >
            {depositData.depositStatus === 'paid' ? "PAID" : depositData.depositStatus.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {getStatusDisplay()}
        
        <div className="grid gap-3 pt-2">
          <div>
            <div className="text-xs text-muted-foreground">Move Date:</div>
            <div className="font-medium">{formatDate(depositData.moveDate)}</div>
          </div>
          
          {depositData.depositStatus === 'paid' && (
            <div className="border rounded-md p-3 bg-amber-50 border-amber-200">
              <div className="text-xs text-amber-800">Refund Deadline:</div>
              <div className="font-medium text-amber-900">{formatDate(depositData.refundDeadline)}</div>
              
              {depositData.isRefundable ? (
                <div className="mt-2 bg-white bg-opacity-80 p-2 rounded border border-amber-100">
                  <div className="text-xs text-amber-800 mb-1">Time remaining until non-refundable:</div>
                  <CountdownTimer 
                    timeRemaining={depositData.timeRemaining / 1000} 
                    className="text-amber-600 font-bold"
                    urgencyThreshold={{ warning: 12 * 3600, critical: 4 * 3600 }}
                  />
                </div>
              ) : (
                <div className="mt-2 bg-red-50 p-2 rounded border border-red-100">
                  <div className="text-red-700 text-sm flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Deposit is now non-refundable</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      {depositData.depositStatus === 'paid' && depositData.isRefundable && (
        <CardFooter>
          <AlertDialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Cancel Move & Request Refund
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Booking and Request Refund</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your move and request a refund of your $100 deposit?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep My Booking</AlertDialogCancel>
                <AlertDialogAction
                  onClick={processRefund}
                  disabled={refundLoading}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {refundLoading ? (
                    <div className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </div>
                  ) : "Yes, Cancel & Refund"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default DepositStatus;
