import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { vulnerabilities } from '../data/mockData';
import StatusBadge from '../components/ui/StatusBadge';
import { Calendar, User } from 'lucide-react';

const Vulnerabilities: React.FC = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Vulnerabilities</h1>
        <p className="text-gray-400">Track and manage discovered security vulnerabilities</p>
      </div>

      <div className="grid gap-6">
        {vulnerabilities.map((vuln) => (
          <Card key={vuln.id} className="hover:border-indigo-500/50 transition-colors duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{vuln.title}</h3>
                  {vuln.cveId && (
                    <span className="text-sm text-indigo-400">{vuln.cveId}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <StatusBadge status={vuln.severity} variant="severity" />
                  <StatusBadge status={vuln.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">{vuln.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>Discovered: {vuln.discoveredDate}</span>
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  <span>By: {vuln.discoveredBy}</span>
                </div>
              </div>
              
              {vuln.remediation && (
                <div className="mt-4 p-3 bg-gray-900 rounded-md">
                  <h4 className="text-sm font-medium text-white mb-2">Remediation</h4>
                  <p className="text-sm text-gray-400">{vuln.remediation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Vulnerabilities;