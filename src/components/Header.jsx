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
    // Run initially to set correct state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine if header should have light/transparent styling
  // Transparent on home page only — teal gradient on all other pages
  const isLightHeader = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isHome && !scrolled
          ? 'bg-transparent py-5'
          : 'bg-gradient-to-b from-brand-teal-deep/90 to-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo and Business Name */}
          <Link to="/" className="flex items-center gap-1 group">
            <img
              src="/no-background-logo.png"
              alt="HM Occhealth & Holistic Wellness Logo"
              className={`object-contain transition-all duration-300 -mr-1.5 xs:-mr-3 sm:-mr-4 ${
                isLightHeader ? 'w-28 h-18 sm:w-36 sm:h-24' : 'w-22 h-14 sm:w-24 sm:h-16'
              }`}
            />
            <div className="leading-tight">
              <span
                className={`block font-serif text-sm xs:text-base sm:text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                  isLightHeader ? 'text-white' : 'text-white'
                }`}
              >
                HM Occhealth & Holistic Wellness
              </span>
              <span
                className={`block text-[9px] xs:text-xs tracking-widest font-semibold uppercase transition-colors duration-300 ${
                  isLightHeader ? 'text-brand-pink/90' : 'text-brand-pink/80'
                }`}
              >
                Hazel Kivedo • Registered Nurse
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors duration-200 py-1 border-b-2 ${
                isHome
                  ? 'text-white border-white'
                  : 'text-white/80 hover:text-white border-transparent hover:border-white/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors duration-200 py-1 border-b-2 ${
                location.pathname === '/about'
                  ? 'text-white border-white'
                  : 'text-white/80 hover:text-white border-transparent hover:border-white/50'
              }`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`transition-colors duration-200 py-1 border-b-2 ${
                location.pathname === '/services'
                  ? 'text-white border-white'
                  : 'text-white/80 hover:text-white border-transparent hover:border-white/50'
              }`}
            >
              Services
            </Link>
            <Link
              to="/products"
              className={`transition-colors duration-200 py-1 border-b-2 ${
                location.pathname === '/products'
                  ? 'text-white border-white'
                  : 'text-white/80 hover:text-white border-transparent hover:border-white/50'
              }`}
            >
              Products
            </Link>
            <Link
              to="/occupational-health"
              className={`transition-colors duration-200 py-1 border-b-2 ${
                location.pathname === '/occupational-health'
                  ? 'text-white border-white'
                  : 'text-white/80 hover:text-white border-transparent hover:border-white/50'
              }`}
            >
              Occupational Health
            </Link>
            <Link
              to="/contact"
              className={`transition-colors duration-200 py-1 border-b-2 ${
                location.pathname === '/contact'
                  ? 'text-white border-white'
                  : 'text-white/80 hover:text-white border-transparent hover:border-white/50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Consultation Booking CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center text-sm font-semibold rounded-2xl px-5 py-2.5 transition-all duration-300 shadow-sm bg-white text-brand-teal-deep hover:bg-brand-pink hover:text-brand-charcoal hover:shadow-md"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
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
        className={`md:hidden absolute w-full bg-brand-warm-white shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[380px] py-4 border-b border-brand-teal/10' : 'max-h-0'
        }`}
      >
        <div className="px-4 space-y-2 flex flex-col">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              isHome ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/about' ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
            }`}
          >
            About
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/services' ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
            }`}
          >
            Services
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/products' ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
            }`}
          >
            Products
          </Link>
          <Link
            to="/occupational-health"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/occupational-health' ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
            }`}
          >
            Occupational Health
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === '/contact' ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
            }`}
          >
            Contact
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center text-sm font-semibold rounded-2xl bg-brand-teal text-white py-3 px-4 shadow hover:bg-brand-teal-deep transition-all duration-200"
          >
            Book a Consultation
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center text-xs font-bold rounded-2xl bg-brand-charcoal/10 text-brand-charcoal py-2.5 px-4 border border-brand-charcoal/15 transition-all duration-200 hover:bg-brand-charcoal/20"
          >
            🔐 Management Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
