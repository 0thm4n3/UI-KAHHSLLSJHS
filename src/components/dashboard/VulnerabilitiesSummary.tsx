import React from 'react';
import { vulnerabilities } from '../../data/mockData';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

const VulnerabilitiesSummary: React.FC = () => {
  // Filter and sort vulnerabilities to show only open and in-progress, sorted by severity
  const activeVulnerabilities = vulnerabilities
    .filter(vuln => ['open', 'in-progress'].includes(vuln.status))
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      return severityOrder[a.severity as keyof typeof severityOrder] - 
             severityOrder[b.severity as keyof typeof severityOrder];
    });
  
  // Get count by severity
  const criticalCount = activeVulnerabilities.filter(v => v.severity === 'critical').length;
  const highCount = activeVulnerabilities.filter(v => v.severity === 'high').length;
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-white">Active Vulnerabilities</h2>
          {(criticalCount > 0 || highCount > 0) && (
            <div className="ml-3 flex items-center">
              <AlertTriangle size={16} className="text-red-500 mr-1" />
              <span className="text-xs text-red-400">
                {criticalCount > 0 && `${criticalCount} critical`}
                {criticalCount > 0 && highCount > 0 && ', '}
                {highCount > 0 && `${highCount} high`}
              </span>
            </div>
          )}
        </div>
        <a 
          href="/vulnerabilities"
          className="text-sm text-indigo-400 hover:text-indigo-300 inline-flex items-center"
        >
          View all
          <ArrowRight size={16} className="ml-1" />
        </a>
      </CardHeader>
      <CardContent className="divide-y divide-gray-700">
        {activeVulnerabilities.length > 0 ? (
          activeVulnerabilities.map((vuln) => (
            <div key={vuln.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-2">
                  <h3 className="font-medium text-white text-sm truncate">{vuln.title}</h3>
                  <p className="text-gray-400 text-xs truncate">{vuln.description.substring(0, 60)}...</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <StatusBadge status={vuln.severity} variant="severity" />
                  <StatusBadge status={vuln.status} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            No active vulnerabilities found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VulnerabilitiesSummary;