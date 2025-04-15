
-- Create a function that can assign admin role bypassing RLS
CREATE OR REPLACE FUNCTION public.assign_admin_role(user_id_param UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id_param, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Grant execute permission to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.assign_admin_role TO anon;
GRANT EXECUTE ON FUNCTION public.assign_admin_role TO authenticated;

-- Add UNIQUE constraint if it doesn't exist already
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_roles_user_id_role_key'
  ) THEN
    ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
  END IF;
EXCEPTION WHEN others THEN
  -- Constraint might already exist
END $$;
