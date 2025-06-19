import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { assets } from '../data/mockData';
import { Server, Globe, Network } from 'lucide-react';

const Assets: React.FC = () => {
  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="w-6 h-6 text-blue-500" />;
      case 'application':
        return <Globe className="w-6 h-6 text-green-500" />;
      case 'network':
        return <Network className="w-6 h-6 text-purple-500" />;
      default:
        return <Server className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Assets</h1>
        <p className="text-gray-400">Monitor and manage security assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="hover:border-indigo-500/50 transition-colors duration-200">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-900 rounded-lg">
                  {getAssetIcon(asset.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{asset.type}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">{asset.description}</p>
              
              <div className="space-y-2 text-sm">
                {asset.ipAddress && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">IP Address:</span>
                    <span className="text-gray-300 font-mono">{asset.ipAddress}</span>
                  </div>
                )}
                {asset.url && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">URL:</span>
                    <a href={asset.url} className="text-indigo-400 hover:text-indigo-300">{asset.url}</a>
                  </div>
                )}
                {asset.osDetails && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">OS Details:</span>
                    <span className="text-gray-300">{asset.osDetails}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Vulnerabilities:</span>
                  <span className="text-gray-300">{asset.vulnerabilities.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Assets;