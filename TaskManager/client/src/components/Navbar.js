import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    // Try to get user info from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setUserName(JSON.parse(user).name);
      } catch {
        setUserName('User');
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-300 px-8 py-4 shadow text-gray-900 rounded-b-2xl border-b border-blue-200">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}> 
        <span className="bg-black rounded-lg w-10 h-10 flex items-center justify-center text-2xl font-bold text-white shadow">N</span>
        <span className="font-extrabold text-2xl tracking-wide">Task Manager</span>
      </div>
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full shadow">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-lg font-bold text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
              </svg>
            </span>
            <span className="font-semibold text-base hidden sm:inline text-gray-800">{userName || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-4 py-2 rounded-full font-semibold shadow transition">Logout</button>
        </div>
      )}
    </nav>
  );
}
