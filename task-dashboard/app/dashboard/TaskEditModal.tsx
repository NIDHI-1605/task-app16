'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import api from '@/lib/apiClient';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

type Props = {
  task: Task;
  onClose: () => void;
  onUpdated: () => void;
};

const TaskEditModal: React.FC<Props> = ({ task, onClose, onUpdated }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    }
  });

  const onSubmit = async (data: Task) => {
    try {
      await api.put('/tasks/' + task.id, data);
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert('❌ Failed to update!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg space-y-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-black mb-4 flex gap-2">✏️ Edit Task</h3>
        <div>
          <label className="block text-sm font-medium text-black mb-1">Title</label>
          <input {...register('title', { required: 'Title is required' })} className="w-full px-3 py-2 border text-black rounded-md" />
          {errors.title && typeof errors.title === 'object' && 'message' in errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">Description</label>
          <textarea {...register('description')} rows={3} className="w-full px-3 py-2 border text-black rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">Status</label>
          <select {...register('status')} className="w-full px-3 py-2 border text-black rounded-md">
            <option value="pending">Pending 🟠</option>
            <option value="in-progress">In Progress 🔵</option>
            <option value="completed">Completed ✅</option>
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">Update</button>
          <button type="button" className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg font-semibold" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskEditModal;
