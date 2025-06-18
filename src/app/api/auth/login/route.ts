import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    try {
        const client = await pool.connect();

        const res = await client.query('SELECT * FROM Users WHERE username = $1', [username]);
        if (res.rows.length === 0) {
            client.release();
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = res.rows[0];
        const valid = await bcrypt.compare(password, user.passwordhash);
        if (!valid) {
            client.release();
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = generateToken({ id: user.userid, role: user.role, associatedId: user.associatedid });

        client.release();
        return NextResponse.json({ token, role: user.role, userId: user.associatedid });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
