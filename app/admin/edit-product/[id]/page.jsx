'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { isAuthenticated } from '@/lib/auth'
import { getImageUrl } from '@/lib/utils'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-six-sage-18.vercel.app'

export default function EditProductPage() {
    const params = useParams()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        material: '',
        color: '',
        description: ''
    })
    const [currentImage, setCurrentImage] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/admin/login')
            return
        }
        if (params.id) {
            fetchProduct()
        }
    }, [params.id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/api/products/${params.id}`)
            const product = response.data.product

            setFormData({
                name: product.name,
                price: product.price,
                material: product.material || '',
                color: product.color || '',
                description: product.description || ''
            })
            setCurrentImage(product.image)
            setError('')
        } catch (err) {
            setError('Failed to load product details')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setSubmitting(true)

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('name', formData.name)
            formDataToSend.append('price', formData.price)
            formDataToSend.append('material', formData.material)
            formDataToSend.append('color', formData.color)
            formDataToSend.append('description', formData.description)

            if (newImage) {
                formDataToSend.append('image', newImage)
            }

            const response = await api.put(`/api/products/${params.id}`, formDataToSend)

            if (response.data.success) {
                setSuccess('Product updated successfully!')
                setTimeout(() => {
                    router.push('/admin/dashboard')
                }, 1500)
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="section">
            <div className="container">
                <Link href="/admin/dashboard" style={{ color: 'var(--primary-red)', marginBottom: '2rem', display: 'inline-block' }}>
                    ← Back to Dashboard
                </Link>

                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: '2rem' }}>Edit Product</h1>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <div className="card">
                        <div className="card-content" style={{ padding: '2rem' }}>
                            <form onSubmit={handleSubmit}>
                                {currentImage && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label className="form-label">Current Image</label>
                                        <img
                                            src={getImageUrl(currentImage)}
                                            alt="Current product"
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'block'
                                            }}
                                        />
                                    </div>
                                )}

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
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Replace Image (optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-input"
                                    />
                                    {newImage && (
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                            New image selected: {newImage.name}
                                        </p>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-large"
                                        style={{ flex: 1 }}
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Updating...' : 'Update Product'}
                                    </button>
                                    <Link
                                        href="/admin/dashboard"
                                        className="btn btn-outline btn-large"
                                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        Cancel
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
