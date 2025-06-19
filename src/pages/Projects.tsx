import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { projects } from '../data/mockData';
import StatusBadge from '../components/ui/StatusBadge';
import ProgressBar from '../components/ui/ProgressBar';
import { Users } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
        <p className="text-gray-400">Manage and track all penetration testing projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:border-indigo-500/50 transition-colors duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400">{project.client}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">{project.description}</p>
              
              <div className="space-y-4">
                <ProgressBar value={project.progress} />
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Start: {project.startDate}</span>
                  <span className="text-gray-400">End: {project.endDate}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <Users size={16} className="mr-2" />
                  <span>{project.teamMembers.length} team members</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Projects;