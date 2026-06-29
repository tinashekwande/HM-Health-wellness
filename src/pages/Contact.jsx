import React, { useState } from 'react';
import useSeo from '../hooks/useSeo';

export default function Contact() {
  useSeo(
    'Book a Consultation',
    'Book a consultation with Sr. Hazel Kivedo for Occupational Health, weight loss coaching, nutrition guidance, or home organizing in Bellville, Cape Town.'
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'coaching',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

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
        type: 'Consultation',
        ...bookingData
      };
      bookings.unshift(newBooking);
      localStorage.setItem('hm_bookings', JSON.stringify(bookings));
    } catch (err) {
      console.error("Error saving booking:", err);
    }
  };

  const serviceLabels = {
    occhealth: 'Occupational Health Medicals',
    loseit: 'Lose It For Life (Weight Coaching)',
    foodmedicine: 'Let Food Be Your Medicine (Nutrition)',
    organizing: 'Home Organizing',
    coaching: 'Wellness Coaching'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceName = serviceLabels[formData.service] || formData.service;
    saveBookingToLocalStorage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: serviceName,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'coaching',
      message: ''
    });
  };

  const handleWhatsAppSubmit = (e) => {
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      alert('Please fill out all fields before booking via WhatsApp.');
      return;
    }

    const serviceName = serviceLabels[formData.service] || formData.service;
    saveBookingToLocalStorage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: serviceName,
      message: formData.message
    });

    const msg = `Hello Sr. Hazel, I would like to book a consultation for: "${serviceName}".

My Details:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email}

Inquiry Details:
${formData.message}`;

    const whatsappUrl = `https://wa.me/27615370217?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'coaching',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-10 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Book a Consultation
        </h1>
        <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed">
          Ready to schedule a personal coaching session, dietary evaluation, or coordinate workplace compliance medicals? Complete the form below, or reach out directly.
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-4"></div>
      </section>

      {/* 2. Contact Details & Form */}
      <section className="grid gap-12 lg:grid-cols-12 items-start">
        
        {/* Left Column: Direct Links & Map */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Business Info Box */}
          <div className="bg-white/90 border border-white/40 rounded-3xl p-6 sm:p-8 shadow-md backdrop-blur-md space-y-6">
            <h3 className="text-xl font-serif font-bold text-brand-charcoal border-b border-brand-teal/5 pb-2">
              Contact Information
            </h3>
            
            <div className="space-y-4 text-sm text-brand-charcoal/80">
              <div className="flex gap-3.5 items-start">
                <span className="text-xl">👩‍⚕️</span>
                <div>
                  <h4 className="font-bold text-brand-charcoal">Sr. Hazel Kivedo</h4>
                  <p className="text-xs text-brand-charcoal/60">Registered Nurse & Wellness Practitioner</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="text-xl">📞</span>
                <div>
                  <h4 className="font-bold text-brand-charcoal font-serif">Phone Number</h4>
                  <p className="text-xs">
                    <a href="tel:0615370217" className="text-brand-teal hover:underline font-semibold">061 537 0217</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="text-xl">✉️</span>
                <div>
                  <h4 className="font-bold text-brand-charcoal font-serif">Email Address</h4>
                  <p className="text-xs">
                    <a href="mailto:hmhealthclear@gmail.com" className="text-brand-teal hover:underline font-semibold">hmhealthclear@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <span className="text-xl">📍</span>
                <div>
                  <h4 className="font-bold text-brand-charcoal font-serif">Location</h4>
                  <p className="text-xs">Bellville, Cape Town, South Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Map Placeholder */}
          <div className="relative rounded-3xl border border-white/40 bg-white/40 backdrop-blur-sm h-64 flex flex-col items-center justify-center text-center p-6 shadow-md overflow-hidden">
            {/* Background design grids */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
            
            {/* Ambient indicator circles */}
            <div className="absolute w-20 h-20 rounded-full bg-brand-teal/15 blur-xl"></div>
            
            <div className="relative z-10 space-y-3">
              <span className="text-4xl animate-bounce inline-block">📍</span>
              <h4 className="font-serif font-bold text-brand-teal-deep text-lg leading-none">Bellville, Cape Town</h4>
              <p className="text-xs text-brand-charcoal/70 max-w-xs leading-relaxed">
                Serving local Cape Town families, construction sites, and manufacturing plants with flexible, mobile, and clinic-based care.
              </p>
              <span className="inline-block text-[10px] font-semibold text-brand-teal uppercase bg-white border border-brand-teal/20 px-3 py-1 rounded-full shadow-sm">
                Serving Greater Cape Town Area
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white/90 border border-white/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-md backdrop-blur-md">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-brand-charcoal mb-4">
              Schedule Your Consultation
            </h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed mb-6">
              Complete this form to request a consultation. Sr. Hazel will contact you directly via phone or email to confirm a slot and outline initial details.
            </p>

            {submitted ? (
              <div className="rounded-2xl border border-brand-sage-light/20 bg-brand-sage-light/5 p-6 text-center space-y-3">
                <span className="text-4xl block">✓</span>
                <h4 className="font-semibold text-lg text-brand-teal-deep font-serif">Consultation Booked</h4>
                <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                  Your inquiry has been successfully sent. Sr. Hazel Kivedo will contact you directly to schedule your consultation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 inline-flex justify-center text-xs font-semibold underline text-brand-teal hover:text-brand-teal-deep"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-brand-charcoal">
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-brand-charcoal mb-1 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-brand-warm-white border border-brand-teal/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-brand-charcoal mb-1 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl bg-brand-warm-white border border-brand-teal/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-brand-charcoal mb-1 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-brand-warm-white border border-brand-teal/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-brand-charcoal mb-1 uppercase tracking-wider">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-brand-warm-white border border-brand-teal/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  >
                    <option value="occhealth">🏥 Occupational Health Medicals</option>
                    <option value="loseit">⚖️ Lose It For Life (Weight Coaching)</option>
                    <option value="foodmedicine">🥗 Let Food Be Your Medicine (Nutrition)</option>
                    <option value="organizing">🏠 Home Organizing</option>
                    <option value="coaching">🌱 Wellness Coaching</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-brand-charcoal mb-1 uppercase tracking-wider">
                    Inquiry Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-xl bg-brand-warm-white border border-brand-teal/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="Please mention any physical conditions, scheduling preferences, or business details..."
                  ></textarea>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-2">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-brand-teal text-white hover:bg-brand-teal-deep py-3.5 text-sm font-semibold transition-all shadow-md"
                  >
                    Submit Booking Request
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full rounded-2xl bg-[#25D366] text-white hover:bg-[#20ba5a] py-3.5 text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Book via WhatsApp
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
