'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { getImageUrl } from '@/lib/utils'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-six-sage-18.vercel.app'

export default function ProductDetailPage() {
    const params = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (params.id) {
            fetchProduct()
        }
    }, [params.id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/products/${params.id}`)
            setProduct(response.data.product)
            setError(null)
        } catch (err) {
            setError('Failed to load product details. Please try again later.')
            console.error('Error fetching product:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleWhatsAppInquiry = (phoneNumber, name) => {
        const message = `Hi ${name}! I'm interested in ${product.name} (₹${product.price}). Can you provide more details?`
        const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
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
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="section" style={{ background: 'var(--charcoal-black)' }}>
                <div className="container">
                    <div style={{
                        background: 'var(--charcoal-dark)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid var(--flame-orange)',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: 'var(--flame-orange)', fontSize: '1.25rem', marginBottom: '2rem' }}>
                            {error || 'Product not found'}
                        </p>
                        <Link href="/products" className="btn btn-flame">
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--charcoal-black)', minHeight: '100vh' }}>
            <div className="section">
                <div className="container">
                    <Link
                        href="/products"
                        style={{
                            color: 'var(--flame-orange)',
                            marginBottom: '3rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontWeight: '700',
                            fontSize: '1.125rem',
                            transition: 'gap 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.gap = '1.25rem'}
                        onMouseLeave={(e) => e.currentTarget.style.gap = '0.75rem'}
                    >
                        <span style={{ fontSize: '1.5rem' }}>←</span> Back to Products
                    </Link>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '5rem',
                        alignItems: 'start',
                        marginTop: '3rem'
                    }}>
                        {/* Product Image */}
                        <div style={{ position: 'relative' }}>
                            {product.image ? (
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            borderRadius: 'var(--radius-xl)',
                                            boxShadow: 'var(--shadow-flame)'
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image'
                                        }}
                                    />
                                    {/* Flame Glow Effect */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '80%',
                                        height: '80%',
                                        background: 'var(--gradient-glow)',
                                        filter: 'blur(60px)',
                                        zIndex: -1,
                                        animation: 'flameFlicker 3s ease-in-out infinite'
                                    }}></div>
                                </div>
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '600px',
                                    background: 'var(--charcoal-dark)',
                                    borderRadius: 'var(--radius-xl)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10rem'
                                }}>
                                    🔥
                                </div>
                            )}

                            {/* Price Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '2rem',
                                right: '2rem',
                                background: 'var(--gradient-flame)',
                                color: 'var(--heat-white)',
                                padding: '1rem 2rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: '900',
                                fontSize: '2rem',
                                boxShadow: 'var(--shadow-flame)',
                                animation: 'glowPulse 2s ease-in-out infinite'
                            }}>
                                ₹{product.price}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div>
                            <h1 style={{
                                marginBottom: '2rem',
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                lineHeight: '1.1'
                            }}>
                                {product.name}
                            </h1>

                            {/* Specs */}
                            <div style={{ marginBottom: '3rem' }}>
                                {product.material && (
                                    <div style={{
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            padding: '0.75rem 1.5rem',
                                            background: 'var(--charcoal-dark)',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '1px solid var(--flame-orange)',
                                            fontWeight: '700',
                                            color: 'var(--flame-orange)'
                                        }}>
                                            Material
                                        </span>
                                        <span style={{
                                            fontSize: '1.25rem',
                                            color: 'var(--steel-light)'
                                        }}>
                                            {product.material}
                                        </span>
                                    </div>
                                )}

                                {product.color && (
                                    <div style={{
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <span style={{
                                            padding: '0.75rem 1.5rem',
                                            background: 'var(--charcoal-dark)',
                                            borderRadius: 'var(--radius-lg)',
                                            border: '1px solid var(--flame-orange)',
                                            fontWeight: '700',
                                            color: 'var(--flame-orange)'
                                        }}>
                                            Color
                                        </span>
                                        <span style={{
                                            fontSize: '1.25rem',
                                            color: 'var(--steel-light)'
                                        }}>
                                            {product.color}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div style={{
                                    marginBottom: '3rem',
                                    padding: '2rem',
                                    background: 'var(--charcoal-dark)',
                                    borderRadius: 'var(--radius-lg)',
                                    borderLeft: '4px solid var(--flame-orange)'
                                }}>
                                    <h3 style={{
                                        marginBottom: '1rem',
                                        fontSize: '1.5rem',
                                        color: 'var(--flame-orange)'
                                    }}>
                                        About This Product
                                    </h3>
                                    <p style={{
                                        lineHeight: '1.8',
                                        color: 'var(--steel-light)',
                                        fontSize: '1.125rem',
                                        marginBottom: 0
                                    }}>
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* WhatsApp Contact */}
                            <div style={{
                                background: 'var(--charcoal-dark)',
                                padding: '2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid rgba(255, 107, 53, 0.3)'
                            }}>
                                <h3 style={{
                                    marginBottom: '2rem',
                                    fontSize: '1.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{ fontSize: '2rem' }}>💬</span>
                                    Contact Our Team
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1.5rem'
                                }}>
                                    <button
                                        onClick={() => handleWhatsAppInquiry('8000075523', 'Hiren')}
                                        className="btn btn-flame"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '1.5rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>💬</span>
                                        <span style={{ fontSize: '1.125rem', fontWeight: '800' }}>Hiren Rathod</span>
                                        <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>8000075523</span>
                                    </button>
                                    <button
                                        onClick={() => handleWhatsAppInquiry('9664740945', 'Vaibhav')}
                                        className="btn btn-flame"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '1.5rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '2rem' }}>💬</span>
                                        <span style={{ fontSize: '1.125rem', fontWeight: '800' }}>Vaibhav Rathod</span>
                                        <span style={{ fontSize: '0.95rem', opacity: 0.9 }}>9664740945</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}
