import React from 'react';
import { tasks } from '../../data/mockData';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { ArrowRight, Clock } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

const TasksSummary: React.FC = () => {
  // Filter for active tasks (not completed) and sort by priority
  const activeTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - 
             priorityOrder[b.priority as keyof typeof priorityOrder];
    });
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Upcoming Tasks</h2>
        <a 
          href="/tasks"
          className="text-sm text-indigo-400 hover:text-indigo-300 inline-flex items-center"
        >
          View all
          <ArrowRight size={16} className="ml-1" />
        </a>
      </CardHeader>
      <CardContent className="divide-y divide-gray-700">
        {activeTasks.length > 0 ? (
          activeTasks.map((task) => (
            <div key={task.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-2">
                  <h3 className="font-medium text-white text-sm">{task.title}</h3>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <StatusBadge status={task.status} />
                  <span 
                    className={`text-xs font-medium
                      ${task.priority === 'high' ? 'text-red-400' : 
                        task.priority === 'medium' ? 'text-yellow-400' : 'text-blue-400'}`
                    }
                  >
                    {task.priority} priority
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            No active tasks found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksSummary;