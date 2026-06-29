import React, { useState } from 'react';
import useSeo from '../hooks/useSeo';

const productsData = [
  {
    id: 'food-medicine-guide',
    name: 'Let Food Be Your Medicine Guide',
    category: 'Digital Guides',
    price: 'R180',
    icon: '🥗',
    shortDesc: 'A comprehensive, nurse-approved whole-food recipe and nutrition guide designed to promote wellness, improve gut health, and manage blood pressure.',
    longDesc: 'Fad diets are often unsustainable and can harm your health. This professional, nurse-led digital guide translates clinical nutrition principles into simple, delicious daily habits. Focus on whole-food ingredients that lower systemic inflammation, restore digestive health, and supply natural, sustainable energy.',
    features: [
      '45 dietitian-aligned recipes (breakfast, lunch, dinner, snacks)',
      'Clinical tips for dietary management of high blood pressure and blood sugar',
      'Anti-inflammatory grocery shopping lists and ingredient guides',
      'Rebuilding gut health flora explanation and tips',
      'Digital PDF format, readable on any device'
    ],
    badge: 'Best Seller'
  },
  {
    id: 'lose-it-journal',
    name: 'Lose It For Life Habit Tracker',
    category: 'Journals & Trackers',
    price: 'R250',
    icon: '⚖️',
    shortDesc: 'A premium 12-week printed journal and tracker focused on sustainable behavior modification, meal logging, and body reflection.',
    longDesc: 'Lasting weight loss isn’t about calorie counting alone; it’s about understanding your default habit loops and triggers. This physical journal provides a structured space to track your daily lifestyle choices, monitor emotional eating triggers, and establish habits that ensure you keep the weight off for life.',
    features: [
      '12-week daily habit logging grid (sleep, hydration, activity)',
      'Nutrition and meal tracking pages with emotional trigger logs',
      'Weekly self-evaluation guides and metrics mapping',
      'Inspirational weekly quotes and clinical advice from Sr. Hazel',
      'High-quality, durable spiral-bound print (delivered to Cape Town)'
    ],
    badge: 'Popular'
  },
  {
    id: 'organized-home-workbook',
    name: 'The Organized Home Workbook',
    category: 'Digital Guides',
    price: 'R150',
    icon: '🏠',
    shortDesc: 'A step-by-step decluttering workbook to help you sort, simplify, and design calm, stress-free living and workspaces.',
    longDesc: 'A disorganized physical environment directly translates to mental overload and elevated stress. This digital workbook offers a clinical, stress-reducing approach to sorting your household. Learn practical sorting techniques, outline storage logic, and craft a clean, productive home environment that supports mental wellness.',
    features: [
      'Room-by-room decluttering checklists (kitchens, closets, studies)',
      'The "Three-Pile" sorting methodology instructions',
      'Practical spatial organizing guides for small storage',
      'Weekly upkeep routines and workspace optimization tips',
      'Printable PDF workbook format'
    ],
    badge: 'New'
  },
  {
    id: 'ohs-compliance-toolkit',
    name: 'SME OHS Act Compliance Toolkit',
    category: 'OHS Compliance',
    price: 'R450',
    icon: '🏥',
    shortDesc: 'Essential templates, checklists, and medical surveillance registers to help small-to-medium businesses meet OHS Act requirements.',
    longDesc: 'Navigating workplace safety regulations under the South African Occupational Health and Safety (OHS) Act can be overwhelming for small businesses. This toolkit provides the foundational files and templates required to build a compliant medical surveillance program, prepare for safety audits, and log worker health files.',
    features: [
      'Foundational medical surveillance register templates',
      'SME hazard identification and risk assessment checklists',
      'Baseline, periodic, and exit medical assessment log sheets',
      'OHS Act compliance summary and audit check sheets',
      'Fully editable Word and Excel digital downloads'
    ],
    badge: 'Business'
  },
  {
    id: 'wellness-assessment-workbook',
    name: '8 Dimensions of Wellness Assessment',
    category: 'Digital Guides',
    price: 'R120',
    icon: '🌱',
    shortDesc: 'An interactive workbook containing questionnaires and self-coaching worksheets to evaluate and balance all dimensions of your life.',
    longDesc: 'Wellness is multi-dimensional. When one area is neglected, it drags down the rest. This workbook guides you through an in-depth self-assessment of the 8 dimensions of wellness. Plot your current wellness wheel, identify growth opportunities, and construct a realistic, personalized action plan for a balanced life.',
    features: [
      '8 comprehensive questionnaires (Physical, Emotional, Spiritual, etc.)',
      'Printable interactive "Wellness Wheel" diagram mapping tool',
      'Goal setting and accountability worksheets for each dimension',
      'Nurse-led advice for lifestyle balancing and rest integration',
      'Digital PDF workbook format'
    ],
    badge: ''
  },
  {
    id: 'anti-inflammatory-meal-plan',
    name: 'Anti-Inflammatory 7-Day Meal Plan',
    category: 'Digital Guides',
    price: 'R95',
    icon: '🥗',
    shortDesc: 'A structured 7-day nutritional roadmap featuring anti-inflammatory recipes to optimize digestion and jumpstart gut healing.',
    longDesc: 'Chronic inflammation is at the root of many modern diseases and fatigue levels. This structured, 7-day culinary roadmap contains simple, nutritious, anti-inflammatory recipes. It is designed to calm your digestive tract, improve gut health, and restore vital energy levels.',
    features: [
      '7 days of structured meal planning (21 meals + snacks)',
      'Prep-ahead instructions and time-saving kitchen tips',
      'Full nutritional breakdown and whole-food ingredients index',
      'Nurse-led guidance on gut healing and bloating reduction',
      'Digital PDF format'
    ],
    badge: 'Budget Friendly'
  }
];

export default function Products() {
  useSeo(
    'Explore Wellness Products',
    'Explore our collection of nurse-approved wellness guides, trackers, e-books, and OHS Act compliance toolkits by Sr. Hazel Kivedo.'
  );

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Digital Guides', 'Journals & Trackers', 'OHS Compliance'];

  const filteredProducts = activeFilter === 'All'
    ? productsData
    : productsData.filter(p => p.category === activeFilter);

  const handleOrderWhatsApp = (productName) => {
    const phoneNumber = '27615370217';
    const message = encodeURIComponent(`Hello Sr. Hazel, I would like to order the product: "${productName}" from your website. Please let me know how to proceed with payment and delivery.`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  const handleEmailInquiry = (productName) => {
    const email = 'hmhealthclear@gmail.com';
    const subject = encodeURIComponent(`Product Order Inquiry: ${productName}`);
    const body = encodeURIComponent(`Hello Sr. Hazel,\n\nI am interested in ordering your product: "${productName}". Please provide payment and delivery information.\n\nThank you!`);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 space-y-12">
      
      {/* 1. Header Intro Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          Wellness Resources
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Explore Our Products
        </h1>
        <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed">
          Nurse-approved digital guides, physical trackers, and business compliance toolkits designed to support your journey toward holistic wellness and structural safety.
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-4"></div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/40 border border-brand-teal/10 rounded-2xl backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 outline-none ${
                activeFilter === cat
                  ? 'bg-brand-teal text-white shadow shadow-brand-teal/20'
                  : 'text-brand-charcoal/70 hover:text-brand-teal hover:bg-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group relative bg-white/90 border border-white/45 rounded-3xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md"
          >
            {/* Header Badge */}
            {product.badge && (
              <span className="absolute top-4 right-4 bg-brand-pink/20 text-brand-charcoal text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}

            <div className="space-y-4">
              {/* Product Icon & Category */}
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2.5 bg-brand-teal/5 rounded-2xl group-hover:bg-brand-teal/10 transition-colors">
                  {product.icon}
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-brand-sage">
                    {product.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-brand-charcoal group-hover:text-brand-teal transition-colors leading-tight">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            {/* Footer Price & CTA */}
            <div className="pt-6 border-t border-brand-teal/5 flex items-center justify-between mt-6">
              <span className="text-lg font-bold text-brand-teal-deep">
                {product.price}
              </span>
              <button className="inline-flex items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-white px-5 py-2 text-xs font-bold transition-all duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/65 backdrop-blur-sm transition-opacity duration-300">
          <div
            className="bg-white/95 backdrop-blur-md max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/40 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-charcoal/5 transition-all outline-none"
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-[10px] font-bold uppercase tracking-wider">
                <span>{selectedProduct.icon}</span>
                <span>{selectedProduct.category}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal leading-tight">
                {selectedProduct.name}
              </h2>
              <div className="text-2xl font-bold text-brand-teal-deep">
                {selectedProduct.price}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2 text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-teal/10 pt-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-brand-sage">Product Details</h4>
              <p>{selectedProduct.longDesc}</p>
            </div>

            {/* Features/What's Inside */}
            <div className="space-y-3 bg-brand-teal/5 p-5 rounded-2xl border border-brand-teal/10">
              <h4 className="text-xs uppercase font-bold tracking-wider text-brand-teal-deep leading-none">What's Included:</h4>
              <ul className="space-y-2 text-xs text-brand-charcoal/90">
                {selectedProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-brand-teal shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-brand-teal/10">
              <a
                href={handleOrderWhatsApp(selectedProduct.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow inline-flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] py-3.5 px-6 font-semibold text-sm transition-all hover:scale-105 shadow-md shadow-brand-teal/10 text-center"
              >
                💬 Order via WhatsApp
              </a>
              <a
                href={handleEmailInquiry(selectedProduct.name)}
                className="inline-flex items-center justify-center rounded-full bg-white border border-brand-teal/20 text-brand-teal hover:bg-brand-teal/5 py-3.5 px-6 font-semibold text-sm transition-all hover:scale-105 shadow-sm text-center"
              >
                ✉️ Inquire via Email
              </a>
            </div>

          </div>
        </div>
      )}
      
      {/* 5. Return/Booking CTA banner */}
      <section className="bg-brand-charcoal text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 mt-8">
        <h3 className="text-2xl sm:text-3xl font-serif font-semibold">
          Looking for Direct Nurse-Led Consultations?
        </h3>
        <p className="text-brand-warm-white/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          In addition to our wellness resources, Sr. Hazel Kivedo conducts direct occupational medicals, dietary assessments, and personalized wellness coaching.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/27615370217"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] font-semibold px-8 py-3.5 transition-all shadow-md hover:scale-105 text-sm"
          >
            Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-teal text-white hover:bg-brand-teal-deep font-semibold px-8 py-3.5 transition-all shadow-md hover:scale-105 text-sm"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}
