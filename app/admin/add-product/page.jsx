'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { isAuthenticated } from '@/lib/auth'

export default function AddProductPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        material: '',
        color: '',
        description: ''
    })
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/admin/login')
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('name', formData.name)
            formDataToSend.append('price', formData.price)
            formDataToSend.append('material', formData.material)
            formDataToSend.append('color', formData.color)
            formDataToSend.append('description', formData.description)

            if (image) {
                formDataToSend.append('image', image)
            }

            const response = await api.post('/api/products', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                setSuccess('Product added successfully!')
                setTimeout(() => {
                    router.push('/admin/dashboard')
                }, 1500)
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="section" style={{ background: 'var(--charcoal-black)', minHeight: '100vh' }}>
            <div className="container">
                <Link href="/admin/dashboard" style={{
                    color: 'var(--flame-orange)',
                    marginBottom: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all var(--transition-fast)'
                }}>
                    ← Back to Dashboard
                </Link>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                            marginBottom: '1rem',
                            background: 'var(--gradient-flame)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Add New Product
                        </h1>
                        <p style={{ color: 'var(--steel-light)', fontSize: '1.125rem' }}>
                            Fill in the details below to add a new product to your catalog
                        </p>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <div className="card">
                        <div className="card-content">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        placeholder="e.g., Premium Gas Lighter"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Price (₹) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-input"
                                        placeholder="e.g., 299"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        className="form-input"
                                        placeholder="e.g., Stainless Steel"
                                        value={formData.material}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Color</label>
                                    <input
                                        type="text"
                                        name="color"
                                        className="form-input"
                                        placeholder="e.g., Red, Black, Silver"
                                        value={formData.color}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-textarea"
                                        placeholder="Describe the product features and benefits..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="5"
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Product Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-input"
                                    />
                                    {image && (
                                        <p style={{
                                            marginTop: '0.75rem',
                                            fontSize: '0.95rem',
                                            color: 'var(--steel-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            <span style={{ color: 'var(--flame-orange)' }}>✓</span>
                                            Selected: {image.name}
                                        </p>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginTop: '2.5rem',
                                    flexWrap: 'wrap'
                                }}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-large"
                                        style={{ flex: '1 1 200px' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Adding Product...' : 'ADD PRODUCT'}
                                    </button>
                                    <Link
                                        href="/admin/dashboard"
                                        className="btn btn-outline btn-large"
                                        style={{
                                            flex: '1 1 200px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        CANCEL
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
