import { NextResponse } from 'next/server';
import { getDb, ensureDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
    try {
        await ensureDb();
        const db = getDb();
        const rows = await db`SELECT * FROM "WallOfFame" ORDER BY "createdAt" DESC`;
        return NextResponse.json(rows);
    } catch (e) {
        console.error('WallOfFame GET error:', e);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await ensureDb();
        const db = getDb();
        const body = await req.json();
        const id = randomUUID();
        await db`
            INSERT INTO "WallOfFame" (id, "studentName", "examName", rank, "photoPlaceholder", "imageUrl")
            VALUES (${id}, ${body.studentName}, ${body.examName}, ${body.rank}, ${body.photoPlaceholder || null}, ${body.imageUrl || null})
        `;
        return NextResponse.json({ id, ...body });
    } catch (e) {
        console.error('WallOfFame POST error:', e);
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await ensureDb();
        const db = getDb();
        const { id } = await req.json();
        await db`DELETE FROM "WallOfFame" WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error('WallOfFame DELETE error:', e);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
