import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import WellnessTree from '../components/WellnessTree';

export default function Wellness() {
  useSeo({
    title: 'Year-Long Holistic Wellness Programme Cape Town | HM OccHealth',
    description: 'Transformative year-long holistic wellness programme featuring nurse-led health assessments, blood-pressure monitoring, empowerment, and the 8 dimensions of wellness in Bellville & Cape Town.',
    keywords: 'holistic wellness programme cape town, corporate wellness program western cape, 8 dimensions of wellness bellville, nurse led health screening, workplace wellness workshops cape town',
    canonical: '/wellness',
    image: '/hazel.png'
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Year-Long Holistic Wellness Programme",
    "serviceType": "Holistic Wellness & Preventative Healthcare",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "HM Occhealth & Holistic Wellness",
      "telephone": "+27615370217",
      "email": "hmhealthclear@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bellville",
        "addressRegion": "Western Cape",
        "postalCode": "7530",
        "addressCountry": "ZA"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Bellville" },
      { "@type": "City", "name": "Cape Town" },
      { "@type": "AdministrativeArea", "name": "Western Cape" }
    ],
    "description": "A comprehensive year-long wellness programme designed to promote physical, mental, and financial well-being through nurse-led clinical monitoring and holistic habit transformation."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": typeof window !== 'undefined' ? window.location.origin : 'https://hmhealthwellness.co.za'
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Wellness Programme",
        "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://hmhealthwellness.co.za'}/wellness`
      }
    ]
  };

  const components = [
    {
      title: "Health Assessments",
      icon: "🩺",
      description: "Regular health evaluations to monitor progress and identify potential health risks early."
    },
    {
      title: "Blood-Pressure Monitoring",
      icon: "❤️",
      description: "Consistent blood-pressure checks to ensure cardiovascular health and peace of mind."
    },
    {
      title: "Empowerment Sessions",
      icon: "🌟",
      description: "Interactive sessions designed to build confidence, resilience, and a positive mindset."
    },
    {
      title: "First-Aid Education",
      icon: "🚑",
      description: "Essential first-aid training to prepare individuals for medical emergencies."
    },
    {
      title: "Financial Wellness",
      icon: "💰",
      description: "Guidance on managing finances, budgeting, and planning for a secure future."
    },
    {
      title: "Tai Chi & Movement",
      icon: "🧘‍♂️",
      description: "Gentle physical activities focusing on balance, flexibility, and mindfulness."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-warm-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <div className="bg-brand-teal text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mt-12">
          <p className="text-brand-sage-light font-semibold tracking-wider uppercase mb-4">
            Holistic Wellness Programme
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Year-Long Holistic Wellness Programme
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
            Embark on a transformative journey with our comprehensive wellness programme. We integrate physical health, mental resilience, and holistic practices to foster a thriving, balanced lifestyle over the course of a year.
          </p>
        </div>
      </div>

      {/* Programme Overview */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-charcoal mb-6">
            Programme Overview
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Our programme is designed to address every aspect of well-being. By combining medical expertise with holistic traditions, we provide a supportive environment that encourages continuous personal growth and health improvement. Join us to experience a sustainable approach to wellness.
          </p>
        </div>

        {/* Programme Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {components.map((component, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{component.icon}</div>
              <h3 className="font-serif text-2xl text-brand-charcoal mb-3">
                {component.title}
              </h3>
              <p className="text-gray-600">
                {component.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Dimensions of Wellness */}
      <section className="py-20 px-4 bg-brand-light-gray/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-charcoal mb-12">
            The 8 Dimensions of Wellness
          </h2>
          <div className="flex justify-center">
            <WellnessTree />
          </div>
        </div>
      </section>

      {/* Induka Products Connection */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="bg-brand-sage/20 rounded-3xl p-12 backdrop-blur-md border border-white/40">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-6">
            Explore Induka Wellness Products
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Complement your wellness journey with our exclusive range of Induka natural health products, carefully crafted to support your body's natural balance and vitality.
          </p>
          <Link 
            to="/products"
            className="inline-block bg-brand-teal text-white font-semibold py-4 px-8 rounded-full hover:bg-brand-teal-deep transition-colors"
          >
            Browse Induka Products
          </Link>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="bg-brand-charcoal text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            Interested in Our Wellness Programme?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Take the first step towards a healthier, more balanced life. Reach out to our team to find out how our holistic approach can benefit you or your organization.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-brand-sage text-brand-charcoal font-bold py-4 px-10 rounded-full hover:bg-brand-sage-light transition-colors text-lg"
          >
            Enquire About the Wellness Programme
          </Link>
        </div>
      </section>
    </div>
  );
}
