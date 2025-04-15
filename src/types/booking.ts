
export type Booking = {
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
