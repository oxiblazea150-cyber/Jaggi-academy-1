import { NextResponse } from 'next/server';
import { getDb, ensureDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
    try {
        await ensureDb();
        const db = getDb();
        const rows = await db`SELECT * FROM "TimetableEntry" ORDER BY "createdAt" ASC`;
        return NextResponse.json(rows);
    } catch (e) {
        console.error('Timetable GET error:', e);
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
            INSERT INTO "TimetableEntry" (id, category, subject, day, "timeStr")
            VALUES (${id}, ${body.category}, ${body.subject}, ${body.day}, ${body.timeStr})
        `;
        return NextResponse.json({ id, ...body });
    } catch (e) {
        console.error('Timetable POST error:', e);
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await ensureDb();
        const db = getDb();
        const { id } = await req.json();
        await db`DELETE FROM "TimetableEntry" WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error('Timetable DELETE error:', e);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
