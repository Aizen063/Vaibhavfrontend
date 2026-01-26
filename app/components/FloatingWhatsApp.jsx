'use client'

import { useState } from 'react'

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false)

    const contacts = [
        { name: 'Hiren Rathod', number: '8000075523' },
        { name: 'Vaibhav Rathod', number: '9664740945' }
    ]

    const handleWhatsAppClick = (number, name) => {
        const message = `Hi! I'd like to inquire about your products.`
        const whatsappUrl = `https://wa.me/91${number}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
        setIsOpen(false)
    }

    return (
        <>
            <div className="floating-whatsapp-container">
                {isOpen && (
                    <div className="whatsapp-menu">
                        <div className="whatsapp-menu-header">
                            <h4>Contact Us</h4>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="whatsapp-close"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="whatsapp-contacts">
                            {contacts.map((contact, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleWhatsAppClick(contact.number, contact.name)}
                                    className="whatsapp-contact-btn"
                                >
                                    <span className="whatsapp-icon">💬</span>
                                    <div className="whatsapp-contact-info">
                                        <span className="whatsapp-contact-name">{contact.name}</span>
                                        <span className="whatsapp-contact-number">{contact.number}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="floating-whatsapp-btn"
                    aria-label="Contact via WhatsApp"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="28"
                        height="28"
                        fill="currentColor"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                .floating-whatsapp-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    z-index: var(--z-fixed);
                }

                .floating-whatsapp-btn {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4), 0 8px 24px rgba(37, 211, 102, 0.3);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: pulse 2s ease-in-out infinite;
                }

                .floating-whatsapp-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.5), 0 12px 32px rgba(37, 211, 102, 0.4);
                }

                .floating-whatsapp-btn:active {
                    transform: scale(0.95);
                }

                .whatsapp-menu {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    min-width: 280px;
                    overflow: hidden;
                    animation: slideUp 0.3s ease-out;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .whatsapp-menu-header {
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: white;
                    padding: 1rem 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .whatsapp-menu-header h4 {
                    margin: 0;
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: white;
                }

                .whatsapp-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }

                .whatsapp-close:hover {
                    transform: rotate(90deg);
                }

                .whatsapp-contacts {
                    padding: 0.5rem;
                }

                .whatsapp-contact-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: white;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-bottom: 0.5rem;
                }

                .whatsapp-contact-btn:last-child {
                    margin-bottom: 0;
                }

                .whatsapp-contact-btn:hover {
                    background: #f0fdf4;
                    transform: translateX(4px);
                }

                .whatsapp-icon {
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }

                .whatsapp-contact-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                }

                .whatsapp-contact-name {
                    font-weight: 600;
                    color: var(--primary-black);
                    font-size: 1rem;
                }

                .whatsapp-contact-number {
                    font-size: 0.875rem;
                    color: var(--text-light);
                }

                @media (max-width: 768px) {
                    .floating-whatsapp-container {
                        bottom: 1.5rem;
                        right: 1.5rem;
                    }

                    .floating-whatsapp-btn {
                        width: 56px;
                        height: 56px;
                    }

                    .whatsapp-menu {
                        min-width: 260px;
                        right: -10px;
                    }
                }
            `}</style>
        </>
    )
}
