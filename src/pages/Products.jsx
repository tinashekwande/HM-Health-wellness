import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';

export default function Products() {
  useSeo({
    title: 'Induka Wellness Products & Digital Health Guides | HM OccHealth',
    description: 'Explore premium Induka wellness guides, Anti-Inflammatory meal plans, and Lose It For Life habit trackers. Nurse-led resources designed for sustainable health.',
    keywords: 'induka wellness products, anti inflammatory meal plan guide, lose it for life habit tracker, clean eating guide pdf, organized home workbook, wellness resources south africa, sr hazel kivedo',
    canonical: '/products',
    image: '/hazel.png'
  });

  // Load products list from localStorage (dynamic CRUD source)
  const [products, setProducts] = useState([]);
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync products from localStorage on mount and when changes occur
  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = localStorage.getItem('hm_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    };
    
    loadProducts();
    
    // Add event listener to capture changes if they modify in another tab
    window.addEventListener('storage', loadProducts);
    return () => window.removeEventListener('storage', loadProducts);
  }, []);

  const handleEnquiryWhatsApp = (productName, price) => {
    const msg = `Hello, I would like to enquire about: "${productName}" (R${price}). Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/27615370217?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setSelectedProduct(null);
  };

  const handleEnquiryEmail = (productName, price) => {
    const email = 'hmhealthclear@gmail.com';
    const subject = encodeURIComponent(`Product Enquiry: ${productName}`);
    const body = encodeURIComponent(`Hello,

I would like to enquire about the following product:
- ${productName} (R${price})

Could you please provide more information?

Thank you!`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Filtering & Sorting Process
  const categories = ['All', 'Digital Guides', 'Journals & Trackers', 'OHS Compliance', 'Wellness Tools'];

  // Apply filters
  let processedProducts = products.filter((product) => {
    const matchesCategory = activeFilter === 'All' || product.category === activeFilter;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  if (sortBy === 'price-asc') {
    processedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'price-desc') {
    processedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === 'name-asc') {
    processedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Induka Wellness Products",
    "description": "Professional health guides, lifestyle trackers, and compliance resources created by Registered Nurse Sr. Hazel Kivedo.",
    "numberOfItems": products.length,
    "itemListElement": products.map((prod, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": prod.name,
        "description": prod.shortDesc || prod.longDesc,
        "image": prod.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
        "category": prod.category,
        "offers": {
          "@type": "Offer",
          "price": prod.price,
          "priceCurrency": "ZAR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "HM Occhealth & Holistic Wellness"
          }
        }
      }
    }))
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
        "name": "Induka Products",
        "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://hmhealthwellness.co.za'}/products`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 space-y-10 relative">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* 1. Header Intro Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          Induka Wellness Products
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Induka Wellness Products
        </h1>
        <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed">
          Discover professional Induka brand guides, trackers, and compliance tools curated to enrich your physical habits and align B2B health metrics.
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-2"></div>
      </section>

      {/* 2. Shop Controls: Category & Search */}
      <section className="space-y-6">
        {/* Category Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/50 border border-brand-teal/10 rounded-2xl backdrop-blur-md">
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
        </div>

        {/* Search & Sort Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-between gap-4 bg-white/70 border border-white/40 p-4 rounded-2xl backdrop-blur-md shadow-sm">
          {/* Search box */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search wellness products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-brand-warm-white border border-brand-teal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <span className="absolute left-3.5 top-3 text-brand-charcoal/40 text-sm">🔍</span>
          </div>

          {/* Sorting */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-charcoal/60 uppercase">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm bg-brand-warm-white border border-brand-teal/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products Gallery Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {processedProducts.length > 0 ? (
          processedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-white/90 border border-white/45 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md"
            >
              {/* Product Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-teal/5">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-brand-pink text-brand-charcoal text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-brand-teal-deep text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  {product.category}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{product.icon}</span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-brand-charcoal group-hover:text-brand-teal transition-colors leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-charcoal/75 leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-brand-teal/5 flex flex-col xs:flex-row gap-3 items-start xs:items-center justify-between mt-auto">
                  <span className="text-lg xs:text-xl font-bold text-brand-teal-deep">
                    R{product.price}
                  </span>
                  
                  <div className="flex w-full xs:w-auto">
                    <button className="flex-1 xs:flex-none inline-flex items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 px-4 py-2.5 text-xs font-bold transition-all active:scale-95">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white/60 border border-white/40 rounded-3xl backdrop-blur-md">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="font-serif font-bold text-xl text-brand-charcoal">No Products Found</h3>
            <p className="text-brand-charcoal/70 text-sm mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        )}
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
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-charcoal/5 transition-all outline-none bg-white/80 backdrop-blur-sm"
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Cover Image in Modal */}
            <div className="h-64 w-full overflow-hidden bg-brand-teal/5 rounded-2xl">
              <img
                src={selectedProduct.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-[9px] font-bold uppercase tracking-wider">
                <span>{selectedProduct.icon}</span>
                <span>{selectedProduct.category}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal leading-tight">
                {selectedProduct.name}
              </h2>
              <div className="text-2xl font-bold text-brand-teal-deep">
                R{selectedProduct.price}
              </div>
            </div>

            <div className="space-y-2 text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-teal/10 pt-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-brand-sage">Product Details</h4>
              <p>{selectedProduct.longDesc}</p>
            </div>

            <div className="space-y-3 bg-brand-teal/5 p-5 rounded-2xl border border-brand-teal/10">
              <h4 className="text-xs uppercase font-bold tracking-wider text-brand-teal-deep leading-none">What's Included:</h4>
              <ul className="space-y-2 text-xs text-brand-charcoal/90">
                {selectedProduct.features && selectedProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-brand-teal shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-brand-teal/10">
              <button
                onClick={() => handleEnquiryEmail(selectedProduct.name, selectedProduct.price)}
                className="flex-grow inline-flex items-center justify-center rounded-2xl bg-brand-teal text-white hover:bg-brand-teal-deep py-3.5 px-6 font-semibold text-sm transition-all hover:scale-105 shadow-md shadow-brand-teal/15 text-center"
              >
                ✉️ Enquire via Email
              </button>
              <button
                onClick={() => handleEnquiryWhatsApp(selectedProduct.name, selectedProduct.price)}
                className="inline-flex items-center justify-center rounded-2xl bg-[#25D366] text-white hover:bg-[#20ba5a] py-3.5 px-6 font-semibold text-sm transition-all hover:scale-105 shadow-sm text-center"
              >
                💬 Enquire via WhatsApp
              </button>
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
        <div className="pt-2 flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            to="/wellness"
            className="w-full md:w-auto inline-flex items-center justify-center rounded-2xl bg-brand-teal/20 text-white hover:bg-brand-teal/40 border border-brand-teal/30 font-semibold px-6 py-3.5 transition-all shadow-sm hover:scale-105 text-sm"
          >
            Explore Our Wellness Programme
          </Link>
          <a
            href="https://wa.me/27615370217"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center rounded-2xl bg-[#25D366] text-white hover:bg-[#20ba5a] font-semibold px-6 py-3.5 transition-all shadow-md hover:scale-105 text-sm"
          >
            Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="w-full md:w-auto inline-flex items-center justify-center rounded-2xl bg-brand-teal text-white hover:bg-brand-teal-deep font-semibold px-6 py-3.5 transition-all shadow-md hover:scale-105 text-sm"
          >
            Request a Quote
          </Link>
        </div>
      </section>

    </div>
  );
}
