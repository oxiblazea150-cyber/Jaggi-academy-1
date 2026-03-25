import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'uploads';

        if (!file || !file.size) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate type
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            return NextResponse.json({ error: 'Only JPG, PNG, WEBP allowed' }, { status: 400 });
        }

        const ext = file.name.split('.').pop();
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const uploadDir = path.join(process.cwd(), 'public', folder);

        await mkdir(uploadDir, { recursive: true });

        const bytes = await file.arrayBuffer();
        await writeFile(path.join(uploadDir, safeName), Buffer.from(bytes));

        const url = `/${folder}/${safeName}`;
        return NextResponse.json({ url, name: safeName });
    } catch (e) {
        console.error('Upload error:', e);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
