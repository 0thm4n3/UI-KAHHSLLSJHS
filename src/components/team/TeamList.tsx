import React from 'react';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { getTeamMembers } from '../../services/api';
import { Card, CardContent } from '../ui/Card';
import { Mail, User } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const TeamList: React.FC = () => {
  const { data: teamMembers, error, loading, refetch } = useSupabaseQuery(getTeamMembers);

  React.useEffect(() => {
    console.log('TeamList rendered with members:', teamMembers);
  }, [teamMembers]);

  if (loading) return <LoadingSpinner />;
  if (error) {
    console.error('Error in TeamList:', error);
    return <ErrorMessage message={`Error loading team members: ${error.message}`} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
        teamMembers.map((member) => (
          <Card key={member.id} className="hover:border-indigo-500/50 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                  {member.avatar ? (
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{member.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">{member.role}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-400">
                    <Mail size={16} className="mr-2 flex-shrink-0" />
                    <a 
                      href={`mailto:${member.email}`} 
                      className="hover:text-indigo-400 transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-400">
          No team members found
        </div>
      )}
    </div>
  );
};

export default TeamList;