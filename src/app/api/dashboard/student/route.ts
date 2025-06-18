import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 401 });

        const { associatedId } = verifyToken(token); // ✅ Get actual student ID from token

        const query = `
            SELECT
                s.Name,
                s.Email,
                s.Gender,
                s.Level,
                s.YearOfBirth AS date_of_birth,
                COALESCE(SUM(f.amount_paid), 0) AS amount_paid,
                COUNT(e.EnrollmentID) * 1500 AS total_fees,
                (COUNT(e.EnrollmentID) * 1500 - COALESCE(SUM(f.amount_paid), 0)) AS outstanding_fees,
                ARRAY_AGG(c.CourseName) AS courses
            FROM students s
                     LEFT JOIN Enrollment e ON s.StudentID = e.StudentID
                     LEFT JOIN courses c ON e.CourseID = c.CourseID
                     LEFT JOIN fees f ON s.StudentID = f.StudentID
            WHERE s.StudentID = $1
            GROUP BY s.Name, s.Email, s.Gender, s.Level, s.YearOfBirth;
        `;

        const result = await pool.query(query, [associatedId]);
        return NextResponse.json(result.rows[0] || {});
    } catch (err: any) {
        console.error('Dashboard DB error:', err.message);
        return NextResponse.json({ error: 'DB error: ' + err.message }, { status: 500 });
    }
}
