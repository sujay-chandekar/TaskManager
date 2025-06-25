import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/signup', { name, email, password });
      setSuccess('Signup successful! Redirecting to login...');
      setError('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f7f6f3] to-[#e3e9f7] items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 tracking-wide">Sign Up</h2>
          {error && <div className="text-red-500 mb-4 text-center font-medium">{error}</div>}
          {success && <div className="text-green-600 mb-4 text-center font-medium">{success}</div>}
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#f7f6f3] shadow-sm text-lg" required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#f7f6f3] shadow-sm text-lg" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#f7f6f3] shadow-sm text-lg" required />
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white p-3 rounded-xl font-semibold shadow-lg transition">Sign Up</button>
          </div>
          <div className="mt-6 text-center text-sm text-blue-600">
            Already have an account?{' '}
            <span className="underline cursor-pointer font-semibold" onClick={() => navigate('/login')}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}
