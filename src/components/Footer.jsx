import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-brand-charcoal text-brand-warm-white/90 pt-16 pb-8 border-t border-brand-teal/20 relative overflow-hidden">
      {/* Ambient decorative blob */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Logo and Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/no-background-logo.png"
                alt="HM Occhealth & Holistic Wellness Logo"
                className="w-24 h-24 sm:w-36 sm:h-36 object-contain"
              />
              <div>
                <h4 className="font-serif text-base sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  HM Occhealth & Holistic Wellness
                </h4>
                <p className="text-[10px] sm:text-xs text-brand-sage-light tracking-widest font-semibold uppercase mt-1">
                  Hazel Kivedo • Registered Nurse
                </p>
              </div>
            </div>
            <p className="text-sm text-brand-warm-white/70 leading-relaxed max-w-sm">
              Transforming lives through practical, holistic wellness. We support individuals, families, and workplaces with compliant occupational health medicals and lifestyle transformation coaching.
            </p>
            <div className="mt-2 text-xs text-brand-warm-white/50 space-y-1">
              <p>📍 Bellville, Cape Town, South Africa</p>
              <p>📞 Phone: <a href="tel:0615370217" className="hover:text-brand-pink transition-colors">061 537 0217</a></p>
              <p>✉️ Email: <a href="mailto:hmhealthclear@gmail.com" className="hover:text-brand-pink transition-colors">hmhealthclear@gmail.com</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-6 lg:col-span-3">
            <h5 className="font-serif text-base font-semibold text-white mb-4 uppercase tracking-wider text-xs">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-sm text-brand-warm-white/70">
              <li>
                <Link to="/" className="hover:text-brand-pink transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-pink transition-colors">Meet Sr. Hazel</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-pink transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/occupational-health" className="hover:text-brand-pink transition-colors">Occupational Health (B2B)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-pink transition-colors">Book a Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="sm:col-span-6 lg:col-span-4">
            <h5 className="font-serif text-base font-semibold text-white mb-4 uppercase tracking-wider text-xs">
              Subscribe for Wellness Tips
            </h5>
            <p className="text-sm text-brand-warm-white/70 leading-relaxed mb-4">
              Get monthly practical health advice, nutritional tips, and workspace wellness guidelines directly from a registered nurse.
            </p>
            
            {subscribed ? (
              <div className="rounded-2xl border border-brand-sage-light/20 bg-brand-sage-light/5 p-4 text-brand-sage-light text-sm font-semibold">
                ✓ Thank you! You've successfully subscribed for wellness tips.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm text-white placeholder-brand-warm-white/50 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent flex-grow"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-brand-teal text-white hover:bg-brand-teal-deep px-5 py-2.5 text-sm font-semibold transition-all shadow-md shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-brand-warm-white/50">
            Copyright © {new Date().getFullYear()} HM Occhealth & Holistic Wellness. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-brand-warm-white/50">
            <span>Registered Nurse & Holistic Wellness Practitioner</span>
            <span className="hidden sm:inline">•</span>
            <Link to="/dashboard" className="hover:text-brand-teal hover:underline transition-colors">
              Management Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
