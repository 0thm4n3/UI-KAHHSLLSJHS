import React from 'react';
import { projects } from '../../data/mockData';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { ArrowRight } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import StatusBadge from '../ui/StatusBadge';

const ProjectsSummary: React.FC = () => {
  // Filter active projects - not completed ones
  const activeProjects = projects.filter(project => project.status !== 'completed');
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Active Projects</h2>
        <a 
          href="/projects"
          className="text-sm text-indigo-400 hover:text-indigo-300 inline-flex items-center"
        >
          View all
          <ArrowRight size={16} className="ml-1" />
        </a>
      </CardHeader>
      <CardContent className="divide-y divide-gray-700">
        {activeProjects.length > 0 ? (
          activeProjects.map((project) => (
            <div key={project.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-white text-sm">{project.name}</h3>
                  <p className="text-gray-400 text-xs">{project.client}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="mt-2">
                <ProgressBar value={project.progress} size="sm" />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>Start: {project.startDate}</span>
                <span>End: {project.endDate}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            No active projects found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsSummary;