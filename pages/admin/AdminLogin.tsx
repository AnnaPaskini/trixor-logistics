import React, { useState } from 'react';

interface Props {
  onLogin: (token: string) => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data.token);
      } else {
        setError('Wrong password');
      }
    } catch {
      setError('Server not available');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-black text-neutral-900 mb-2">TRIXOR CMS</h1>
        <p className="text-neutral-500 text-sm mb-8">Enter password to continue</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg mb-4 focus:outline-none focus:border-red-600"
        />
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg py-3">
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
