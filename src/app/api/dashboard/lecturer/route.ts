import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
    const associatedId = req.headers.get('x-associated-id');

    const query = `
        SELECT
            l.LecturerName,
            l.Email,
            l.ContactInfo,
            l.Department,
            ARRAY_AGG(c.CourseName) AS courses
        FROM Lecturers l
                 LEFT JOIN Courses c ON c.LectureID = l.LectureID
        WHERE l.LectureID = $1
        GROUP BY l.LecturerName, l.Email, l.ContactInfo, l.Department;
    `;

    try {
        const result = await pool.query(query, [1]);
        const lecturer = result.rows[0];

        if (!lecturer) {
            return NextResponse.json({ error: 'Lecturer not found' }, { status: 404 });
        }

        // Map DB fields to frontend structure
        const response = {
            name: lecturer.lecturername,
            email: lecturer.email,
            contactinfo: lecturer.contactinfo,
            department: lecturer.department,
            courses: lecturer.courses,
        };

        return NextResponse.json(response);
    } catch (err) {
        console.error('Lecturer dashboard error:', err);
        return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
}
