// Common Types for the application

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  description: string;
  scope: string;
  progress: number;
  teamMembers: TeamMember[];
}

export interface Vulnerability {
  id: string;
  projectId: string;
  title: string;
  description: string;
  severity: Severity;
  status: 'open' | 'in-progress' | 'resolved' | 'accepted';
  affectedAssets: string[];
  discoveredDate: string;
  discoveredBy: string;
  cveId?: string;
  remediation?: string;
}

export interface Asset {
  id: string;
  projectId: string;
  name: string;
  type: 'server' | 'application' | 'network' | 'cloud' | 'other';
  ipAddress?: string;
  url?: string;
  description: string;
  osDetails?: string;
  vulnerabilities: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'pentester' | 'manager' | 'client' | 'developer';
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Report {
  id: string;
  projectId: string;
  title: string;
  createdDate: string;
  author: string;
  status: 'draft' | 'review' | 'final';
  sections: ReportSection[];
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Activity {
  id: string;
  projectId: string;
  type: 'project' | 'vulnerability' | 'task' | 'report';
  action: 'created' | 'updated' | 'deleted' | 'commented';
  user: string;
  timestamp: string;
  details: string;
}

export interface TestCase {
  id: string;
  category: string;
  name: string;
  description: string;
  steps: string[];
  expectedResult: string;
}