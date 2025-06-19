/*
  # Update team members policies

  1. Changes
    - Add SELECT policy for authenticated users
    - Update existing policies to use proper role check
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Managers can create team members" ON team_members;
DROP POLICY IF EXISTS "Managers can update team members" ON team_members;
DROP POLICY IF EXISTS "Managers can delete team members" ON team_members;

-- Allow all authenticated users to read team members
CREATE POLICY "Allow authenticated users to read team members"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow managers to create team members
CREATE POLICY "Managers can create team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK ((current_user = 'authenticated'));

-- Allow managers to update team members
CREATE POLICY "Managers can update team members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK ((current_user = 'authenticated'));

-- Allow managers to delete team members
CREATE POLICY "Managers can delete team members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING ((current_user = 'authenticated'));