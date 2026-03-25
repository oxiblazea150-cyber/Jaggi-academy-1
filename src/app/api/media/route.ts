import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET all media or specific key
export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get('key');
    if (key) {
        const row = db.prepare('SELECT * FROM SiteMedia WHERE key = ?').get(key);
        return NextResponse.json(row || null);
    }
    const rows = db.prepare('SELECT * FROM SiteMedia ORDER BY key').all();
    return NextResponse.json(rows);
}

// POST — upsert a media key
export async function POST(req: NextRequest) {
    const { key, imageUrl, label } = await req.json();
    db.prepare(`
    INSERT INTO SiteMedia (key, imageUrl, label, updatedAt)
    VALUES (?, ?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET imageUrl=excluded.imageUrl, label=excluded.label, updatedAt=excluded.updatedAt
  `).run(key, imageUrl, label || key);
    return NextResponse.json({ success: true });
}
