import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import WellnessTree from '../components/WellnessTree';

export default function Home() {
  useSeo(
    'Occupational Health Medicals & Holistic Wellness Bellville',
    'Get OHS Act compliant occupational health medicals, construction site certificates, and holistic weight loss programs in Bellville & Cape Town from Sr Hazel Kivedo.'
  );

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "HM Occhealth & Holistic Wellness",
    "alternateName": "HM Health Clear",
    "description": "Led by Registered Nurse Sr Hazel Kivedo, providing professional Occupational Health Medicals, OHS Act compliance, and holistic wellness programs in Bellville, Cape Town.",
    "url": window.location.origin,
    "logo": `${window.location.origin}/no-background-logo.png`,
    "image": `${window.location.origin}/hazel.png`,
    "telephone": "+27615370217",
    "email": "hmhealthclear@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bellville",
      "addressRegion": "Western Cape",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-33.8943",
      "longitude": "18.6294"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$"
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hazel Kivedo",
    "jobTitle": "Registered Nurse & Holistic Wellness Practitioner",
    "description": "Critical Care Registered Nurse and Certified Occupational Health Practitioner in Bellville, Cape Town, specializing in occupational health surveillance and lifestyle transformation coaching.",
    "telephone": "+27615370217",
    "email": "hmhealthclear@gmail.com",
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": "HM Occhealth & Holistic Wellness"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "South African Nursing Council (SANC)"
      }
    ]
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background with Overlay */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover saturate-75"
              poster="/Background-image-hm-occhealth-hostilic-wellness.png"
            >
              <source src="/background-video.mp4?v=3" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal-deep/90 via-brand-teal-deep/75 to-brand-charcoal/45"></div>
          </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-brand-warm-white backdrop-blur-sm">
              ✨ Transforming Lives Through Practical, Holistic Wellness
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif text-white">
              Occupational Health Medicals & Holistic Wellness in Bellville, Cape Town
            </h1>
            
            <p className="text-base sm:text-lg text-brand-warm-white/90 leading-relaxed max-w-2xl">
              Certified occupational health assessments and registered nurse-led wellness coaching. We help local businesses maintain OHS Act compliance and support individuals with sustainable behavior transformation programs.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-teal text-white hover:bg-brand-teal-deep px-8 py-3.5 text-sm font-semibold shadow-lg shadow-black/20 transition-all hover:scale-105 w-full sm:w-auto"
              >
                Book a Consultation
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 border border-white/30 text-white hover:bg-white/20 px-8 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all hover:scale-105 w-full sm:w-auto"
              >
                Explore our Products
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap gap-6 text-xs text-brand-warm-white/80 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-pink"></span>
                Registered Nurse-Led Care
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-pink"></span>
                Occupational Health Compliance
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-pink"></span>
                Based in Bellville, Cape Town
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex gap-2 text-xs font-semibold text-brand-warm-white/90 bg-white/10 border border-white/25 rounded-full px-4 py-2 backdrop-blur-sm items-center">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. About Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
              Meet Sr. Hazel Kivedo
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-semibold">
              A Dedicated Nurse Committed to Your Health and Vitality
            </h2>
            <p className="text-brand-charcoal/80 text-sm sm:text-base leading-relaxed">
              Sr. Hazel is a dedicated Registered Nurse with extensive experience across community health, occupational wellness, and family-centred care. She brings a calm, compassionate presence and faith-rooted compassion to guide people through real, sustainable transformation.
            </p>
            <p className="text-brand-charcoal/80 text-sm sm:text-base leading-relaxed">
              Combining clinical critical care expertise with a practical holistic approach, she bridges the gap between regulatory medical assessments and individual lifestyle coaching.
            </p>
            
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-brand-teal font-semibold hover:text-brand-teal-deep group text-sm"
              >
                Learn More About Sr. Hazel
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Cropped Photo Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-brand-teal/20 scale-105 pointer-events-none"></div>
              {/* Inner leaf frame */}
              <div className="absolute -top-3 -right-3 bg-brand-pink/20 text-brand-teal-deep w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold shadow shadow-brand-charcoal/10 z-10">
                🌱
              </div>
              
              <img
                src="/hazel.png"
                alt="Sr. Hazel Kivedo - Registered Nurse & Holistic Health Coach in Bellville"
                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-full border-4 border-brand-teal/15 shadow-xl relative z-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Overview Grid */}
      <section className="bg-brand-teal/5 py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
              Our Core Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-semibold">
              Practical Pathways to Complete Wellness
            </h2>
            <p className="text-brand-charcoal/70 text-sm">
              We offer structured solutions designed to support safety in the workplace, energy in the kitchen, order in the home, and clarity in life goals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl border border-brand-teal/10 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-4">
                <div className="text-3xl">🏥</div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal">Occupational Health Medicals</h3>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                  Compliant baseline, periodic, and exit medical assessments to keep your workforce safe and legally fit.
                </p>
              </div>
              <Link to="/services" className="mt-4 text-xs font-semibold text-brand-teal hover:text-brand-teal-deep self-start">
                Read More &rarr;
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl border border-brand-teal/10 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-4">
                <div className="text-3xl">⚖️</div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal">Lose It For Life</h3>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                  A sustainable, holistic weight-loss and lifestyle coaching program focused on long-term behavior change.
                </p>
              </div>
              <Link to="/services" className="mt-4 text-xs font-semibold text-brand-teal hover:text-brand-teal-deep self-start">
                Read More &rarr;
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl border border-brand-teal/10 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-4">
                <div className="text-3xl">🥗</div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal">Let Food Be Your Medicine</h3>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                  Practical nutrition guidance using food to heal, energize, and naturally restore physical wellness.
                </p>
              </div>
              <Link to="/services" className="mt-4 text-xs font-semibold text-brand-teal hover:text-brand-teal-deep self-start">
                Read More &rarr;
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-2xl border border-brand-teal/10 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-4">
                <div className="text-3xl">🏠</div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal">Home Organizing</h3>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                  Organizing living and storage spaces to promote daily peace, reduce stress, and support clear thinking.
                </p>
              </div>
              <Link to="/services" className="mt-4 text-xs font-semibold text-brand-teal hover:text-brand-teal-deep self-start">
                Read More &rarr;
              </Link>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-2xl border border-brand-teal/10 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="space-y-4">
                <div className="text-3xl">🌱</div>
                <h3 className="font-serif font-semibold text-lg text-brand-charcoal">Wellness Coaching</h3>
                <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                  One-on-one goal setting, planning, and accountability to build a balanced, purpose-driven life.
                </p>
              </div>
              <Link to="/services" className="mt-4 text-xs font-semibold text-brand-teal hover:text-brand-teal-deep self-start">
                Read More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Clients Choose HM (Social Proof Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-semibold">
            Clinical Expertise Meets Heartfelt Care
          </h2>
          <p className="text-brand-charcoal/70 text-sm">
            Sr. Hazel brings a balanced perspective that values legal compliance, physical health, and personal goals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Pillar 1 */}
          <div className="bg-white border border-brand-teal/10 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="text-2xl text-brand-teal">🩺</span>
            <h3 className="font-serif font-semibold text-base text-brand-charcoal">Registered Nurse-Led</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Clinical validation and nursing experience ensuring high standards of safety, ethics, and care quality.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border border-brand-teal/10 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="text-2xl text-brand-teal">📋</span>
            <h3 className="font-serif font-semibold text-base text-brand-charcoal">Occupational Health</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              In-depth compliance mapping with the OHS Act, protecting workforces and securing employer compliance.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border border-brand-teal/10 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="text-2xl text-brand-teal">🌿</span>
            <h3 className="font-serif font-semibold text-base text-brand-charcoal">Holistic Method</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Integrating physical, spiritual, emotional, and spatial aspects rather than treating symptoms in isolation.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border border-brand-teal/10 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="text-2xl text-brand-teal">🤝</span>
            <h3 className="font-serif font-semibold text-base text-brand-charcoal">Personal Support</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Coaching sessions customized around your exact constraints, pacing progress for sustainable outcomes.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white border border-brand-teal/10 rounded-2xl p-6 shadow-sm space-y-3">
            <span className="text-2xl text-brand-teal">🏘️</span>
            <h3 className="font-serif font-semibold text-base text-brand-charcoal">Community-Focused</h3>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Caring for local families, churches, schools, NGOs, and workplaces in Bellville and greater Cape Town.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Wellness Tree Section */}
      <section className="bg-brand-warm-white py-16 sm:py-20 border-y border-brand-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
              Holistic Wellness Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-semibold">
              The Dimensions of a Balanced Life
            </h2>
            <p className="text-brand-charcoal/70 text-sm">
              Our coaching uses the wellness tree model to guide you toward alignment. Explore the dimensions below.
            </p>
          </div>

          <WellnessTree />
        </div>
      </section>

      {/* 6. Contact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-teal-deep to-brand-teal rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-brand-teal/10 relative overflow-hidden">
          {/* Visual element */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold">
              Ready to Partner in Your Health and Wellness?
            </h2>
            <p className="text-brand-warm-white/90 text-sm sm:text-base leading-relaxed">
              Book a personal lifestyle consultation or workplace health assessment with Sr. Hazel. Let's work together to create healthy, purpose-driven lives and safe, compliant workspaces.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-white text-brand-teal-deep hover:bg-brand-pink hover:text-brand-charcoal font-semibold px-8 py-3.5 transition-all shadow-md"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
