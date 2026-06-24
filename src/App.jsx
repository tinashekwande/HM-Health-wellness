import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import OccupationalHealth from './pages/OccupationalHealth';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Ambient background glow layers - mimicking the inspiration template */}
      <div className="pointer-events-none fixed -z-10 top-0 right-0 bottom-0 left-0 overflow-hidden">
        {/* Subtle background watermark image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03]"
          style={{ backgroundImage: "url('/Background-image-hm-occhealth-hostilic-wellness.png')" }}
        ></div>
        {/* Soft Teal glow at top-left */}
        <div className="absolute top-[-5rem] left-[15%] w-[32rem] h-[32rem] rounded-full bg-brand-teal/5 blur-3xl"></div>
        {/* Soft Sage glow at bottom-right */}
        <div className="absolute bottom-[-10rem] right-[-5rem] w-[30rem] h-[30rem] rounded-full bg-brand-sage-light/10 blur-3xl"></div>
        {/* Subtle Pink glow at center-left */}
        <div className="absolute top-[35%] left-[-10rem] w-[26rem] h-[26rem] rounded-full bg-brand-pink/5 blur-3xl"></div>
      </div>
      
      <div className="min-h-screen flex flex-col justify-between">
        {/* Header - Sticky */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/occupational-health" element={<OccupationalHealth />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
