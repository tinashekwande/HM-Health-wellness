import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import OccupationalHealth from './pages/OccupationalHealth';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  // Determine page-specific background image and opacity
  let bgImage = '/Background-image-hm-occhealth-hostilic-wellness.png';
  let bgOpacity = 'opacity-[0.03]';

  if (path === '/about') {
    bgImage = '/bg-about.png';
    bgOpacity = 'opacity-[0.45]';
  } else if (path === '/services') {
    bgImage = '/bg-services.png';
    bgOpacity = 'opacity-[0.45]';
  } else if (path === '/occupational-health') {
    bgImage = '/bg-occupational.png';
    bgOpacity = 'opacity-[0.45]';
  } else if (path === '/contact') {
    bgImage = '/bg-contact.png';
    bgOpacity = 'opacity-[0.45]';
  } else if (path === '/products') {
    bgImage = '/bg-services.png';
    bgOpacity = 'opacity-[0.45]';
  } else if (path === '/dashboard') {
    bgImage = '/bg-about.png';
    bgOpacity = 'opacity-[0.45]';
  }

  // Initialize databases on initial run with migration support
  useEffect(() => {
    const storedProducts = localStorage.getItem('hm_products');
    let needsMigration = !storedProducts;
    
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        // If parsed database exists but is empty or missing image fields, force update
        if (parsed.length === 0 || !parsed[0].hasOwnProperty('image')) {
          needsMigration = true;
          console.log("Database out of date: migrating products list to support cover images.");
        }
      } catch (err) {
        needsMigration = true;
      }
    }

    if (needsMigration) {
      const defaultProducts = [
        {
          id: 'food-medicine-guide',
          name: 'Let Food Be Your Medicine Guide',
          category: 'Digital Guides',
          price: 180,
          icon: '🥗',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80',
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
          price: 250,
          icon: '⚖️',
          image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
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
          price: 150,
          icon: '🏠',
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
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
          price: 450,
          icon: '🏥',
          image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80',
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
          price: 120,
          icon: '🌱',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
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
          price: 95,
          icon: '🥗',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
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
      localStorage.setItem('hm_products', JSON.stringify(defaultProducts));
    }

    if (!localStorage.getItem('hm_bookings')) {
      const defaultBookings = [
        {
          id: 'B-1719662000000',
          date: '2026-06-29 09:30',
          name: 'John Doe',
          phone: '082 123 4567',
          email: 'johndoe@gmail.com',
          service: 'Lose It For Life (Weight Coaching)',
          message: 'Interested in a 12-week weight loss program.',
          status: 'Confirmed',
          type: 'Consultation'
        },
        {
          id: 'B-1719663000000',
          date: '2026-06-29 10:15',
          name: 'Apex Construction',
          phone: '021 555 8899',
          email: 'safety@apexcon.co.za',
          service: 'OHS Assessment: Apex Construction (Construction, 45 staff)',
          message: 'Need baseline medicals for 15 workers in Bellville.',
          status: 'Pending',
          type: 'B2B Assessment'
        }
      ];
      localStorage.setItem('hm_bookings', JSON.stringify(defaultBookings));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      {/* Ambient background glow layers - mimicking the inspiration template */}
      <div className="pointer-events-none fixed -z-10 top-0 right-0 bottom-0 left-0 overflow-hidden">
        {/* Subtle page-specific background image */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${bgOpacity}`}
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        {/* Soft white overlay to keep the image subtle and preserve high readability */}
        {path !== '/' && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]"></div>
        )}
        
        {/* Soft Teal glow at top-left */}
        <div className="absolute top-[-5rem] left-[15%] w-[32rem] h-[32rem] rounded-full bg-brand-teal/5 blur-3xl"></div>
        {/* Soft Sage glow at bottom-right */}
        <div className="absolute bottom-[-10rem] right-[-5rem] w-[30rem] h-[30rem] rounded-full bg-brand-sage-light/10 blur-3xl"></div>
        {/* Subtle Pink glow at center-left */}
        <div className="absolute top-[35%] left-[-10rem] w-[26rem] h-[26rem] rounded-full bg-brand-pink/5 blur-3xl"></div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        {/* Header - Sticky */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/occupational-health" element={<OccupationalHealth />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
