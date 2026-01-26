'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { isAuthenticated } from '@/lib/auth'
import { getImageUrl } from '@/lib/utils'
import { uploadToCloudinary } from '@/lib/cloudinary'

export default function EditProductPage() {
    const params = useParams()
    const router = useRouter()

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        material: '',
        color: '',
        description: ''
    })
    const [currentImage, setCurrentImage] = useState('')
    const [newImage, setNewImage] = useState(null)

    // UI State
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Check Auth and Fetch Data
    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/admin/login')
            return
        }

        if (params.id) {
            fetchProduct()
        } else {
            setError('Invalid Product ID')
            setLoading(false)
        }
    }, [params.id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            console.log('Fetching product:', params.id)

            const response = await api.get(`/api/products/${params.id}`)
            console.log('Product fetched:', response.data)

            if (!response.data || !response.data.product) {
                throw new Error('Product not found in database')
            }

            const product = response.data.product
            setFormData({
                name: product.name || '',
                price: product.price || '',
                material: product.material || '',
                color: product.color || '',
                description: product.description || ''
            })
            setCurrentImage(product.image || '')
            setError('')
        } catch (err) {
            console.error('Fetch Error:', err)
            setError('Failed to load product. ' + (err.message || 'Server error'))
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
            let imageUrl = currentImage

            // 1. Upload new image if selected
            if (newImage) {
                try {
                    imageUrl = await uploadToCloudinary(newImage)
                } catch (uploadErr) {
                    throw new Error('Image upload failed: ' + uploadErr.message)
                }
            }

            // 2. Prepare JSON data
            const productData = {
                name: formData.name,
                price: formData.price,
                material: formData.material,
                color: formData.color,
                description: formData.description,
                image: imageUrl
            }

            // 3. Send update to backend
            const response = await api.put(`/api/products/${params.id}`, productData)

            if (response.data.success) {
                setSuccess('Product updated successfully!')
                setTimeout(() => {
                    router.push('/admin/dashboard')
                }, 1500)
            }
        } catch (err) {
            console.error('Submit Error:', err)
            setError(err.response?.data?.message || err.message || 'Failed to update product')
        } finally {
            setSubmitting(false)
        }
    }

    // Loading View
    if (loading) {
        return (
            <div className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner"></div>
                <h2 style={{ marginTop: '1rem', color: 'var(--steel-light)' }}>Loading Product Details...</h2>
                <p style={{ color: '#666' }}>ID: {params.id}</p>
            </div>
        )
    }

    return (
        <div className="section">
            <div className="container">
                <Link href="/admin/dashboard" style={{ color: 'var(--flame-orange)', marginBottom: '2rem', display: 'inline-block' }}>
                    ← Back to Dashboard
                </Link>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: '2rem' }}>Edit Product</h1>

                    {error && (
                        <div className="error-message" style={{ background: '#3d0f0f', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {success && <div className="success-message">{success}</div>}

                    <div className="card">
                        <div className="card-content">
                            <form onSubmit={handleSubmit}>
                                {/* Current Image Preview */}
                                {currentImage && (
                                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                        <p className="form-label">Current Image</p>
                                        <img
                                            src={getImageUrl(currentImage)}
                                            alt="Current"
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                objectFit: 'contain',
                                                borderRadius: '8px',
                                                border: '1px solid #333',
                                                margin: '0 auto'
                                            }}
                                        />
                                    </div>
                                )}

                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Product Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Price (₹) *</label>
                                            <input
                                                type="number"
                                                name="price"
                                                className="form-input"
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
                                                value={formData.material}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Color</label>
                                        <input
                                            type="text"
                                            name="color"
                                            className="form-input"
                                            value={formData.color}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-textarea"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={5}
                                        ></textarea>
                                    </div>

                                    <div className="form-group" style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px' }}>
                                        <label className="form-label">Upload New Image (Optional)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="form-input"
                                            style={{ border: 'none', padding: 0 }}
                                        />
                                        {newImage && <p style={{ color: 'var(--flame-orange)', marginTop: '0.5rem' }}>Selected: {newImage.name}</p>}
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
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
                                            style={{ flex: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center' }}
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}