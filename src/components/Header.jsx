import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Wellness', path: '/wellness' },
    { name: 'Products', path: '/products' },
    { name: 'Occupational Health', shortName: 'Occ Health', path: '/occupational-health' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isHome && !scrolled
          ? 'bg-transparent py-5'
          : 'bg-gradient-to-b from-brand-teal-deep/90 to-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
          
          {/* Logo and Business Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <img
              src="/3D logo.png"
              alt="HM Occhealth & Holistic Wellness Logo"
              className={`object-contain transition-all duration-300 shrink-0 ${
                scrolled
                  ? 'w-9 h-9 sm:w-10 sm:h-10'
                  : 'w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12'
              }`}
            />
            <div className="leading-tight shrink-0">
              <span className="block font-serif text-sm sm:text-base xl:text-lg font-bold tracking-tight text-white transition-colors duration-300 whitespace-nowrap">
                HM Occhealth &amp; Holistic Wellness
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-widest font-semibold uppercase text-brand-pink/90 transition-colors duration-300 whitespace-nowrap">
                Hazel Kivedo • Registered Nurse
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white/20 text-white font-semibold shadow-sm backdrop-blur-sm'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.shortName ? (
                    <>
                      <span className="lg:inline xl:hidden">{link.shortName}</span>
                      <span className="hidden xl:inline">{link.name}</span>
                    </>
                  ) : (
                    link.name
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Consultation / Quote CTA */}
          <div className="hidden sm:flex items-center shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center text-xs xl:text-sm font-semibold rounded-full px-4 py-2 xl:px-5 xl:py-2.5 transition-all duration-300 shadow-md bg-white text-brand-teal-deep hover:bg-brand-pink hover:text-brand-charcoal hover:scale-105 shrink-0 whitespace-nowrap"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 19h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-brand-warm-white shadow-2xl border-b border-brand-teal/15 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-1.5 flex flex-col">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-teal text-white font-semibold shadow-sm'
                    : 'text-brand-charcoal/85 hover:text-brand-teal hover:bg-brand-teal/10'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-brand-teal/10 mt-2 space-y-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-sm font-semibold rounded-xl bg-brand-teal text-white py-3 px-4 shadow-md hover:bg-brand-teal-deep transition-all duration-200"
            >
              Request a Quote
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-xs font-bold rounded-xl bg-brand-charcoal/10 text-brand-charcoal py-2.5 px-4 border border-brand-charcoal/15 transition-all duration-200 hover:bg-brand-charcoal/20"
            >
              🔐 Management Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
