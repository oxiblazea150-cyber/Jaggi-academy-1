'use client';

import { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────
type WallEntry = { id: string; studentName: string; examName: string; rank: string; imageUrl?: string };
type TimeEntry = { id: string; category: string; subject: string; day: string; timeStr: string };
type MediaEntry = { key: string; imageUrl: string; label: string };

// ─── Constants ───────────────────────────────────────────────────────
const CATEGORIES = ['Class 11', 'Class 12', 'JEE', 'NEET'];
const SUBJECTS = ['Physics', 'Mathematics', 'Biology', 'Chemistry', 'English', 'Other'];
const DAYS = [
    { label: 'Mon', value: 'Mon' },
    { label: 'Tue', value: 'Tue' },
    { label: 'Wed', value: 'Wed' },
    { label: 'Thu', value: 'Thu' },
    { label: 'Fri', value: 'Fri' },
    { label: 'Sat', value: 'Sat' },
    { label: 'Sun', value: 'Sun' },
    { label: 'Mon–Fri', value: 'Mon–Fri' },
    { label: 'Mon,Wed,Fri', value: 'Mon,Wed,Fri' },
    { label: 'Tue,Thu,Sat', value: 'Tue,Thu,Sat' },
    { label: 'Mon–Sat', value: 'Mon–Sat' },
];

const SITE_MEDIA_SLOTS = [
    { key: 'portrait-jaggi', label: 'Jaggi Sir Portrait (Hero & About Section)' },
    { key: 'faculty-physics', label: 'Physics Faculty Photo' },
    { key: 'faculty-mathematics', label: 'Mathematics Faculty Photo' },
    { key: 'faculty-biology', label: 'Biology Faculty Photo' },
    { key: 'faculty-chemistry', label: 'Chemistry Faculty Photo' },
];

const EMPTY_WALL = { studentName: '', examName: '', rank: '' };
const EMPTY_TIME = { category: 'Class 11', subject: 'Physics', day: 'Mon', timeStr: '' };

// ─── Reusable Upload Button ───────────────────────────────────────────
function PhotoUploader({
    current, folder, onUploaded, label, compact = false,
}: {
    current?: string; folder: string; onUploaded: (url: string) => void; label?: string; compact?: boolean;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(current || '');

    useEffect(() => { setPreview(current || ''); }, [current]);

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', folder);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.url) {
            setPreview(data.url);
            onUploaded(data.url);
        }
        setUploading(false);
    };

    if (compact) {
        return (
            <div className="flex items-center gap-2">
                {preview
                    ? <img src={preview} alt="preview" className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                    : <div className="w-10 h-10 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">📷</div>}
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                <button type="button" onClick={() => inputRef.current?.click()}
                    className="text-xs font-medium text-blue-700 hover:underline disabled:opacity-50" disabled={uploading}>
                    {uploading ? 'Uploading…' : preview ? 'Change' : 'Upload'}
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {label && <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{label}</p>}
            <div
                onClick={() => inputRef.current?.click()}
                className="relative cursor-pointer rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors overflow-hidden group"
                style={{ background: '#F8FAFF' }}
            >
                {preview ? (
                    <img src={preview} alt="preview" className="w-full h-44 object-cover" />
                ) : (
                    <div className="h-44 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <span className="text-4xl">📷</span>
                        <span className="text-sm font-medium">Click to upload photo</span>
                        <span className="text-xs">JPG, PNG or WEBP</span>
                    </div>
                )}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <span className="text-white font-semibold text-sm">{uploading ? 'Uploading…' : preview ? '🔄 Change Photo' : '📤 Upload'}</span>
                </div>
            </div>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────────────
export default function AdminDashboard() {
    const [wall, setWall] = useState<WallEntry[]>([]);
    const [time, setTime] = useState<TimeEntry[]>([]);
    const [media, setMedia] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [newWall, setNewWall] = useState(EMPTY_WALL);
    const [newWallImg, setNewWallImg] = useState('');
    const [newTime, setNewTime] = useState(EMPTY_TIME);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'wall' | 'timetable' | 'photos'>('wall');
    const router = useRouter();

    const load = useCallback(async () => {
        setLoadError('');
        try {
            const [w, t, m] = await Promise.all([
                fetch('/api/wall-of-fame'),
                fetch('/api/timetable'),
                fetch('/api/media'),
            ]);
            if (w.status === 401 || t.status === 401 || m.status === 401) {
                router.push('/admin/login');
                return;
            }
            const [wallData, timeData, mediaData] = await Promise.all([
                w.ok ? w.json() : [],
                t.ok ? t.json() : [],
                m.ok ? m.json() : [],
            ]);
            setWall(Array.isArray(wallData) ? wallData : []);
            setTime(Array.isArray(timeData) ? timeData : []);
            const map: Record<string, string> = {};
            if (Array.isArray(mediaData)) {
                (mediaData as MediaEntry[]).forEach(({ key, imageUrl }) => { map[key] = imageUrl; });
            }
            setMedia(map);
        } catch (err) {
            setLoadError('Could not connect to the database. Please refresh the page.');
            console.error('Dashboard load error:', err);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => { load(); }, [load]);

    async function logout() {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/admin/login');
    }

    async function saveMedia(key: string, imageUrl: string, label: string) {
        const res = await fetch('/api/media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, imageUrl, label }),
        });
        if (res.ok) {
            setMedia(prev => ({ ...prev, [key]: imageUrl }));
        }
    }

    async function addWall(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const res = await fetch('/api/wall-of-fame', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newWall, imageUrl: newWallImg }),
        });
        if (res.ok) {
            setNewWall(EMPTY_WALL);
            setNewWallImg('');
        }
        await load();
        setSaving(false);
    }

    async function deleteWall(id: string) {
        if (!confirm('Delete this entry?')) return;
        await fetch('/api/wall-of-fame', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load();
    }

    async function addTime(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const res = await fetch('/api/timetable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTime),
        });
        if (res.ok) {
            setNewTime(EMPTY_TIME);
        }
        await load();
        setSaving(false);
    }

    async function deleteTime(id: string) {
        if (!confirm('Delete this class?')) return;
        await fetch('/api/timetable', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        await load();
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-500 text-sm">Loading CMS…</p>
            </div>
        </div>
    );

    const inputCls = "border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white";
    const selectCls = `${inputCls} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236B7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center]`;
    const btnPrimary = "bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 shrink-0";
    const btnDanger = "text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ml-auto shrink-0 border border-red-100";

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8">
            {/* Error Banner */}
            {loadError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-center gap-3">
                    <span className="text-red-500 text-lg">⚠️</span>
                    <div className="flex-grow">
                        <p className="text-sm font-semibold text-red-700">{loadError}</p>
                    </div>
                    <button onClick={load} className="text-xs font-semibold text-red-700 hover:underline shrink-0">Retry</button>
                </div>
            )}
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your Wall of Fame, class schedules, and all site photos.</p>
                </div>
                <div className="flex items-center gap-3">
                    <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-700 hover:underline shrink-0">View Live Site →</a>
                    <button onClick={logout} className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors border border-slate-200 rounded-lg px-3 py-1.5 hover:border-red-200">Logout</button>
                </div>
            </div>


            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-slate-100 w-fit">
                {([['wall', `🏆 Wall of Fame (${wall.length})`], ['timetable', `📅 Timetables (${time.length})`], ['photos', '📷 Site Photos']] as const).map(([tab, label]) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                        {label}
                    </button>
                ))}
            </div>

            {/* ── Wall of Fame ── */}
            {activeTab === 'wall' && (
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-800 mb-5">Add New Topper</h2>
                        <form onSubmit={addWall} className="space-y-4">
                            <div className="grid sm:grid-cols-3 gap-3">
                                <input required placeholder="Student Name" className={inputCls} value={newWall.studentName} onChange={e => setNewWall({ ...newWall, studentName: e.target.value })} />
                                <input required placeholder="Exam (e.g. JEE Advanced 2024)" className={inputCls} value={newWall.examName} onChange={e => setNewWall({ ...newWall, examName: e.target.value })} />
                                <input required placeholder="Rank (e.g. AIR 15)" className={inputCls} value={newWall.rank} onChange={e => setNewWall({ ...newWall, rank: e.target.value })} />
                            </div>
                            <div className="flex items-end gap-4">
                                <div className="flex-grow">
                                    <PhotoUploader
                                        folder="uploads/wall"
                                        current={newWallImg}
                                        onUploaded={url => setNewWallImg(url)}
                                        label="Student Photo (optional)"
                                    />
                                </div>
                                <button type="submit" disabled={saving} className={`${btnPrimary} mb-0 self-end`}>{saving ? 'Saving…' : '+ Add Entry'}</button>
                            </div>
                        </form>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {wall.length === 0 && (
                            <p className="p-8 text-center text-slate-400 text-sm italic">No entries yet. Add your first topper above.</p>
                        )}
                        {wall.map((w) => (
                            <div key={w.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                                {w.imageUrl
                                    ? <img src={w.imageUrl} alt={w.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 shrink-0" />
                                    : <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">🎓</div>}
                                <div className="min-w-0 flex-grow">
                                    <p className="font-semibold text-slate-800 truncate">{w.studentName}</p>
                                    <p className="text-xs text-slate-500 truncate">{w.examName} · Rank <strong>{w.rank}</strong></p>
                                </div>
                                <button onClick={() => deleteWall(w.id)} className={btnDanger}>🗑 Delete</button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Timetable ── */}
            {activeTab === 'timetable' && (
                <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-800 mb-5">Add New Class</h2>
                        <form onSubmit={addTime} className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
                            {/* Batch */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1 block">Batch</label>
                                <select className={selectCls} value={newTime.category} onChange={e => setNewTime({ ...newTime, category: e.target.value })}>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            {/* Subject */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1 block">Subject</label>
                                <select className={selectCls} value={newTime.subject} onChange={e => setNewTime({ ...newTime, subject: e.target.value })}>
                                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            {/* Day */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1 block">Day(s)</label>
                                <select className={selectCls} value={newTime.day} onChange={e => setNewTime({ ...newTime, day: e.target.value })}>
                                    {DAYS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                                </select>
                            </div>
                            {/* Time */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1 block">Time</label>
                                <input required placeholder="e.g. 4:00 PM" className={inputCls} value={newTime.timeStr} onChange={e => setNewTime({ ...newTime, timeStr: e.target.value })} />
                            </div>
                            <button type="submit" disabled={saving} className={btnPrimary}>{saving ? 'Saving…' : '+ Add'}</button>
                        </form>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {time.length === 0 && (
                            <p className="p-8 text-center text-slate-400 text-sm italic">No classes added yet.</p>
                        )}
                        {CATEGORIES.map(cat => {
                            const entries = time.filter(t => t.category === cat);
                            if (!entries.length) return null;
                            return (
                                <div key={cat}>
                                    <div className="px-6 py-2.5 flex items-center gap-2" style={{ background: '#F0F5FF' }}>
                                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{cat}</span>
                                        <span className="text-xs text-slate-400">({entries.length} class{entries.length > 1 ? 'es' : ''})</span>
                                    </div>
                                    {entries.map(t => (
                                        <div key={t.id} className="flex items-center px-6 py-3 hover:bg-slate-50 transition-colors gap-3">
                                            <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full shrink-0" style={{
                                                background: { Physics: '#2563EB', Mathematics: '#D97706', Chemistry: '#16A34A', Biology: '#DC2626' }[t.subject as string] || '#6B7280'
                                            }}>{t.subject}</span>
                                            <span className="text-sm text-slate-600 font-medium w-28 shrink-0">{t.day}</span>
                                            <span className="text-sm font-semibold text-blue-700 tabular-nums">{t.timeStr}</span>
                                            <button onClick={() => deleteTime(t.id)} className={`${btnDanger} ml-auto`}>🗑</button>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ── Site Photos ── */}
            {activeTab === 'photos' && (
                <section className="space-y-6">
                    <p className="text-sm text-slate-500">
                        Upload photos here and they will automatically appear on the live site. Recommended: JPG or WEBP, at least 600px wide.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SITE_MEDIA_SLOTS.map(({ key, label }) => (
                            <div key={key} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <PhotoUploader
                                    folder="uploads/site"
                                    current={media[key]}
                                    label={label}
                                    onUploaded={url => saveMedia(key, url, label)}
                                />
                                {media[key] && (
                                    <p className="text-xs text-green-600 font-medium mt-2">✓ Photo uploaded</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer note */}
            <p className="text-xs text-center text-slate-400 pb-4">
                Admin credentials are set in{' '}
                <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code>. Default:{' '}
                <strong>jaggi / jaggiadmin123</strong> — change before going live.
            </p>
        </div>
    );
}
