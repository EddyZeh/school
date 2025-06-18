import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
    const associatedId = req.headers.get('x-associated-id');

    const query = `
        SELECT
            ta.ta_name,
            ta.department,
            l.lecturername
        FROM
            tas ta
                JOIN
            lecturers l ON ta.lectureid = l.lectureid
        WHERE
            ta.ta_id = $1;

    `;

    try {
        const result = await pool.query(query, [associatedId]);
        return NextResponse.json(result.rows[0] || {});
    } catch (err) {
        return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
}
