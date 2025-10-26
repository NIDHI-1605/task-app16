'use client';
import React, { useState, useEffect } from 'react';
import TaskEditModal from './TaskEditModal';
import api from '@/lib/apiClient';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const res = await api.get<Task[]>('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this task?')) {
      await api.delete('/tasks/' + id);
      fetchTasks();
    }
  };

  const handleEdit = (task: Task) => setEditingTask(task);

  const handleEditDone = () => {
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className="space-y-6">
      {tasks.length === 0 && (
        <div className="text-lg text-black font-bold flex gap-2 items-center p-6">
          😺 No tasks yet!
        </div>
      )}
      {tasks.map((task) => (
        <div key={task.id} className="bg-gradient-to-r from-pink-200 to-yellow-100 rounded-xl shadow p-5 mb-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold text-black flex gap-2">📝 {task.title}</span>
              <div className="text-base text-black">{task.description}</div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <select
                className="font-bold rounded px-2 py-1 text-black border border-gray-300"
                value={task.status}
                disabled
              >
                <option value="pending">Pending 🟠</option>
                <option value="in-progress">In Progress 🔵</option>
                <option value="completed">Completed ✅</option>
              </select>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded"
                onClick={() => handleEdit(task)}
              >
                ✏️ Edit
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 mt-1 rounded"
                onClick={() => handleDelete(task.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
          {editingTask && editingTask.id === task.id && (
            <TaskEditModal
              task={editingTask}
              onClose={() => setEditingTask(null)}
              onUpdated={handleEditDone}
            />
          )}
        </div>
      ))}
    </div>
  );
}
