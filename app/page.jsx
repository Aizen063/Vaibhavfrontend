'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { FlameIcon, ChatIcon, StrongIcon, CheckIcon, StarIcon, ShoppingBagIcon } from '@/app/components/Icons'

export default function Home() {
    useEffect(() => {
        // Scroll reveal animation
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
    }, [])

    return (
        <>
            {/* Section 1: Hero - Ignition Moment */}
            <section className="hero-cinematic">
                <div className="flame-glow flame-glow-1"></div>
                <div className="flame-glow flame-glow-2"></div>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Every Flame Starts <br />
                        <span className="text-gradient-flame">With Trust</span>
                    </h1>
                    <p className="hero-subtitle">
                        Premium gas lighters for modern kitchens, crafted with precision and backed by family values
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
                        <Link href="/products" className="btn btn-flame btn-large">
                            <FlameIcon size={20} /> Explore Products
                        </Link>
                        <Link href="/contact" className="btn btn-outline btn-large">
                            <ChatIcon size={20} /> Contact Us
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'fadeInUp 1s ease-out 1s backwards'
                }}>
                    <div style={{
                        width: '2px',
                        height: '60px',
                        background: 'linear-gradient(to bottom, var(--flame-orange), transparent)',
                        margin: '0 auto',
                        animation: 'fadeInUp 2s ease-in-out infinite'
                    }}></div>
                </div>
            </section>

            {/* Section 2: Product DNA - Horizontal Scroll */}
            <section className="section" style={{ background: 'var(--charcoal-dark)' }}>
                <div className="container">
                    <h2 className="text-center scroll-reveal" style={{ marginBottom: '4rem' }}>
                        Built for <span className="text-gradient-flame">Performance</span>
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                icon: <FlameIcon size={64} />,
                                title: 'Flame Strength',
                                stat: '100%',
                                desc: 'Consistent, powerful ignition every single time'
                            },
                            {
                                icon: <StrongIcon size={64} />,
                                title: 'Build Quality',
                                stat: 'Premium',
                                desc: 'Durable materials built to last for years'
                            },
                            {
                                icon: <CheckIcon size={64} />,
                                title: 'Safety First',
                                stat: 'Certified',
                                desc: 'Child-safe mechanisms and quality tested'
                            }
                        ].map((item, index) => (
                            <div key={index} className="card-cinematic scroll-reveal" style={{
                                textAlign: 'center',
                                transitionDelay: `${index * 0.2}s`
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'flameFlicker 3s ease-in-out infinite' }}>
                                    {item.icon}
                                </div>
                                <h3 className="text-flame" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                    {item.stat}
                                </h3>
                                <h4 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{item.title}</h4>
                                <p style={{ color: 'var(--steel-light)', marginBottom: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Family Story - Timeline */}
            <section className="section" style={{ background: 'var(--charcoal-black)' }}>
                <div className="container">
                    <h2 className="text-center scroll-reveal" style={{ marginBottom: '2rem' }}>
                        From Our Kitchen <span className="text-gradient-flame">To Yours</span>
                    </h2>
                    <p className="text-center scroll-reveal" style={{
                        maxWidth: '700px',
                        margin: '0 auto 5rem',
                        fontSize: '1.25rem',
                        color: 'var(--steel-light)'
                    }}>
                        A family business built on trust, quality, and the warmth of home
                    </p>

                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            {
                                year: '2010',
                                title: 'The Spark',
                                desc: 'Hiren Rathod started with a simple vision: bring quality gas lighters to every kitchen'
                            },
                            {
                                year: 'Today',
                                title: '1000+ Happy Customers',
                                desc: 'Trusted by families across the region for reliable, safe, and stylish kitchen essentials'
                            },
                            {
                                year: 'Future',
                                title: 'Growing Together',
                                desc: 'Expanding our product line while maintaining the family values that define us'
                            }
                        ].map((item, index) => (
                            <div key={index} className="scroll-reveal timeline-item" style={{
                                display: 'grid',
                                gridTemplateColumns: '150px 1fr',
                                gap: '3rem',
                                marginBottom: '4rem',
                                transitionDelay: `${index * 0.2}s`
                            }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontSize: '3rem',
                                        fontWeight: '900',
                                        background: 'var(--gradient-flame)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        {item.year}
                                    </div>
                                </div>
                                <div style={{
                                    borderLeft: '3px solid var(--flame-orange)',
                                    paddingLeft: '2rem',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '-9px',
                                        top: '0',
                                        width: '15px',
                                        height: '15px',
                                        borderRadius: '50%',
                                        background: 'var(--flame-orange)',
                                        boxShadow: '0 0 20px var(--flame-glow)',
                                        animation: 'glowPulse 2s ease-in-out infinite'
                                    }}></div>
                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--steel-light)', marginBottom: 0, fontSize: '1.125rem' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <style jsx>{`
                        @media (max-width: 768px) {
                            .timeline-item {
                                grid-template-columns: 1fr !important;
                                gap: 1rem !important;
                                text-align: center !important;
                            }
                            .timeline-item > div:first-child {
                                text-align: center !important;
                            }
                            .timeline-item > div:last-child {
                                border-left: none !important;
                                padding-left: 0 !important;
                                border-top: 3px solid var(--flame-orange);
                                padding-top: 1.5rem !important;
                            }
                            .timeline-item > div:last-child > div:first-child {
                                left: 50% !important;
                                top: -9px !important;
                                transform: translateX(-50%);
                            }
                        }
                    `}</style>
                </div>
            </section>

            {/* Section 4: Product Showcase - Asymmetric */}
            <section className="section" style={{ background: 'var(--charcoal-dark)' }}>
                <div className="container">
                    <h2 className="text-center scroll-reveal" style={{ marginBottom: '2rem' }}>
                        Premium <span className="text-gradient-flame">Collection</span>
                    </h2>
                    <p className="text-center scroll-reveal" style={{
                        maxWidth: '700px',
                        margin: '0 auto 5rem',
                        fontSize: '1.25rem',
                        color: 'var(--steel-light)'
                    }}>
                        Each lighter is crafted with precision, designed for reliability, and built to last
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        <div className="card-cinematic scroll-reveal" style={{
                            background: 'var(--charcoal-medium)',
                            padding: '3rem',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '6rem',
                                marginBottom: '2rem',
                                filter: 'drop-shadow(0 0 30px var(--flame-glow))'
                            }}>🔥</div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Premium Quality</h3>
                            <p style={{ color: 'var(--steel-light)', fontSize: '1.125rem', marginBottom: '2rem' }}>
                                Every product undergoes rigorous quality testing
                            </p>
                            <Link href="/products" className="btn btn-flame">
                                View Products
                            </Link>
                        </div>

                        <div className="card-cinematic scroll-reveal" style={{
                            background: 'var(--charcoal-medium)',
                            padding: '3rem',
                            textAlign: 'center',
                            transitionDelay: '0.2s'
                        }}>
                            <div style={{
                                fontSize: '6rem',
                                marginBottom: '2rem',
                                filter: 'drop-shadow(0 0 30px var(--flame-glow))'
                            }}>⭐</div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>4.9 Rating</h3>
                            <p style={{ color: 'var(--steel-light)', fontSize: '1.125rem', marginBottom: '2rem' }}>
                                Trusted by over 1000+ satisfied customers
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                fontSize: '1.5rem'
                            }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} style={{ color: 'var(--flame-orange)' }}>★</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: CTA */}
            <section className="section-full" style={{
                background: 'var(--gradient-charcoal)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="flame-glow" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '800px'
                }}></div>

                <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
                    <h2 className="text-oversized scroll-reveal" style={{ marginBottom: '2rem' }}>
                        Light Your Kitchen <br />
                        <span className="text-gradient-flame">With Confidence</span>
                    </h2>
                    <p className="scroll-reveal" style={{
                        fontSize: '1.5rem',
                        maxWidth: '800px',
                        margin: '0 auto 4rem',
                        color: 'var(--steel-light)'
                    }}>
                        Connect with Hiren or Vaibhav for personalized assistance
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }} className="scroll-reveal">
                        <a
                            href="https://wa.me/918000075523?text=Hi%20Hiren!%20I'm%20interested%20in%20your%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-flame btn-large"
                        >
                            💬 WhatsApp Hiren
                        </a>
                        <a
                            href="https://wa.me/919664740945?text=Hi%20Vaibhav!%20I'm%20interested%20in%20your%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-flame btn-large"
                        >
                            💬 WhatsApp Vaibhav
                        </a>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <Link href="/contact" className="btn btn-outline btn-large">
                            📧 Visit Contact Page
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
