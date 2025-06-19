import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import StatsCards from '../components/dashboard/StatsCards';
import ProjectsSummary from '../components/dashboard/ProjectsSummary';
import VulnerabilitiesSummary from '../components/dashboard/VulnerabilitiesSummary';
import TasksSummary from '../components/dashboard/TasksSummary';
import RecentActivities from '../components/dashboard/RecentActivities';
import SeverityDonutChart from '../components/dashboard/SeverityDonutChart';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Security Dashboard</h1>
        <p className="text-gray-400">Overview of your penetration testing projects and key metrics</p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectsSummary />
          <TasksSummary />
        </div>
        <div className="space-y-6">
          <SeverityDonutChart />
          <VulnerabilitiesSummary />
        </div>
      </div>
      
      <div className="mt-6">
        <RecentActivities />
      </div>
    </MainLayout>
  );
};

export default Dashboard;