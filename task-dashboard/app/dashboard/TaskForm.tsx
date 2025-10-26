'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '@/lib/apiClient';

interface TaskFormData {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function TaskForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    setSuccess(false);
    setMessage('');
    try {
      await api.post('/tasks', data);
      setSuccess(true);
      setMessage('✅ Task created successfully!');
      reset();
      setTimeout(() => setSuccess(false), 2000);
      window.location.reload();
    } catch (error) {
      setMessage('❌ Error creating task. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-black mb-1">✏️ Title *</label>
        <input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border border-pink-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="What do you need to do?"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-black mb-1">🗒️ Description</label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-pink-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Add more details..."
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-lg font-medium text-black mb-1">🚦 Status</label>
        <select
          id="status"
          {...register('status')}
          className="w-full px-3 py-2 border border-pink-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="pending">Pending 🟠</option>
          <option value="in-progress">In Progress 🔵</option>
          <option value="completed">Completed ✅</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold text-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      >
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
      {message && (
        <p className={`text-sm text-center ${success ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
      )}
    </form>
  );
}
