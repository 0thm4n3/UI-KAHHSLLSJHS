import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { projects, vulnerabilities } from '../data/mockData';
import { FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Reports: React.FC = () => {
  // Generate summary reports for each project
  const projectReports = projects.map(project => {
    const projectVulnerabilities = vulnerabilities.filter(v => v.projectId === project.id);
    const criticalCount = projectVulnerabilities.filter(v => v.severity === 'critical').length;
    const highCount = projectVulnerabilities.filter(v => v.severity === 'high').length;
    const resolvedCount = projectVulnerabilities.filter(v => v.status === 'resolved').length;
    
    return {
      ...project,
      vulnerabilitiesCount: projectVulnerabilities.length,
      criticalCount,
      highCount,
      resolvedCount
    };
  });

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Reports</h1>
        <p className="text-gray-400">View and generate security assessment reports</p>
      </div>

      <div className="grid gap-6">
        {projectReports.map((report) => (
          <Card key={report.id} className="hover:border-indigo-500/50 transition-colors duration-200">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                  <p className="text-sm text-gray-400">{report.client}</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors">
                  Generate Report
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-400">Critical/High</p>
                    <p className="text-lg font-semibold text-white">
                      {report.criticalCount + report.highCount}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Resolved</p>
                    <p className="text-lg font-semibold text-white">
                      {report.resolvedCount}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">Total Findings</p>
                    <p className="text-lg font-semibold text-white">
                      {report.vulnerabilitiesCount}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Reports;