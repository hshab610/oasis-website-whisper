
-- Create deposits table
CREATE TABLE IF NOT EXISTS public.booking_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  address TEXT,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  move_date TIMESTAMPTZ NOT NULL,
  refund_deadline TIMESTAMPTZ NOT NULL,
  payment_date TIMESTAMPTZ,
  refund_date TIMESTAMPTZ,
  payment_method TEXT,
  payment_status TEXT,
  failure_reason TEXT,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_id TEXT,
  refund_id TEXT,
  admin_override BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  cancel_date TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.booking_deposits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admins to view all deposits
CREATE POLICY "admins_select_deposits" ON public.booking_deposits
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
    )
  );

-- Create policy to allow admins to update deposits
CREATE POLICY "admins_update_deposits" ON public.booking_deposits
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
    )
  );
  
-- Create policy to allow deposit webhook to update records
CREATE POLICY "webhook_update_deposits" ON public.booking_deposits
  FOR UPDATE
  USING (true);

-- Create policy to allow edge functions to insert deposits
CREATE POLICY "functions_insert_deposits" ON public.booking_deposits
  FOR INSERT
  WITH CHECK (true);

