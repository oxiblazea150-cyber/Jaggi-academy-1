import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET all media or specific key
export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get('key');
    if (key) {
        const rows = await db`SELECT * FROM "SiteMedia" WHERE key = ${key}`;
        return NextResponse.json(rows.length ? rows[0] : null);
    }
    const rows = await db`SELECT * FROM "SiteMedia" ORDER BY key`;
    return NextResponse.json(rows);
}

// POST — upsert a media key
export async function POST(req: NextRequest) {
    const { key, imageUrl, label } = await req.json();
    await db`
      INSERT INTO "SiteMedia" (key, "imageUrl", label, "updatedAt")
      VALUES (${key}, ${imageUrl}, ${label || key}, NOW())
      ON CONFLICT(key) DO UPDATE SET "imageUrl"=EXCLUDED."imageUrl", label=EXCLUDED.label, "updatedAt"=EXCLUDED."updatedAt"
    `;
    return NextResponse.json({ success: true });
}
