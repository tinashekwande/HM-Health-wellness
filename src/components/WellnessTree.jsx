import React, { useState } from 'react';

const dimensions = [
  {
    id: 'physical',
    name: 'Physical',
    icon: '🏥',
    color: 'from-[#2E8B8B] to-[#23666B]',
    description: 'Caring for your physical body through proper nutrition, movement, adequate sleep, and preventative health screening to build strength, energy, and long-term vitality.',
    tip: 'Integrate balanced food choices and regular health check-ups into your routine.'
  },
  {
    id: 'environmental',
    name: 'Environmental',
    icon: '🏠',
    color: 'from-[#8DAA91] to-[#2E8B8B]',
    description: 'Creating clean, decluttered, and organized living and working spaces that promote mental clarity, peace of mind, and overall stress reduction.',
    tip: 'Start with organizing a single drawer or desk to experience the immediate calming effect of order.'
  },
  {
    id: 'emotional',
    name: 'Emotional',
    icon: '🧘',
    color: 'from-[#E8B7C7] to-[#8DAA91]',
    description: 'Cultivating mindfulness, self-compassion, and stress-management techniques to navigate life\'s transitions and maintain emotional balance.',
    tip: 'Take 5 minutes daily for intentional, quiet breathing to reset your nervous system.'
  },
  {
    id: 'occupational',
    name: 'Occupational',
    icon: '⚙️',
    color: 'from-[#23666B] to-[#8DAA91]',
    description: 'Fostering safety, wellness, and regulatory compliance in your workspace to protect physical health and maximize productivity and job satisfaction.',
    tip: 'Ensure proper ergonomics and schedule baseline medical screening for high-risk work environments.'
  },
  {
    id: 'spiritual',
    name: 'Spiritual',
    icon: '✨',
    color: 'from-[#E8B7C7] to-[#2E8B8B]',
    description: 'Connecting with your inner values, faith, and purpose to guide your choices and bring compassion and deep meaning to your daily life.',
    tip: 'Allow time for reflection, prayer, or nature walks to connect with your core values.'
  },
  {
    id: 'intellectual',
    name: 'Intellectual',
    icon: '📚',
    color: 'from-[#8DAA91] to-[#B7D3B0]',
    description: 'Engaging in continuous learning, open-minded exploration, and creative problem-solving to stimulate mental growth and curiosity.',
    tip: 'Read articles, learn new skills, or solve puzzles that challenge your default patterns.'
  },
  {
    id: 'social',
    name: 'Social',
    icon: '👥',
    color: 'from-[#2E8B8B] to-[#B7D3B0]',
    description: 'Nurturing healthy, supportive relationships and actively connecting with families, churches, NGOs, and local community groups.',
    tip: 'Reach out to a family member or participate in community gatherings to build support systems.'
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: '💵',
    color: 'from-[#B7D3B0] to-[#8DAA91]',
    description: 'Managing economic resources responsibly to secure basic needs, reduce anxiety, and support your long-term wellness goals.',
    tip: 'Align your budget with your health priorities and focus on sustainable, practical lifestyle choices.'
  }
];

export default function WellnessTree() {
  const [activeId, setActiveId] = useState('physical');
  const activeDim = dimensions.find(d => d.id === activeId) || dimensions[0];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-brand-teal/10 bg-white/60 p-6 sm:p-8 backdrop-blur-xl shadow-lg shadow-brand-charcoal/5">
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        
        {/* SVG Tree & Interactive Nodes (Left) */}
        <div className="lg:col-span-7 flex flex-col items-center relative py-6">
          <h3 className="text-xl font-serif text-brand-charcoal font-medium mb-6 text-center lg:hidden">
            Interactive Dimensions of Wellness
          </h3>
          
          {/* Interactive Circle Wrapper */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            
            {/* Ambient background glow inside the circle */}
            <div className="absolute w-48 h-48 rounded-full bg-brand-sage-light/20 blur-2xl -z-10 animate-pulse-subtle"></div>
            
            {/* Central SVG Tree representation */}
            <svg className="w-36 h-36 sm:w-48 sm:h-48 text-brand-teal-deep opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 90C50 75 48 65 48 55C48 45 42 40 40 32C38 24 44 15 50 15C56 15 62 24 60 32C58 40 52 45 52 55C52 65 50 75 50 90Z" fill="currentColor" opacity="0.15" />
              <path d="M50 85V55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M50 68C45 64 36 65 33 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 62C55 58 64 59 67 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 50C42 44 38 34 40 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M50 46C58 40 62 30 60 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M50 32C46 22 50 18 50 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              
              {/* Decorative Leaves */}
              <circle cx="50" cy="15" r="4" className="fill-brand-pink" />
              <circle cx="40" cy="28" r="4.5" className="fill-brand-teal" />
              <circle cx="60" cy="24" r="4.5" className="fill-brand-sage" />
              <circle cx="33" cy="60" r="5" className="fill-brand-sage-light" />
              <circle cx="67" cy="54" r="5" className="fill-brand-pink" />
            </svg>
            
            {/* Surrounding Buttons */}
            {dimensions.map((dim, idx) => {
              // Calculate positions around the circle
              const angle = (idx * 360) / dimensions.length;
              const radius = window.innerWidth < 640 ? 120 : 160; // radius in px
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              const isSelected = dim.id === activeId;
              
              return (
                <button
                  key={dim.id}
                  onClick={() => setActiveId(dim.id)}
                  onMouseEnter={() => setActiveId(dim.id)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className={`absolute flex flex-col items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-full border transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/40 ${
                    isSelected 
                      ? 'bg-brand-teal text-white border-brand-teal-deep scale-110 z-10 shadow-md shadow-brand-teal/20' 
                      : 'bg-white text-brand-charcoal border-brand-teal/10 hover:border-brand-teal/40 hover:scale-105'
                  }`}
                >
                  <span className="text-lg sm:text-xl mb-0.5">{dim.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-tight uppercase leading-none">
                    {dim.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Dynamic Display Details (Right) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div className="hidden lg:block mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-brand-teal/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-teal-deep">
              🌱 The Wellness Tree
            </span>
          </div>
          
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${activeDim.color} text-white shadow-md transition-all duration-500 ease-out`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl p-2 bg-white/20 rounded-xl" role="img" aria-label={activeDim.name}>
                {activeDim.icon}
              </span>
              <div>
                <h4 className="text-xl font-serif font-medium leading-none">{activeDim.name}</h4>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wider font-semibold">Dimension of Health</p>
              </div>
            </div>
            
            <p className="text-sm sm:text-base leading-relaxed text-white/90 mb-5">
              {activeDim.description}
            </p>
            
            <div className="border-t border-white/20 pt-4">
              <div className="flex gap-2.5 items-start">
                <span className="text-sm mt-0.5">💡</span>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-white/80 leading-none">Practical Focus</h5>
                  <p className="text-xs sm:text-sm text-white/90 mt-1 leading-snug">{activeDim.tip}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center lg:text-left text-xs text-brand-charcoal/60 italic">
            Inspired by the wellness tree concept, showing how lifestyle choices and physical safety branch together for holistic health.
          </div>
        </div>

      </div>
    </div>
  );
}
