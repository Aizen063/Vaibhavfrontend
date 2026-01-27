'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { getImageUrl } from '@/lib/utils'
import { FlameIcon, ShoppingBagIcon, ArrowRightIcon, SparkleIcon } from '@/app/components/Icons'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-six-sage-18.vercel.app'

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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                backgroundImage: 'var(--gradient-mesh)',
                gap: '2rem'
            }}>
                <FlameIcon size={60} style={{ opacity: 0.4 }} />
                <div className="spinner"></div>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    letterSpacing: '1px'
                }}>
                    Loading Premium Collection...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="section" style={{
                background: 'var(--bg-primary)',
                backgroundImage: 'var(--gradient-mesh)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="container text-center">
                    <div className="glass-card" style={{
                        padding: '3rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        border: '2px solid rgba(220, 53, 69, 0.5)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.6 }}>⚠️</div>
                        <p style={{
                            color: '#ff6b6b',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '1rem'
                        }}>{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="btn btn-primary"
                            style={{ marginTop: '1rem' }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            background: 'var(--bg-primary)',
            backgroundImage: 'var(--gradient-mesh)',
            backgroundAttachment: 'fixed',
            minHeight: '100vh'
        }}>
            {/* Hero Section - Premium Header */}
            <section style={{
                background: 'var(--bg-secondary)',
                padding: '7rem 0 5rem',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                {/* Ambient orbs */}
                <div className="flame-glow" style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
                }}></div>
                <div className="flame-glow" style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
                    animationDelay: '2s'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
                            <FlameIcon size={64} />
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                            marginBottom: '1.5rem',
                            fontWeight: '900',
                            lineHeight: '1'
                        }}>
                            Premium <span className="text-gradient-primary">Collection</span>
                        </h1>
                        <p style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-muted)',
                            maxWidth: '750px',
                            margin: '0 auto',
                            fontWeight: '500',
                            lineHeight: '1.7'
                        }}>
                            Discover gas lighters built for performance, safety, and style
                        </p>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        marginTop: '3rem'
                    }}>
                        <div className="glass-card" style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '900',
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {products.length}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.25rem' }}>
                                Products Available
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem 2.5rem', textAlign: 'center' }}>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '900',
                                background: 'var(--gradient-accent)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                100%
                            </div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.25rem' }}>
                                Quality Tested
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid - Premium 3D Cards */}
            <section className="section" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
                <div className="container">
                    {products.length === 0 ? (
                        <div className="text-center" style={{ padding: '6rem 0' }}>
                            <div className="glass-card" style={{
                                padding: '4rem 3rem',
                                maxWidth: '600px',
                                margin: '0 auto'
                            }}>
                                <div style={{
                                    fontSize: '6rem',
                                    marginBottom: '2rem',
                                    filter: 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.5))'
                                }}>
                                    <FlameIcon size={96} />
                                </div>
                                <h3 style={{
                                    marginBottom: '1rem',
                                    fontSize: '2.5rem',
                                    fontWeight: '700'
                                }}>No products available yet</h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '1.25rem',
                                    lineHeight: '1.7'
                                }}>
                                    Check back soon for our latest premium collection!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
                            gap: '3rem'
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
                                            padding: 0,
                                            background: 'var(--glass-bg)',
                                        }}
                                    >
                                        {/* Image Container with 3D effect */}
                                        <div style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            height: '320px',
                                            background: 'var(--bg-tertiary)'
                                        }}>
                                            {product.image ? (
                                                <img
                                                    src={getImageUrl(product.image)}
                                                    alt={product.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/380x320?text=Product+Image'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.15) rotate(2deg)'}
                                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
                                                />
                                            ) : (
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'var(--bg-tertiary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '5rem'
                                                }}>
                                                    <FlameIcon size={96} />
                                                </div>
                                            )}

                                            {/* Gradient Overlay */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(10, 1, 24, 0.9) 0%, transparent 60%)',
                                                opacity: 0,
                                                transition: 'opacity 0.4s'
                                            }} className="product-overlay"></div>

                                            {/* Top accent bar */}
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: '4px',
                                                background: 'var(--gradient-primary)'
                                            }}></div>
                                        </div>

                                        {/* Content */}
                                        <div style={{
                                            padding: '2.5rem 2rem',
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <h3 style={{
                                                fontSize: '1.875rem',
                                                marginBottom: '1rem',
                                                color: 'var(--text-primary)',
                                                fontWeight: '700',
                                                lineHeight: '1.3'
                                            }}>
                                                {product.name}
                                            </h3>

                                            {/* Price Badge */}
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '0.75rem 1.5rem',
                                                background: 'var(--gradient-primary)',
                                                borderRadius: 'var(--radius-full)',
                                                marginBottom: '1.5rem',
                                                alignSelf: 'flex-start'
                                            }}>
                                                <span style={{
                                                    fontSize: '2rem',
                                                    fontWeight: '900',
                                                    color: 'var(--text-primary)'
                                                }}>
                                                    ₹{product.price}
                                                </span>
                                            </div>

                                            {/* Tags */}
                                            {(product.material || product.color) && (
                                                <div style={{
                                                    marginBottom: '1.5rem',
                                                    display: 'flex',
                                                    gap: '0.75rem',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    {product.material && (
                                                        <span style={{
                                                            padding: '0.5rem 1.25rem',
                                                            background: 'var(--glass-bg)',
                                                            backdropFilter: 'blur(8px)',
                                                            borderRadius: 'var(--radius-full)',
                                                            fontSize: '0.9rem',
                                                            color: 'var(--text-secondary)',
                                                            border: '1px solid var(--glass-border)',
                                                            fontWeight: '600'
                                                        }}>
                                                            {product.material}
                                                        </span>
                                                    )}
                                                    {product.color && (
                                                        <span style={{
                                                            padding: '0.5rem 1.25rem',
                                                            background: 'var(--glass-bg)',
                                                            backdropFilter: 'blur(8px)',
                                                            borderRadius: 'var(--radius-full)',
                                                            fontSize: '0.9rem',
                                                            color: 'var(--text-secondary)',
                                                            border: '1px solid var(--glass-border)',
                                                            fontWeight: '600'
                                                        }}>
                                                            {product.color}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Description */}
                                            {product.description && (
                                                <p style={{
                                                    color: 'var(--text-muted)',
                                                    flex: 1,
                                                    marginBottom: '2rem',
                                                    lineHeight: '1.7',
                                                    fontSize: '1.05rem'
                                                }}>
                                                    {product.description.substring(0, 110)}
                                                    {product.description.length > 110 ? '...' : ''}
                                                </p>
                                            )}

                                            {/* CTA */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                color: 'var(--primary-400)',
                                                fontWeight: '700',
                                                fontSize: '1.1rem',
                                                marginTop: 'auto',
                                                padding: '1rem 1.5rem',
                                                background: 'var(--glass-bg)',
                                                borderRadius: 'var(--radius-lg)',
                                                border: '1px solid var(--glass-border)',
                                                transition: 'all var(--transition-normal)'
                                            }} className="product-cta">
                                                <ShoppingBagIcon size={24} />
                                                <span>View Details</span>
                                                <ArrowRightIcon size={20} style={{ marginLeft: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Hover Effect Styles */}
            <style jsx>{`
                .card-cinematic:hover .product-overlay {
                    opacity: 1;
                }
                .card-cinematic:hover .product-cta {
                    background: var(--gradient-primary);
                    color: var(--text-primary);
                    border-color: var(--primary-500);
                    box-shadow: var(--shadow-glow-primary);
                }

                /* Mobile Compact Styles */
                @media (max-width: 768px) {
                    .card-cinematic {
                        padding: 0 !important;
                    }

                    .card-cinematic > div:first-child {
                        height: 200px !important;
                    }

                    .card-cinematic > div:last-child {
                        padding: 1.25rem 1rem !important;
                    }

                    .card-cinematic h3 {
                        font-size: 1.125rem !important;
                        margin-bottom: 0.625rem !important;
                    }

                    .card-cinematic > div:last-child > div:first-of-type {
                        padding: 0.5rem 1rem !important;
                        margin-bottom: 0.875rem !important;
                    }

                    .card-cinematic > div:last-child > div:first-of-type span {
                        font-size: 1.25rem !important;
                    }

                    .card-cinematic p {
                        font-size: 0.875rem !important;
                        margin-bottom: 1rem !important;
                        line-height: 1.5 !important;
                    }

                    .product-cta {
                        padding: 0.75rem 1rem !important;
                        font-size: 0.95rem !important;
                    }

                    .card-cinematic span[style*="padding: '0.5rem 1.25rem'"] {
                        padding: 0.375rem 0.875rem !important;
                        font-size: 0.8125rem !important;
                    }
                }

                @media (max-width: 480px) {
                    .card-cinematic > div:first-child {
                        height: 180px !important;
                    }

                    .card-cinematic > div:last-child {
                        padding: 1rem 0.875rem !important;
                    }

                    .card-cinematic h3 {
                        font-size: 1rem !important;
                        margin-bottom: 0.5rem !important;
                    }

                    .card-cinematic > div:last-child > div:first-of-type {
                        padding: 0.4375rem 0.875rem !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .card-cinematic > div:last-child > div:first-of-type span {
                        font-size: 1.125rem !important;
                    }

                    .card-cinematic p {
                        font-size: 0.8125rem !important;
                        margin-bottom: 0.875rem !important;
                    }

                    .product-cta {
                        padding: 0.625rem 0.875rem !important;
                        font-size: 0.875rem !important;
                    }
                }
            `}</style>
        </div>
    )
}
