import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { tasks, teamMembers } from '../data/mockData';
import StatusBadge from '../components/ui/StatusBadge';
import { Calendar, User } from 'lucide-react';

const Tasks: React.FC = () => {
  const getAssignedUser = (userId: string) => {
    return teamMembers.find(member => member.id === userId);
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Tasks</h1>
        <p className="text-gray-400">Track and manage penetration testing tasks</p>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => {
          const assignedUser = getAssignedUser(task.assignedTo);
          
          return (
            <Card key={task.id} className="hover:border-indigo-500/50 transition-colors duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="text-sm text-gray-400">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={task.status} />
                    <span className={`text-xs font-medium
                      ${task.priority === 'high' ? 'text-red-400' : 
                        task.priority === 'medium' ? 'text-yellow-400' : 
                        'text-blue-400'}`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  
                  {assignedUser && (
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-700 mr-2 overflow-hidden">
                        {assignedUser.avatar ? (
                          <img 
                            src={assignedUser.avatar} 
                            alt={assignedUser.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 m-1 text-gray-400" />
                        )}
                      </div>
                      <span className="text-gray-300">{assignedUser.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Tasks;