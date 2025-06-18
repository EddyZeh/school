'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css'; // Import the CSS module

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token');
            if (!token) return router.push('/login');

            // Decode token to get role (client-side safe)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userRole = payload.role.toLowerCase(); // 'student', 'lecturer', 'ta'
            setRole(userRole);

            try {
                const res = await fetch(`/api/dashboard/${userRole}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    const err = await res.json();
                    setError(err.error || 'Unauthorized');
                    return;
                }

                const result = await res.json();
                setData(result);
                console.log(result);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Could not fetch dashboard data.');
            }
        };

        fetchDashboard();
    }, [router]);

    if (error) return <p className={styles.errorMessage}>{error}</p>;
    if (!data) return <p className={styles.loadingMessage}>Loading dashboard...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome, {data.name}</h1>
            <p className={styles.detail}><strong>Email:</strong> {data.email}</p>
            <p className={styles.detail}><strong>Role:</strong> {role}</p>

            {role === 'student' && (
                <>
                    <p className={styles.detail}><strong>Gender:</strong> {data.gender}</p>
                    <p className={styles.detail}><strong>Level:</strong> {data.level}</p>
                    <p className={styles.detail}><strong>Year of Birth:</strong> {new Date(data.yearofbirth).toLocaleDateString()}</p>
                    <p className={styles.detail}><strong>Outstanding Fees:</strong> ${data.outstanding_fees}</p>
                    <p className={styles.detail}><strong>Courses:</strong> {data.courses?.join(', ')}</p>
                </>
            )}

            {role === 'lecturer' && (
                <>
                    <p className={styles.detail}><strong>Department:</strong> {data.department}</p>
                    <p className={styles.detail}><strong>Contact:</strong> {data.contactinfo}</p>
                    <p className={styles.detail}><strong>Courses Taught:</strong> {data.courses?.join(', ')}</p>
                </>
            )}

            {role === 'ta' && (
                <>
                    <p className={styles.detail}><strong>Department:</strong> {data.department}</p>
                    <p className={styles.detail}><strong>Assigned Lecturer:</strong> {data.lecturer}</p>
                </>
            )}
        </div>
    );
}