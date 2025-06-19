import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { User } from 'lucide-react';

interface TeamMemberFormProps {
  initialData?: {
    id?: string;
    name: string;
    role: string;
    email: string;
    avatar?: string;
  };
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {
      name: '',
      role: 'pentester',
      email: ''
    }
  });

  const handleFormSubmit = async (data: any) => {
    console.log('Form data:', data);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Name
        </label>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Role
        </label>
        <select
          {...register('role', { required: 'Role is required' })}
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="pentester">Pentester</option>
          <option value="manager">Manager</option>
          <option value="client">Client</option>
          <option value="developer">Developer</option>
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-400">{errors.role.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          type="email"
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button
          variant="ghost"
          disabled={isLoading || isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          icon={<User size={18} />}
        >
          {initialData ? 'Update Member' : 'Add Member'}
        </Button>
      </div>
    </form>
  );
}

export default TeamMemberForm;