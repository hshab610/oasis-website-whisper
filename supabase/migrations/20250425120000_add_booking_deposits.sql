
-- Create booking_deposits table to store deposit information
CREATE TABLE IF NOT EXISTS public.booking_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  address TEXT,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  move_date TIMESTAMP WITH TIME ZONE NOT NULL,
  refund_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE,
  refund_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  payment_status TEXT,
  failure_reason TEXT,
  stripe_session_id TEXT NOT NULL,
  stripe_payment_id TEXT,
  refund_id TEXT,
  admin_override BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  cancel_date TIMESTAMP WITH TIME ZONE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_booking_deposits_booking_id ON public.booking_deposits(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_deposits_status ON public.booking_deposits(status);
CREATE INDEX IF NOT EXISTS idx_booking_deposits_customer_email ON public.booking_deposits(customer_email);

-- Add deposit_paid column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS deposit_paid BOOLEAN DEFAULT FALSE;
