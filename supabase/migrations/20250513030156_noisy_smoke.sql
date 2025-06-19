/*
  # Insert Initial Data

  This migration inserts the initial test data for:
  1. Team Members
  2. Projects
  3. Assets
  4. Tasks
  5. Vulnerabilities
  6. Project Members
  7. Activities
*/

-- Insert team members
INSERT INTO team_members (id, name, role, email, avatar) VALUES
  ('SC001', 'Mouhssine', 'pentester', 'mouhssine@securityfirm.com', 'https://i.pravatar.cc/150?img=68'),
  ('MR002', 'Amine', 'pentester', 'amine@securityfirm.com', 'https://i.pravatar.cc/150?img=47'),
  ('AT003', 'Mehdi', 'pentester', 'mehdi@securityfirm.com', 'https://i.pravatar.cc/150?img=32');

-- Insert projects
INSERT INTO projects (id, name, client, start_date, end_date, status, description, scope, progress) VALUES
  ('alpha', 'Enterprise CRM System', 'Alpha Corp', '2025-02-10', '2025-03-15', 'in-progress', 'Comprehensive security assessment of enterprise-level CRM system', 'Full penetration testing of CRM platform and associated services', 65),
  ('beta', 'Mobile Banking App', 'Beta Financial', '2025-01-05', '2025-01-25', 'in-progress', 'Security assessment of mobile banking application', 'Mobile app security testing and API security assessment', 45),
  ('gamma', 'E-commerce Platform', 'Gamma Retail', '2025-03-01', '2025-04-10', 'in-progress', 'Security testing of e-commerce platform and payment systems', 'Web application security and payment gateway testing', 30);

-- Insert project members
INSERT INTO project_members (project_id, member_id) VALUES
  ('alpha', 'SC001'),
  ('alpha', 'MR002'),
  ('beta', 'MR002'),
  ('beta', 'AT003'),
  ('gamma', 'SC001'),
  ('gamma', 'AT003');

-- Insert assets
INSERT INTO assets (id, project_id, name, type, ip_address, description, os_details) VALUES
  ('db-prod', 'alpha', 'Production Database Server', 'server', '10.0.1.10', 'Primary production database server', 'PostgreSQL 15 on Ubuntu 22.04'),
  ('db-dev', 'beta', 'Development Database Server', 'server', '10.0.2.10', 'Development environment database', 'MySQL 8.0 on Ubuntu 22.04'),
  ('db-test', 'gamma', 'Testing Database Server', 'server', '10.0.3.10', 'Testing environment database', 'MongoDB 6.0 on Ubuntu 22.04');

INSERT INTO assets (id, project_id, name, type, url, description) VALUES
  ('web-crm', 'alpha', 'CRM Web Application', 'application', 'https://crm.alpha-corp.com', 'Enterprise CRM web interface'),
  ('web-banking', 'beta', 'Banking Web Portal', 'application', 'https://banking.beta-financial.com', 'Web portal for banking services'),
  ('web-ecommerce', 'gamma', 'E-commerce Website', 'application', 'https://shop.gamma-retail.com', 'Main e-commerce website'),
  ('mobile-crm', 'alpha', 'CRM Mobile App', 'application', NULL, 'Mobile CRM application for iOS and Android'),
  ('mobile-banking', 'beta', 'Mobile Banking App', 'application', NULL, 'Mobile banking application'),
  ('mobile-ecommerce', 'gamma', 'E-commerce Mobile App', 'application', NULL, 'Mobile shopping application');

-- Insert tasks
INSERT INTO tasks (id, project_id, title, description, assigned_to, due_date, status, priority) VALUES
  ('alpha-1', 'alpha', 'SQL Injection Assessment', 'Test CRM database endpoints for SQL injection vulnerabilities', 'SC001', '2025-03-15', 'in-progress', 'high'),
  ('alpha-2', 'alpha', 'SSL Certificate Review', 'Analyze SSL/TLS configuration and certificates', 'SC001', '2025-03-20', 'todo', 'medium'),
  ('alpha-3', 'alpha', 'Password Policy Testing', 'Evaluate password requirements and restrictions', 'MR002', '2025-03-25', 'todo', 'low'),
  ('beta-1', 'beta', 'Mobile API Security', 'Test mobile banking API endpoints', 'MR002', '2025-03-10', 'in-progress', 'high'),
  ('beta-2', 'beta', 'SSL Implementation', 'Review SSL implementation in mobile app', 'AT003', '2025-03-15', 'todo', 'medium'),
  ('beta-3', 'beta', 'Authentication Review', 'Test mobile app authentication mechanisms', 'MR002', '2025-03-20', 'todo', 'low'),
  ('gamma-1', 'gamma', 'Payment Gateway Testing', 'Security assessment of payment processing', 'AT003', '2025-03-30', 'in-progress', 'high'),
  ('gamma-2', 'gamma', 'SSL Configuration', 'Review SSL settings across e-commerce platform', 'SC001', '2025-04-05', 'todo', 'medium'),
  ('gamma-3', 'gamma', 'Password Security', 'Evaluate customer account security', 'AT003', '2025-04-10', 'todo', 'low');

-- Insert vulnerabilities
INSERT INTO vulnerabilities (id, project_id, title, description, severity, status, discovered_date, discovered_by, remediation) VALUES
  ('v1', 'alpha', 'SQL Injection in Login Form', 'The login form is vulnerable to SQL injection attacks, allowing unauthorized access to the database.', 'critical', 'in-progress', '2025-02-15', 'SC001', 'Implement prepared statements and input validation'),
  ('v2', 'beta', 'Weak SSL Configuration', 'The mobile app uses weak SSL cipher suites.', 'high', 'open', '2025-02-18', 'MR002', 'Update SSL configuration to use strong cipher suites'),
  ('v3', 'gamma', 'Insufficient Password Requirements', 'Password policy allows weak passwords.', 'medium', 'open', '2025-03-01', 'AT003', 'Implement stronger password requirements');

-- Insert vulnerability-asset relationships
INSERT INTO vulnerability_assets (vulnerability_id, asset_id) VALUES
  ('v1', 'web-crm'),
  ('v2', 'mobile-banking'),
  ('v3', 'web-ecommerce');

-- Insert activities
INSERT INTO activities (id, project_id, type, action, user_id, timestamp, details) VALUES
  ('a1', 'alpha', 'vulnerability', 'created', 'SC001', '2025-02-15T09:30:00Z', 'Discovered SQL Injection vulnerability in login form'),
  ('a2', 'beta', 'vulnerability', 'created', 'MR002', '2025-02-18T14:15:00Z', 'Identified weak SSL configuration in mobile app'),
  ('a3', 'gamma', 'vulnerability', 'created', 'AT003', '2025-03-01T11:45:00Z', 'Found insufficient password requirements');