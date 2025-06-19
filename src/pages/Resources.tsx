import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Mail, Phone, Briefcase, Edit2, Trash2, Plus, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import ResourceForm from '../components/resources/ResourceForm';
import { useSupabaseQuery } from '../hooks/useSupabaseQuery';
import { getResources, createResource, updateResource, deleteResource } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const Resources: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  
  const { data: resources, error, loading, refetch } = useSupabaseQuery(getResources);
  
  React.useEffect(() => {
    if (resources) {
      console.log('Resources updated:', resources);
    }
  }, [resources]);
  
  React.useEffect(() => {
    console.log('Resources data:', resources);
  }, [resources]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error loading resources" />;
  
  const handleAddResource = async (data: any) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      await createResource(data);
      setIsFormOpen(false);
      await refetch();
    } catch (error: any) {
      setOperationError(error.message || 'Failed to create resource');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleUpdateResource = async (data: any) => {
    if (!selectedResource) return;
    setOperationLoading(true);
    setOperationError(null);
    try {
      await updateResource(selectedResource.id, data);
      setSelectedResource(null);
      await refetch();
    } catch (error: any) {
      setOperationError(error.message || 'Failed to update resource');
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setOperationLoading(true);
      setOperationError(null);
      try {
        await deleteResource(id);
        await refetch();
      } catch (error: any) {
        setOperationError(error.message || 'Failed to delete resource');
      } finally {
        setOperationLoading(false);
      }
    }
  };


  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Resources</h1>
        <p className="text-gray-400">Manage user information and details</p>
        
        <Button
          className="mt-4"
          onClick={() => {
            setIsFormOpen(true);
            setSelectedResource(null);
          }}
          disabled={operationLoading}
          icon={<Plus size={18} />}
        >
          Add Resource
        </Button>
        
        {operationError && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-md flex items-center text-red-400">
            <AlertCircle size={18} className="mr-2" />
            {operationError}
          </div>
        )}
      </div>

      {(isFormOpen || selectedResource) && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-lg font-semibold text-white">
              {selectedResource ? 'Edit Resource' : 'Add New Resource'}
            </h2>
          </CardHeader>
          <CardContent>
            <ResourceForm
              initialData={selectedResource}
              onSubmit={selectedResource ? handleUpdateResource : handleAddResource}
              isLoading={operationLoading}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedResource(null);
                setOperationError(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">All Resources</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/50">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Job Title</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Phone</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {Array.isArray(resources) && resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-800/50 transition-colors duration-150">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 overflow-hidden">
                          {resource.avatar ? (
                            <img 
                              src={resource.avatar}
                              alt={resource.full_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-sm">
                                {resource.full_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-white">{resource.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Briefcase size={16} className="text-gray-400 mr-2" />
                        <span className="text-gray-300">{resource.job_title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-2" />
                        <a href={`mailto:${resource.email}`} className="text-gray-300 hover:text-indigo-400">
                          {resource.email}
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-400 mr-2" />
                        <a href={`tel:${resource.phone}`} className="text-gray-300 hover:text-indigo-400">
                          {resource.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={operationLoading}
                          onClick={() => setSelectedResource(resource)}
                          icon={<Edit2 size={16} />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          disabled={operationLoading}
                          onClick={() => handleDeleteResource(resource.id)}
                          icon={<Trash2 size={16} />}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {Array.isArray(resources) && resources.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No resources found. Click "Add Resource" to create one.
              </div>
            )}
            {!Array.isArray(resources) && (
              <div className="text-center py-8 text-red-400">
                <AlertCircle className="w-6 h-6 mx-auto mb-2" />
                Error loading resources
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Resources;