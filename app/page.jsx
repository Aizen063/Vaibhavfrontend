'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FlameIcon, ChatIcon, StrongIcon, CheckIcon, StarIcon, ShoppingBagIcon, SparkleIcon, ArrowRightIcon, ShieldIcon, ChefHatIcon, UtensilsIcon, PotIcon, KitchenTimerIcon } from '@/app/components/Icons'

export default function Home() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // Mouse tracking for 3D parallax
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 30,
                y: (e.clientY / window.innerHeight - 0.5) * 30
            })
        }
        window.addEventListener('mousemove', handleMouseMove)

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

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            observer.disconnect()
        }
    }, [])

    return (
        <>
            {/* Section 1: Hero - 3D Immersive */}
            <section className="hero-cinematic">
                {/* Animated Gradient Orbs */}
                <div className="flame-glow flame-glow-1"></div>
                <div className="flame-glow flame-glow-2"></div>

                <div className="hero-content">
                    <h1 className="hero-title" style={{
                        transform: `translateX(${mousePosition.x * 0.1}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}>
                        Every Flame Starts <br />
                        With <span className="text-gradient-primary">Trust</span>
                    </h1>

                    <p className="hero-subtitle" style={{
                        transform: `translateX(${-mousePosition.x * 0.05}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}>
                        Premium gas lighters designed for your kitchen. Safe, reliable, and built to last—<br />
                        perfect for every home chef and family cook.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginTop: '3rem'
                    }}>
                        <Link href="/products" className="btn btn-flame btn-large">
                            <FlameIcon size={24} /> Explore Products
                        </Link>
                        <Link href="/contact" className="btn btn-outline btn-large">
                            <ChatIcon size={24} /> Contact Us
                        </Link>
                    </div>

                    {/* Stats Bar - Glassmorphic */}
                    <div style={{
                        marginTop: '5rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        maxWidth: '900px',
                        margin: '5rem auto 0'
                    }} className="scroll-reveal">
                        {[
                            { label: 'Happy Customers', value: '1000+', icon: <StarIcon size={32} /> },
                            { label: 'Years Experience', value: '15+', icon: <FlameIcon size={32} /> },
                            { label: 'Quality Products', value: '100%', icon: <CheckIcon size={32} /> }
                        ].map((stat, i) => (
                            <div key={i} className="glass-card" style={{
                                padding: '2rem',
                                textAlign: 'center',
                                transitionDelay: `${i * 0.1}s`
                            }}>
                                <div style={{ marginBottom: '0.75rem', opacity: 0.8 }}>{stat.icon}</div>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '900',
                                    background: 'var(--gradient-primary)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    marginBottom: '0.5rem'
                                }}>{stat.value}</div>
                                <div style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'fadeInUp 1s ease-out 1.5s backwards'
                }}>
                    <div style={{
                        width: '2px',
                        height: '60px',
                        background: 'linear-gradient(to bottom, var(--primary-500), transparent)',
                        margin: '0 auto',
                        animation: 'fadeInUp 2s ease-in-out infinite'
                    }}></div>
                </div>
            </section>

            {/* Section 2: Premium Features - 3D Cards */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center scroll-reveal" style={{ marginBottom: '1.5rem' }}>
                        Built for <span className="text-gradient-primary">Performance</span>
                    </h2>
                    <p className="text-center scroll-reveal" style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        margin: '0 auto 5rem'
                    }}>
                        Every product meets our rigorous standards for quality, safety, and reliability
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            {
                                icon: <FlameIcon size={72} />,
                                title: 'Kitchen Ready',
                                stat: 'Every Time',
                                desc: 'Reliable ignition for all your cooking needs—from morning tea to dinner prep',
                                gradient: 'var(--gradient-primary)'
                            },
                            {
                                icon: <StrongIcon size={72} />,
                                title: 'Kitchen Tough',
                                stat: '5+ Years',
                                desc: 'Built to withstand daily cooking demands and frequent kitchen use',
                                gradient: 'var(--gradient-secondary)'
                            },
                            {
                                icon: <ShieldIcon size={72} />,
                                title: 'Family Safe',
                                stat: 'Certified',
                                desc: 'Child-safe mechanisms and quality tested—safe for every family kitchen',
                                gradient: 'var(--gradient-accent)'
                            }
                        ].map((item, index) => (
                            <div key={index} className="card-cinematic scroll-reveal card-3d" style={{
                                textAlign: 'center',
                                transitionDelay: `${index * 0.15}s`,
                                padding: '3rem 2rem'
                            }}>
                                <div style={{
                                    fontSize: '4rem',
                                    marginBottom: '1.5rem',
                                    filter: 'drop-shadow(0 8px 16px rgba(139, 92, 246, 0.4))',
                                    animation: 'flameFloat 4s ease-in-out infinite',
                                    animationDelay: `${index * 0.5}s`
                                }}>
                                    {item.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '3rem',
                                    fontWeight: '900',
                                    marginBottom: '0.5rem',
                                    background: item.gradient,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    {item.stat}
                                </h3>
                                <h4 style={{
                                    marginBottom: '1rem',
                                    fontSize: '1.5rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: '700'
                                }}>{item.title}</h4>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    marginBottom: 0,
                                    lineHeight: '1.7'
                                }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Timeline Story - Horizontal Scroll on Desktop */}
            <section className="section" style={{ background: 'var(--bg-primary)' }}>
                <div className="container">
                    <h2 className="text-center scroll-reveal" style={{ marginBottom: '2rem' }}>
                        From Our Kitchen <span className="text-gradient-accent">To Yours</span>
                    </h2>
                    <p className="text-center scroll-reveal" style={{
                        maxWidth: '700px',
                        margin: '0 auto 5rem',
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)'
                    }}>
                        A family business built on trust, quality, and the warmth of home
                    </p>

                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {[
                            {
                                year: '2010',
                                title: 'The Spark',
                                desc: 'Hiren Rathod started with a simple vision: bring quality gas lighters to every kitchen in the region',
                                color: 'var(--gradient-primary)'
                            },
                            {
                                year: 'Today',
                                title: '1000+ Happy Customers',
                                desc: 'Trusted by families across the region for reliable, safe, and stylish kitchen essentials',
                                color: 'var(--gradient-secondary)'
                            },
                            {
                                year: 'Future',
                                title: 'Growing Together',
                                desc: 'Expanding our product line while maintaining the family values and quality that define us',
                                color: 'var(--gradient-accent)'
                            }
                        ].map((item, index) => (
                            <div key={index} className="scroll-reveal timeline-item glass-card" style={{
                                display: 'grid',
                                gridTemplateColumns: '180px 1fr',
                                gap: '3rem',
                                marginBottom: '3rem',
                                padding: '2.5rem',
                                transitionDelay: `${index * 0.2}s`,
                                alignItems: 'center'
                            }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontSize: '3.5rem',
                                        fontWeight: '900',
                                        background: item.color,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}>
                                        {item.year}
                                    </div>
                                </div>
                                <div style={{
                                    borderLeft: '4px solid var(--primary-500)',
                                    paddingLeft: '2rem',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '-10px',
                                        top: '0',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: item.color,
                                        boxShadow: '0 0 20px var(--primary-500)',
                                        animation: 'glowPulse 2s ease-in-out infinite'
                                    }}></div>
                                    <h3 style={{
                                        marginBottom: '1rem',
                                        fontSize: '2rem',
                                        fontWeight: '700'
                                    }}>{item.title}</h3>
                                    <p style={{
                                        color: 'var(--text-muted)',
                                        marginBottom: 0,
                                        fontSize: '1.125rem',
                                        lineHeight: '1.7'
                                    }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: Product Highlight - Bento Grid */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center scroll-reveal" style={{ marginBottom: '2rem' }}>
                        Premium <span className="text-gradient-secondary">Collection</span>
                    </h2>
                    <p className="text-center scroll-reveal" style={{
                        maxWidth: '700px',
                        margin: '0 auto 5rem',
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)'
                    }}>
                        Each lighter is crafted with precision, designed for reliability, and built to last
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2.5rem',
                        marginBottom: '3rem'
                    }}>
                        <div className="glass-card scroll-reveal hover-lift-3d" style={{
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                            padding: '3.5rem 3rem',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '5px',
                                background: 'var(--gradient-primary)'
                            }}></div>

                            <div style={{
                                fontSize: '6rem',
                                marginBottom: '2rem',
                                filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
                            }}>
                                <FlameIcon size={96} />
                            </div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>Premium Quality</h3>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '1.125rem',
                                marginBottom: '2.5rem',
                                lineHeight: '1.7'
                            }}>
                                Every product undergoes rigorous quality testing and certification
                            </p>
                            <Link href="/products" className="btn btn-primary">
                                <ShoppingBagIcon size={20} /> View Products
                            </Link>
                        </div>

                        <div className="glass-card scroll-reveal hover-lift-3d" style={{
                            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                            padding: '3.5rem 3rem',
                            textAlign: 'center',
                            transitionDelay: '0.2s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '5px',
                                background: 'var(--gradient-accent)'
                            }}></div>

                            <div style={{
                                fontSize: '6rem',
                                marginBottom: '2rem',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}>
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} size={40} filled={true} />
                                ))}
                            </div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
                                <span style={{
                                    background: 'var(--gradient-accent)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>4.9/5</span> Rating
                            </h3>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '1.125rem',
                                marginBottom: '2.5rem',
                                lineHeight: '1.7'
                            }}>
                                Trusted by over 1000+ satisfied customers across the region
                            </p>
                            <div style={{
                                fontSize: '0.95rem',
                                color: 'var(--text-secondary)',
                                fontWeight: '600'
                            }}>
                                ⭐⭐⭐⭐⭐ Excellent
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: CTA - Bold & Interactive */}
            <section className="section-full" style={{
                background: 'var(--bg-primary)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Multiple gradient orbs */}
                <div className="flame-glow" style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)'
                }}></div>
                <div className="flame-glow" style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
                    animationDelay: '2s'
                }}></div>

                <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="scroll-reveal">
                        <SparkleIcon size={64} style={{ marginBottom: '2rem', opacity: 0.8 }} />
                    </div>

                    <h2 className="text-oversized scroll-reveal" style={{ marginBottom: '2rem' }}>
                        Light Your Kitchen <br />
                        <span className="text-gradient-primary">With Confidence</span>
                    </h2>

                    <p className="scroll-reveal" style={{
                        fontSize: '1.5rem',
                        maxWidth: '800px',
                        margin: '0 auto 4rem',
                        color: 'var(--text-muted)',
                        fontWeight: '500'
                    }}>
                        Connect with Hiren or Vaibhav for personalized assistance and expert guidance
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
                            <ChatIcon size={24} /> WhatsApp Hiren
                        </a>
                        <a
                            href="https://wa.me/919664740945?text=Hi%20Vaibhav!%20I'm%20interested%20in%20your%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-flame btn-large"
                        >
                            <ChatIcon size={24} /> WhatsApp Vaibhav
                        </a>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <Link href="/contact" className="btn btn-outline btn-large">
                            <ArrowRightIcon size={24} /> Visit Contact Page
                        </Link>
                    </div>
                </div>
            </section>

            {/* Responsive Timeline Styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .timeline-item {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                        text-align: center !important;
                    }
                    .timeline-item > div:first-child {
                        text-align: center !important;
                    }
                    .timeline-item > div:last-child {
                        border-left: none !important;
                        padding-left: 0 !important;
                        border-top: 4px solid var(--primary-500);
                        padding-top: 1.5rem !important;
                    }
                    .timeline-item > div:last-child > div:first-child {
                        left: 50% !important;
                        top: -10px !important;
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </>
    )
}
