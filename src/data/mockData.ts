import { Project, Vulnerability, Asset, TeamMember, Task, Activity, TestCase } from '../types';

// Mock Projects
export const projects: Project[] = [
  {
    id: 'alpha',
    name: 'Enterprise CRM System',
    client: 'Alpha Corp',
    startDate: '2025-02-10',
    endDate: '2025-03-15',
    status: 'in-progress',
    description: 'Comprehensive security assessment of enterprise-level CRM system',
    scope: 'Full penetration testing of CRM platform and associated services',
    progress: 65,
    teamMembers: ['SC001', 'MR002']
  },
  {
    id: 'beta',
    name: 'Mobile Banking App',
    client: 'Beta Financial',
    startDate: '2025-01-05',
    endDate: '2025-01-25',
    status: 'in-progress',
    description: 'Security assessment of mobile banking application',
    scope: 'Mobile app security testing and API security assessment',
    progress: 45,
    teamMembers: ['MR002', 'AT003']
  },
  {
    id: 'gamma',
    name: 'E-commerce Platform',
    client: 'Gamma Retail',
    startDate: '2025-03-01',
    endDate: '2025-04-10',
    status: 'in-progress',
    description: 'Security testing of e-commerce platform and payment systems',
    scope: 'Web application security and payment gateway testing',
    progress: 30,
    teamMembers: ['SC001', 'AT003']
  }
];

// Mock Vulnerabilities
export const vulnerabilities: Vulnerability[] = [
  {
    id: 'v1',
    projectId: 'p1',
    title: 'SQL Injection in Login Form',
    description: 'The login form is vulnerable to SQL injection attacks, allowing unauthorized access to the database.',
    severity: 'critical',
    status: 'in-progress',
    affectedAssets: ['a1'],
    discoveredDate: '2025-02-15',
    discoveredBy: 'tm2',
    cveId: 'CVE-2023-1234',
    remediation: 'Implement prepared statements and input validation'
  },
  {
    id: 'v2',
    projectId: 'p1',
    title: 'Cross-Site Scripting (XSS) in Comment Section',
    description: 'The comment section allows execution of arbitrary JavaScript code.',
    severity: 'high',
    status: 'open',
    affectedAssets: ['a1'],
    discoveredDate: '2025-02-18',
    discoveredBy: 'tm3',
    remediation: 'Implement proper output encoding and content security policy'
  },
  {
    id: 'v3',
    projectId: 'p2',
    title: 'Outdated SSL Configuration',
    description: 'The server uses outdated SSL/TLS configuration that supports vulnerable protocols.',
    severity: 'medium',
    status: 'resolved',
    affectedAssets: ['a3'],
    discoveredDate: '2025-01-10',
    discoveredBy: 'tm1',
    remediation: 'Update SSL configuration to use only TLSv1.2+ and strong cipher suites'
  }
];

// Mock Assets
export const assets: Asset[] = [
  {
    id: 'db-prod',
    projectId: 'alpha',
    name: 'Production Database Server',
    type: 'server',
    ipAddress: '10.0.1.10',
    description: 'Primary production database server',
    osDetails: 'PostgreSQL 15 on Ubuntu 22.04',
    vulnerabilities: []
  },
  {
    id: 'db-dev',
    projectId: 'beta',
    name: 'Development Database Server',
    type: 'server',
    ipAddress: '10.0.2.10',
    description: 'Development environment database',
    osDetails: 'MySQL 8.0 on Ubuntu 22.04',
    vulnerabilities: []
  },
  {
    id: 'db-test',
    projectId: 'gamma',
    name: 'Testing Database Server',
    type: 'server',
    ipAddress: '10.0.3.10',
    description: 'Testing environment database',
    osDetails: 'MongoDB 6.0 on Ubuntu 22.04',
    vulnerabilities: []
  },
  {
    id: 'web-crm',
    projectId: 'alpha',
    name: 'CRM Web Application',
    type: 'application',
    url: 'https://crm.alpha-corp.com',
    description: 'Enterprise CRM web interface',
    vulnerabilities: []
  },
  {
    id: 'web-banking',
    projectId: 'beta',
    name: 'Banking Web Portal',
    type: 'application',
    url: 'https://banking.beta-financial.com',
    description: 'Web portal for banking services',
    vulnerabilities: []
  },
  {
    id: 'web-ecommerce',
    projectId: 'gamma',
    name: 'E-commerce Website',
    type: 'application',
    url: 'https://shop.gamma-retail.com',
    description: 'Main e-commerce website',
    vulnerabilities: []
  },
  {
    id: 'mobile-crm',
    projectId: 'alpha',
    name: 'CRM Mobile App',
    type: 'application',
    description: 'Mobile CRM application for iOS and Android',
    vulnerabilities: []
  },
  {
    id: 'mobile-banking',
    projectId: 'beta',
    name: 'Mobile Banking App',
    type: 'application',
    description: 'Mobile banking application',
    vulnerabilities: []
  },
  {
    id: 'mobile-ecommerce',
    projectId: 'gamma',
    name: 'E-commerce Mobile App',
    type: 'application',
    description: 'Mobile shopping application',
    vulnerabilities: []
  }
];

// Mock Team Members
export const teamMembers: TeamMember[] = [
  {
    id: 'SC001',
    name: 'Mouhssine',
    role: 'pentester',
    email: 'mouhssine@securityfirm.com',
    avatar: 'https://i.pravatar.cc/150?img=68'
  },
  {
    id: 'MR002',
    name: 'Amine',
    role: 'pentester',
    email: 'amine@securityfirm.com',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 'AT003',
    name: 'Mehdi',
    role: 'pentester',
    email: 'mehdi@securityfirm.com',
    avatar: 'https://i.pravatar.cc/150?img=32'
  }
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: 'alpha-1',
    projectId: 'alpha',
    title: 'SQL Injection Assessment',
    description: 'Test CRM database endpoints for SQL injection vulnerabilities',
    assignedTo: 'SC001',
    dueDate: '2025-03-15',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'alpha-2',
    projectId: 'alpha',
    title: 'SSL Certificate Review',
    description: 'Analyze SSL/TLS configuration and certificates',
    assignedTo: 'SC001',
    dueDate: '2025-03-20',
    status: 'todo',
    priority: 'medium'
  },
  {
    id: 'alpha-3',
    projectId: 'alpha',
    title: 'Password Policy Testing',
    description: 'Evaluate password requirements and restrictions',
    assignedTo: 'MR002',
    dueDate: '2025-03-25',
    status: 'todo',
    priority: 'low'
  },
  {
    id: 'beta-1',
    projectId: 'beta',
    title: 'Mobile API Security',
    description: 'Test mobile banking API endpoints',
    assignedTo: 'MR002',
    dueDate: '2025-03-10',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'beta-2',
    projectId: 'beta',
    title: 'SSL Implementation',
    description: 'Review SSL implementation in mobile app',
    assignedTo: 'AT003',
    dueDate: '2025-03-15',
    status: 'todo',
    priority: 'medium'
  },
  {
    id: 'beta-3',
    projectId: 'beta',
    title: 'Authentication Review',
    description: 'Test mobile app authentication mechanisms',
    assignedTo: 'MR002',
    dueDate: '2025-03-20',
    status: 'todo',
    priority: 'low'
  },
  {
    id: 'gamma-1',
    projectId: 'gamma',
    title: 'Payment Gateway Testing',
    description: 'Security assessment of payment processing',
    assignedTo: 'AT003',
    dueDate: '2025-03-30',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'gamma-2',
    projectId: 'gamma',
    title: 'SSL Configuration',
    description: 'Review SSL settings across e-commerce platform',
    assignedTo: 'SC001',
    dueDate: '2025-04-05',
    status: 'todo',
    priority: 'medium'
  },
  {
    id: 'gamma-3',
    projectId: 'gamma',
    title: 'Password Security',
    description: 'Evaluate customer account security',
    assignedTo: 'AT003',
    dueDate: '2025-04-10',
    status: 'todo',
    priority: 'low'
  }
]
export const activities: Activity[] = [
  {
    id: 'a1',
    projectId: 'p1',
    type: 'vulnerability',
    action: 'created',
    user: 'tm2',
    timestamp: '2025-02-15T09:30:00Z',
    details: 'Discovered SQL Injection vulnerability in login form'
  },
  {
    id: 'a2',
    projectId: 'p1',
    type: 'vulnerability',
    action: 'created',
    user: 'tm3',
    timestamp: '2025-02-18T14:15:00Z',
    details: 'Identified XSS vulnerability in comment section'
  },
  {
    id: 'a3',
    projectId: 'p1',
    type: 'task',
    action: 'updated',
    user: 'tm2',
    timestamp: '2025-02-19T11:45:00Z',
    details: 'Updated status of authentication testing task to in-progress'
  },
  {
    id: 'a4',
    projectId: 'p1',
    type: 'project',
    action: 'updated',
    user: 'tm1',
    timestamp: '2025-02-20T10:00:00Z',
    details: 'Updated project progress to 65%'
  },
  {
    id: 'a5',
    projectId: 'p2',
    type: 'project',
    action: 'updated',
    user: 'tm1',
    timestamp: '2025-01-25T16:30:00Z',
    details: 'Marked project as completed'
  }
];

// Mock Test Cases
export const testCases: TestCase[] = [
  {
    id: 'tc1',
    category: 'Authentication',
    name: 'Brute Force Protection',
    description: 'Test application\'s protection against brute force attacks',
    steps: [
      'Attempt to login with invalid credentials multiple times',
      'Observe if account lockout or CAPTCHA is triggered',
      'Document behavior after multiple failed attempts'
    ],
    expectedResult: 'Application should lock account or implement delays after multiple failed attempts'
  },
  {
    id: 'tc2',
    category: 'Input Validation',
    name: 'SQL Injection Testing',
    description: 'Test application for SQL injection vulnerabilities',
    steps: [
      'Identify input fields that might interact with the database',
      'Test with common SQL injection payloads',
      'Observe application behavior and responses',
      'Attempt to extract database information if vulnerability is found'
    ],
    expectedResult: 'Application should sanitize inputs and prevent SQL injection attacks'
  },
  {
    id: 'tc3',
    category: 'Session Management',
    name: 'Session Timeout Verification',
    description: 'Verify that sessions expire after period of inactivity',
    steps: [
      'Authenticate to the application',
      'Remain inactive for the expected timeout period',
      'Attempt to perform an action requiring authentication',
      'Document if re-authentication is required'
    ],
    expectedResult: 'Session should expire after defined timeout period'
  }
];