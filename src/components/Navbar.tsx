'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '910000000000'}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hi, I want to book a free trial!')}`;

const LINKS = [
    { href: '#about', label: 'About' },
    { href: '#faculty', label: 'Faculty' },
    { href: '#classes', label: 'Classes' },
    { href: '#fame', label: 'Results' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close on route change / link click
    const close = () => setOpen(false);

    return (
        <>
            <header
                className="sticky top-0 z-50 transition-shadow duration-300"
                style={{
                    background: 'rgba(250,248,245,0.95)',
                    backdropFilter: 'blur(14px)',
                    borderBottom: '1px solid var(--divider)',
                    boxShadow: scrolled ? '0 4px 24px rgba(26,58,107,0.08)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold font-display" style={{ background: 'var(--cobalt)' }}>JA</div>
                        <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--cobalt)' }}>Jaggi Academy</span>
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        {LINKS.map(({ href, label }) => (
                            <a key={href} href={href} className="sweep-link font-medium" style={{ color: 'var(--muted)' }}>{label}</a>
                        ))}
                        <a href={WA} target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 font-semibold text-white rounded-full px-5 py-2.5 text-sm transition-transform hover:scale-105 active:scale-95"
                            style={{ background: 'var(--cobalt)', boxShadow: '0 2px 12px rgba(26,58,107,0.3)' }}>
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Call Now
                        </a>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg"
                        aria-label="Toggle menu"
                        style={{ color: 'var(--cobalt)' }}
                    >
                        <span className={`block h-0.5 w-6 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--cobalt)' }} />
                        <span className={`block h-0.5 w-6 rounded transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} style={{ background: 'var(--cobalt)' }} />
                        <span className={`block h-0.5 w-6 rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--cobalt)' }} />
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
                onClick={close}
            >
                {/* Backdrop */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'rgba(15,25,50,0.5)' }} />

                {/* Slide-in panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-72 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{ background: 'var(--paper)', boxShadow: '-8px 0 40px rgba(26,58,107,0.15)' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Drawer header */}
                    <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--divider)' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold font-display" style={{ background: 'var(--cobalt)' }}>JA</div>
                            <span className="font-display font-bold" style={{ color: 'var(--cobalt)' }}>Jaggi Academy</span>
                        </div>
                        <button onClick={close} className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: 'var(--cream)', color: 'var(--muted)' }}>✕</button>
                    </div>

                    {/* Menu links */}
                    <nav className="flex flex-col p-6 gap-1 flex-grow">
                        {LINKS.map(({ href, label }) => (
                            <a key={href} href={href} onClick={close}
                                className="px-4 py-3 rounded-xl font-medium text-lg transition-colors hover:bg-[var(--cream)]"
                                style={{ color: 'var(--ink)' }}>
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Drawer CTA */}
                    <div className="p-6 border-t" style={{ borderColor: 'var(--divider)' }}>
                        <a href={WA} target="_blank" rel="noreferrer" onClick={close}
                            className="flex items-center justify-center gap-2 font-bold text-white rounded-xl py-4 text-base transition-transform hover:scale-105 active:scale-95"
                            style={{ background: 'var(--whatsapp)', boxShadow: '0 4px 16px rgba(26,122,71,0.3)' }}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Book Free Trial on WhatsApp
                        </a>
                        <p className="text-center text-xs mt-3" style={{ color: 'var(--muted)' }}>No forms. Just a quick chat.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
