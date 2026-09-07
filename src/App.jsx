import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, Search, Menu, Star, Heart, 
  ArrowLeft, CheckCircle, Truck, ShieldCheck, 
  Flame, Gift, MapPin, CreditCard, Plus, 
  Minus, X, Clock, Award, Sparkles, ChevronDown,
  RotateCcw, ThumbsUp, Eye
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'samagri', name: 'Daily Puja Samagri' },
  { id: 'kits', name: 'Festival & Havan Kits' },
  { id: 'idols', name: 'Brass & Marble Idols' },
  { id: 'incense', name: 'Dhoop & Agarbatti' },
  { id: 'gangajal', name: 'Gangajal & Pure Ghee' },
  { id: 'decor', name: 'Mandir & Vastu Decor' },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Sampoorna Mahalakshmi & Ganesh Deepawali Puja Box (42 Vedic Items)",
    category: "kits",
    price: 1299,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 2480,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
    badge: "Amazon's Choice",
    delivery: "Tomorrow by 11 AM",
    description: "Complete Vedic ritual box certified by Kashi Vishwanath Purohits. Contains hand-carved terracotta diyas, pure Bhimseni camphor, organic haldi-kumkum, brass ghanti, and Lakshmi-Ganesh silver-plated coin.",
    inStock: true
  },
  {
    id: 2,
    name: "Organic A2 Gir Cow Vedic Bilona Ghee - 100% Pure for Diya & Havan (500ml)",
    category: "gangajal",
    price: 689,
    originalPrice: 999,
    rating: 4.8,
    reviews: 4120,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    badge: "#1 Best Seller",
    delivery: "Get it Today by 8 PM",
    description: "Prepared using traditional wooden bilona churning from pasture-fed Gir cows. Zero preservatives, naturally golden yellow, smoke-free flame.",
    inStock: true
  },
  {
    id: 3,
    name: "Pure Solid Brass Ashtadhatu Ganesha Idol for Mandir (6.5 Inches, Heavy)",
    category: "idols",
    price: 1450,
    originalPrice: 2899,
    rating: 4.9,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1567591414240-e14b0ef0937a?auto=format&fit=crop&w=600&q=80",
    badge: "Handcrafted",
    delivery: "Delivery in 2 Days",
    description: "Authentic Moradabad brass casting with antique protective lacquer. Specially sculpted trunk facing left (Vamamukhi) for peace and prosperity at home.",
    inStock: true
  },
  {
    id: 4,
    name: "Pure Organic Mysore Sandalwood & Kasturi Agarbatti (Pack of 4, Charcoal Free)",
    category: "incense",
    price: 320,
    originalPrice: 550,
    rating: 4.7,
    reviews: 1670,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=600&q=80",
    badge: "Limited Deal",
    delivery: "Tomorrow by 2 PM",
    description: "100% natural flower petals and wood powder dipped in pure essential oils. Therapeutic aroma designed to enhance focus and spiritual vibrations.",
    inStock: true
  },
  {
    id: 5,
    name: "Original Haridwar Brahma Kund Gangajal (1 Litre Airtight Seal)",
    category: "gangajal",
    price: 149,
    originalPrice: 250,
    rating: 4.9,
    reviews: 7890,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    badge: "Holy Source",
    delivery: "Tomorrow by 9 PM",
    description: "Directly bottled at Har Ki Pauri, Haridwar under stringent quality and purity controls. Essential for Jalabhisheka and daily purification rituals.",
    inStock: true
  },
  {
    id: 6,
    name: "Handcrafted Copper Kalash with Nariyal & Traditional Velvet Aasan",
    category: "samagri",
    price: 499,
    originalPrice: 799,
    rating: 4.6,
    reviews: 530,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80",
    badge: "Trending",
    delivery: "Tomorrow by 11 AM",
    description: "99.2% pure embossed copper lota with engraved Om and Swastik symbols. Comes with embroidered red velvet mandir chowki cloth.",
    inStock: true
  }
];

export default function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState("248001");
  const [notification, setNotification] = useState("");

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartSavings = useMemo(() => cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const triggerToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast(`Added "${product.name.slice(0, 24)}..." to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const next = item.quantity + delta;
        return next > 0 ? { ...item, quantity: next } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    triggerToast("Item removed from cart");
  };

  return (
    <div className="min-h-screen bg-[#eaeded] font-sans text-slate-900 flex flex-col">
      {/* Toast alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131921] text-amber-400 px-5 py-3 rounded-lg shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-bounce">
          <Sparkles size={18} />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Top Auspicious Ticker */}
      <div className="bg-[#78120e] text-amber-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="bg-amber-400 text-red-950 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">Shubh Mahurat Offer</span>
        <span>Free Sacred Rudraksha with orders above ₹999</span>
        <span className="hidden md:inline text-amber-300">• 100% Vedic Sanctity Assured</span>
      </div>

      {/* Main Header (Amazon Style) */}
      <header className="sticky top-0 z-40 bg-[#131921] text-white select-none">
        <div className="max-w-[1500px] mx-auto px-4 h-16 flex items-center gap-3 md:gap-5">
          {/* Logo */}
          <div 
            onClick={() => { setView('home'); setActiveCategory('all'); }} 
            className="flex items-center gap-1.5 cursor-pointer py-1 px-2 border border-transparent hover:border-white rounded"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-slate-950 shadow-md">
              <Flame size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="text-xl font-black tracking-tight text-white flex items-center">
                Divine<span className="text-amber-400 font-serif italic">Kart</span>
              </div>
              <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">Puja Express</span>
            </div>
          </div>

          {/* Delivery Location Selector */}
          <div className="hidden lg:flex items-center gap-1.5 cursor-pointer py-1 px-2 border border-transparent hover:border-white rounded text-xs">
            <MapPin size={16} className="text-amber-400 mt-1" />
            <div className="leading-tight">
              <span className="text-slate-400 block text-[11px]">Deliver to</span>
              <span className="font-bold text-white tracking-wide">Dehradun {selectedPincode}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex h-10 max-w-3xl rounded-md overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-amber-500">
            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              className="hidden md:block bg-slate-100 text-slate-700 text-xs font-semibold px-3 border-r border-slate-300 hover:bg-slate-200 outline-none cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input 
              type="text"
              placeholder="Search pure samagri, brass idols, havan kits, agarbatti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 text-slate-900 bg-white text-sm outline-none placeholder:text-slate-400"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-5 flex items-center justify-center transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* User & Orders */}
          <div className="hidden md:flex flex-col py-1 px-2 border border-transparent hover:border-white rounded cursor-pointer leading-tight text-xs">
            <span className="text-slate-300">Namaste, Devotee</span>
            <span className="font-bold text-white text-sm flex items-center gap-0.5">
              Account & Pooja Orders <ChevronDown size={12} />
            </span>
          </div>

          {/* Cart Icon */}
          <div 
            onClick={() => setView('cart')}
            className="flex items-center gap-2 cursor-pointer py-1 px-2.5 border border-transparent hover:border-white rounded relative text-white"
          >
            <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-1 -right-2 bg-amber-400 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-sm mt-2">Cart</span>
          </div>
        </div>

        {/* Sub-navigation bar */}
        <div className="bg-[#232f3e] text-slate-200 text-xs font-medium px-4 py-2 flex items-center gap-5 overflow-x-auto whitespace-nowrap scrollbar-none border-t border-slate-800">
          <button 
            onClick={() => { setActiveCategory('all'); setView('home'); }} 
            className="flex items-center gap-1.5 font-bold text-white hover:text-amber-400"
          >
            <Menu size={16} /> All Sanatan Essentials
          </button>
          {CATEGORIES.slice(1).map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setView('home'); }}
              className={`hover:text-amber-400 transition-colors ${activeCategory === cat.id ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5' : ''}`}
            >
              {cat.name}
            </button>
          ))}
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 font-semibold cursor-pointer hover:underline flex items-center gap-1">
            <Sparkles size={13} /> Book Pandit Ji Online
          </span>
        </div>
      </header>

      {/* VIEW: HOME PAGE */}
      {view === 'home' && (
        <main className="flex-1 max-w-[1500px] mx-auto w-full px-3 md:px-6 py-4">
          {/* Hero Festive Banner */}
          <div className="relative bg-gradient-to-r from-red-950 via-amber-900 to-orange-950 text-white rounded-xl overflow-hidden shadow-xl p-6 md:p-10 mb-6 border border-amber-500/20">
            <div className="max-w-xl space-y-3 z-10 relative">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs px-3 py-1 rounded-full font-bold">
                <Sparkles size={14} /> Certified Shuddha Samagri
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold font-serif text-amber-100 leading-tight">
                Celebrate Every Ritual With Pure Vedic Purity
              </h1>
              <p className="text-slate-300 text-sm md:text-base">
                Directly sourced from Haridwar, Kashi, and Vrindavan. Get complete Puja boxes delivered to your doorstep within hours.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button 
                  onClick={() => setActiveCategory('kits')} 
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm px-6 py-2.5 rounded shadow-lg transition"
                >
                  Explore Puja Kits
                </button>
                <button 
                  onClick={() => setActiveCategory('idols')} 
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded backdrop-blur-md transition"
                >
                  Brass Mandir Murti
                </button>
              </div>
            </div>
            <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[
              { title: "100% Vedic Certified", desc: "Shuddha & sattvic ingredients", icon: Award },
              { title: "Express Mandir Delivery", desc: "Delivered in under 24 hours", icon: Truck },
              { title: "Kashi & Haridwar Sourced", desc: "Authentic holy origin", icon: Flame },
              { title: "Sacred Packaging", desc: "Packed with clean sanctity", icon: ShieldCheck },
            ].map((f, i) => (
              <div key={i} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                <f.icon className="text-amber-600 flex-shrink-0" size={24} />
                <div>
                  <div className="font-bold text-xs md:text-sm text-slate-900 leading-tight">{f.title}</div>
                  <div className="text-[11px] text-slate-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {activeCategory === 'all' ? "Trending Devotional Essentials" : CATEGORIES.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-xs text-slate-500">Based on sacred festivals and daily household pujas</p>
              </div>
              <span className="text-xs text-slate-500 font-semibold">{filteredProducts.length} Items found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {filteredProducts.map(p => (
                <div 
                  key={p.id}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Image container */}
                  <div 
                    onClick={() => { setSelectedProduct(p); setView('product'); }}
                    className="relative w-full h-56 bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {p.badge && (
                      <span className="absolute top-2 left-2 bg-[#78120e] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => { setSelectedProduct(p); setView('product'); }}
                        className="font-semibold text-slate-900 hover:text-amber-700 line-clamp-2 cursor-pointer text-sm leading-snug"
                      >
                        {p.name}
                      </h3>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center bg-emerald-700 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                          <span>{p.rating}</span>
                          <Star size={10} className="fill-white ml-0.5" />
                        </div>
                        <span className="text-xs text-slate-500">({p.reviews.toLocaleString()} ratings)</span>
                      </div>

                      {/* Price Tag */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-950">₹{p.price}</span>
                        <span className="text-xs text-slate-400 line-through">M.R.P: ₹{p.originalPrice}</span>
                        <span className="text-xs font-bold text-emerald-700">
                          {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% off
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                        <Truck size={13} className="text-emerald-700" />
                        <span>{p.delivery}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                      <button 
                        onClick={() => addToCart(p)}
                        className="flex-1 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 rounded transition shadow-sm"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => { addToCart(p); setView('checkout'); }}
                        className="flex-1 bg-[#ffa41c] hover:bg-[#f3950b] text-slate-950 font-bold text-xs py-2.5 rounded transition shadow-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VIEW: PRODUCT DETAIL */}
      {view === 'product' && selectedProduct && (
        <main className="flex-1 max-w-[1300px] mx-auto w-full p-4 md:p-6 bg-white rounded-xl my-4 shadow-sm border border-slate-200">
          <button 
            onClick={() => setView('home')} 
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-amber-700 mb-4"
          >
            <ArrowLeft size={14} /> Back to Search Results
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Gallery */}
            <div className="space-y-3">
              <div className="w-full h-96 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="bg-amber-50/60 border border-amber-200/60 p-3 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-700 flex-shrink-0" />
                <span>Purohit Approved: Purified using sacred mantras before dispatch.</span>
              </div>
            </div>

            {/* Info & Buy Box */}
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">Sanatan Dharma Verified</span>
              <h1 className="text-xl md:text-2xl font-bold text-slate-950 mt-1 leading-snug">
                {selectedProduct.name}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2 pb-3 border-b border-slate-200">
                <div className="flex items-center bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                  <span>{selectedProduct.rating}</span>
                  <Star size={11} className="fill-white ml-0.5" />
                </div>
                <span className="text-xs text-slate-500 font-medium">{selectedProduct.reviews.toLocaleString()} customer reviews</span>
              </div>

              {/* Pricing */}
              <div className="py-4 border-b border-slate-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-red-700 text-lg font-bold">-{Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%</span>
                  <span className="text-3xl font-black text-slate-950">₹{selectedProduct.price}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  M.R.P.: <span className="line-through">₹{selectedProduct.originalPrice}</span> (Inclusive of all Indian taxes)
                </div>
                <div className="mt-3 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Truck size={15} /> {selectedProduct.delivery}
                </div>
              </div>

              {/* Description */}
              <div className="py-4 space-y-3">
                <h3 className="font-bold text-sm text-slate-900">About this sacred item:</h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-700">
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">✓ 100% Shuddha Samagri</div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">✓ Eco-Friendly & Natural</div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">✓ No Chemicals / Charcoal</div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">✓ Easy Temple Storage</div>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm py-3 rounded-lg shadow transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button 
                  onClick={() => { addToCart(selectedProduct); setView('checkout'); }}
                  className="flex-1 bg-[#ffa41c] hover:bg-[#f3950b] text-slate-950 font-bold text-sm py-3 rounded-lg shadow transition"
                >
                  Buy Now Instantly
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: CART */}
      {view === 'cart' && (
        <main className="flex-1 max-w-[1300px] mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <h1 className="text-xl md:text-2xl font-bold text-slate-950 pb-3 border-b border-slate-200">
              Your Puja Basket ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>

            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart size={32} />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Your sacred basket is empty</h3>
                <p className="text-xs text-slate-500">Explore authentic samagri, brass diyas, and temple idols.</p>
                <button 
                  onClick={() => setView('home')} 
                  className="bg-amber-400 hover:bg-amber-500 font-bold text-xs px-6 py-2.5 rounded mt-2"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map(item => (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                        <span className="font-bold text-base text-slate-950">₹{item.price * item.quantity}</span>
                      </div>
                      <div className="text-xs text-emerald-700 mt-0.5">In Stock • Fast Pooja Delivery</div>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center border border-slate-300 rounded bg-slate-50">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-slate-200"><Minus size={13}/></button>
                          <span className="px-3 text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-slate-200"><Plus size={13}/></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600 font-medium hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtotal Card */}
          {cart.length > 0 && (
            <div className="h-fit bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-2.5 rounded flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                <span>Your order qualifies for <b>FREE Vedic Delivery</b></span>
              </div>
              <div className="text-base text-slate-700">
                Subtotal ({cartCount} items): <span className="font-black text-xl text-slate-950">₹{cartTotal}</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold">
                You saved ₹{cartSavings} on this order!
              </div>
              <button 
                onClick={() => setView('checkout')}
                className="w-full bg-[#ffa41c] hover:bg-[#f3950b] text-slate-950 font-bold text-sm py-3 rounded-lg shadow transition"
              >
                Proceed to Buy
              </button>
            </div>
          )}
        </main>
      )}

      {/* VIEW: CHECKOUT */}
      {view === 'checkout' && (
        <main className="flex-1 max-w-[900px] mx-auto w-full p-4 md:p-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 space-y-6">
            <h1 className="text-2xl font-black text-slate-950 pb-3 border-b border-slate-200">
              Secure Devotional Checkout
            </h1>

            {/* Address */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-xs">1</span>
                Delivery Address
              </h3>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg text-xs leading-relaxed text-slate-700">
                <div className="font-bold text-slate-900">Shubhi Devotee</div>
                <div>House No. 108, Mandir Marg, Tapovan</div>
                <div>Rishikesh, Uttarakhand - 249192</div>
                <div>Phone: +91 98765 43210</div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-xs">2</span>
                Select Payment Mode
              </h3>
              <div className="space-y-2 text-xs">
                {['UPI (Google Pay, PhonePe, Paytm)', 'Credit / Debit / ATM Card', 'Cash on Delivery (COD)'].map((method, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked={idx === 0} className="accent-amber-500" />
                    <span className="font-medium text-slate-800">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Total & Confirm */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-slate-500">Total Payable:</span>
                <div className="text-2xl font-black text-slate-950">₹{cartTotal}</div>
              </div>
              <button 
                onClick={() => { setCart([]); setView('home'); triggerToast("Order placed successfully! Har Har Mahadev."); }}
                className="w-full sm:w-auto bg-[#ffa41c] hover:bg-[#f3950b] text-slate-950 font-bold px-8 py-3 rounded-lg shadow-md transition"
              >
                Place Sacred Order
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-[#131921] text-slate-400 text-xs mt-auto pt-8 pb-12 border-t border-slate-800">
        <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3">About DivineKart</h4>
            <p className="leading-relaxed">Connecting devotees across India with authentic, purohit-certified puja essentials and pure sacred items.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Sacred Categories</h4>
            <ul className="space-y-1.5">
              <li>Diwali & Navratri Boxes</li>
              <li>Havan & Yajna Kund Samagri</li>
              <li>Gangajal & Vedic Ghee</li>
              <li>Handmade Brass Diyas</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Payment & Purity</h4>
            <p className="leading-relaxed">100% secure payments via UPI, Cards, and Cash on Delivery. Sealed packaging ensuring spiritual sanctity.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Need Help?</h4>
            <p>24/7 Purohit Assistance</p>
            <p className="text-amber-400 font-bold mt-1">+91 1800-DIVINE-PUJA</p>
          </div>
        </div>
        <div className="text-center border-t border-slate-800 pt-6 text-[11px] text-slate-500">
          © 2026 DivineKart.in | Built for Devotees with Complete Vedic Sanctity
        </div>
      </footer>
    </div>
  );
}