'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-slate-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h2>
                {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-100 mb-4 text-center text-sm font-medium">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white text-slate-900 outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white text-slate-900 outline-none transition-colors"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-700 text-white py-2.5 rounded-lg hover:bg-blue-800 font-semibold mt-2 transition-colors">
                        Enter Admin
                    </button>
                </form>
            </div>
        </div>
    );
}
