'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockIcon } from '@/app/components/Icons'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-brown-ten-82.vercel.app'

export default function AdminLoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            console.log('Attempting login with:', credentials.username)
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })

            const data = await response.json()
            console.log('Login response:', data)

            if (response.ok && data.success) {
                console.log('Login successful, token:', data.token)
                localStorage.setItem('adminToken', data.token)
                console.log('Token stored in localStorage:', localStorage.getItem('adminToken'))

                // Small delay to ensure localStorage is set
                setTimeout(() => {
                    router.push('/admin/dashboard')
                }, 100)
            } else {
                setError(data.message || 'Invalid credentials')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
            console.error('Login error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--charcoal-black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Flame Glow Background */}
            <div className="flame-glow" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px'
            }}></div>

            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '450px',
                padding: '0 2rem'
            }}>
                <div className="card-cinematic" style={{
                    padding: '3rem',
                    background: 'var(--charcoal-dark)',
                    border: '1px solid rgba(255, 107, 53, 0.3)'
                }}>
                    {/* Logo/Icon */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 1.5rem',
                            background: 'var(--gradient-flame)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            boxShadow: 'var(--shadow-flame)',
                            animation: 'glowPulse 2s ease-in-out infinite'
                        }}>
                            <LockIcon size={40} />
                        </div>
                        <h1 style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem'
                        }}>
                            Admin <span className="text-gradient-flame">Portal</span>
                        </h1>
                        <p style={{
                            color: 'var(--steel-light)',
                            fontSize: '1rem'
                        }}>
                            Secure access to manage your products
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--heat-white)',
                                fontWeight: '600',
                                fontSize: '0.95rem'
                            }}>
                                Username
                            </label>
                            <input
                                type="text"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--charcoal-medium)',
                                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--heat-white)',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--flame-orange)'
                                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.2)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                                    e.target.style.boxShadow = 'none'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: 'var(--heat-white)',
                                fontWeight: '600',
                                fontSize: '0.95rem'
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--charcoal-medium)',
                                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--heat-white)',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--flame-orange)'
                                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.2)'
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                                    e.target.style.boxShadow = 'none'
                                }}
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(220, 38, 38, 0.1)',
                                border: '1px solid rgba(220, 38, 38, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: '#ff6b6b',
                                marginBottom: '1.5rem',
                                fontSize: '0.95rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-flame"
                            style={{
                                width: '100%',
                                padding: '1.25rem',
                                fontSize: '1.125rem',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Logging in...' : '🔓 Login to Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
