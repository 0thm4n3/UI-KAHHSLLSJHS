/*
  # Initial Schema for SecureScope

  1. New Tables
    - `team_members`
      - `id` (text, primary key) - Custom ID format (e.g., SC001)
      - `name` (text)
      - `role` (text)
      - `email` (text)
      - `avatar` (text)
      - `created_at` (timestamptz)

    - `projects`
      - `id` (text, primary key)
      - `name` (text)
      - `client` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (text)
      - `description` (text)
      - `scope` (text)
      - `progress` (integer)
      - `created_at` (timestamptz)

    - `project_members`
      - `project_id` (text, references projects)
      - `member_id` (text, references team_members)
      - Primary key (project_id, member_id)

    - `assets`
      - `id` (text, primary key)
      - `project_id` (text, references projects)
      - `name` (text)
      - `type` (text)
      - `ip_address` (text)
      - `url` (text)
      - `description` (text)
      - `os_details` (text)
      - `created_at` (timestamptz)

    - `vulnerabilities`
      - `id` (text, primary key)
      - `project_id` (text, references projects)
      - `title` (text)
      - `description` (text)
      - `severity` (text)
      - `status` (text)
      - `discovered_date` (date)
      - `discovered_by` (text, references team_members)
      - `cve_id` (text)
      - `remediation` (text)
      - `created_at` (timestamptz)

    - `vulnerability_assets`
      - `vulnerability_id` (text, references vulnerabilities)
      - `asset_id` (text, references assets)
      - Primary key (vulnerability_id, asset_id)

    - `tasks`
      - `id` (text, primary key)
      - `project_id` (text, references projects)
      - `title` (text)
      - `description` (text)
      - `assigned_to` (text, references team_members)
      - `due_date` (date)
      - `status` (text)
      - `priority` (text)
      - `created_at` (timestamptz)

    - `activities`
      - `id` (text, primary key)
      - `project_id` (text, references projects)
      - `type` (text)
      - `action` (text)
      - `user_id` (text, references team_members)
      - `timestamp` (timestamptz)
      - `details` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Enums and Constraints
    - Project status: planning, in-progress, review, completed
    - Vulnerability severity: critical, high, medium, low, info
    - Vulnerability status: open, in-progress, resolved, accepted
    - Task status: todo, in-progress, review, completed
    - Task priority: low, medium, high
    - Asset type: server, application, network, cloud, other
*/

-- Create enum types
CREATE TYPE project_status AS ENUM ('planning', 'in-progress', 'review', 'completed');
CREATE TYPE vulnerability_severity AS ENUM ('critical', 'high', 'medium', 'low', 'info');
CREATE TYPE vulnerability_status AS ENUM ('open', 'in-progress', 'resolved', 'accepted');
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'review', 'completed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE asset_type AS ENUM ('server', 'application', 'network', 'cloud', 'other');
CREATE TYPE member_role AS ENUM ('pentester', 'manager', 'client', 'developer');

-- Create tables
CREATE TABLE team_members (
  id text PRIMARY KEY,
  name text NOT NULL,
  role member_role NOT NULL,
  email text UNIQUE NOT NULL,
  avatar text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE projects (
  id text PRIMARY KEY,
  name text NOT NULL,
  client text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status project_status NOT NULL DEFAULT 'planning',
  description text,
  scope text,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE project_members (
  project_id text REFERENCES projects ON DELETE CASCADE,
  member_id text REFERENCES team_members ON DELETE CASCADE,
  PRIMARY KEY (project_id, member_id)
);

CREATE TABLE assets (
  id text PRIMARY KEY,
  project_id text REFERENCES projects ON DELETE CASCADE,
  name text NOT NULL,
  type asset_type NOT NULL,
  ip_address text,
  url text,
  description text,
  os_details text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE vulnerabilities (
  id text PRIMARY KEY,
  project_id text REFERENCES projects ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  severity vulnerability_severity NOT NULL,
  status vulnerability_status NOT NULL DEFAULT 'open',
  discovered_date date NOT NULL,
  discovered_by text REFERENCES team_members ON DELETE SET NULL,
  cve_id text,
  remediation text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE vulnerability_assets (
  vulnerability_id text REFERENCES vulnerabilities ON DELETE CASCADE,
  asset_id text REFERENCES assets ON DELETE CASCADE,
  PRIMARY KEY (vulnerability_id, asset_id)
);

CREATE TABLE tasks (
  id text PRIMARY KEY,
  project_id text REFERENCES projects ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  assigned_to text REFERENCES team_members ON DELETE SET NULL,
  due_date date NOT NULL,
  status task_status NOT NULL DEFAULT 'todo',
  priority task_priority NOT NULL DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE activities (
  id text PRIMARY KEY,
  project_id text REFERENCES projects ON DELETE CASCADE,
  type text NOT NULL,
  action text NOT NULL,
  user_id text REFERENCES team_members ON DELETE SET NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  details text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE vulnerabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE vulnerability_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read team_members"
  ON team_members FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read projects"
  ON projects FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read project_members"
  ON project_members FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read assets"
  ON assets FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read vulnerabilities"
  ON vulnerabilities FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read vulnerability_assets"
  ON vulnerability_assets FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read tasks"
  ON tasks FOR SELECT TO authenticated;

CREATE POLICY "Allow authenticated users to read activities"
  ON activities FOR SELECT TO authenticated;