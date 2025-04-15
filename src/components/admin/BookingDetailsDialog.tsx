
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Booking } from '@/types/booking';

interface BookingDetailsDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDetailsDialog = ({ booking, open, onOpenChange }: BookingDetailsDialogProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-purple-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Complete information for this booking request
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Booking ID</h3>
              <p>{booking.id}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
              <p>{booking.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
              <p>{booking.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
              <p>{booking.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
              <p>{getStatusBadge(booking.status)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Submitted On</h3>
              <p>{formatDate(booking.created_at)}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Move Date</h3>
              <p>{formatDate(booking.move_date)}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Preferred Time</h3>
              <p>{booking.move_time}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Package Type</h3>
              <p>{booking.package_type}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Additional Services</h3>
              <p>{booking.additional_services || "None"}</p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Moving Address</h3>
              <p>{booking.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Notes</h3>
              <p className="whitespace-pre-wrap">{booking.notes || "None"}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
