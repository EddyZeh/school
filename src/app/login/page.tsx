'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css'; // Import the CSS module

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || 'Login failed');
            return;
        }

        localStorage.setItem('token', data.token);
        router.push('/dashboard');
    };

    return (
        // Use styles.className for CSS module classes
        <div className={styles.formContainer}>
            <h1 className={styles.heading}>Login</h1>
            {error && <p className={styles.formError}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.spaceY5}> {/* Apply space-y-5 style */}
                <div>
                    <label className={styles.formLabel}>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className={styles.input} placeholder={"Enter email"} required />
                </div>
                <div>
                    <label className={styles.formLabel}>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} required />
                </div>
                <button className={styles.formButton} type="submit">Log In</button>
            </form>
        </div>
    );
}