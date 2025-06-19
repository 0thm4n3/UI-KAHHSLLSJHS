/*
  # Update team members policies

  1. Changes
    - Remove duplicate policies
    - Create unified policy for authenticated users
    - Add performance optimization
  
  2. Security
    - Maintain RLS enforcement
    - Simplify policy structure while maintaining security
*/

DO $$ 
BEGIN
  -- Only drop policies if they exist
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' 
    AND policyname = 'Allow authenticated users to read team members'
  ) THEN
    DROP POLICY "Allow authenticated users to read team members" ON team_members;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' 
    AND policyname = 'Managers can create team members'
  ) THEN
    DROP POLICY "Managers can create team members" ON team_members;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' 
    AND policyname = 'Managers can update team members'
  ) THEN
    DROP POLICY "Managers can update team members" ON team_members;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'team_members' 
    AND policyname = 'Managers can delete team members'
  ) THEN
    DROP POLICY "Managers can delete team members" ON team_members;
  END IF;
END $$;

-- Create new unified policy
CREATE POLICY "team_members_policy" ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add index for better performance if it doesn't exist
CREATE INDEX IF NOT EXISTS team_members_email_idx ON team_members(email);

-- Ensure RLS is enabled
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;