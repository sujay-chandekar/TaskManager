import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/', icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6m0 0H7m6 0h6" /></svg>
  ) },
  { label: 'Login', path: '/login', icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0l4-4m-4 4l4 4" /></svg>
  ) },
  { label: 'Sign Up', path: '/signup', icon: (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  ) },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-[#f7f6f3] to-[#e3e9f7] border-r border-gray-200 flex flex-col py-8 px-4 shadow-xl">
      <div className="flex items-center gap-3 mb-10 justify-center select-none">
        <span className="bg-black rounded-lg w-10 h-10 flex items-center justify-center text-2xl font-bold text-white shadow">N</span>
        <h2 className="text-2xl font-extrabold tracking-wide text-gray-900">TaskManager</h2>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(item => (
          (isLoggedIn && (item.label === 'Login' || item.label === 'Sign Up')) ? null :
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-150 hover:bg-blue-50 focus:outline-none text-gray-700 text-base ${location.pathname === item.path ? 'bg-blue-100 font-bold' : ''}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col items-center pt-8">
        <div className="text-xs text-gray-400 text-center pt-6 select-none">&copy; 2025 TaskManager</div>
      </div>
    </aside>
  );
}
