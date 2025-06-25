import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user info
      setError('');
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f7f6f3] to-[#e3e9f7] items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 tracking-wide">Login</h2>
          {error && <div className="text-red-500 mb-4 text-center font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#f7f6f3] shadow-sm text-lg" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#f7f6f3] shadow-sm text-lg" required />
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white p-3 rounded-xl font-semibold shadow-lg transition">Login</button>
          </form>
          <div className="mt-6 text-center text-sm text-blue-600">
            Don&apos;t have an account?{' '}
            <span className="underline cursor-pointer font-semibold" onClick={() => navigate('/signup')}>Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
}
