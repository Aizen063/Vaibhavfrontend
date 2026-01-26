'use client'

import './globals.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function MobileNav({ isAdminLoggedIn }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    return (
        <>
            <nav style={{
                background: 'rgba(13, 13, 13, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 107, 53, 0.2)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 2rem',
                    maxWidth: '1600px',
                    margin: '0 auto'
                }}>
                    <Link href="/" style={{
                        fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #E85D04 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.02em',
                        textDecoration: 'none'
                    }}>
                        Vaibhav Enterprises
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="desktop-nav" style={{
                        display: 'flex',
                        listStyle: 'none',
                        gap: '2.5rem',
                        alignItems: 'center'
                    }}>
                        <li><Link href="/" className="nav-link-main">Home</Link></li>
                        <li><Link href="/products" className="nav-link-main">Products</Link></li>
                        <li><Link href="/contact" className="nav-link-main">Contact</Link></li>
                        {isAdminLoggedIn && (
                            <li><Link href="/admin/dashboard" className="nav-link-main">Dashboard</Link></li>
                        )}
                        <li><Link href="/admin/login" className="nav-link-admin">Admin</Link></li>
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        style={{
                            display: 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            zIndex: 1001
                        }}
                    >
                        <div style={{
                            width: '28px',
                            height: '20px',
                            position: 'relative',
                            transform: 'rotate(0deg)',
                            transition: '0.5s ease-in-out'
                        }}>
                            <span style={{
                                display: 'block',
                                position: 'absolute',
                                height: '3px',
                                width: '100%',
                                background: isMenuOpen ? 'var(--flame-orange)' : '#fff',
                                borderRadius: '3px',
                                opacity: 1,
                                left: 0,
                                transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                top: isMenuOpen ? '8px' : '0px',
                                transition: '0.25s ease-in-out'
                            }}></span>
                            <span style={{
                                display: 'block',
                                position: 'absolute',
                                height: '3px',
                                width: '100%',
                                background: '#fff',
                                borderRadius: '3px',
                                opacity: isMenuOpen ? 0 : 1,
                                left: 0,
                                top: '8px',
                                transition: '0.25s ease-in-out'
                            }}></span>
                            <span style={{
                                display: 'block',
                                position: 'absolute',
                                height: '3px',
                                width: '100%',
                                background: isMenuOpen ? 'var(--flame-orange)' : '#fff',
                                borderRadius: '3px',
                                opacity: 1,
                                left: 0,
                                transform: isMenuOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                                top: isMenuOpen ? '8px' : '16px',
                                transition: '0.25s ease-in-out'
                            }}></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(13, 13, 13, 0.98)',
                backdropFilter: 'blur(10px)',
                zIndex: 999,
                display: isMenuOpen ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                padding: '2rem'
            }}>
                <Link
                    href="/"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Home
                </Link>
                <Link
                    href="/products"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Products
                </Link>
                <Link
                    href="/contact"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Contact
                </Link>
                {isAdminLoggedIn && (
                    <Link
                        href="/admin/dashboard"
                        className="mobile-nav-link"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: '#fff',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Dashboard
                    </Link>
                )}
                <Link
                    href="/admin/login"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--steel-light)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Admin
                </Link>
            </div>

            <style jsx>{`
                .mobile-nav-link:hover {
                    color: var(--flame-orange) !important;
                    transform: translateX(10px);
                }
            `}</style>
        </>
    )
}

export default function RootLayout({ children }) {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

    useEffect(() => {
        // Check if admin is logged in
        const checkAdminAuth = () => {
            const token = localStorage.getItem('adminToken')
            setIsAdminLoggedIn(!!token)
        }

        // Check on mount
        checkAdminAuth()

        // Listen for storage changes (login/logout events)
        window.addEventListener('storage', checkAdminAuth)

        // Custom event for same-tab login/logout
        window.addEventListener('adminAuthChange', checkAdminAuth)

        return () => {
            window.removeEventListener('storage', checkAdminAuth)
            window.removeEventListener('adminAuthChange', checkAdminAuth)
        }
    }, [])
    return (
        <html lang="en">
            <head>
                <title>Vaibhav Enterprises - Every Flame Starts With Trust</title>
                <meta name="description" content="Premium kitchenware gas lighters. Family-owned business delivering quality, safety, and style for modern kitchens." />
                <meta name="keywords" content="gas lighter, kitchenware, kitchen accessories, Vaibhav Enterprises, Hiren Rathod, Vaibhav Rathod" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <MobileNav isAdminLoggedIn={isAdminLoggedIn} />
                <main>{children}</main>

                <footer style={{
                    background: 'var(--charcoal-dark)',
                    borderTop: '2px solid var(--flame-orange)',
                    padding: '4rem 0 2rem',
                    marginTop: '6rem'
                }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '3rem',
                            marginBottom: '3rem'
                        }}>
                            <div>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Vaibhav Enterprises</h3>
                                <p style={{ color: 'var(--steel-light)' }}>
                                    Your trusted partner for premium kitchenware gas lighters. Every flame starts with trust.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Quick Links</h3>
                                <p><Link href="/" style={{ color: 'var(--steel-light)' }}>Home</Link></p>
                                <p><Link href="/products" style={{ color: 'var(--steel-light)' }}>Products</Link></p>
                                <p><Link href="/contact" style={{ color: 'var(--steel-light)' }}>Contact Us</Link></p>
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Contact</h3>
                                <p style={{ color: 'var(--steel-light)' }}>Hiren: 8000075523</p>
                                <p style={{ color: 'var(--steel-light)' }}>Vaibhav: 9664740945</p>
                                <p style={{ color: 'var(--steel-light)' }}>Family Business Since 2010</p>
                            </div>
                        </div>
                        <div style={{
                            textAlign: 'center',
                            paddingTop: '2rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            color: 'var(--steel-gray)'
                        }}>
                            <p>&copy; {new Date().getFullYear()} Vaibhav Enterprises. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}
