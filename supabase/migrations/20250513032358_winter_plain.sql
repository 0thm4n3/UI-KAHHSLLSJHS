/*
  # Add Resources Management

  1. New Tables
    - `resources` table for managing user information
      - `id` (text, primary key) - Auto-generated ID with 'RS' prefix
      - `full_name` (text) - User's full name
      - `email` (text, unique) - User's email address
      - `phone` (text) - User's phone number
      - `avatar` (text) - URL to user's avatar image
      - `job_title` (text) - User's job title
      - `created_at` (timestamptz) - Creation timestamp

  2. Functions
    - Create, update, and delete functions for resources
    - Auto-generation of resource IDs

  3. Security
    - Enable RLS
    - Add policy for authenticated access
*/

-- Create sequence for resource IDs
CREATE SEQUENCE IF NOT EXISTS resource_id_seq START 1;

-- Create function to generate a unique resource ID
CREATE OR REPLACE FUNCTION generate_resource_id()
RETURNS text
LANGUAGE sql
AS $$
  SELECT 'RS' || LPAD(CAST(nextval('resource_id_seq') AS text), 4, '0')
$$;

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id text PRIMARY KEY DEFAULT generate_resource_id(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  avatar text,
  job_title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index on email
CREATE INDEX IF NOT EXISTS resources_email_idx ON resources(email);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create RLS policy
CREATE POLICY "resources_policy"
  ON resources
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to create a resource
CREATE OR REPLACE FUNCTION create_resource(
  p_full_name text,
  p_email text,
  p_phone text,
  p_avatar text,
  p_job_title text
)
RETURNS resources
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_resource resources;
BEGIN
  -- Validate email format
  IF NOT p_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Insert new resource
  INSERT INTO resources (full_name, email, phone, avatar, job_title)
  VALUES (p_full_name, p_email, p_phone, p_avatar, p_job_title)
  RETURNING * INTO v_resource;

  RETURN v_resource;
END;
$$;

-- Create function to update a resource
CREATE OR REPLACE FUNCTION update_resource(
  p_id text,
  p_full_name text,
  p_email text,
  p_phone text,
  p_avatar text,
  p_job_title text
)
RETURNS resources
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_resource resources;
BEGIN
  -- Validate email format
  IF NOT p_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Update resource
  UPDATE resources
  SET
    full_name = p_full_name,
    email = p_email,
    phone = p_phone,
    avatar = p_avatar,
    job_title = p_job_title
  WHERE id = p_id
  RETURNING * INTO v_resource;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Resource not found';
  END IF;

  RETURN v_resource;
END;
$$;

-- Create function to delete a resource
CREATE OR REPLACE FUNCTION delete_resource(p_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM resources WHERE id = p_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Resource not found';
  END IF;
END;
$$;