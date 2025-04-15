
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  move_date: string;
  move_time: string;
  address: string;
  package_type: string;
  additional_services: string | null;
  notes: string | null;
  created_at: string;
  status: string;
};

const Admin = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching bookings:', error);
          toast({
            title: "Error",
            description: "Failed to load booking data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setBookings(data as Booking[]);
      } catch (error) {
        console.error('Exception fetching bookings:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Oasis Moving & Storage</title>
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Booking Management</h1>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading bookings...</span>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-background p-8 rounded-lg border text-center">
                <p className="text-lg text-muted-foreground">No booking requests found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>List of all booking requests</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Move Date</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{formatDate(booking.created_at)}</TableCell>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.email}</TableCell>
                        <TableCell>{booking.phone}</TableCell>
                        <TableCell>{formatDate(booking.move_date)}</TableCell>
                        <TableCell>{booking.package_type}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline" 
                            size="sm" 
                            onClick={() => viewBookingDetails(booking)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Complete information for this booking request
              </DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Booking ID</h3>
                    <p>{selectedBooking.id}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
                    <p>{selectedBooking.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                    <p>{selectedBooking.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
                    <p>{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                    <p>{getStatusBadge(selectedBooking.status)}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Submitted On</h3>
                    <p>{formatDate(selectedBooking.created_at)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Move Date</h3>
                    <p>{formatDate(selectedBooking.move_date)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Preferred Time</h3>
                    <p>{selectedBooking.move_time}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Package Type</h3>
                    <p>{selectedBooking.package_type}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Additional Services</h3>
                    <p>{selectedBooking.additional_services || "None"}</p>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Moving Address</h3>
                    <p>{selectedBooking.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Notes</h3>
                    <p className="whitespace-pre-wrap">{selectedBooking.notes || "None"}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        <Footer />
      </div>
    </>
  );
};

export default Admin;
