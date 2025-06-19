/*
  # Team Management System

  1. New Objects
    - Sequence for member IDs
    - Function to generate unique member IDs
    - Functions for CRUD operations on team members
  
  2. Security
    - Enable RLS on team_members table
    - Add policies for manager role
*/

-- Create sequence for member IDs (moved before the function that uses it)
CREATE SEQUENCE IF NOT EXISTS member_id_seq START 1;

-- Create function to generate a unique member ID
CREATE OR REPLACE FUNCTION generate_member_id()
RETURNS text
LANGUAGE sql
AS $$
  SELECT 'TM' || LPAD(CAST(nextval('member_id_seq') AS text), 4, '0')
$$;

-- Create team member function
CREATE OR REPLACE FUNCTION create_team_member(
  p_name text,
  p_role member_role,
  p_email text,
  p_avatar text DEFAULT NULL
)
RETURNS team_members
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_member team_members;
BEGIN
  -- Validate email format
  IF NOT p_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Insert new team member
  INSERT INTO team_members (id, name, role, email, avatar)
  VALUES (
    generate_member_id(),
    p_name,
    p_role,
    p_email,
    p_avatar
  )
  RETURNING * INTO v_member;

  RETURN v_member;
END;
$$;

-- Update team member function
CREATE OR REPLACE FUNCTION update_team_member(
  p_id text,
  p_name text,
  p_role member_role,
  p_email text,
  p_avatar text DEFAULT NULL
)
RETURNS team_members
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_member team_members;
BEGIN
  -- Validate email format
  IF NOT p_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Update team member
  UPDATE team_members
  SET
    name = p_name,
    role = p_role,
    email = p_email,
    avatar = p_avatar
  WHERE id = p_id
  RETURNING * INTO v_member;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Team member not found';
  END IF;

  RETURN v_member;
END;
$$;

-- Delete team member function
CREATE OR REPLACE FUNCTION delete_team_member(p_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete team member
  DELETE FROM team_members WHERE id = p_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Team member not found';
  END IF;
END;
$$;

-- Add RLS policies
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow managers to create team members
CREATE POLICY "Managers can create team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'manager');

-- Allow managers to update team members
CREATE POLICY "Managers can update team members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'manager')
  WITH CHECK (auth.jwt() ->> 'role' = 'manager');

-- Allow managers to delete team members
CREATE POLICY "Managers can delete team members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'manager');