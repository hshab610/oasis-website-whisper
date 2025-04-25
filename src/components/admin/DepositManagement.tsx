import { useState, useEffect } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Badge,
} from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, AlertTriangle, RefreshCw, Check, X } from 'lucide-react';
import { Deposit } from '@/types/deposit';

const DepositManagement = () => {
  const { toast } = useToast();
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [refundReason, setRefundReason] = useState('');

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('booking_deposits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeposits(data as unknown as Deposit[]);
    } catch (error: any) {
      console.error('Error fetching deposits:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to load deposit data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(parseISO(dateString), 'PPP p');
  };

  const isRefundable = (deposit: Deposit) => {
    if (deposit.status !== 'paid') return false;
    const now = new Date();
    const deadline = parseISO(deposit.refund_deadline);
    return isAfter(deadline, now);
  };

  const processRefund = async (depositId: string, adminOverride = false) => {
    setProcessingId(depositId);
    try {
      const response = await fetch('/functions/v1/deposit-manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          action: 'refund',
          depositId,
          adminOverride,
          reason: refundReason || 'Customer requested refund',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process refund');
      }

      toast({
        title: 'Success',
        description: 'Refund processed successfully',
      });
      
      fetchDeposits();
    } catch (error: any) {
      console.error('Error processing refund:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to process refund',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
      setShowRefundDialog(false);
      setSelectedDeposit(null);
      setRefundReason('');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'refunded':
        return <Badge variant="outline">Refunded</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const handleRefundClick = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setShowRefundDialog(true);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Deposit & Refund Management</CardTitle>
              <CardDescription>Manage customer deposits and process refunds</CardDescription>
            </div>
            <Button 
              onClick={fetchDeposits} 
              variant="outline" 
              size="sm" 
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {deposits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No deposit records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Move Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Refund Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deposits.map((deposit) => (
                    <TableRow key={deposit.id}>
                      <TableCell>
                        <div className="font-medium">{deposit.customer_name || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">{deposit.customer_email}</div>
                      </TableCell>
                      <TableCell>{formatDate(deposit.move_date)}</TableCell>
                      <TableCell>${(deposit.amount / 100).toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(deposit.status)}</TableCell>
                      <TableCell>
                        {deposit.status === 'paid' && (
                          <div className="flex items-center gap-1">
                            {isRefundable(deposit) ? (
                              <>
                                <Clock className="h-3 w-3 text-green-600" />
                                <span className="text-green-600 text-xs font-medium">Refundable</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-3 w-3 text-amber-600" />
                                <span className="text-amber-600 text-xs font-medium">Non-refundable</span>
                              </>
                            )}
                            <span className="text-xs text-muted-foreground ml-1">
                              ({formatDate(deposit.refund_deadline)})
                            </span>
                          </div>
                        )}
                        {deposit.status !== 'paid' && (
                          <span className="text-xs text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {deposit.status === 'paid' && (
                          <Button
                            variant={isRefundable(deposit) ? "outline" : "secondary"}
                            size="sm"
                            onClick={() => handleRefundClick(deposit)}
                            disabled={processingId === deposit.id}
                            className={!isRefundable(deposit) ? "text-amber-600 border-amber-300" : ""}
                          >
                            {!isRefundable(deposit) && (
                              <>
                                <AlertTriangle className="h-3 w-3 mr-1" /> 
                                Admin Override
                              </>
                            )}
                            {isRefundable(deposit) && "Process Refund"}
                            {processingId === deposit.id && (
                              <RefreshCw className="ml-2 h-3 w-3 animate-spin" />
                            )}
                          </Button>
                        )}
                        {deposit.status === 'refunded' && (
                          <span className="text-xs text-muted-foreground">Refunded on {formatDate(deposit.refund_date)}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isRefundable(selectedDeposit!) 
                ? "Process Refund" 
                : "Admin Override Refund"}
            </DialogTitle>
            <DialogDescription>
              {isRefundable(selectedDeposit!)
                ? "This will refund the customer's deposit."
                : "CAUTION: This deposit is past the refund deadline and would normally be non-refundable."}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDeposit && (
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Customer</p>
                <p className="text-sm">
                  {selectedDeposit.customer_name} ({selectedDeposit.customer_email})
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Deposit Amount</p>
                <p className="text-sm">${(selectedDeposit.amount / 100).toFixed(2)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Move Date</p>
                <p className="text-sm">{formatDate(selectedDeposit.move_date)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Refund Deadline</p>
                <p className="text-sm flex items-center gap-1">
                  {formatDate(selectedDeposit.refund_deadline)}
                  {!isRefundable(selectedDeposit) && (
                    <span className="text-red-500 text-xs">(Passed)</span>
                  )}
                </p>
              </div>
              
              {!isRefundable(selectedDeposit) && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Admin Override Required</span>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">
                    This refund requires an admin override because it's past the 48-hour refund deadline.
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRefundDialog(false)}
              className="mb-2 sm:mb-0"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            
            <Button
              type="button" 
              onClick={() => selectedDeposit && processRefund(
                selectedDeposit.id, 
                !isRefundable(selectedDeposit)
              )}
              className={isRefundable(selectedDeposit!) ? "bg-primary" : "bg-amber-600 hover:bg-amber-700"}
            >
              <Check className="mr-2 h-4 w-4" />
              {isRefundable(selectedDeposit!) 
                ? "Confirm Refund" 
                : "Override & Refund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepositManagement;
