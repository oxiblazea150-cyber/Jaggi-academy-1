'use client';
import { useState } from 'react';

type TimetableEntry = {
    id: string;
    category: string;
    subject: string;
    day: string;
    timeStr: string;
};

const SUBJECTS_COLORS: Record<string, string> = {
    Physics: 'bg-blue-50 text-blue-800 border-blue-200',
    Mathematics: 'bg-amber-50 text-amber-800 border-amber-200',
    Maths: 'bg-amber-50 text-amber-800 border-amber-200',
    Chemistry: 'bg-green-50 text-green-800 border-green-200',
    Biology: 'bg-rose-50 text-rose-800 border-rose-200',
};

export default function TimetableTabs({ entries }: { entries: TimetableEntry[] }) {
    const categories = ['Class 11', 'Class 12', 'JEE', 'NEET'];
    const [activeTab, setActiveTab] = useState(categories[0]);

    const filtered = entries.filter((e) => e.category === activeTab);

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="flex border-b-2 border-[var(--divider)] mb-8 overflow-x-auto">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`tab-btn font-body text-sm sm:text-base shrink-0 ${activeTab === cat ? 'active' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="font-accent italic text-[var(--muted)] text-lg">
                        Schedule for {activeTab} will be posted shortly.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((entry, i) => {
                        const colorClass = SUBJECTS_COLORS[entry.subject] || 'bg-slate-50 text-slate-800 border-slate-200';
                        return (
                            <div
                                key={entry.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[var(--warm-white)] border border-[var(--divider)] hover:border-[var(--cobalt-light)] transition-colors"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
                                        {entry.subject}
                                    </span>
                                    <span className="text-[var(--ink)] font-medium">{entry.day}</span>
                                </div>
                                <span className="text-[var(--cobalt)] font-semibold tabular-nums">{entry.timeStr}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
