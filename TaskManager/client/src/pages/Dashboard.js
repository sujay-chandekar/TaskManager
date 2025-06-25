import React, { useEffect, useState } from 'react';
import API from '../api/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [tasks, setTasks] = useState({ 'To Do': [], 'In Progress': [], 'Done': [] });
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', { title });
      setTitle('');
      fetchTasks();
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const moveTo = (id, currentStatus, targetStatus) => {
    if (currentStatus !== targetStatus) {
      handleStatusChange(id, targetStatus);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-violet-100">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <div className="max-w-6xl mx-auto w-full py-10 px-4">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight drop-shadow">My Tasks</h1>
          {error && <div className="text-red-500 mb-4 text-center font-medium bg-white/80 rounded-lg shadow p-2">{error}</div>}
          <form onSubmit={handleAddTask} className="mb-10 flex gap-3 items-center">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a new task..." className="p-4 border border-indigo-200 rounded-xl w-96 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 shadow-md text-lg transition" required />
            <button type="submit" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-7 py-3 rounded-xl font-bold shadow-xl transition-all duration-200">Add Task</button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['To Do', 'In Progress', 'Done'].map(status => (
              <section key={status} className="bg-white/70 rounded-3xl shadow-2xl p-7 min-h-[320px] flex flex-col border border-indigo-100 backdrop-blur-md">
                <h2 className={`font-bold mb-6 text-2xl flex items-center gap-2 drop-shadow ${status === 'To Do' ? 'text-indigo-700' : status === 'In Progress' ? 'text-yellow-600' : 'text-green-700'}`}>{status}</h2>
                {tasks[status]?.length === 0 && <div className="text-gray-300 italic text-center mt-8">No tasks</div>}
                <div className="flex flex-col gap-5">
                  {tasks[status]?.map(task => (
                    <div key={task.id} className="bg-gradient-to-br from-white/90 via-indigo-50/80 to-violet-50/80 p-5 rounded-2xl shadow-lg flex flex-col gap-3 border border-indigo-100 hover:shadow-2xl transition-all duration-200">
                      <span className="text-gray-900 font-semibold text-lg tracking-wide">{task.title}</span>
                      <div className="flex gap-2">
                        {status === 'To Do' && (
                          <button onClick={() => moveTo(task.id, status, 'In Progress')} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow transition-all duration-150">Move to Progress</button>
                        )}
                        {status === 'In Progress' && (
                          <button onClick={() => moveTo(task.id, status, 'Done')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow transition-all duration-150">Mark as Done</button>
                        )}
                        {status !== 'To Do' && (
                          <button onClick={() => moveTo(task.id, status, 'To Do')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-xs font-bold shadow transition-all duration-150">Back to To Do</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
