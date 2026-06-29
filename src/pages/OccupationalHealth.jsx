import React, { useState } from 'react';
import useSeo from '../hooks/useSeo';

const faqs = [
  {
    question: 'What are Occupational Health Medicals?',
    answer: 'Occupational health medicals are clinical assessments conducted by a registered nurse or practitioner to verify that an employee is physically fit to perform their specific tasks safely without risk to themselves, others, or the business.'
  },
  {
    question: 'What does the OHS Act require for South African businesses?',
    answer: 'The Occupational Health and Safety (OHS) Act mandates that employers identify hazards, implement controls, and maintain medical surveillance for employees exposed to specific risks (such as heavy machinery, high decibels, chemicals, or respiratory irritants).'
  },
  {
    question: 'Why are Baseline and Exit Medicals critical?',
    answer: 'Baseline medicals document a worker’s health status prior to employment, shielding employers from pre-existing liability. Exit medicals record their health status upon contract termination, serving as vital legal proof that no health deterioration occurred during their tenure.'
  },
  {
    question: 'What industries require these medical assessments?',
    answer: 'Any business operating in construction, manufacturing, industrial factories, transport, chemical production, or heavy warehousing requires medical surveillance to ensure compliance and maintain worker safety.'
  },
  {
    question: 'Where are your services located?',
    answer: 'We are based in Bellville, Cape Town, and serve local construction sites, factories, and commercial hubs across the greater Cape Town metropolitan area.'
  }
];

export default function OccupationalHealth() {
  useSeo(
    'Occupational Health Medicals & Fitness-To-Work Bellville',
    'Get compliant workplace medicals, construction site baseline, periodic, and exit certificates, industrial lung, vision, & hearing tests in Cape Town.'
  );

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    employees: '',
    industry: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveBookingToLocalStorage = (bookingData) => {
    try {
      const storedBookings = localStorage.getItem('hm_bookings');
      const bookings = storedBookings ? JSON.parse(storedBookings) : [];
      const newBooking = {
        id: 'B-' + Date.now(),
        date: new Date().toLocaleDateString('en-ZA') + ' ' + new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
        status: 'Pending',
        type: 'B2B Assessment',
        ...bookingData
      };
      bookings.unshift(newBooking);
      localStorage.setItem('hm_bookings', JSON.stringify(bookings));
    } catch (err) {
      console.error("Error saving booking:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    saveBookingToLocalStorage({
      name: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      service: `OHS Assessment: ${formData.companyName} (${formData.industry}, ${formData.employees} staff)`,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      employees: '',
      industry: '',
      message: ''
    });
  };

  const handleWhatsAppSubmit = (e) => {
    if (!formData.companyName || !formData.contactPerson || !formData.phone || !formData.email || !formData.employees || !formData.industry || !formData.message) {
      alert('Please fill out all fields before submitting via WhatsApp.');
      return;
    }

    saveBookingToLocalStorage({
      name: formData.contactPerson,
      phone: formData.phone,
      email: formData.email,
      service: `OHS Assessment: ${formData.companyName} (${formData.industry}, ${formData.employees} staff)`,
      message: formData.message
    });

    const msg = `Hello Sr. Hazel, I would like to request a B2B Occupational Health Assessment.

Company Details:
- Company Name: ${formData.companyName}
- Contact Person: ${formData.contactPerson}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Employees: ${formData.employees}
- Industry: ${formData.industry}

Assessment Request Message:
${formData.message}`;

    const whatsappUrl = `https://wa.me/27615370217?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setFormData({
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      employees: '',
      industry: '',
      message: ''
    });
  };

  const toggleFaq = (idx) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Occupational Health Medicals",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "HM Occhealth & Holistic Wellness",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bellville",
        "addressRegion": "Western Cape",
        "addressCountry": "ZA"
      }
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Bellville"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Cape Town"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Western Cape"
      }
    ],
    "description": "Registered nurse-led occupational medical surveillance under the South African OHS Act, including baseline, periodic, and exit medical certificates, spirometry, audiometry, and vision screening."
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-10 space-y-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          B2B Compliance & Health
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Occupational Health Medicals & OHS Compliance in Cape Town
        </h1>
        <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed">
          Nurse-led medical assessments to keep your workforce safe, healthy, and fully compliant with the OHS Act and industry standards. Serving Bellville, Cape Town.
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-4"></div>
      </section>

      {/* 2. Core Benefits & Assessments */}
      <section className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* Left Side: Compliance Info */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white/90 rounded-3xl border border-white/40 p-6 sm:p-8 shadow-md backdrop-blur-md space-y-6">
            <h2 className="text-2xl font-serif text-brand-charcoal font-semibold">
              Clinical Medical Surveillance
            </h2>
            <p className="text-brand-charcoal/80 text-sm leading-relaxed">
              Under the Occupational Health and Safety (OHS) Act, businesses in high-risk sectors must conduct routine medical screening to monitor employee health. We provide professional compliance support, verifying worker fitness-to-work and screening for occupational illnesses.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-2xl bg-white/50 border border-brand-teal/10 space-y-1">
                <h4 className="font-bold font-serif text-sm text-brand-teal-deep">🏗️ Construction Sites</h4>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                  Baseline, periodic, and exit medicals, height work fitness, and OHS file requirements.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-brand-teal/10 space-y-1">
                <h4 className="font-bold font-serif text-sm text-brand-teal-deep">🏭 Factories & Industrial</h4>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                  Workplace-specific risk assessments, audiometry (hearing), spirometry (lung), and vision checks.
                </p>
              </div>
            </div>
          </div>

          {/* Assessment types */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-brand-charcoal">
              Types of Medical Assessments Provided
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-white/40 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-md space-y-2">
                <div className="text-xl">📥</div>
                <h4 className="font-serif font-bold text-sm text-brand-charcoal">Baseline Medicals</h4>
                <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                  Conducted before employee begins work to assess physical suitability and log baseline health status.
                </p>
              </div>
              <div className="border border-white/40 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-md space-y-2">
                <div className="text-xl">🔄</div>
                <h4 className="font-serif font-bold text-sm text-brand-charcoal">Periodic Medicals</h4>
                <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                  Routine health checks performed at intervals to track occupational exposure (e.g. lung, hearing, vision).
                </p>
              </div>
              <div className="border border-white/40 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-md space-y-2">
                <div className="text-xl">📤</div>
                <h4 className="font-serif font-bold text-sm text-brand-charcoal">Exit Medicals</h4>
                <p className="text-[11px] text-brand-charcoal/70 leading-relaxed">
                  Conducted at end of employment to record final health status, verifying no impairment was sustained.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-brand-teal-deep to-brand-teal text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-brand-teal/15 relative overflow-hidden">
            <div className="absolute top-[-5rem] right-[-5rem] w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold">
                  Request a Workplace Health Assessment
                </h3>
                <p className="text-xs text-brand-warm-white/80 leading-relaxed">
                  Submit details about your workforce and OHS compliance needs, and Sr. Hazel will contact you to coordinate.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center space-y-3">
                  <span className="text-4xl block">✓</span>
                  <h4 className="font-semibold text-lg">Request Received</h4>
                  <p className="text-xs text-brand-warm-white/90 leading-relaxed">
                    Thank you! Your assessment request has been received. Sr. Hazel will contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold underline text-white hover:text-brand-pink"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-brand-charcoal">
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                      placeholder="e.g. Bellville Construction Ltd"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contactPerson" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        required
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                      placeholder="business@email.com"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="employees" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                        Number of Employees
                      </label>
                      <input
                        type="number"
                        id="employees"
                        name="employees"
                        required
                        value={formData.employees}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                        placeholder="e.g. 25"
                      />
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                        Industry
                      </label>
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                        placeholder="e.g. Manufacturing"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-white mb-1 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-white border border-brand-teal/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
                      placeholder="Outline any specific risks or timeframe..."
                    ></textarea>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 mt-2">
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-brand-charcoal text-white hover:bg-brand-charcoal/90 py-3.5 text-sm font-semibold transition-all shadow-md"
                    >
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full rounded-2xl bg-[#25D366] text-white hover:bg-[#20ba5a] py-3.5 text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      Request via WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </section>

      {/* 3. Collapsible FAQs Section */}
      <section className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-semibold text-center">
          Occupational Health FAQs
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="border border-white/40 rounded-2xl bg-white/90 backdrop-blur-md shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-brand-charcoal">
                    {faq.question}
                  </span>
                  <span className={`text-brand-teal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-48 pb-5 border-t border-brand-teal/5 pt-3' : 'max-h-0 pointer-events-none'
                  } overflow-hidden`}
                >
                  <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
