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
                background: 'var(--bg-primary)'
            }}>
                <div className="spinner"></div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="section" style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
                <div className="container">
                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: '#ff6b6b', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
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
        <>
            <div className="product-detail-wrapper">
                {/* Back Button - Mobile Friendly */}
                <div className="back-section">
                    <div className="container">
                        <Link href="/products" className="back-link">
                            <span>←</span> Back to Products
                        </Link>
                    </div>
                </div>

                <div className="product-detail-container">
                    <div className="container">
                        <div className="product-grid">
                            {/* Product Image Section */}
                            <div className="product-image-section">
                                {product.image ? (
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image'
                                        }}
                                    />
                                ) : (
                                    <div className="product-image-placeholder">
                                        🔥
                                    </div>
                                )}
                            </div>

                            {/* Product Info Section */}
                            <div className="product-info-section">
                                <h1 className="product-title">{product.name}</h1>

                                {/* Price */}
                                <div className="product-price-section">
                                    <span className="product-price">₹{product.price}</span>
                                </div>

                                {/* Specifications */}
                                {(product.material || product.color) && (
                                    <div className="product-specifications">
                                        <h3 className="spec-heading">Specifications</h3>
                                        <div className="spec-list">
                                            {product.material && (
                                                <div className="spec-item">
                                                    <span className="spec-label">Material</span>
                                                    <span className="spec-value">{product.material}</span>
                                                </div>
                                            )}
                                            {product.color && (
                                                <div className="spec-item">
                                                    <span className="spec-label">Color</span>
                                                    <span className="spec-value">{product.color}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                {product.description && (
                                    <div className="product-description">
                                        <h3 className="desc-heading">Product Details</h3>
                                        <p className="desc-text">{product.description}</p>
                                    </div>
                                )}

                                {/* Desktop Contact Buttons */}
                                <div className="contact-buttons-desktop">
                                    <button
                                        onClick={() => handleWhatsAppInquiry('8000075523', 'Hiren')}
                                        className="whatsapp-btn"
                                    >
                                        <span className="whatsapp-icon">💬</span>
                                        <div className="whatsapp-info">
                                            <span className="whatsapp-name">Contact Hiren</span>
                                            <span className="whatsapp-number">8000075523</span>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handleWhatsAppInquiry('9664740945', 'Vaibhav')}
                                        className="whatsapp-btn"
                                    >
                                        <span className="whatsapp-icon">💬</span>
                                        <div className="whatsapp-info">
                                            <span className="whatsapp-name">Contact Vaibhav</span>
                                            <span className="whatsapp-number">9664740945</span>
                                        </div>
                                    </button>
                                </div>

                                {/* Add some spacing for mobile sticky footer */}
                                <div className="mobile-spacing"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Footer with Contact Buttons */}
                <div className="mobile-sticky-footer">
                    <button
                        onClick={() => handleWhatsAppInquiry('8000075523', 'Hiren')}
                        className="mobile-contact-btn"
                    >
                        <span>💬</span>
                        <span>Contact Hiren</span>
                    </button>
                    <button
                        onClick={() => handleWhatsAppInquiry('9664740945', 'Vaibhav')}
                        className="mobile-contact-btn"
                    >
                        <span>💬</span>
                        <span>Contact Vaibhav</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .product-detail-wrapper {
                    background: var(--bg-primary);
                    background-image: var(--gradient-mesh);
                    min-height: 100vh;
                    padding-bottom: 80px;
                }

                .back-section {
                    background: rgba(21, 8, 40, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(249, 115, 22, 0.2);
                    padding: 1rem 0;
                }

                .back-link {
                    color: #f97316;
                    font-weight: 600;
                    font-size: 0.95rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: gap 0.2s;
                }

                .back-link:hover {
                    gap: 0.75rem;
                    color: #fb923c;
                }

                .product-detail-container {
                    padding: 2rem 0;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    align-items: start;
                }

                .product-image-section {
                    position: sticky;
                    top: 2rem;
                    background: var(--bg-secondary);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid rgba(249, 115, 22, 0.2);
                }

                .product-image {
                    width: 100%;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .product-image-placeholder {
                    width: 100%;
                    aspect-ratio: 1;
                    background: var(--bg-tertiary);
                    border: 1px solid rgba(249, 115, 22, 0.2);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 5rem;
                }

                .product-info-section {
                    background: transparent;
                }

                .product-title {
                    font-size: clamp(1.75rem, 4vw, 2.5rem);
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .product-price-section {
                    padding: 1.5rem 0;
                    border-bottom: 1px solid rgba(249, 115, 22, 0.2);
                    margin-bottom: 1.5rem;
                }

                .product-price {
                    font-size: 2.5rem;
                    font-weight: 900;
                    background: var(--gradient-primary);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .product-specifications {
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    background: rgba(21, 8, 40, 0.6);
                    backdrop-filter: blur(12px);
                    border-radius: 12px;
                    border: 1px solid rgba(249, 115, 22, 0.2);
                }

                .spec-heading {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                }

                .spec-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .spec-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    background: rgba(31, 15, 61, 0.4);
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .spec-label {
                    font-weight: 600;
                    color: var(--text-muted);
                    font-size: 0.95rem;
                }

                .spec-value {
                    font-weight: 600;
                    color: var(--text-primary);
                    font-size: 0.95rem;
                }

                .product-description {
                    margin-bottom: 2rem;
                }

                .desc-heading {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.75rem;
                }

                .desc-text {
                    color: var(--text-secondary);
                    line-height: 1.7;
                    font-size: 1rem;
                    margin: 0;
                }

                .contact-buttons-desktop {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .whatsapp-btn {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem 1.5rem;
                    background: var(--gradient-primary);
                    color: var(--text-primary);
                    border: none;
                    border-radius: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
                }

                .whatsapp-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
                }

                .whatsapp-icon {
                    font-size: 1.75rem;
                }

                .whatsapp-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.25rem;
                }

                .whatsapp-name {
                    font-size: 1rem;
                    font-weight: 800;
                }

                .whatsapp-number {
                    font-size: 0.875rem;
                    opacity: 0.9;
                }

                .mobile-spacing {
                    display: none;
                }

                .mobile-sticky-footer {
                    display: none;
                }

                /* Mobile Styles - Compact & Minimal */
                @media (max-width: 768px) {
                    .product-detail-wrapper {
                        padding-bottom: 90px;
                    }

                    .product-detail-container {
                        padding: 0;
                    }

                    .product-grid {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }

                    .product-image-section {
                        position: static;
                        background: var(--bg-secondary);
                        padding: 0.75rem;
                        border-radius: 0;
                        border: none;
                        border-bottom: 1px solid rgba(249, 115, 22, 0.2);
                    }

                    .product-image {
                        border-radius: 8px;
                    }

                    .product-info-section {
                        padding: 0.875rem;
                    }

                    .product-title {
                        font-size: 1.125rem;
                        margin-bottom: 0.5rem;
                        line-height: 1.3;
                    }

                    .product-price-section {
                        padding: 0.875rem 0;
                        margin-bottom: 0.875rem;
                    }

                    .product-price {
                        font-size: 1.5rem;
                    }

                    .product-specifications {
                        margin-bottom: 1rem;
                        padding: 0.875rem;
                    }

                    .spec-heading {
                        font-size: 0.95rem;
                        margin-bottom: 0.625rem;
                    }

                    .spec-item {
                        padding: 0.5rem;
                    }

                    .spec-label,
                    .spec-value {
                        font-size: 0.8125rem;
                    }

                    .product-description {
                        margin-bottom: 1rem;
                    }

                    .desc-heading {
                        font-size: 0.95rem;
                        margin-bottom: 0.5rem;
                    }

                    .desc-text {
                        font-size: 0.8125rem;
                        line-height: 1.6;
                    }

                    .contact-buttons-desktop {
                        display: none;
                    }

                    .mobile-spacing {
                        display: block;
                        height: 1.5rem;
                    }

                    /* Mobile Sticky Footer - Dark Theme */
                    .mobile-sticky-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 0.625rem;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: rgba(21, 8, 40, 0.95);
                        backdrop-filter: blur(16px);
                        padding: 0.625rem;
                        border-top: 1px solid rgba(249, 115, 22, 0.3);
                        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
                        z-index: 100;
                    }

                    .mobile-contact-btn {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 0.25rem;
                        padding: 0.75rem 0.5rem;
                        background: var(--gradient-primary);
                        color: var(--text-primary);
                        border: none;
                        border-radius: 8px;
                        font-weight: 700;
                        font-size: 0.75rem;
                        cursor: pointer;
                        transition: all 0.2s;
                        box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
                    }

                    .mobile-contact-btn:active {
                        transform: scale(0.97);
                    }

                    .mobile-contact-btn span:first-child {
                        font-size: 1.25rem;
                    }
                }

                /* Extra small screens - Even more compact */
                @media (max-width: 480px) {
                    .product-info-section {
                        padding: 0.75rem;
                    }

                    .product-title {
                        font-size: 1rem;
                    }

                    .product-price {
                        font-size: 1.375rem;
                    }

                    .product-specifications {
                        padding: 0.75rem;
                    }

                    .spec-heading {
                        font-size: 0.875rem;
                    }

                    .spec-item {
                        padding: 0.375rem 0.5rem;
                    }

                    .spec-label,
                    .spec-value {
                        font-size: 0.75rem;
                    }

                    .desc-heading {
                        font-size: 0.875rem;
                    }

                    .desc-text {
                        font-size: 0.75rem;
                    }

                    .mobile-sticky-footer {
                        padding: 0.5rem;
                        gap: 0.5rem;
                    }

                    .mobile-contact-btn {
                        font-size: 0.6875rem;
                        padding: 0.625rem 0.375rem;
                        gap: 0.1875rem;
                    }

                    .mobile-contact-btn span:first-child {
                        font-size: 1.125rem;
                    }
                }
            `}</style>
        </>
    )
}
