    import { NextResponse } from 'next/server';
    import bcrypt from 'bcryptjs';
    import pool from '@/lib/db';

    export async function POST(request: Request) {
        const body = await request.json();
        const {
            name,
            email,
            password,
            role,
            gender,
            date_of_birth,
            level,
            department
        } = body;
        console.log(body)
        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        try {
            const client = await pool.connect();

            const userExists = await client.query('SELECT * FROM Users WHERE username = $1', [email]);
            if (userExists.rows.length > 0) {
                client.release();
                return NextResponse.json({ error: 'User already exists' }, { status: 409 });
            }

            let associatedId: number;

            const hashedPassword = await bcrypt.hash(password, 10);

            if (role === 'student') {
                const studentRes = await client.query(
                    `INSERT INTO Students (Name, Gender, Email, ContactInfo, Level, YearOfBirth)
                     VALUES ($1, $2, $3, $4, NULL, $5)
                     RETURNING studentid`,
                    [ name, gender, email, level, date_of_birth]
                );
                associatedId = studentRes.rows[0].studentid;
            } else if (role === 'lecturer') {
                const lecturerRes = await client.query(
                    `INSERT INTO Lecturers (LecturerName, Email, ContactInfo, Department)
                     VALUES ($1, $2, NULL, $3)
                     RETURNING lectureid`,
                    [name, email, department]
                );
                associatedId = lecturerRes.rows[0].lectureid;
            } else if (role === 'ta') {
                const taRes = await client.query(
                    `INSERT INTO TAs (TA_Name, Department, LectureID)
                     VALUES ($1, $2, $3)
                     RETURNING ta_id`,
                    [name, department, "1"]
                );
                associatedId = taRes.rows[0].ta_id;
            }

            let formattedRole = role;
            if (role.toLowerCase() === 'ta') {
                formattedRole = 'TA';
            } else {
                formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
            }

            const userInsert = await client.query(
                'INSERT INTO Users (username, passwordHash, role, AssociatedID) VALUES ($1, $2, $3, $4) RETURNING UserID',
                [email, hashedPassword, formattedRole, associatedId]
            );


            client.release();
            return NextResponse.json({ success: true }, { status: 201 });
        } catch (error) {
            console.error('Registration error:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
