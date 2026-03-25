import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'jaggi-academy';

        if (!file || !file.size) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate type
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            return NextResponse.json({ error: 'Only JPG, PNG, WEBP allowed' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const base64Data = Buffer.from(bytes).toString('base64');
        const fileUri = `data:${file.type};base64,${base64Data}`;

        const uploadResult = await cloudinary.uploader.upload(fileUri, {
            folder: folder,
        });

        return NextResponse.json({ url: uploadResult.secure_url, name: uploadResult.public_id });
    } catch (e) {
        console.error('Upload error:', e);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
