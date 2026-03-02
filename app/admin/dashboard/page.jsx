'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { LogoutIcon, PackageIcon, PlusIcon, EditIcon, TrashIcon, FlameIcon } from '@/app/components/Icons'
import { getImageUrl } from '@/lib/utils'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-brown-ten-82.vercel.app'

export default function AdminDashboard() {
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check authentication
        const checkAuth = () => {
            const token = localStorage.getItem('adminToken')
            console.log('Dashboard checking auth, token exists:', !!token)

            if (!token) {
                console.log('No token found, redirecting to login')
                router.push('/admin/login')
                return false
            }

            setIsAuthenticated(true)
            return true
        }

        if (checkAuth()) {
            fetchProducts()
        }
    }, [router])

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`)
            setProducts(response.data.products || [])
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        // Trigger event to update navigation
        window.dispatchEvent(new Event('adminAuthChange'))
        router.push('/admin/login')
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        try {
            const token = localStorage.getItem('adminToken')
            await axios.delete(`${API_URL}/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchProducts()
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('Failed to delete product')
        }
    }

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--charcoal-black)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid var(--charcoal-medium)',
                    borderTop: '4px solid var(--flame-orange)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }}></div>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--charcoal-black)', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                background: 'var(--charcoal-dark)',
                borderBottom: '2px solid var(--flame-orange)',
                padding: '2rem'
            }}>
                <div className="container">
                    <div className="dashboard-header" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: 0 }}>
                            Admin <span className="text-gradient-flame">Dashboard</span>
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                width: 'auto',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <LogoutIcon size={20} /> Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="section">
                <div className="container">
                    {/* Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        <div className="card-cinematic" style={{
                            padding: '2rem',
                            textAlign: 'center',
                            background: 'var(--charcoal-dark)'
                        }}>
                            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <PackageIcon size={64} />
                            </div>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--flame-orange)', marginBottom: '0.5rem' }}>
                                {products.length}
                            </h3>
                            <p style={{ color: 'var(--steel-light)', marginBottom: 0 }}>Total Products</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ marginBottom: '3rem' }}>
                        <Link href="/admin/add-product" className="btn btn-flame btn-large" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <PlusIcon size={24} /> Add New Product
                        </Link>
                    </div>

                    {/* Products Table */}
                    <div className="card-cinematic" style={{
                        padding: '2rem',
                        background: 'var(--charcoal-dark)',
                        overflow: 'auto'
                    }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
                            Product <span className="text-gradient-flame">Management</span>
                        </h2>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    border: '4px solid var(--charcoal-medium)',
                                    borderTop: '4px solid var(--flame-orange)',
                                    borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite',
                                    margin: '0 auto'
                                }}></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    <PackageIcon size={96} />
                                </div>
                                <p style={{ color: 'var(--steel-light)', fontSize: '1.25rem' }}>
                                    No products yet. Add your first product!
                                </p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse'
                                }}>
                                    <thead>
                                        <tr style={{
                                            borderBottom: '2px solid var(--flame-orange)'
                                        }}>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--flame-orange)' }}>Image</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--flame-orange)' }}>Name</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--flame-orange)' }}>Price</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--flame-orange)' }}>Material</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--flame-orange)' }}>Color</th>
                                            <th style={{ padding: '1rem', textAlign: 'center', color: 'var(--flame-orange)' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product._id} style={{
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                            }}>
                                                <td style={{ padding: '1rem' }}>
                                                    {product.image ? (
                                                        <img
                                                            src={getImageUrl(product.image)}
                                                            alt={product.name}
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                objectFit: 'cover',
                                                                borderRadius: 'var(--radius-md)'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            width: '60px',
                                                            height: '60px',
                                                            background: 'var(--charcoal-medium)',
                                                            borderRadius: 'var(--radius-md)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>🔥</div>
                                                    )}
                                                </td>
                                                <td style={{ padding: '1rem', color: 'var(--heat-white)' }}>{product.name}</td>
                                                <td style={{ padding: '1rem', color: 'var(--flame-orange)', fontWeight: '700' }}>₹{product.price}</td>
                                                <td style={{ padding: '1rem', color: 'var(--steel-light)' }}>{product.material || '-'}</td>
                                                <td style={{ padding: '1rem', color: 'var(--steel-light)' }}>{product.color || '-'}</td>
                                                <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                                                        <Link
                                                            href={`/admin/edit-product/${product._id}`}
                                                            className="btn btn-steel"
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                                        >
                                                            <EditIcon size={16} /> Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product._id)}
                                                            className="btn"
                                                            style={{
                                                                padding: '0.5rem 1rem',
                                                                fontSize: '0.9rem',
                                                                background: 'rgba(220, 38, 38, 0.2)',
                                                                border: '1px solid rgba(220, 38, 38, 0.5)',
                                                                color: '#ff6b6b',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem'
                                                            }}
                                                        >
                                                            <TrashIcon size={16} /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @media (max-width: 768px) {
                    .dashboard-header {
                        flex-direction: column;
                        align-items: flex-start !important;
                    }
                    
                    .dashboard-header h1 {
                        width: 100%;
                    }
                    
                    .dashboard-header button {
                        width: 100% !important;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    )
}
