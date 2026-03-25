import { NextRequest, NextResponse } from 'next/server';
import { getDb, ensureDb } from '@/lib/db';

// GET all media or specific key
export async function GET(req: NextRequest) {
    try {
        await ensureDb();
        const db = getDb();
        const key = req.nextUrl.searchParams.get('key');
        if (key) {
            const rows = (await db`SELECT * FROM "SiteMedia" WHERE key = ${key}`) as any[];
            return NextResponse.json(rows.length ? rows[0] : null);
        }
        const rows = (await db`SELECT * FROM "SiteMedia" ORDER BY key`) as any[];
        return NextResponse.json(rows);
    } catch (e) {
        console.error('Media GET error:', e);
        return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
}

// POST — upsert a media key
export async function POST(req: NextRequest) {
    try {
        await ensureDb();
        const db = getDb();
        const { key, imageUrl, label } = await req.json();
        await db`
          INSERT INTO "SiteMedia" (key, "imageUrl", label, "updatedAt")
          VALUES (${key}, ${imageUrl}, ${label || key}, NOW())
          ON CONFLICT(key) DO UPDATE SET "imageUrl"=EXCLUDED."imageUrl", label=EXCLUDED.label, "updatedAt"=EXCLUDED."updatedAt"
        `;
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error('Media POST error:', e);
        return NextResponse.json({ error: 'Failed to save media' }, { status: 500 });
    }
}
