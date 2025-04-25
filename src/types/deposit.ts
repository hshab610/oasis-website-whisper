
export interface Deposit {
  id: string;
  booking_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  address: string | null;
  amount: number;
  status: string;
  move_date: string;
  refund_deadline: string;
  payment_date: string | null;
  refund_date: string | null;
  payment_method: string | null;
  payment_status: string | null;
  failure_reason: string | null;
  stripe_session_id: string;
  stripe_payment_id: string | null;
  refund_id: string | null;
  admin_override: boolean;
  created_at: string;
  cancel_date: string | null;
}
