'use client';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#ee9ca7] via-[#ffdde1] to-[#fffde4] flex flex-col items-center py-10 px-2">
      <h1 className="text-5xl font-extrabold text-black mb-2 flex items-center gap-2">
        📝 Task Dashboard
      </h1>
      <p className="text-lg text-black font-semibold mb-10">
        Get Creative, Stay Productive 💡✨
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-4xl">
        <section className="bg-white rounded-xl shadow-lg p-8 flex-1">
          <h2 className="text-2xl font-bold mb-6 flex gap-2 text-black">🆕 Create Task</h2>
          <TaskForm />
        </section>
        <section className="bg-white rounded-xl shadow-lg p-8 flex-1">
          <h2 className="text-2xl font-bold mb-6 flex gap-2 text-black">📋 Your Tasks</h2>
          <TaskList />
        </section>
      </div>
    </main>
  );
}
