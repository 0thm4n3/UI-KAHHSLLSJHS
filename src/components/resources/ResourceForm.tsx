import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { User } from 'lucide-react';

interface ResourceFormProps {
  initialData?: {
    id?: string;
    full_name: string;
    email: string;
    phone: string;
    job_title: string;
    avatar?: string;
  };
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {
      full_name: '',
      email: '',
      phone: '',
      job_title: '',
      avatar: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Full Name
        </label>
        <input
          {...register('full_name', { required: 'Full name is required' })}
          type="text"
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-400">{errors.full_name.message}</p>
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

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Phone Number
        </label>
        <input
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: 'Invalid phone number'
            }
          })}
          type="tel"
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Job Title
        </label>
        <input
          {...register('job_title', { required: 'Job title is required' })}
          type="text"
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.job_title && (
          <p className="mt-1 text-sm text-red-400">{errors.job_title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Avatar URL
        </label>
        <input
          {...register('avatar')}
          type="url"
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.avatar && (
          <p className="mt-1 text-sm text-red-400">{errors.avatar.message}</p>
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
          {initialData ? 'Update Resource' : 'Add Resource'}
        </Button>
      </div>
    </form>
  );
};

export default ResourceForm;