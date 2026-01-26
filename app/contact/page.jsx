'use client'

import { ChatIcon, UserIcon, ClockIcon, BoltIcon, CheckIcon, MailIcon } from '@/app/components/Icons'

export default function ContactPage() {
    const handleWhatsAppContact = (phoneNumber, name) => {
        const message = `Hi ${name}! I would like to know more about your products.`
        const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }

    const handleEmailContact = (email, name) => {
        const subject = encodeURIComponent('Inquiry about Vaibhav Enterprises Products')
        const body = encodeURIComponent(`Hi ${name},\n\nI would like to know more about your gas lighter products.\n\nThank you!`)
        const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`
        window.location.href = mailtoUrl
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
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <h1 className="text-center" style={{
                        fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                        marginBottom: '1.5rem'
                    }}>
                        Let's <span className="text-gradient-flame">Connect</span>
                    </h1>
                    <p className="text-center" style={{
                        fontSize: '1.25rem',
                        color: 'var(--steel-light)',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Reach out to Hiren or Vaibhav for personalized assistance with your kitchen needs
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                        gap: '3rem',
                        marginBottom: '5rem'
                    }}>
                        {/* Hiren Card */}
                        <div className="card-cinematic" style={{
                            padding: '3rem',
                            textAlign: 'center',
                            background: 'var(--charcoal-dark)'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'var(--gradient-flame)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '4rem',
                                margin: '0 auto 2rem',
                                boxShadow: 'var(--shadow-flame)'
                            }}>
                                <UserIcon size={60} color="#FFFFFF" />
                            </div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Hiren Rathod</h3>
                            <p style={{
                                color: 'var(--steel-light)',
                                fontSize: '1.125rem',
                                marginBottom: '2rem'
                            }}>
                                Co-Founder & Product Specialist
                            </p>
                            <p style={{
                                color: 'var(--flame-orange)',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                marginBottom: '2rem'
                            }}>
                                8000075523
                            </p>
                            <button
                                onClick={() => handleWhatsAppContact('8000075523', 'Hiren')}
                                className="btn btn-flame"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                            >
                                <ChatIcon size={20} /> WhatsApp Hiren
                            </button>
                        </div>

                        {/* Vaibhav Card */}
                        <div className="card-cinematic" style={{
                            padding: '3rem',
                            textAlign: 'center',
                            background: 'var(--charcoal-dark)'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'var(--gradient-flame)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '4rem',
                                margin: '0 auto 2rem',
                                boxShadow: 'var(--shadow-flame)'
                            }}>
                                <UserIcon size={60} color="#FFFFFF" />
                            </div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Vaibhav Rathod</h3>
                            <p style={{
                                color: 'var(--steel-light)',
                                fontSize: '1.125rem',
                                marginBottom: '2rem'
                            }}>
                                Co-Founder & Customer Relations
                            </p>
                            <p style={{
                                color: 'var(--flame-orange)',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                marginBottom: '2rem'
                            }}>
                                9664740945
                            </p>
                            <button
                                onClick={() => handleWhatsAppContact('9664740945', 'Vaibhav')}
                                className="btn btn-flame"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}
                            >
                                <ChatIcon size={20} /> WhatsApp Vaibhav
                            </button>
                            <button
                                onClick={() => handleEmailContact('vr808187@gmail.com', 'Vaibhav')}
                                className="btn btn-outline"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                            >
                                <MailIcon size={20} /> Email Vaibhav
                            </button>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="card-cinematic" style={{
                        padding: '3rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: 'var(--charcoal-dark)'
                    }}>
                        <h3 style={{
                            fontSize: '2rem',
                            marginBottom: '2rem',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem'
                        }}>
                            <ClockIcon size={40} />
                            Business Hours
                        </h3>
                        <div style={{ fontSize: '1.25rem' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1.25rem 0',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <strong style={{ color: 'var(--heat-white)' }}>Monday - Sunday:</strong>
                                <span style={{ color: 'var(--steel-light)' }}>9:00 AM - 7:00 PM</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '1.25rem 0'
                            }}>
                                <strong style={{ color: 'var(--heat-white)' }}>Wednesday</strong>
                                <span style={{ color: 'var(--steel-light)' }}>10:00 AM - 5:00 PM</span>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'var(--charcoal-medium)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--flame-orange)',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <BoltIcon size={24} />
                            <p style={{
                                fontSize: '1.125rem',
                                color: 'var(--steel-light)',
                                marginBottom: 0,
                                flex: 1,
                                textAlign: 'left'
                            }}>
                                <strong style={{ color: 'var(--flame-orange)' }}>Quick Tip:</strong> For the fastest response,
                                contact us via WhatsApp during business hours!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section" style={{ background: 'var(--charcoal-dark)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '4rem' }}>
                        Why <span className="text-gradient-flame">Choose Us</span>
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            { icon: <BoltIcon size={64} />, title: 'Fast Response', desc: 'We respond to inquiries quickly, usually within a few hours.' },
                            { icon: <UserIcon size={64} />, title: 'Family Business', desc: 'Personal service and attention to every customer.' },
                            { icon: <CheckIcon size={64} />, title: 'Quality Assured', desc: 'We stand behind every product we sell.' }
                        ].map((item, index) => (
                            <div key={index} className="card-cinematic" style={{
                                textAlign: 'center',
                                padding: '3rem'
                            }}>
                                <div style={{
                                    marginBottom: '1.5rem',
                                    filter: 'drop-shadow(0 0 20px var(--flame-glow))',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    {item.icon}
                                </div>
                                <h4 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{item.title}</h4>
                                <p style={{ color: 'var(--steel-light)', fontSize: '1.125rem', marginBottom: 0 }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
