import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'jaggi-academy-super-secret-key-2026'
);

// Simple credential check — no DB needed for admin
const ADMIN_USER = process.env.ADMIN_USER || 'jaggi';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'jaggiadmin123';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (username !== ADMIN_USER || password !== ADMIN_PASS) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = await new SignJWT({ username, role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(JWT_SECRET);

        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });
        return response;
    } catch (e) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
