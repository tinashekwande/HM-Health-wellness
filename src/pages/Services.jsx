import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSeo from '../hooks/useSeo';

const servicesData = [
  {
    id: 'occhealth',
    name: 'Occupational Health Medicals',
    icon: '🏥',
    title: 'Occupational Health Medicals & OHS Compliance Support',
    subtitle: 'Professional, compliant medical assessments for industrial workplaces.',
    target: 'Construction, manufacturing, factories, warehousing, and industrial environments.',
    details: 'Ensuring worker health and legal compliance under the Occupational Health and Safety (OHS) Act. We help companies map risks, verify fitness-to-work, and prevent workspace injuries.',
    offerings: [
      { name: 'Baseline Medicals', desc: 'Assessments conducted prior to employment to establish a worker’s health status.' },
      { name: 'Periodic Medicals', desc: 'Routine health tracking to ensure employees remain safe and fit in their current roles.' },
      { name: 'Exit Medicals', desc: 'Assessments conducted upon termination of contract to record final health status.' },
      { name: 'Fitness for Work Assessments', desc: 'Determining if a worker is physically and mentally fit for specific roles.' },
      { name: 'Hearing Screening (Audiometry)', desc: 'Screening for noise-induced hearing loss in high-decibel environments.' },
      { name: 'Vision Screening', desc: 'Basic visual acuity and field tests for drivers, forklift operators, and precision workers.' },
      { name: 'Lung Function Testing (Spirometry)', desc: 'Evaluating respiratory fitness for workers exposed to dust, gases, or chemicals.' },
      { name: 'Compliance Support', desc: 'Guidance to meet OHS Act standards and industry audit requirements.' }
    ],
    ctaText: 'Request a Workplace Health Assessment',
    ctaLink: '/occupational-health'
  },
  {
    id: 'loseit',
    name: 'Lose It For Life',
    icon: '⚖️',
    title: 'Lose It For Life: Sustainable Weight & Lifestyle Coaching',
    subtitle: 'A holistic program focused on behavior change and long-term results.',
    target: 'Individuals seeking weight reduction, habit change, and permanent lifestyle improvements.',
    details: 'Fad diets fail because they are not sustainable. Our nurse-led program focuses on building new habits, understanding body signals, and transforming your lifestyle step-by-step.',
    offerings: [
      { name: 'Sustainable Weight Loss', desc: 'Focusing on gradual, healthy fat loss without starvation or extreme deprivation.' },
      { name: 'Behavior Change Strategy', desc: 'Identifying emotional triggers and rewriting your default routine habits.' },
      { name: 'Long-Term Results Mapping', desc: 'Setting up systems and metrics that ensure you maintain your weight loss for life.' },
      { name: 'Lifestyle Coaching Sessions', desc: 'Direct, compassionate support to help you navigate setbacks and stay motivated.' },
      { name: 'Habit Tracking Systems', desc: 'Simple, practical tools to build consistency in daily routines.' }
    ],
    ctaText: 'Book a Weight Loss Consultation',
    ctaLink: '/contact'
  },
  {
    id: 'foodmedicine',
    name: 'Let Food Be Your Medicine',
    icon: '🥗',
    title: 'Let Food Be Your Medicine: Nutrition Guidance',
    subtitle: 'Practical nutritional support to heal, energize, and protect the body.',
    target: 'Individuals and families looking to resolve energy drops, prevent disease, and optimize health.',
    details: 'Food is the primary fuel for our bodies. We provide practical guidance on how to select, prepare, and enjoy foods that reduce inflammation, boost energy levels, and prevent chronic conditions.',
    offerings: [
      { name: 'Nutrition Guidance', desc: 'Clear, simple instruction on balanced, whole-food eating.' },
      { name: 'Healthy Eating Habits', desc: 'Practical meal planning that fits into a busy family or work schedule.' },
      { name: 'Energy Improvement', desc: 'Identifying and eliminating energy-draining processed foods.' },
      { name: 'Disease Prevention', desc: 'Using diet to manage and prevent lifestyle-related conditions (hypertension, diabetes).' },
      { name: 'Gut Health Support', desc: 'Rebuilding gut flora to optimize nutrient absorption and support immunity.' }
    ],
    ctaText: 'Book a Nutrition Consultation',
    ctaLink: '/contact'
  },
  {
    id: 'organizing',
    name: 'Home Organizing',
    icon: '🏠',
    title: 'Home Organizing: Creating Space for Clarity',
    subtitle: 'Decluttering and organizing living spaces to reduce daily stress.',
    target: 'Anyone feeling overwhelmed by clutter, messy spaces, or disorganized home environments.',
    details: 'Your environment directly affects your mental state. A cluttered home leads to a cluttered mind. We help you sort, simplify, and organize your spaces to create a calm, productive sanctuary.',
    offerings: [
      { name: 'Organized Living Spaces', desc: 'Setting up logical systems for kitchens, closets, study rooms, and common areas.' },
      { name: 'Reduced Daily Stress', desc: 'Eliminating the frustration of lost items and visual clutter.' },
      { name: 'Improved Mental Wellness', desc: 'Fostering a serene, calming environment that supports relaxation.' },
      { name: 'Productivity Support', desc: 'Designing workspaces that enhance focus and minimize distractions.' },
      { name: 'Space Optimization', desc: 'Maximizing the utility of small or multi-functional storage areas.' }
    ],
    ctaText: 'Book an Organizing Consultation',
    ctaLink: '/contact'
  },
  {
    id: 'coaching',
    name: 'Wellness Coaching',
    icon: '🌱',
    title: 'Holistic Wellness Coaching',
    subtitle: 'One-on-one goal setting and accountability for a balanced, purposeful life.',
    target: 'Individuals seeking personal growth, stress management, and clear, structured health planning.',
    details: 'Coaching provides the bridge between knowing what to do and actually doing it. We guide you through the process of outlining your values, setting actionable goals, and building sustainable wellness routines.',
    offerings: [
      { name: 'Goal Setting Workshops', desc: 'Deconstructing long-term dreams into specific, actionable steps.' },
      { name: 'Accountability Support', desc: 'Regular check-ins to monitor progress, address roadblocks, and stay focused.' },
      { name: 'Personal Growth Mapping', desc: 'Expanding self-awareness, confidence, and resilience.' },
      { name: 'Holistic Health Planning', desc: 'Structuring a daily routine that balances work, family, rest, and health.' },
      { name: 'Stress Management', desc: 'Integrating mindfulness and grounding rituals into high-pressure lives.' }
    ],
    ctaText: 'Book a Coaching Consultation',
    ctaLink: '/contact'
  }
];

const faqData = [
  {
    question: "What is required for a construction baseline medical?",
    answer: "A baseline construction medical typically requires the employee's ID document/passport, any previous medical certificates (if available), list of current chronic medications, and job description to assess specific work hazards (such as work at heights or driving heavy machinery). The assessment includes a physical examination, vital signs check, vision screening, and if required, lung function (spirometry) and hearing (audiometry) tests."
  },
  {
    question: "Does HM Occhealth provide on-site workplace screening?",
    answer: "Yes, HM Occhealth provides on-site workplace medical screening and surveillance for factories, construction sites, and corporate offices across Bellville and the greater Cape Town area, ensuring minimal downtime for your workforce."
  },
  {
    question: "Is the 'Lose It for Life' program a diet?",
    answer: "No, 'Lose It for Life' is not a diet. It is a sustainable, behavior-change coaching program. We focus on long-term lifestyle transformation, helping you rebuild your relationship with food, manage stress, and track daily habits to ensure weight loss is permanent."
  },
  {
    question: "Do I need a doctor's referral to see Sr Hazel?",
    answer: "No, a doctor's referral is not required. You can book a direct consultation with Sr. Hazel for personal wellness coaching, nutrition guidance, home organizing, or B2B occupational health assessments."
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('occhealth');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const location = useLocation();

  useSeo(
    'OHS Medicals & Wellness Coaching Services Bellville',
    'Explore our B2B construction site medicals, industrial screenings, and holistic wellness programs like Lose It For Life and Let Food Be Your Medicine.'
  );

  const toggleFaq = (idx) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Occupational Health Medicals",
        "description": "OHS Act compliant baseline, periodic, and exit medical assessments including lung function, vision, and hearing tests."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Lose It For Life Weight Loss Program",
        "description": "Holistic nurse-led weight loss coaching focusing on sustainable behavior modification and healthy daily habits."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Let Food Be Your Medicine Nutrition Guidance",
        "description": "Whole-food nutrition advice designed to reduce inflammation, lower blood pressure, and boost energy levels."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Home Organizing for Wellness",
        "description": "Professional decluttering and spatial organizing to cultivate peace of mind and minimize daily domestic stress."
      }
    ]
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Support deep linking to tabs if specified in state or query
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const activeService = servicesData.find(s => s.id === activeTab) || servicesData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-10 space-y-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          Our Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Clinical Occupational Medicals & Lifestyle Transformation Services
        </h1>
        <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed">
          Explore our nurse-led service pathways. We provide regulatory clinical assessments for businesses and personalized lifestyle transformation packages for individuals.
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-4"></div>
      </section>

      {/* 2. Interactive Service Tab Selector */}
      <section className="space-y-8">
        {/* Horizontal tabs */}
        <div className="flex border-b border-brand-teal/10 overflow-x-auto no-scrollbar scroll-smooth gap-2 pb-1 justify-start lg:justify-center">
          {servicesData.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-serif font-medium text-sm sm:text-base transition-all duration-200 shrink-0 outline-none border-b-2 ${
                  isActive
                    ? 'bg-brand-teal/5 text-brand-teal border-brand-teal'
                    : 'text-brand-charcoal/70 hover:text-brand-teal border-transparent hover:bg-brand-teal/5'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Card Container */}
        <div className="bg-white/90 rounded-3xl border border-white/40 p-6 sm:p-8 md:p-10 shadow-md backdrop-blur-md transition-all duration-300">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Left Column: Summary */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 bg-brand-teal/5 rounded-2xl">{activeService.icon}</span>
                  <h2 className="text-2xl font-serif font-bold text-brand-charcoal leading-snug">
                    {activeService.title}
                  </h2>
                </div>
                
                <p className="text-sm font-semibold text-brand-teal leading-snug italic">
                  {activeService.subtitle}
                </p>
                
                <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                  {activeService.details}
                </p>
                
                <div className="rounded-2xl bg-white/50 p-4 border border-brand-teal/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/60 leading-none mb-2">
                    Primary Target Audience
                  </h4>
                  <p className="text-xs text-brand-charcoal/80 leading-relaxed font-semibold">
                    {activeService.target}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to={activeService.ctaLink}
                  className="inline-flex items-center justify-center rounded-full bg-brand-teal text-white hover:bg-brand-teal-deep px-6 py-3.5 text-sm font-semibold transition-all shadow-md shadow-brand-teal/10 hover:scale-105"
                >
                  {activeService.ctaText}
                </Link>
              </div>
            </div>

            {/* Right Column: Offerings List */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-base font-bold uppercase tracking-wider text-brand-charcoal/60 border-b border-brand-teal/10 pb-2">
                What We Offer
              </h3>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {activeService.offerings.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-brand-teal/10 hover:border-brand-teal/30 hover:bg-brand-teal/10 bg-white/40 transition-all duration-200 space-y-2"
                  >
                    <h4 className="font-serif font-bold text-sm text-brand-charcoal flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0"></span>
                      {item.name}
                    </h4>
                    <p className="text-xs text-brand-charcoal/70 leading-relaxed pl-3.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Holistic Support Notice */}
      <section className="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto shadow-md">
        <div className="text-4xl">💡</div>
        <div className="space-y-2">
          <h4 className="font-serif font-semibold text-lg text-brand-charcoal leading-none">
            Why These Pillars Work Cohesively
          </h4>
          <p className="text-xs text-brand-charcoal/80 leading-relaxed">
            True transformation occurs at the intersection of nutrition, habit restructuring, and spatial organization. If you live in chaos, or fuel your body with toxic elements, your wellness coaching will face severe resistance. That is why Sr. Hazel advocates for a unified path.
          </p>
        </div>
      </section>

      {/* 4. Interactive FAQs Accordion */}
      <section className="max-w-4xl mx-auto space-y-8 mt-12">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-serif text-brand-charcoal font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-charcoal/70 text-xs sm:text-sm">
            Find answers to common questions about our occupational testing compliance and holistic coaching packages.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-brand-teal/10 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-brand-teal/5 transition-all outline-none"
                >
                  <span className="font-serif font-semibold text-sm sm:text-base text-brand-charcoal">
                    {faq.question}
                  </span>
                  <span className="text-brand-teal font-bold text-lg">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-teal/5 bg-brand-teal/[0.01]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
