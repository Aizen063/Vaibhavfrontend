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
                background: '#ffffff'
            }}>
                <div className="spinner"></div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="section" style={{ background: '#ffffff', minHeight: '100vh' }}>
                <div className="container">
                    <div style={{
                        background: '#fff3f3',
                        padding: '2rem',
                        borderRadius: '8px',
                        border: '1px solid #ffcccc',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: '#dc2626', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                            {error || 'Product not found'}
                        </p>
                        <Link href="/products" className="btn btn-primary">
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
                    background: #ffffff;
                    min-height: 100vh;
                    padding-bottom: 80px; /* Space for mobile sticky footer */
                }

                .back-section {
                    background: #ffffff;
                    border-bottom: 1px solid #e5e7eb;
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
                }

                .product-image {
                    width: 100%;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                    background: #ffffff;
                }

                .product-image-placeholder {
                    width: 100%;
                    aspect-ratio: 1;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 5rem;
                }

                .product-info-section {
                    background: #ffffff;
                }

                .product-title {
                    font-size: clamp(1.5rem, 4vw, 2rem);
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }

                .product-price-section {
                    padding: 1.5rem 0;
                    border-bottom: 1px solid #e5e7eb;
                    margin-bottom: 1.5rem;
                }

                .product-price {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #111827;
                }

                .product-specifications {
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    background: #f9fafb;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                }

                .spec-heading {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #111827;
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
                    background: #ffffff;
                    border-radius: 6px;
                }

                .spec-label {
                    font-weight: 600;
                    color: #6b7280;
                    font-size: 0.95rem;
                }

                .spec-value {
                    font-weight: 500;
                    color: #111827;
                    font-size: 0.95rem;
                }

                .product-description {
                    margin-bottom: 2rem;
                }

                .desc-heading {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 0.75rem;
                }

                .desc-text {
                    color: #4b5563;
                    line-height: 1.7;
                    font-size: 0.95rem;
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
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    color: #ffffff;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .whatsapp-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
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
                    font-size: 0.95rem;
                    font-weight: 700;
                }

                .whatsapp-number {
                    font-size: 0.85rem;
                    opacity: 0.9;
                }

                .mobile-spacing {
                    display: none;
                }

                .mobile-sticky-footer {
                    display: none;
                }

                /* Mobile Styles - Flipkart Design */
                @media (max-width: 768px) {
                    .product-detail-wrapper {
                        padding-bottom: 100px;
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
                        background: #ffffff;
                        padding: 1rem;
                        border-bottom: 1px solid #e5e7eb;
                    }

                    .product-image {
                        border-radius: 8px;
                    }

                    .product-info-section {
                        padding: 1rem;
                    }

                    .product-title {
                        font-size: 1.25rem;
                        margin-bottom: 0.75rem;
                    }

                    .product-price {
                        font-size: 1.75rem;
                    }

                    .product-specifications {
                        margin-bottom: 1.5rem;
                        padding: 1rem;
                    }

                    .spec-heading {
                        font-size: 1rem;
                    }

                    .spec-item {
                        padding: 0.5rem;
                    }

                    .spec-label,
                    .spec-value {
                        font-size: 0.875rem;
                    }

                    .desc-heading {
                        font-size: 1rem;
                    }

                    .desc-text {
                        font-size: 0.875rem;
                    }

                    /* Hide desktop contact buttons on mobile */
                    .contact-buttons-desktop {
                        display: none;
                    }

                    /* Add spacing for sticky footer */
                    .mobile-spacing {
                        display: block;
                        height: 2rem;
                    }

                    /* Mobile Sticky Footer */
                    .mobile-sticky-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 0.75rem;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: #ffffff;
                        padding: 0.75rem;
                        border-top: 1px solid #e5e7eb;
                        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                        z-index: 100;
                    }

                    .mobile-contact-btn {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 0.375rem;
                        padding: 0.875rem;
                        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                        color: #ffffff;
                        border: none;
                        border-radius: 6px;
                        font-weight: 700;
                        font-size: 0.875rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .mobile-contact-btn:active {
                        transform: scale(0.98);
                    }

                    .mobile-contact-btn span:first-child {
                        font-size: 1.5rem;
                    }
                }

                /* Extra small screens */
                @media (max-width: 480px) {
                    .product-title {
                        font-size: 1.125rem;
                    }

                    .product-price {
                        font-size: 1.5rem;
                    }

                    .mobile-contact-btn {
                        font-size: 0.8rem;
                        padding: 0.75rem 0.5rem;
                    }
                }
            `}</style>
        </>
    )
}
