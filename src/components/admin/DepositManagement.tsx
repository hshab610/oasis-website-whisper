
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Search, Filter, CheckCircle, XCircle, AlertTriangle, Clock, Eye, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import CountdownTimer from "@/components/promotion/CountdownTimer";

interface Deposit {
  id: string;
  booking_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  status: string;
  move_date: string;
  refund_deadline: string;
  address: string;
  payment_date: string;
  refund_date: string | null;
  stripe_session_id: string;
  stripe_payment_id: string | null;
}

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  move_date: string;
  move_time: string;
  address: string;
  package_type: string;
  additional_services: string | null;
  notes: string | null;
}

const DepositManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [processingRefund, setProcessingRefund] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Load deposits
  const loadDeposits = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('booking_deposits')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setDeposits(data as Deposit[]);
    } catch (error) {
      console.error("Error loading deposits:", error);
      toast({
        title: "Error",
        description: "Failed to load deposit data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Load booking details
  const loadBookingDetails = async (bookingId: string) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('name, email, phone, move_date, move_time, address, package_type, additional_services, notes')
        .eq('id', bookingId)
        .single();
        
      if (error) throw error;
      
      setSelectedBooking(data as BookingDetails);
    } catch (error) {
      console.error("Error loading booking details:", error);
      toast({
        title: "Error",
        description: "Failed to load booking details.",
        variant: "destructive",
      });
      setSelectedBooking(null);
    }
  };
  
  // Process refund override
  const processRefundOverride = async () => {
    if (!selectedDeposit || processingRefund) return;
    
    setProcessingRefund(true);
    
    try {
      const response = await fetch("/functions/v1/deposit-manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "override_refund",
          bookingId: selectedDeposit.booking_id,
          adminKey: "your-admin-key" // In production, use proper admin authentication
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to process refund");
      }
      
      toast({
        title: "Refund Processed",
        description: "The deposit refund has been processed successfully.",
      });
      
      // Refresh data
      loadDeposits();
    } catch (err: any) {
      toast({
        title: "Refund Error",
        description: err.message || "Error processing refund request",
        variant: "destructive",
      });
      console.error("Admin refund override error:", err);
    } finally {
      setProcessingRefund(false);
      setRefundDialogOpen(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Calculate time remaining for refund
  const calculateTimeRemaining = (refundDeadline: string): number => {
    const deadline = new Date(refundDeadline).getTime();
    const now = Date.now();
    return Math.max(0, deadline - now);
  };
  
  // Filter deposits
  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = 
      deposit.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      deposit.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.booking_id?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = statusFilter ? deposit.status === statusFilter : true;
    
    return matchesSearch && matchesFilter;
  });
  
  // Load data on mount
  useEffect(() => {
    loadDeposits();
  }, []);
  
  // View deposit details
  const viewDepositDetails = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    loadBookingDetails(deposit.booking_id);
    setViewDetailsOpen(true);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500 hover:bg-green-600">PAID</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-500">PENDING</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="text-blue-600 border-blue-500">REFUNDED</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-500">CANCELLED</Badge>;
      case 'failed':
        return <Badge variant="destructive">FAILED</Badge>;
      default:
        return <Badge variant="outline">{status.toUpperCase()}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Deposit Management</CardTitle>
              <CardDescription>Manage customer move deposits and refunds</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadDeposits}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or booking ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === 'paid' ? "default" : "outline"} 
                size="sm"
                className={statusFilter === 'paid' ? "" : "border-green-200 text-green-700"}
                onClick={() => setStatusFilter(statusFilter === 'paid' ? null : 'paid')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Paid
              </Button>
              <Button 
                variant={statusFilter === 'pending' ? "default" : "outline"} 
                size="sm"
                className={statusFilter === 'pending' ? "" : "border-amber-200 text-amber-700"}
                onClick={() => setStatusFilter(statusFilter === 'pending' ? null : 'pending')}
              >
                <Clock className="h-4 w-4 mr-1" />
                Pending
              </Button>
              <Button 
                variant={statusFilter === 'refunded' ? "default" : "outline"} 
                size="sm"
                className={statusFilter === 'refunded' ? "" : "border-blue-200 text-blue-700"}
                onClick={() => setStatusFilter(statusFilter === 'refunded' ? null : 'refunded')}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refunded
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Loading deposits...</p>
            </div>
          ) : filteredDeposits.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border rounded-md">
              {searchTerm || statusFilter ? (
                <>
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No deposits match your search criteria</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter(null);
                    }}
                  >
                    Clear filters
                  </Button>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No deposit records found</p>
                </>
              )}
            </div>
          ) : (
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Move Date</TableHead>
                    <TableHead>Refund Deadline</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeposits.map((deposit) => {
                    const now = new Date();
                    const refundDeadline = new Date(deposit.refund_deadline);
                    const isRefundable = now < refundDeadline;
                    
                    return (
                      <TableRow key={deposit.id}>
                        <TableCell>
                          {getStatusBadge(deposit.status)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{deposit.customer_name || "N/A"}</div>
                            <div className="text-xs text-muted-foreground">{deposit.customer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                            {formatDate(deposit.move_date)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {deposit.status === 'paid' && (
                            <div>
                              <div className="text-xs mb-1">{formatDate(deposit.refund_deadline)}</div>
                              {isRefundable ? (
                                <div className="flex items-center">
                                  <CountdownTimer 
                                    timeRemaining={calculateTimeRemaining(deposit.refund_deadline) / 1000} 
                                    compact={true}
                                    showIcon={true}
                                    className="text-xs"
                                    urgencyThreshold={{ warning: 12 * 3600, critical: 4 * 3600 }}
                                  />
                                </div>
                              ) : (
                                <div className="text-xs text-red-500 flex items-center">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Non-refundable
                                </div>
                              )}
                            </div>
                          )}
                          {deposit.status === 'refunded' && (
                            <div className="text-xs text-blue-500">
                              Refunded on {formatDate(deposit.refund_date)}
                            </div>
                          )}
                          {(deposit.status !== 'paid' && deposit.status !== 'refunded') && (
                            <div className="text-xs text-muted-foreground">N/A</div>
                          )}
                        </TableCell>
                        <TableCell>
                          ${(deposit.amount / 100).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => viewDepositDetails(deposit)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Deposit Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Deposit Details</DialogTitle>
            <DialogDescription>
              Complete information about this deposit and booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedDeposit && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Deposit Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span>{getStatusBadge(selectedDeposit.status)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount</span>
                      <span className="font-medium">${(selectedDeposit.amount / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Date</span>
                      <span>{formatDate(selectedDeposit.payment_date) || "Not paid"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Refund Deadline</span>
                      <span>{formatDate(selectedDeposit.refund_deadline)}</span>
                    </div>
                    {selectedDeposit.refund_date && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Refunded Date</span>
                        <span>{formatDate(selectedDeposit.refund_date)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Stripe Session</span>
                      <span className="text-xs truncate max-w-[180px]" title={selectedDeposit.stripe_session_id}>
                        {selectedDeposit.stripe_session_id}
                      </span>
                    </div>
                    {selectedDeposit.stripe_payment_id && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment ID</span>
                        <span className="text-xs truncate max-w-[180px]" title={selectedDeposit.stripe_payment_id}>
                          {selectedDeposit.stripe_payment_id}
                        </span>
                      </div>
                    )}
                    
                    {selectedDeposit.status === 'paid' && (
                      <div className="mt-4 pt-2 border-t">
                        <h4 className="text-sm font-medium mb-1">Refund Status</h4>
                        {calculateTimeRemaining(selectedDeposit.refund_deadline) > 0 ? (
                          <div>
                            <div className="text-xs text-green-600 flex items-center mb-1">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Eligible for refund
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md flex items-center justify-between">
                              <span className="text-xs text-gray-500">Time remaining:</span>
                              <CountdownTimer
                                timeRemaining={calculateTimeRemaining(selectedDeposit.refund_deadline) / 1000}
                                compact={false}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-red-500 flex items-center">
                            <XCircle className="h-3 w-3 mr-1" />
                            Past refund deadline - non-refundable
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {selectedBooking && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Customer</span>
                        <span className="font-medium">{selectedBooking.name}</span>
                      </div>
                      <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Contact</span>
                        <span>{selectedBooking.email}</span>
                        <span>{selectedBooking.phone}</span>
                      </div>
                      <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Move Details</span>
                        <span>{formatDate(selectedBooking.move_date)} at {selectedBooking.move_time}</span>
                        <span className="text-sm">{selectedBooking.package_type}</span>
                      </div>
                      <div className="grid gap-1">
                        <span className="text-sm text-muted-foreground">Address</span>
                        <span className="text-sm">{selectedBooking.address}</span>
                      </div>
                      {selectedBooking.additional_services && (
                        <div className="grid gap-1">
                          <span className="text-sm text-muted-foreground">Additional Services</span>
                          <span className="text-sm">{selectedBooking.additional_services}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {selectedDeposit.status === 'paid' && (
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setRefundDialogOpen(true)}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Process Admin Refund Override
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    This will process a full refund regardless of the 48-hour deadline
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Refund Override Confirmation */}
      <AlertDialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Administrative Refund</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to process a refund override. This will issue a full refund even if it's past the 48-hour deadline.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={processRefundOverride}
              disabled={processingRefund}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {processingRefund ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </div>
              ) : "Yes, Process Refund"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DepositManagement;
