import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';

export default function Products() {
  useSeo(
    'Explore Wellness Products',
    'Explore our collection of nurse-approved wellness guides, trackers, e-books, and OHS Act compliance toolkits by Sr. Hazel Kivedo.'
  );

  // Load products list from localStorage (dynamic CRUD source)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('hm_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hm_cart', JSON.stringify(cart));
  }, [cart]);

  // E-commerce cart actions
  const addToCart = (product, e) => {
    if (e) e.stopPropagation(); // prevent opening details modal
    
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Auto-open cart drawer on item addition for premium feel
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + amount;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // WhatsApp checkouts
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    
    const itemsSummary = cart
      .map((item) => `- ${item.name} (x${item.quantity}) — R${item.price * item.quantity}`)
      .join('\n');
      
    const totalVal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const msg = `Hello Sr. Hazel, I would like to order the following products from your website:

${itemsSummary}

Total Amount: R${totalVal}

Please let me know how to proceed with payment and access/delivery details.`;

    const whatsappUrl = `https://wa.me/27615370217?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after checkout redirect
    setCart([]);
    setIsCartOpen(false);
  };

  const handleEmailCheckout = () => {
    if (cart.length === 0) return;
    
    const itemsSummary = cart
      .map((item) => `- ${item.name} (x${item.quantity}) — R${item.price * item.quantity}`)
      .join('\n');
      
    const totalVal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const email = 'hmhealthclear@gmail.com';
    const subject = encodeURIComponent('Wellness Products - Order Request');
    const body = encodeURIComponent(`Hello Sr. Hazel,\n\nI would like to place an order for the following wellness products:\n\n${itemsSummary}\n\nTotal: R${totalVal}\n\nPlease provide payment and download/delivery instructions.\n\nThank you!`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSingleOrderWhatsApp = (productName, price) => {
    const msg = `Hello Sr. Hazel, I would like to order: "${productName}" (R${price}) from your website. Please let me know how to proceed.`;
    const whatsappUrl = `https://wa.me/27615370217?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setSelectedProduct(null);
  };

  // Filtering & Sorting Process
  const categories = ['All', 'Digital Guides', 'Journals & Trackers', 'OHS Compliance'];

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

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 space-y-10 relative">
      
      {/* 1. Header Intro Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
          Wellness Store
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-bold leading-tight">
          Explore Our Products
        </h1>
        <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed">
          Discover professional guides, trackers, and compliance tools curated to enrich your physical habits and align B2B health metrics.
        </p>
        <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-2"></div>
      </section>

      {/* 2. Shop Controls: Category, Search & Cart Toggle */}
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

        {/* E-Commerce Search & Sort Toolbar */}
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

          {/* Sorting and Cart Toggle Button */}
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

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand-teal text-white py-2 px-4 rounded-xl hover:bg-brand-teal-deep transition-all flex items-center gap-2 font-bold text-xs sm:text-sm shadow-md shadow-brand-teal/15 group"
            >
              <span>🛒</span>
              <span>Cart ({cartCount})</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-brand-charcoal text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white animate-pulse-subtle">
                  {cartCount}
                </span>
              )}
            </button>
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
              className="group relative bg-white/90 border border-white/45 rounded-3xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md"
            >
              {/* Product Badge */}
              {product.badge && (
                <span className="absolute top-4 right-4 bg-brand-pink/20 text-brand-charcoal text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              <div className="space-y-4">
                {/* Product Header info */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2.5 bg-brand-teal/5 rounded-2xl group-hover:bg-brand-teal/10 transition-colors">
                    {product.icon}
                  </span>
                  <div>
                    <span className="block text-[9px] uppercase font-bold tracking-wider text-brand-sage">
                      {product.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-brand-charcoal group-hover:text-brand-teal transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-brand-charcoal/75 leading-relaxed line-clamp-3">
                  {product.shortDesc}
                </p>
              </div>

              {/* Price & Actions */}
              <div className="pt-6 border-t border-brand-teal/5 flex items-center justify-between mt-6">
                <span className="text-xl font-bold text-brand-teal-deep">
                  R{product.price}
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => addToCart(product, e)}
                    className="inline-flex items-center justify-center rounded-xl bg-brand-teal text-white hover:bg-brand-teal-deep px-4 py-2 text-xs font-bold transition-all shadow-sm"
                  >
                    Add +
                  </button>
                  <button className="inline-flex items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 px-3.5 py-2 text-xs font-bold transition-all">
                    View
                  </button>
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
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-charcoal/5 transition-all outline-none"
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-3 pr-8">
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
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-grow inline-flex items-center justify-center rounded-full bg-brand-teal text-white hover:bg-brand-teal-deep py-3.5 px-6 font-semibold text-sm transition-all hover:scale-105 shadow-md shadow-brand-teal/15 text-center"
              >
                🛒 Add to Shopping Cart
              </button>
              <button
                onClick={() => handleSingleOrderWhatsApp(selectedProduct.name, selectedProduct.price)}
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] py-3.5 px-6 font-semibold text-sm transition-all hover:scale-105 shadow-sm text-center"
              >
                💬 Buy Instantly via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. Sliding Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-brand-charcoal/65 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Cart Panel Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white/95 border-l border-brand-teal/10 shadow-2xl flex flex-col justify-between p-6 relative backdrop-blur-md">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-teal/5 pb-4">
                <h3 className="font-serif font-bold text-xl text-brand-charcoal flex items-center gap-2">
                  <span>🛒</span> Shopping Cart
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-charcoal/5 outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto py-4 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 p-3 bg-brand-teal/5 rounded-2xl border border-brand-teal/10"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl p-1 bg-white rounded-xl shadow-sm">{item.icon}</span>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-brand-charcoal line-clamp-1">{item.name}</h4>
                          <span className="text-xs text-brand-teal-deep font-semibold">R{item.price} each</span>
                          
                          {/* Quantity control */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 bg-white border border-brand-teal/25 rounded-md flex items-center justify-center text-xs font-bold text-brand-charcoal hover:bg-brand-teal/10 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-brand-charcoal">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 bg-white border border-brand-teal/25 rounded-md flex items-center justify-center text-xs font-bold text-brand-charcoal hover:bg-brand-teal/10 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Item Subtotal & Delete */}
                      <div className="text-right flex flex-col justify-between h-full min-h-[4rem]">
                        <span className="text-sm font-bold text-brand-charcoal">R{item.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] font-bold text-brand-pink hover:text-red-600 self-end"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-brand-charcoal/50 space-y-2 py-16">
                    <span className="text-5xl block">🛒</span>
                    <h4 className="font-serif font-bold text-lg">Your cart is empty</h4>
                    <p className="text-xs">Add guides and wellness items to start building your cart.</p>
                  </div>
                )}
              </div>

              {/* Footer Calculations & Checkout buttons */}
              <div className="border-t border-brand-teal/5 pt-4 space-y-4">
                <div className="flex justify-between items-center text-brand-charcoal">
                  <span className="text-sm font-semibold uppercase tracking-wider">Subtotal:</span>
                  <span className="text-2xl font-bold text-brand-teal-deep">R{cartSubtotal}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    disabled={cart.length === 0}
                    onClick={handleCheckoutWhatsApp}
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] py-3.5 font-bold text-sm transition-all hover:scale-105 shadow-md shadow-brand-teal/10 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    💬 Checkout via WhatsApp
                  </button>
                  <button
                    disabled={cart.length === 0}
                    onClick={handleEmailCheckout}
                    className="w-full inline-flex items-center justify-center rounded-full bg-white border border-brand-teal/20 text-brand-teal hover:bg-brand-teal/5 py-3 font-semibold text-xs transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    ✉️ Checkout via Email
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. Return/Booking CTA banner */}
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
