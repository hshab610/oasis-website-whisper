
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to safely query the booking_deposits table
 * This is a temporary workaround until the Supabase types are updated
 */
export const queryBookingDeposits = () => {
  try {
    // @ts-ignore - The booking_deposits table exists in the database but not in the TypeScript types yet
    return supabase.from('booking_deposits');
  } catch (error) {
    console.error('Error accessing booking_deposits table:', error);
    throw new Error('Failed to query booking deposits. Please try again later.');
  }
};

/**
 * Helper function to wrap Supabase queries with better error handling
 */
export const safeQuery = async <T>(queryFn: () => Promise<any>): Promise<T> => {
  try {
    const response = await queryFn();
    
    if (response.error) {
      console.error('Supabase query error:', response.error);
      throw new Error(response.error.message || 'Database operation failed');
    }
    
    return response.data as T;
  } catch (error: any) {
    console.error('Query execution error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};
