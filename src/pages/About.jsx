import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';

export default function About() {
  useSeo(
    'About Sr. Hazel',
    'Meet Sr. Hazel Kivedo, Registered Nurse, Critical Care Nurse, and Holistic Wellness Practitioner guiding Bellville and Cape Town through health transformations.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-10 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          Meet the Practitioner
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Sr. Hazel Kivedo
        </h1>
        <p className="text-base sm:text-lg text-brand-teal font-semibold tracking-wide">
          Registered Nurse • Critical Care Registered Nurse • Holistic Wellness Practitioner
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-4"></div>
      </section>

      {/* 2. Photo & Story */}
      <section className="grid gap-12 lg:grid-cols-12 items-center">
        {/* Profile Image container */}
        <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl border border-brand-teal/20 scale-105 pointer-events-none"></div>
            <img
              src="/hazel.png"
              alt="Sr. Hazel Kivedo circular portrait"
              className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-3xl border-4 border-brand-teal/15 shadow-xl relative z-10"
            />
            <div className="absolute -bottom-4 -left-4 bg-brand-teal text-white px-6 py-2.5 rounded-2xl shadow-md z-20 text-xs font-semibold">
              Based in Bellville, Cape Town
            </div>
          </div>
        </div>

        {/* Story details */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-brand-charcoal font-semibold">
            Compassionate Care and Practical Guidance
          </h2>
          <p className="text-brand-charcoal/80 leading-relaxed text-sm sm:text-base">
            Sr. Hazel is a dedicated Registered Nurse with extensive experience across community health, occupational wellness, and family-centred care. She brings a calm, compassionate presence and faith-rooted compassion to guide people through real, sustainable transformation.
          </p>
          <p className="text-brand-charcoal/80 leading-relaxed text-sm sm:text-base">
            Her clinical background as a Critical Care Registered Nurse equips her to understand complex physical health issues, prioritize patient safety, and recognize early warning signs of lifestyle-related chronic conditions. This medical framework forms the bedrock of her holistic wellness coaching, ensuring that all advice is grounded, practical, and safe.
          </p>
          <p className="text-brand-charcoal/80 leading-relaxed text-sm sm:text-base">
            Recognizing that health extends beyond the clinic, Sr. Hazel founded HM Occhealth & Holistic Wellness to support people where they live and work. By combining compliant occupational health medical assessments with nutritional and lifestyle changes, she helps individuals and businesses achieve lasting vitality and compliance.
          </p>
        </div>
      </section>

      {/* 3. Credentials & Clinical Framework */}
      <section className="bg-white/40 border border-brand-teal/10 backdrop-blur-sm py-12 px-6 sm:px-12 rounded-3xl">
        <h3 className="text-xl sm:text-2xl font-serif text-brand-charcoal font-semibold text-center mb-8">
          Core Professional Pillars
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          
          <div className="bg-white/90 border border-white/40 backdrop-blur-md rounded-2xl p-6 shadow-md space-y-3">
            <div className="text-2xl">👩‍⚕️</div>
            <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Clinical Registered Nurse</h4>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Provides professional oversight, clinical safety compliance, and comprehensive nursing knowledge for preventative health programs.
            </p>
          </div>

          <div className="bg-white/90 border border-white/40 backdrop-blur-md rounded-2xl p-6 shadow-md space-y-3">
            <div className="text-2xl">⚡</div>
            <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Critical Care Nursing</h4>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Extensive background in high-stress intensive care, ensuring a sharp clinical eye, rapid assessments, and an understanding of physical health limits.
            </p>
          </div>

          <div className="bg-white/90 border border-white/40 backdrop-blur-md rounded-2xl p-6 shadow-md space-y-3">
            <div className="text-2xl">🌿</div>
            <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Holistic Wellness</h4>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Combines preventative screening, weight management (Lose It For Life), nutrition (Let Food Be Your Medicine), and organized environments.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Vision, Mission, and Philosophy */}
      <section className="grid gap-8 md:grid-cols-3">
        {/* Mission */}
        <div className="border border-white/40 rounded-2xl p-6 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
          <div className="w-10 h-10 rounded-full bg-brand-pink/20 text-brand-charcoal flex items-center justify-center text-lg font-bold">
            🎯
          </div>
          <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Our Mission</h4>
          <p className="text-xs text-brand-charcoal/75 leading-relaxed">
            To help individuals, families, communities, churches, and workplaces build healthier, balanced, purpose-driven lives through compliant occupational health programs and sustainable lifestyle coaching.
          </p>
        </div>

        {/* Vision */}
        <div className="border border-white/40 rounded-2xl p-6 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
          <div className="w-10 h-10 rounded-full bg-brand-teal/10 text-brand-teal-deep flex items-center justify-center text-lg font-bold">
            👁️
          </div>
          <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Our Vision</h4>
          <p className="text-xs text-brand-charcoal/75 leading-relaxed">
            To serve as a trusted partner in Bellville and greater Cape Town, fostering resilient workplaces and vibrant households that prioritize physical safety, dietary healing, and environmental order.
          </p>
        </div>

        {/* Philosophy */}
        <div className="border border-white/40 rounded-2xl p-6 space-y-4 bg-white/90 backdrop-blur-md shadow-md">
          <div className="w-10 h-10 rounded-full bg-brand-sage-light/20 text-brand-charcoal flex items-center justify-center text-lg font-bold">
            💡
          </div>
          <h4 className="font-serif font-semibold text-lg text-brand-charcoal">Our Philosophy</h4>
          <p className="text-xs text-brand-charcoal/75 leading-relaxed">
            True wellness is cohesive: when you change how you eat, how you live, and the environment you live in, physical healing and personal transformation follow as a natural consequence.
          </p>
        </div>
      </section>

      {/* 5. Direct Booking Call to Action */}
      <section className="bg-brand-charcoal text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-serif font-semibold">
          Begin Your Wellness Journey Today
        </h3>
        <p className="text-brand-warm-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Book a direct, personal consultation with Sr. Hazel Kivedo to discuss your health goals, dietary needs, or workplace wellness compliance.
        </p>
        <div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-teal text-white hover:bg-brand-teal-deep font-semibold px-8 py-3.5 transition-all shadow-md hover:scale-105"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}
