'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, observerOptions)

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [products])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/products`)
            setProducts(response.data.products)
            setError(null)
        } catch (err) {
            setError('Failed to load products. Please try again later.')
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--charcoal-black)'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid var(--charcoal-medium)',
                    borderTop: '4px solid var(--flame-orange)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }}></div>
                <style jsx>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        )
    }

    if (error) {
        return (
            <div className="section" style={{ background: 'var(--charcoal-black)' }}>
                <div className="container text-center">
                    <div style={{
                        background: 'var(--charcoal-dark)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid var(--flame-orange)'
                    }}>
                        <p style={{ color: 'var(--flame-orange)', fontSize: '1.25rem' }}>{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--charcoal-black)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                background: 'var(--gradient-charcoal)',
                padding: '6rem 0 4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="flame-glow" style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-10%',
                    width: '500px',
                    height: '500px'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <h1 className="text-center" style={{
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        marginBottom: '1.5rem'
                    }}>
                        Premium <span className="text-gradient-flame">Collection</span>
                    </h1>
                    <p className="text-center" style={{
                        fontSize: '1.25rem',
                        color: 'var(--steel-light)',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Discover gas lighters built for performance, safety, and style
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="section">
                <div className="container">
                    {products.length === 0 ? (
                        <div className="text-center" style={{ padding: '4rem 0' }}>
                            <div style={{
                                fontSize: '6rem',
                                marginBottom: '2rem',
                                filter: 'drop-shadow(0 0 30px var(--flame-glow))'
                            }}>🔥</div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '2rem' }}>No products available yet</h3>
                            <p style={{ color: 'var(--steel-light)', fontSize: '1.125rem' }}>
                                Check back soon for our latest collection!
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
                            gap: '2.5rem'
                        }}>
                            {products.map((product, index) => (
                                <Link
                                    href={`/products/${product._id}`}
                                    key={product._id}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div
                                        className="card-cinematic scroll-reveal"
                                        style={{
                                            transitionDelay: `${index * 0.1}s`,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                            padding: 0
                                        }}
                                    >
                                        <div style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            height: '300px'
                                        }}>
                                            {product.image ? (
                                                <img
                                                    src={`${API_URL}${product.image}`}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.6s ease'
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/350x300?text=Product+Image'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'var(--charcoal-medium)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '5rem'
                                                }}>
                                                    🔥
                                                </div>
                                            )}

                                            {/* Flame Glow Overlay */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'radial-gradient(circle at center, transparent 40%, rgba(13,13,13,0.8) 100%)',
                                                opacity: 0,
                                                transition: 'opacity 0.4s'
                                            }} className="product-overlay"></div>
                                        </div>

                                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{
                                                fontSize: '1.75rem',
                                                marginBottom: '1rem',
                                                color: 'var(--heat-white)'
                                            }}>
                                                {product.name}
                                            </h3>

                                            <p style={{
                                                fontSize: '2rem',
                                                fontWeight: '900',
                                                background: 'var(--gradient-flame)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                marginBottom: '1rem'
                                            }}>
                                                ₹{product.price}
                                            </p>

                                            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                {product.material && (
                                                    <span style={{
                                                        padding: '0.4rem 1rem',
                                                        background: 'var(--charcoal-medium)',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.875rem',
                                                        color: 'var(--steel-light)',
                                                        border: '1px solid rgba(255,255,255,0.1)'
                                                    }}>
                                                        {product.material}
                                                    </span>
                                                )}
                                                {product.color && (
                                                    <span style={{
                                                        padding: '0.4rem 1rem',
                                                        background: 'var(--charcoal-medium)',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.875rem',
                                                        color: 'var(--steel-light)',
                                                        border: '1px solid rgba(255,255,255,0.1)'
                                                    }}>
                                                        {product.color}
                                                    </span>
                                                )}
                                            </div>

                                            {product.description && (
                                                <p style={{
                                                    color: 'var(--steel-light)',
                                                    flex: 1,
                                                    marginBottom: '1.5rem',
                                                    lineHeight: '1.6'
                                                }}>
                                                    {product.description.substring(0, 100)}
                                                    {product.description.length > 100 ? '...' : ''}
                                                </p>
                                            )}

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                color: 'var(--flame-orange)',
                                                fontWeight: '700',
                                                fontSize: '1rem',
                                                marginTop: 'auto'
                                            }}>
                                                View Details
                                                <span style={{ fontSize: '1.5rem' }}>→</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <style jsx>{`
                .card-cinematic:hover .product-overlay {
                    opacity: 1;
                }
            `}</style>
        </div>
    )
}
