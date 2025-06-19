import React from 'react';
import { activities } from '../../data/mockData';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Activity, AlertCircle, CheckCircle2, MessageCircle, FileEdit } from 'lucide-react';

const RecentActivities: React.FC = () => {
  // Sort activities by timestamp (newest first)
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  // Function to get icon based on activity type and action
  const getActivityIcon = (type: string, action: string) => {
    if (type === 'vulnerability' && action === 'created') {
      return <AlertCircle size={16} className="text-red-500" />;
    } else if (type === 'task' && (action === 'updated' || action === 'completed')) {
      return <CheckCircle2 size={16} className="text-green-500" />;
    } else if (type === 'project' && action === 'commented') {
      return <MessageCircle size={16} className="text-blue-500" />;
    } else if (type === 'report' || (type === 'project' && action === 'updated')) {
      return <FileEdit size={16} className="text-yellow-500" />;
    } else {
      return <Activity size={16} className="text-indigo-500" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Activity Timeline */}
          <div className="border-l-2 border-gray-700 ml-1.5 pt-2 pb-1">
            {sortedActivities.map((item) => (
              <div key={item.id} className="relative pl-6 pb-5 last:pb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 transform -translate-x-1/2 mt-1 bg-gray-800 p-0.5 rounded-full">
                  {getActivityIcon(item.type, item.action)}
                </div>
                
                {/* Activity content */}
                <div>
                  <p className="text-sm text-gray-300">{item.details}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(item.timestamp)}
                    </span>
                    <span className="text-xs text-gray-500 mx-2">•</span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.user}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;