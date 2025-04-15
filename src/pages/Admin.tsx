
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingTable from '@/components/admin/BookingTable';
import BookingDetailsDialog from '@/components/admin/BookingDetailsDialog';
import type { Booking } from '@/types/booking';

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
              <BookingTable 
                bookings={bookings}
                onViewBooking={viewBookingDetails}
              />
            )}
          </div>
        </main>
        
        <BookingDetailsDialog
          booking={selectedBooking}
          open={openDialog}
          onOpenChange={setOpenDialog}
        />
        
        <Footer />
      </div>
    </>
  );
};

export default Admin;
