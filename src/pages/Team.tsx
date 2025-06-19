import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Plus, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import TeamMemberForm from '../components/team/TeamMemberForm';
import TeamList from '../components/team/TeamList';
import { createTeamMember, updateTeamMember, deleteTeamMember } from '../services/api';

const Team: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);
  
  const handleAddMember = async (data: any) => {
    setOperationLoading(true);
    setOperationError(null);
    try {
      await createTeamMember(data);
      setIsFormOpen(false);
    } catch (error: any) {
      console.error('Error adding team member:', error);
      setOperationError(error.message || 'Failed to create team member');
    } finally {
      setOperationLoading(false);
    }
  };
  
  const handleUpdateMember = async (data: any) => {
    setOperationLoading(true);
    setOperationError(null);
    console.log('Updating team member:', selectedMember.id, data);
    try {
      await updateTeamMember(selectedMember.id, data);
      setSelectedMember(null);
    } catch (error: any) {
      console.error('Error updating team member:', error);
      setOperationError(error.message || 'Failed to update team member');
    } finally {
      setOperationLoading(false);
    }
  };
  
  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setOperationLoading(true);
      setOperationError(null);
      try {
        await deleteTeamMember(id);
      } catch (error) {
        setOperationError('Failed to delete team member');
      } finally {
        setOperationLoading(false);
      }
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Team</h1>
        <p className="text-gray-400">Manage penetration testing team members</p>
        
        <Button
          className="mt-4"
          onClick={() => setIsFormOpen(true)}
          disabled={operationLoading}
          icon={<Plus size={18} />}
        >
          Add Team Member
        </Button>
        
        {operationError && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-md flex items-center text-red-400">
            <AlertCircle size={18} className="mr-2" />
            {operationError}
          </div>
        )}
      </div>

      {(isFormOpen || selectedMember) && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-lg font-semibold text-white">
              {selectedMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
          </CardHeader>
          <CardContent>
            <TeamMemberForm
              initialData={selectedMember}
              onSubmit={selectedMember ? handleUpdateMember : handleAddMember}
              isLoading={operationLoading}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedMember(null);
                setOperationError(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <TeamList />
    </MainLayout>
  );
};

export default Team;