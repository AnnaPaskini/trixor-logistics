import React, { useState } from 'react';
import AdminLogin from './AdminLogin';

const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-white p-6">
        <h1 className="text-xl font-black mb-8">TRIXOR CMS</h1>

        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 font-medium">
            📝 Texts
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-neutral-800 font-medium">
            🚛 Equipment
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-neutral-800 font-medium">
            👥 Vacancies
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-neutral-800 font-medium">
            ⚙️ Settings
          </button>
        </nav>

        <button
          onClick={() => setToken(null)}
          className="mt-12 text-sm text-neutral-500 hover:text-white"
        >
          Log out
        </button>
      </aside>

      {/* Main area */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-black text-neutral-900 mb-4">Welcome to Trixor CMS</h2>
        <p className="text-neutral-500">Select a section from the sidebar to start editing.</p>
      </main>
    </div>
  );
};

export default AdminPage;
