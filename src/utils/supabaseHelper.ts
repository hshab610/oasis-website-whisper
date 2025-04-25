
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to safely query the booking_deposits table
 * This is a temporary workaround until the Supabase types are updated
 */
export const queryBookingDeposits = () => {
  // @ts-ignore - The booking_deposits table exists in the database but not in the TypeScript types yet
  return supabase.from('booking_deposits');
};
