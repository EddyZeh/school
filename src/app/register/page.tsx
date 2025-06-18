'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css'; // Import the CSS module

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        gender: '',
        date_of_birth: '',
        level: '',
        department: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error || 'Registration failed');
            return;
        }
        router.push('/login');
    };

    return (
        // Use styles.className for CSS module classes
        <div className={styles.container}>
            <h1 className={styles.heading}>Register</h1>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.formSpaceY5}>
                <div>
                    <label className={styles.label}>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
                </div>

                <div>
                    <label className={styles.label}>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
                </div>

                <div>
                    <label className={styles.label}>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} required />
                </div>

                <div>
                    <label className={styles.label}>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className={styles.input}>
                        <option value="student">Student</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="ta">TA</option>
                    </select>
                </div>

                {formData.role === 'student' && (
                    <>
                        <div>
                            <label className={styles.label}>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className={styles.input}>
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div>
                            <label className={styles.label}>Date of Birth</label>
                            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className={styles.input} />
                        </div>

                        <div>
                            <label className={styles.label}>Level</label>
                            <input name="level" value={formData.level} onChange={handleChange} className={styles.input} />
                        </div>
                    </>
                )}

                {(formData.role === 'lecturer' || formData.role === 'ta') && (
                    <div>
                        <label className={styles.label}>Department</label>
                        <input name="department" value={formData.department} onChange={handleChange} className={styles.input} />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}