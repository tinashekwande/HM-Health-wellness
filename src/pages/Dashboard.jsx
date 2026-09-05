import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';

export default function Dashboard() {
  useSeo({
    title: 'Staff Management Portal',
    description: 'Internal management portal for HM Occhealth & Holistic Wellness staff.',
    noindex: true
  });

  const [activeTab, setActiveTab] = useState('overview');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('hm_authenticated') === 'true');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'NurseHazel@Wellness') {
      setIsAuthenticated(true);
      sessionStorage.setItem('hm_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('hm_authenticated');
  };

  // Load products, bookings, blocked dates from localStorage
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const storedProducts = localStorage.getItem('hm_products');
      const storedBookings = localStorage.getItem('hm_bookings');
      const storedBlocked = localStorage.getItem('hm_blocked_dates');
      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedBookings) setBookings(JSON.parse(storedBookings));
      if (storedBlocked) setBlockedDates(JSON.parse(storedBlocked));
    };
    loadData();
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem('hm_products', JSON.stringify(updated));
  };

  const saveBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem('hm_bookings', JSON.stringify(updated));
  };

  const saveBlockedDates = (updated) => {
    setBlockedDates(updated);
    localStorage.setItem('hm_blocked_dates', JSON.stringify(updated));
  };

  // CRUD State & Handlers - BOOKINGS
  const [bookingForm, setBookingForm] = useState({
    id: '',
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    numberOfPeople: '',
    preferredDate: '',
    message: '',
    status: 'Pending',
    type: 'Consultation'
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingEditMode, setBookingEditMode] = useState(false);
  const [bookingDetailItem, setBookingDetailItem] = useState(null);
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingEditMode) {
      const updated = bookings.map((b) => (b.id === bookingForm.id ? { ...bookingForm } : b));
      saveBookings(updated);
    } else {
      const newBooking = {
        ...bookingForm,
        id: 'B-' + Date.now(),
        date: new Date().toLocaleDateString('en-ZA') + ' ' + new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
      };
      saveBookings([newBooking, ...bookings]);
    }
    setIsBookingModalOpen(false);
    resetBookingForm();
  };

  const startBookingEdit = (booking) => {
    setBookingForm({
      ...booking,
      company: booking.company || '',
      numberOfPeople: booking.numberOfPeople || '',
      preferredDate: booking.preferredDate || ''
    });
    setBookingEditMode(true);
    setIsBookingModalOpen(true);
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking request?')) {
      const updated = bookings.filter((b) => b.id !== id);
      saveBookings(updated);
      if (bookingDetailItem && bookingDetailItem.id === id) setBookingDetailItem(null);
    }
  };

  const updateBookingStatus = (id, newStatus) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    saveBookings(updated);
    if (bookingDetailItem && bookingDetailItem.id === id) {
      setBookingDetailItem({ ...bookingDetailItem, status: newStatus });
    }
  };

  const resetBookingForm = () => {
    setBookingForm({
      id: '',
      name: '',
      company: '',
      phone: '',
      email: '',
      service: '',
      numberOfPeople: '',
      preferredDate: '',
      message: '',
      status: 'Pending',
      type: 'Consultation'
    });
    setBookingEditMode(false);
  };

  // Conflict detection
  const getConflictsForBooking = (booking) => {
    const prefDate = booking.preferredDate;
    if (!prefDate) return { hasConflict: false, conflicts: [] };
    
    const conflicts = [];
    
    // Check against blocked dates
    const isBlocked = blockedDates.some(bd => {
      if (bd.startDate && bd.endDate) {
        return prefDate >= bd.startDate && prefDate <= bd.endDate;
      }
      return bd.date === prefDate;
    });
    if (isBlocked) conflicts.push('Blocked date');
    
    // Check against other bookings on same date
    const sameDate = bookings.filter(b => 
      b.id !== booking.id && 
      b.preferredDate === prefDate && 
      (b.status === 'Pending' || b.status === 'Confirmed')
    );
    if (sameDate.length > 0) {
      conflicts.push(`${sameDate.length} other booking(s) on this date`);
    }
    
    return { hasConflict: conflicts.length > 0, conflicts };
  };

  // Filtered bookings
  const filteredBookings = bookingStatusFilter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === bookingStatusFilter);

  // CRUD State & Handlers - PRODUCTS
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    category: 'Digital Guides',
    price: '',
    icon: '🌱',
    image: '',
    shortDesc: '',
    longDesc: '',
    featuresText: '',
    badge: ''
  });
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productEditMode, setProductEditMode] = useState(false);
  const [productPreviewItem, setProductPreviewItem] = useState(null);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    
    const featuresArray = productForm.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const formattedProduct = {
      id: productForm.id || 'P-' + Date.now(),
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price) || 0,
      icon: productForm.icon || '🌱',
      image: productForm.image || '',
      shortDesc: productForm.shortDesc,
      longDesc: productForm.longDesc,
      features: featuresArray,
      badge: productForm.badge
    };

    if (productEditMode) {
      const updated = products.map((p) => (p.id === formattedProduct.id ? formattedProduct : p));
      saveProducts(updated);
    } else {
      saveProducts([...products, formattedProduct]);
    }
    setIsProductModalOpen(false);
    resetProductForm();
  };

  const startProductEdit = (product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      icon: product.icon,
      image: product.image || '',
      shortDesc: product.shortDesc,
      longDesc: product.longDesc,
      featuresText: product.features ? product.features.join('\n') : '',
      badge: product.badge || ''
    });
    setProductEditMode(true);
    setIsProductModalOpen(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
    }
  };

  const resetProductForm = () => {
    setProductForm({
      id: '',
      name: '',
      category: 'Digital Guides',
      price: '',
      icon: '🌱',
      image: '',
      shortDesc: '',
      longDesc: '',
      featuresText: '',
      badge: ''
    });
    setProductEditMode(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setProductForm((prev) => ({ ...prev, image: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // BLOCKED DATES
  const [isBlockedDateModalOpen, setIsBlockedDateModalOpen] = useState(false);
  const [blockedDateForm, setBlockedDateForm] = useState({
    date: '',
    endDate: '',
    reason: 'Staff Unavailable'
  });

  const handleBlockDateSubmit = (e) => {
    e.preventDefault();
    const newBlocked = {
      id: 'BD-' + Date.now(),
      date: blockedDateForm.date,
      startDate: blockedDateForm.date,
      endDate: blockedDateForm.endDate || blockedDateForm.date,
      reason: blockedDateForm.reason
    };
    saveBlockedDates([...blockedDates, newBlocked]);
    setIsBlockedDateModalOpen(false);
    setBlockedDateForm({ date: '', endDate: '', reason: 'Staff Unavailable' });
  };

  const removeBlockedDate = (id) => {
    if (window.confirm('Remove this blocked date?')) {
      saveBlockedDates(blockedDates.filter(bd => bd.id !== id));
    }
  };

  // CALENDAR STATE
  const [calendarDate, setCalendarDate] = useState(new Date());

  const calendarYear = calendarDate.getFullYear();
  const calendarMonth = calendarDate.getMonth();

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calendarYear, calendarMonth + 1, 1));

  // Build calendar data
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      
      const dayBookings = bookings.filter(b => b.preferredDate === dateStr);
      const isBlocked = blockedDates.some(bd => {
        const start = bd.startDate || bd.date;
        const end = bd.endDate || bd.date;
        return dateStr >= start && dateStr <= end;
      });
      
      days.push({
        day: d,
        dateStr,
        bookings: dayBookings,
        isBlocked,
        hasPending: dayBookings.some(b => b.status === 'Pending'),
        hasConfirmed: dayBookings.some(b => b.status === 'Confirmed'),
        hasDeclined: dayBookings.some(b => b.status === 'Declined'),
        hasCancelled: dayBookings.some(b => b.status === 'Cancelled')
      });
    }
    return days;
  }, [bookings, blockedDates, calendarYear, calendarMonth, daysInMonth, firstDayOfWeek]);

  // Database Backup / Reset Actions
  const resetDatabaseToDefaults = () => {
    if (window.confirm('WARNING: This will reset all products, bookings, and blocked dates to default settings. Existing edits will be lost. Proceed?')) {
      localStorage.removeItem('hm_products');
      localStorage.removeItem('hm_bookings');
      localStorage.removeItem('hm_blocked_dates');
      window.location.reload();
    }
  };

  const exportDatabaseJson = () => {
    const backupData = {
      products,
      bookings,
      blockedDates,
      exportedAt: new Date().toISOString()
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `hm_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDatabaseJson = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.products && parsed.bookings) {
          saveProducts(parsed.products);
          saveBookings(parsed.bookings);
          if (parsed.blockedDates) saveBlockedDates(parsed.blockedDates);
          alert('Database restored successfully!');
          window.location.reload();
        } else {
          alert('Invalid backup file structure. Ensure both products and bookings lists exist.');
        }
      } catch (err) {
        alert('Failed to parse backup file: ' + err.message);
      }
    };
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  // KPI Calculations
  const totalBookingsCount = bookings.length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const declinedBookingsCount = bookings.filter((b) => b.status === 'Declined').length;
  const activeProductsCount = products.length;

  const statusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-brand-teal/15 text-brand-teal';
      case 'Pending': return 'bg-orange-100 text-orange-600';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Declined': return 'bg-red-100 text-red-600';
      case 'Cancelled': return 'bg-gray-100 text-gray-500';
      default: return 'bg-brand-charcoal/10 text-brand-charcoal';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 pt-32 pb-16">
        <div className="bg-white/90 border border-white/40 rounded-3xl p-8 shadow-xl backdrop-blur-md space-y-6 text-center animate-fade-in-up">
          <div className="space-y-2">
            <img src="/no-background-logo.png" alt="HM Logo" className="w-24 h-16 mx-auto object-contain" />
            <h2 className="font-serif font-bold text-2xl text-brand-charcoal">Management Portal</h2>
            <p className="text-xs text-brand-charcoal/60">Enter password to access bookings, products, and calendar.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Access Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-brand-warm-white border border-brand-teal/15 text-brand-charcoal rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal text-center"
              />
            </div>
            {loginError && <p className="text-xs text-red-500 font-semibold">{loginError}</p>}
            
            <button
              type="submit"
              className="w-full bg-brand-teal hover:bg-brand-teal-deep text-white py-3 rounded-2xl font-semibold text-sm transition-all shadow-md"
            >
              Authenticate Portal
            </button>
          </form>
          
          <div className="pt-2">
            <Link to="/" className="text-xs text-brand-teal hover:underline">
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 space-y-8">
      
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-brand-teal/10 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">
            Staff Workspace
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-brand-charcoal font-bold leading-tight">
            Management Portal
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportDatabaseJson}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-all"
          >
            📥 Backup DB
          </button>
          <label className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-all cursor-pointer">
            📤 Restore DB
            <input type="file" accept=".json" onChange={importDatabaseJson} className="hidden" />
          </label>
          <button
            onClick={resetDatabaseToDefaults}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
          >
            ⚠️ Reset DB
          </button>
        </div>
      </section>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Sidebar Tabs */}
        <div className="space-y-2 flex flex-row lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 border-b lg:border-b-0 border-brand-teal/10 w-full gap-2 lg:gap-0">
          {[
            { key: 'overview', label: '📊 Overview' },
            { key: 'bookings', label: `📋 Bookings (${totalBookingsCount})` },
            { key: 'calendar', label: '📅 Calendar' },
            { key: 'products', label: `🛒 Products (${activeProductsCount})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-auto lg:w-full text-center lg:text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeTab === tab.key
                  ? 'bg-brand-teal text-white shadow shadow-brand-teal/15'
                  : 'text-brand-charcoal/80 hover:bg-brand-teal/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <hr className="hidden lg:block border-brand-teal/10 my-2" />
          <button
            onClick={handleLogout}
            className="w-auto lg:w-full text-center lg:text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all shrink-0"
          >
            🚪 Log Out
          </button>
        </div>

        {/* Core Workspace */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white/80 border border-white/50 p-5 rounded-2xl shadow-sm backdrop-blur-md">
                  <span className="text-xs uppercase font-bold tracking-wider text-brand-sage">Total Bookings</span>
                  <div className="text-3xl font-bold text-brand-charcoal mt-1">{totalBookingsCount}</div>
                </div>
                <div className="bg-white/80 border border-white/50 p-5 rounded-2xl shadow-sm backdrop-blur-md">
                  <span className="text-xs uppercase font-bold tracking-wider text-brand-sage">Pending</span>
                  <div className="text-3xl font-bold text-orange-500 mt-1">{pendingBookingsCount}</div>
                </div>
                <div className="bg-white/80 border border-white/50 p-5 rounded-2xl shadow-sm backdrop-blur-md">
                  <span className="text-xs uppercase font-bold tracking-wider text-brand-sage">Confirmed</span>
                  <div className="text-3xl font-bold text-brand-teal mt-1">{confirmedBookingsCount}</div>
                </div>
                <div className="bg-white/80 border border-white/50 p-5 rounded-2xl shadow-sm backdrop-blur-md">
                  <span className="text-xs uppercase font-bold tracking-wider text-brand-sage">Products</span>
                  <div className="text-3xl font-bold text-brand-teal-deep mt-1">{activeProductsCount}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 border border-white/50 p-6 rounded-2xl shadow-sm backdrop-blur-md space-y-4">
                <h3 className="font-serif font-bold text-lg text-brand-charcoal border-b border-brand-teal/5 pb-2">
                  Quick Actions
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => { resetProductForm(); setIsProductModalOpen(true); }}
                    className="p-5 bg-brand-teal text-white hover:bg-brand-teal-deep rounded-2xl shadow-sm hover:scale-[1.01] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🛍️</span>
                    <span className="font-bold text-sm">Add New Product</span>
                  </button>
                  <button
                    onClick={() => { resetBookingForm(); setIsBookingModalOpen(true); }}
                    className="p-5 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-2xl shadow-sm hover:scale-[1.01] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">📅</span>
                    <span className="font-bold text-sm">Register Manual Booking</span>
                  </button>
                  <button
                    onClick={() => setIsBlockedDateModalOpen(true)}
                    className="p-5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-2xl shadow-sm hover:scale-[1.01] transition-all flex flex-col items-center justify-center text-center space-y-2 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">🚫</span>
                    <span className="font-bold text-sm">Block Date</span>
                  </button>
                </div>
              </div>

              {/* Recent Bookings & Guides */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white/80 border border-white/50 p-6 rounded-2xl shadow-sm backdrop-blur-md space-y-4">
                  <h3 className="font-serif font-bold text-lg text-brand-charcoal border-b border-brand-teal/5 pb-2">
                    Recent Booking Requests
                  </h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => {
                      const { hasConflict } = getConflictsForBooking(b);
                      return (
                        <div key={b.id} className="flex justify-between items-center text-xs p-3 bg-brand-teal/5 rounded-xl border border-brand-teal/5 cursor-pointer hover:bg-brand-teal/10 transition-colors" onClick={() => { setBookingDetailItem(b); setActiveTab('bookings'); }}>
                          <div>
                            <div className="font-bold text-brand-charcoal flex items-center gap-1">
                              {b.name}
                              {hasConflict && <span title="Potential conflict">⚠️</span>}
                            </div>
                            <div className="text-brand-charcoal/60 mt-0.5">{b.service}</div>
                            {b.preferredDate && <div className="text-brand-charcoal/50 mt-0.5">📅 {b.preferredDate}</div>}
                          </div>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${statusColor(b.status)}`}>
                            {b.status}
                          </span>
                        </div>
                      );
                    })}
                    {bookings.length === 0 && (
                      <p className="text-xs text-brand-charcoal/50 py-4 text-center">No booking requests yet.</p>
                    )}
                  </div>
                </div>

                <div className="bg-white/80 border border-white/50 p-6 rounded-2xl shadow-sm backdrop-blur-md space-y-4">
                  <h3 className="font-serif font-bold text-lg text-brand-charcoal border-b border-brand-teal/5 pb-2">
                    Blocked Dates
                  </h3>
                  <div className="space-y-2">
                    {blockedDates.slice(0, 5).map(bd => (
                      <div key={bd.id} className="flex justify-between items-center text-xs p-3 bg-red-50 rounded-xl border border-red-100">
                        <div>
                          <div className="font-bold text-red-700">
                            🚫 {bd.startDate === bd.endDate ? bd.date : `${bd.startDate} → ${bd.endDate}`}
                          </div>
                          <div className="text-red-500/80 mt-0.5">{bd.reason}</div>
                        </div>
                        <button onClick={() => removeBlockedDate(bd.id)} className="text-red-400 hover:text-red-600 font-bold text-[10px]">Remove</button>
                      </div>
                    ))}
                    {blockedDates.length === 0 && (
                      <p className="text-xs text-brand-charcoal/50 py-4 text-center">No blocked dates set.</p>
                    )}
                    <button onClick={() => setIsBlockedDateModalOpen(true)} className="w-full text-center text-xs font-bold text-brand-teal hover:text-brand-teal-deep py-2">
                      + Block a Date
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Booking Detail Slide-in */}
              {bookingDetailItem && (
                <div className="bg-white/95 border border-brand-teal/15 rounded-2xl p-6 shadow-lg backdrop-blur-md space-y-4 animate-fade-in">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-widest text-brand-teal">Booking Detail</span>
                      <h3 className="font-serif font-bold text-xl text-brand-charcoal mt-1">{bookingDetailItem.name}</h3>
                    </div>
                    <button onClick={() => setBookingDetailItem(null)} className="text-brand-charcoal/40 hover:text-brand-charcoal p-1">✕</button>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2 text-sm">
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Company:</span><p className="text-brand-charcoal">{bookingDetailItem.company || 'N/A'}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Phone:</span><p className="text-brand-charcoal">{bookingDetailItem.phone}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Email:</span><p className="text-brand-charcoal">{bookingDetailItem.email}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Service(s):</span><p className="text-brand-charcoal">{bookingDetailItem.service}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Number of People:</span><p className="text-brand-charcoal">{bookingDetailItem.numberOfPeople || 'N/A'}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Preferred Date:</span><p className="text-brand-charcoal">{bookingDetailItem.preferredDate || 'Not specified'}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Type:</span><p className="text-brand-charcoal">{bookingDetailItem.type}</p></div>
                    <div><span className="font-bold text-brand-charcoal/60 text-xs uppercase">Submitted:</span><p className="text-brand-charcoal">{bookingDetailItem.date}</p></div>
                  </div>
                  
                  {bookingDetailItem.message && (
                    <div className="bg-brand-teal/5 p-4 rounded-xl">
                      <span className="font-bold text-brand-charcoal/60 text-xs uppercase">Additional Notes:</span>
                      <p className="text-sm text-brand-charcoal mt-1">{bookingDetailItem.message}</p>
                    </div>
                  )}

                  {/* Conflict Check */}
                  {(() => {
                    const { hasConflict, conflicts } = getConflictsForBooking(bookingDetailItem);
                    return hasConflict ? (
                      <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-lg">⚠️</span>
                        <div>
                          <p className="font-bold text-orange-700 text-sm">Potential Calendar Conflict</p>
                          <ul className="text-xs text-orange-600 mt-1 space-y-0.5">
                            {conflicts.map((c, i) => <li key={i}>• {c}</li>)}
                          </ul>
                        </div>
                      </div>
                    ) : bookingDetailItem.preferredDate ? (
                      <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-lg">✅</span>
                        <p className="font-bold text-green-700 text-sm">No calendar conflicts detected for {bookingDetailItem.preferredDate}</p>
                      </div>
                    ) : null;
                  })()}

                  {/* Status Actions */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-brand-teal/10">
                    <span className={`px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider ${statusColor(bookingDetailItem.status)}`}>
                      Current: {bookingDetailItem.status}
                    </span>
                    <div className="flex gap-2 ml-auto">
                      {bookingDetailItem.status !== 'Confirmed' && (
                        <button onClick={() => updateBookingStatus(bookingDetailItem.id, 'Confirmed')} className="px-3 py-1.5 rounded-lg bg-brand-teal text-white text-xs font-bold hover:bg-brand-teal-deep transition-all">Confirm</button>
                      )}
                      {bookingDetailItem.status !== 'Declined' && (
                        <button onClick={() => updateBookingStatus(bookingDetailItem.id, 'Declined')} className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition-all">Decline</button>
                      )}
                      {bookingDetailItem.status !== 'Cancelled' && bookingDetailItem.status !== 'Declined' && (
                        <button onClick={() => updateBookingStatus(bookingDetailItem.id, 'Cancelled')} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-all">Cancel</button>
                      )}
                      {bookingDetailItem.status === 'Confirmed' && (
                        <button onClick={() => updateBookingStatus(bookingDetailItem.id, 'Completed')} className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold hover:bg-green-200 transition-all">Complete</button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bookings Table */}
              <div className="bg-white/80 border border-white/50 rounded-2xl shadow-sm p-6 space-y-6 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-serif font-bold text-xl text-brand-charcoal">Booking Requests</h3>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Pending', 'Confirmed', 'Declined', 'Cancelled', 'Completed'].map(s => (
                      <button key={s} onClick={() => setBookingStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${bookingStatusFilter === s ? 'bg-brand-teal text-white' : 'bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20'}`}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => { resetBookingForm(); setIsBookingModalOpen(true); }}
                    className="px-4 py-2 text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal-deep rounded-xl transition-all shadow-md"
                  >
                    + Add Manual Booking
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-brand-teal/10 text-brand-sage uppercase font-bold text-[10px] tracking-wider">
                        <th className="py-3 px-2">Date / ID</th>
                        <th className="py-3 px-2">Client</th>
                        <th className="py-3 px-2">Service</th>
                        <th className="py-3 px-2">Preferred Date</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-teal/5">
                      {filteredBookings.map((b) => {
                        const { hasConflict } = getConflictsForBooking(b);
                        return (
                          <tr key={b.id} className="hover:bg-brand-teal/5 transition-colors">
                            <td className="py-4 px-2">
                              <span className="block font-bold text-brand-charcoal">{b.date}</span>
                              <span className="text-[10px] text-brand-charcoal/50 uppercase">{b.id}</span>
                            </td>
                            <td className="py-4 px-2">
                              <span className="block font-semibold text-brand-charcoal">{b.name}</span>
                              {b.company && <span className="block text-brand-charcoal/60">{b.company}</span>}
                              <span className="block text-brand-charcoal/60">{b.phone}</span>
                            </td>
                            <td className="py-4 px-2 max-w-[12rem]">
                              <span className="block font-medium text-brand-charcoal">{b.service}</span>
                              {b.numberOfPeople && <span className="block text-[10px] text-brand-charcoal/55 mt-0.5">👥 {b.numberOfPeople} people</span>}
                            </td>
                            <td className="py-4 px-2">
                              {b.preferredDate ? (
                                <span className="flex items-center gap-1 font-medium text-brand-charcoal">
                                  {b.preferredDate}
                                  {hasConflict && <span title="Potential conflict">⚠️</span>}
                                </span>
                              ) : (
                                <span className="text-brand-charcoal/40">—</span>
                              )}
                            </td>
                            <td className="py-4 px-2">
                              <select
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase focus:outline-none border-0 tracking-wider ${statusColor(b.status)}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Declined">Declined</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => setBookingDetailItem(b)}
                                  className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-brand-sage/15 hover:bg-brand-sage/35 text-brand-charcoal font-bold transition-all text-[11px]"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => startBookingEdit(b)}
                                  className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal font-bold transition-all text-[11px]"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteBooking(b.id)}
                                  className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-all text-[11px]"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredBookings.length === 0 && (
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-brand-charcoal/40 italic">
                            No booking requests found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {/* Calendar Controls */}
              <div className="bg-white/80 border border-white/50 rounded-2xl shadow-sm p-6 backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between">
                  <button onClick={prevMonth} className="px-3 py-2 rounded-lg bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 font-bold text-sm transition-all">← Prev</button>
                  <h3 className="font-serif font-bold text-xl text-brand-charcoal">
                    {monthNames[calendarMonth]} {calendarYear}
                  </h3>
                  <button onClick={nextMonth} className="px-3 py-2 rounded-lg bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 font-bold text-sm transition-all">Next →</button>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-300"></span> Pending</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-brand-teal"></span> Confirmed</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400"></span> Completed</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-300"></span> Declined</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-100 border border-red-300" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(239,68,68,0.2) 2px, rgba(239,68,68,0.2) 4px)'}}></span> Blocked</span>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {dayNames.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-brand-sage py-2">{d}</div>
                  ))}
                  {calendarDays.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} className="min-h-[5rem]"></div>;
                    
                    const today = new Date();
                    const isToday = day.day === today.getDate() && calendarMonth === today.getMonth() && calendarYear === today.getFullYear();
                    
                    return (
                      <div
                        key={day.dateStr}
                        className={`min-h-[5rem] p-1.5 rounded-xl border text-xs transition-all ${
                          day.isBlocked 
                            ? 'bg-red-50 border-red-200' 
                            : isToday 
                              ? 'bg-brand-teal/10 border-brand-teal/30' 
                              : 'bg-white/60 border-white/40 hover:bg-white/90'
                        }`}
                      >
                        <div className={`font-bold text-right text-[11px] ${isToday ? 'text-brand-teal' : 'text-brand-charcoal/70'}`}>
                          {day.day}
                          {day.isBlocked && <span className="ml-1 text-red-400">🚫</span>}
                        </div>
                        <div className="space-y-0.5 mt-1">
                          {day.bookings.slice(0, 3).map(b => (
                            <div 
                              key={b.id} 
                              onClick={() => { setBookingDetailItem(b); setActiveTab('bookings'); }}
                              className={`px-1 py-0.5 rounded text-[9px] font-bold truncate cursor-pointer hover:opacity-80 transition-opacity ${
                                b.status === 'Confirmed' ? 'bg-brand-teal/20 text-brand-teal' :
                                b.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                                b.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                b.status === 'Declined' ? 'bg-red-100 text-red-500' :
                                'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {b.name}
                            </div>
                          ))}
                          {day.bookings.length > 3 && (
                            <div className="text-[9px] text-brand-charcoal/50 font-bold">+{day.bookings.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Block Date Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsBlockedDateModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-red-50 text-red-700 border border-red-200 font-bold text-sm hover:bg-red-100 transition-all shadow-sm"
                >
                  🚫 Block Unavailable Dates
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div className="bg-white/80 border border-white/50 rounded-2xl shadow-sm p-6 space-y-6 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-xl text-brand-charcoal">Live Product List</h3>
                <button
                  onClick={() => { resetProductForm(); setIsProductModalOpen(true); }}
                  className="px-4 py-2 text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal-deep rounded-xl transition-all shadow-md"
                >
                  + Add New Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-teal/10 text-brand-sage uppercase font-bold text-[10px] tracking-wider">
                      <th className="py-3 px-2 w-[4rem]">Icon</th>
                      <th className="py-3 px-2">Product Name</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Price</th>
                      <th className="py-3 px-2">Badge</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-teal/5">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-brand-teal/5 transition-colors">
                        <td className="py-4 px-2 text-2xl">{p.icon}</td>
                        <td className="py-4 px-2">
                          <span className="block font-bold text-brand-charcoal">{p.name}</span>
                          <span className="block text-[10px] text-brand-charcoal/50 uppercase">{p.id}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="px-2 py-0.5 rounded-full font-bold text-[9px] uppercase bg-brand-teal/10 text-brand-teal">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-4 px-2 font-bold text-brand-teal-deep text-sm">
                          R{p.price}
                        </td>
                        <td className="py-4 px-2">
                          {p.badge ? (
                            <span className="px-2 py-0.5 rounded-full font-bold text-[9px] uppercase bg-brand-pink/20 text-brand-charcoal">
                              {p.badge}
                            </span>
                          ) : (
                            <span className="text-brand-charcoal/30">-</span>
                          )}
                        </td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => setProductPreviewItem(p)}
                              className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-brand-sage/15 hover:bg-brand-sage/35 text-brand-charcoal font-bold transition-all text-[11px]"
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => startProductEdit(p)}
                              className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal font-bold transition-all text-[11px]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-all text-[11px]"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-brand-charcoal/40 italic">
                          No products exist in store. Click "+ Add New Product" to initialize.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: ADD / EDIT BOOKING */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm">
          <div className="bg-white/95 max-w-lg w-full rounded-2xl p-6 border border-brand-teal/10 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-lg text-brand-charcoal border-b border-brand-teal/5 pb-2">
              {bookingEditMode ? 'Modify Booking Details' : 'Manual Booking Registration'}
            </h3>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Client / Contact Name</label>
                <input type="text" required value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Company Name</label>
                <input type="text" value={bookingForm.company} onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })} placeholder="Optional" className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Phone</label>
                  <input type="text" required value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Email</label>
                  <input type="email" required value={bookingForm.email} onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Service(s)</label>
                <input type="text" required value={bookingForm.service} onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })} placeholder="e.g. Basic Medicals, Audiometry" className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Number of People</label>
                  <input type="number" min="1" value={bookingForm.numberOfPeople} onChange={(e) => setBookingForm({ ...bookingForm, numberOfPeople: e.target.value })} placeholder="e.g. 10" className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Preferred Date</label>
                  <input type="date" value={bookingForm.preferredDate} onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Booking Type</label>
                  <select value={bookingForm.type} onChange={(e) => setBookingForm({ ...bookingForm, type: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal">
                    <option value="Consultation">Consultation</option>
                    <option value="B2B Assessment">B2B Assessment</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Status</label>
                <select value={bookingForm.status} onChange={(e) => setBookingForm({ ...bookingForm, status: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal">
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Declined">Declined</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Notes</label>
                <textarea rows="3" value={bookingForm.message} onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal"></textarea>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setIsBookingModalOpen(false)} className="px-4 py-2 font-bold text-brand-charcoal/60 hover:bg-brand-charcoal/5 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-teal hover:bg-brand-teal-deep rounded-lg">{bookingEditMode ? 'Save Edits' : 'Register Booking'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BLOCK DATE */}
      {isBlockedDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm">
          <div className="bg-white/95 max-w-md w-full rounded-2xl p-6 border border-brand-teal/10 shadow-2xl relative space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-charcoal border-b border-brand-teal/5 pb-2">
              Block Unavailable Date(s)
            </h3>
            
            <form onSubmit={handleBlockDateSubmit} className="space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Start Date</label>
                  <input type="date" required value={blockedDateForm.date} onChange={(e) => setBlockedDateForm({ ...blockedDateForm, date: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">End Date (optional)</label>
                  <input type="date" value={blockedDateForm.endDate} min={blockedDateForm.date} onChange={(e) => setBlockedDateForm({ ...blockedDateForm, endDate: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                  <p className="text-[10px] text-brand-charcoal/50 mt-1">Leave empty to block a single day.</p>
                </div>
              </div>
              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Reason</label>
                <select value={blockedDateForm.reason} onChange={(e) => setBlockedDateForm({ ...blockedDateForm, reason: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal">
                  <option value="Staff Unavailable">Staff Unavailable</option>
                  <option value="Business Closure">Business Closure</option>
                  <option value="Public Holiday">Public Holiday</option>
                  <option value="Internal Event">Internal Event</option>
                  <option value="Fully Booked">Fully Booked</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setIsBlockedDateModalOpen(false)} className="px-4 py-2 font-bold text-brand-charcoal/60 hover:bg-brand-charcoal/5 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg">Block Date</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm">
          <div className="bg-white/95 max-w-lg w-full rounded-2xl p-6 border border-brand-teal/10 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-lg text-brand-charcoal border-b border-brand-teal/5 pb-2">
              {productEditMode ? 'Modify Product Details' : 'Add New Wellness Product'}
            </h3>
            
            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Product Name</label>
                  <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Category</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal">
                    <option value="Digital Guides">Digital Guides</option>
                    <option value="Journals & Trackers">Journals & Trackers</option>
                    <option value="OHS Compliance">OHS Compliance</option>
                    <option value="Wellness Tools">Wellness Tools</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Price (R)</label>
                  <input type="number" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Emoji Icon</label>
                  <input type="text" required value={productForm.icon} onChange={(e) => setProductForm({ ...productForm, icon: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal text-center text-lg" />
                </div>
                <div>
                  <label className="block font-bold text-brand-charcoal uppercase mb-1">Badge label</label>
                  <input type="text" value={productForm.badge} placeholder="e.g. Popular" onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Cover Image Option</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label className="px-4 py-2.5 bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-xl cursor-pointer hover:bg-brand-teal/20 transition-all text-center flex-grow">
                      📁 Upload Image File
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {productForm.image && (
                      <button type="button" onClick={() => setProductForm({ ...productForm, image: '' })} className="px-3 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 text-xs font-bold transition-all">Clear</button>
                    )}
                  </div>
                  <div className="text-[10px] text-brand-charcoal/50">Or paste an image URL instead:</div>
                  <input type="text" placeholder="https://images.unsplash.com/..." value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal text-xs" />
                  {productForm.image && (
                    <div className="relative h-20 w-32 rounded-lg overflow-hidden border border-brand-teal/10 bg-brand-teal/5">
                      <img src={productForm.image} alt="Preview upload" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Short Card Subtitle</label>
                <input type="text" required value={productForm.shortDesc} onChange={(e) => setProductForm({ ...productForm, shortDesc: e.target.value })} placeholder="Appears in search preview grid..." className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal" />
              </div>

              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">Long Detailed Description</label>
                <textarea rows="3" required value={productForm.longDesc} onChange={(e) => setProductForm({ ...productForm, longDesc: e.target.value })} placeholder="Appears inside detail modal view..." className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal"></textarea>
              </div>

              <div>
                <label className="block font-bold text-brand-charcoal uppercase mb-1">What's Included / Key Features (One per line)</label>
                <textarea rows="4" value={productForm.featuresText} onChange={(e) => setProductForm({ ...productForm, featuresText: e.target.value })} placeholder={"e.g. 45 healthy whole-food recipes\nInspirational quotes\nRead on any device"} className="w-full rounded-lg bg-brand-warm-white border border-brand-teal/15 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-teal"></textarea>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 font-bold text-brand-charcoal/60 hover:bg-brand-charcoal/5 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-teal hover:bg-brand-teal-deep rounded-lg">{productEditMode ? 'Save Changes' : 'Publish Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PRODUCT PREVIEW */}
      {productPreviewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/65 backdrop-blur-sm">
          <div className="bg-[#FBF9F6] border border-white/50 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button onClick={() => setProductPreviewItem(null)} className="absolute top-4 right-4 p-2 rounded-full text-brand-charcoal/50 hover:bg-brand-charcoal/5 hover:text-brand-charcoal">✕</button>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">Store Mockup Preview</span>
              <h3 className="font-serif font-bold text-xl text-brand-charcoal mt-1">Mock Card & Details Modal</h3>
            </div>

            <div className="border border-brand-teal/15 bg-white rounded-3xl overflow-hidden shadow relative flex flex-col justify-between">
              <div className="relative h-32 w-full overflow-hidden bg-brand-teal/5">
                <img src={productPreviewItem.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'} alt={productPreviewItem.name} className="w-full h-full object-cover" />
                {productPreviewItem.badge && (
                  <span className="absolute top-2 right-2 bg-brand-pink text-brand-charcoal text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">{productPreviewItem.badge}</span>
                )}
                <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-brand-teal-deep text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">{productPreviewItem.category}</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{productPreviewItem.icon}</span>
                  <h4 className="font-serif font-bold text-sm text-brand-charcoal leading-tight">{productPreviewItem.name}</h4>
                </div>
                <p className="text-[10px] text-brand-charcoal/70 line-clamp-2">{productPreviewItem.shortDesc}</p>
                <div className="flex items-center justify-between border-t border-brand-teal/5 pt-2 mt-2">
                  <span className="font-bold text-brand-teal-deep text-sm">R{productPreviewItem.price}</span>
                  <span className="text-[10px] font-semibold text-brand-teal uppercase">View Details →</span>
                </div>
              </div>
            </div>

            <div className="border-t border-brand-teal/10 pt-4 space-y-4">
              <span className="block text-xs uppercase font-bold tracking-wider text-brand-sage">Modal Popup Preview:</span>
              <div className="bg-white border border-brand-teal/10 rounded-2xl p-4 space-y-3">
                <div className="text-base font-serif font-bold text-brand-charcoal">{productPreviewItem.name}</div>
                <div className="text-sm font-semibold text-brand-teal-deep">R{productPreviewItem.price}</div>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">{productPreviewItem.longDesc}</p>
                <div className="bg-brand-teal/5 p-3.5 rounded-xl text-xs space-y-2">
                  <span className="block font-bold text-brand-teal-deep text-[10px] uppercase">Includes:</span>
                  <ul className="space-y-1 text-brand-charcoal/85">
                    {productPreviewItem.features && productPreviewItem.features.map((f, idx) => (
                      <li key={idx} className="flex gap-1.5 items-center">
                        <span className="text-brand-teal">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button onClick={() => setProductPreviewItem(null)} className="w-full rounded-2xl bg-brand-charcoal text-white hover:bg-brand-charcoal/90 py-2.5 text-xs font-bold transition-all shadow-sm">
              Close Mockup Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
