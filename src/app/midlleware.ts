import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const user = verifyToken(token);
        req.headers.set('x-user-id', user.id.toString());
        req.headers.set('x-role', user.role);
        req.headers.set('x-associated-id', user.associatedId.toString());
        return NextResponse.next({ headers: req.headers });
    } catch {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/api/dashboard/:path*'],
};
