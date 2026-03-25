import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
    try {
        const rows = db.prepare('SELECT * FROM WallOfFame ORDER BY createdAt DESC').all();
        return NextResponse.json(rows);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const id = randomUUID();
        db.prepare(
            'INSERT INTO WallOfFame (id, studentName, examName, rank, photoPlaceholder, imageUrl) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(id, body.studentName, body.examName, body.rank, body.photoPlaceholder || null, body.imageUrl || null);
        return NextResponse.json({ id, ...body });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        db.prepare('DELETE FROM WallOfFame WHERE id = ?').run(id);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
