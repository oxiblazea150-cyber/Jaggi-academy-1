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
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-slate-200">
                <h2 className="text-2xl font-bold text-center mb-6 text-[var(--color-text-main)]">Admin Login</h2>
                {error && <div className="bg-red-50 text-[var(--color-accent-red)] p-3 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] text-slate-900 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] text-slate-900 outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-2 rounded-md hover:bg-[var(--color-primary-dark)] font-medium">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
