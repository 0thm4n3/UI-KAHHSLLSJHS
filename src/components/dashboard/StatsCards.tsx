import React from 'react';
import { Shield, Server, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { projects, vulnerabilities, assets } from '../../data/mockData';

const StatsCards: React.FC = () => {
  // Calculate statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status !== 'completed').length;
  const totalVulnerabilities = vulnerabilities.length;
  const openVulnerabilities = vulnerabilities.filter(v => v.status === 'open' || v.status === 'in-progress').length;
  const criticalVulnerabilities = vulnerabilities.filter(v => v.severity === 'critical').length;
  const totalAssets = assets.length;
  
  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      change: '+2 this month',
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      positive: true
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      change: `${Math.round((activeProjects/totalProjects)*100)}% of total`,
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      positive: true
    },
    {
      title: 'Open Vulnerabilities',
      value: openVulnerabilities,
      change: `${criticalVulnerabilities} critical`,
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      positive: false
    },
    {
      title: 'Assets Monitored',
      value: totalAssets,
      change: '+1 this week',
      icon: <Server className="h-6 w-6 text-blue-500" />,
      positive: true
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-gray-800 hover:bg-gray-750 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
                <p className={`mt-1 text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-2 bg-gray-900 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;