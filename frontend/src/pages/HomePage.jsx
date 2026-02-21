import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchData, setSearchData] = useState({
    destination: '',
    budget: '',
    travelers: '',
    dates: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword
    role: 'user',
  });

  const { name, email, password, confirmPassword, role } = formData; // Destructure confirmPassword

  const onRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const onLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

const onLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return toast.error('Please fill in all fields');
    }
    try {
      
      const res = await axios.post('http://localhost:5001/api/auth/login', loginData);
      
      toast.success('Login successful!');
      
    
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setShowLoginModal(false);

      const userRole = res.data.role; 

      if (userRole === 'vendor') {
        navigate('/vendor-dashboard'); 
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');  
      } 
      else if (userRole === 'user') {
        navigate('/my-trips'); }
      else {
        navigate('/');                 
      }
      
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  };


  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { // Added confirmPassword check
      return toast.error('Please fill in all fields');
    }
    if (password !== confirmPassword) { // Password match check
      return toast.error('Passwords do not match');
    }
    try {
      // Only send necessary data to the backend
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      toast.success('Registration successful!');
      setShowSignupModal(false);
      navigate('/login'); // Or automatically log them in
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };



  const destinations = [
    {
      id: 1,
      name: 'Kandy',
      description: 'Cultural capital with ancient temples',
      image: '#667eea',
      price: 'From LKR 45,000',
      duration: '3 Days',
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: 'Galle',
      description: 'Colonial fort and pristine beaches',
      image: '#1E90FF',
      price: 'From LKR 55,000',
      duration: '4 Days',
      rating: 4.9,
      popular: true
    },
    {
      id: 3,
      name: 'Ella',
      description: 'Scenic hill country paradise',
      image: '#34C759',
      price: 'From LKR 40,000',
      duration: '3 Days',
      rating: 4.7,
      popular: true
    },
    {
      id: 4,
      name: 'Sigiriya',
      description: 'Ancient rock fortress wonder',
      image: '#FF9500',
      price: 'From LKR 50,000',
      duration: '2 Days',
      rating: 4.9,
      popular: false
    },
    {
      id: 5,
      name: 'Yala',
      description: 'Premier wildlife safari experience',
      image: '#FF3B30',
      price: 'From LKR 60,000',
      duration: '2 Days',
      rating: 4.8,
      popular: false
    },
    {
      id: 6,
      name: 'Nuwara Eliya',
      description: 'Tea country and cool climate',
      image: '#764ba2',
      price: 'From LKR 48,000',
      duration: '3 Days',
      rating: 4.6,
      popular: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Australia',
      avatar: 'SJ',
      rating: 5,
      text: 'SmartTRIP made planning our Sri Lanka honeymoon so easy! The AI recommendations were spot-on and we stayed perfectly within our budget. Highly recommended!',
      trip: 'Kandy & Galle Tour',
      date: 'January 2025'
    },
    {
      id: 2,
      name: 'Raj Patel',
      location: 'India',
      avatar: 'RP',
      rating: 5,
      text: 'Amazing experience! The platform found us the perfect family-friendly hotels and activities. The vendor coordination was seamless.',
      trip: 'Ella Family Adventure',
      date: 'December 2024'
    },
    {
      id: 3,
      name: 'Emma Williams',
      location: 'UK',
      avatar: 'EW',
      rating: 5,
      text: 'Best travel booking platform I\'ve used. The budget tracking feature helped us avoid overspending, and the soft-booking process was stress-free.',
      trip: 'Cultural Triangle Tour',
      date: 'November 2024'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How does SmartTRIP work?',
      answer: 'SmartTRIP uses AI to create personalized itineraries based on your budget, preferences, and travel dates. Simply enter your requirements, review AI-generated options, customize as needed, and submit a soft booking request to our partner vendors.'
    },
    {
      id: 2,
      question: 'What is soft-booking?',
      answer: 'Soft-booking means your trip request is sent to vendors for confirmation before payment. You receive confirmation within 24-48 hours and only pay once everything is confirmed. This ensures availability and prevents upfront payment for unconfirmed bookings.'
    },
    {
      id: 3,
      question: 'How accurate is the budget tracking?',
      answer: 'Our budget tracking is highly accurate and updates in real-time as you customize your itinerary. The system shows exact costs from our partner vendors, including all taxes and fees, so there are no surprises.'
    },
    {
      id: 4,
      question: 'Can I modify my itinerary after booking?',
      answer: 'Yes! Before vendor confirmation, you can modify your itinerary freely. After confirmation, modifications are subject to vendor policies and may incur additional charges. Contact our support team for assistance.'
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. Payment is only required after your booking is confirmed by vendors.'
    },
    {
      id: 6,
      question: 'What is your cancellation policy?',
      answer: 'Free cancellation up to 7 days before check-in. 50% refund for cancellations 3-7 days before check-in. No refund within 3 days of check-in. Specific services may have different policies which will be communicated upon booking.'
    },
    {
      id: 7,
      question: 'Do you offer travel insurance?',
      answer: 'While we don\'t provide insurance directly, we partner with reputable insurance providers and can help you add comprehensive travel insurance to your booking at competitive rates.'
    },
    {
      id: 8,
      question: 'How do I contact customer support?',
      answer: 'Our 24/7 support team is available via email at support@smarttrip.lk, phone at +94 11 234 5678, or live chat on our website. We typically respond within 2 hours during business hours and 4 hours after hours.'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Share Your Preferences',
      description: 'Tell us your destination, budget, dates, and what you love to do',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    },
    {
      step: 2,
      title: 'Get AI Recommendations',
      description: 'Our AI creates personalized itineraries matching your needs and budget',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      step: 3,
      title: 'Customize Your Trip',
      description: 'Adjust hotels, activities, and services while tracking your budget',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
    },
    {
      step: 4,
      title: 'Confirm & Travel',
      description: 'Vendors confirm availability, you pay, and we handle the rest',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  const features = [
    {
      title: 'AI-Powered Planning',
      description: 'Smart algorithms create optimal itineraries based on your preferences',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      title: 'Budget Control',
      description: 'Real-time tracking ensures you never exceed your budget',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Verified Vendors',
      description: 'All partners are vetted for quality and reliability',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      title: 'Flexible Booking',
      description: 'Soft-booking process with no payment until confirmation',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Travelers' },
    { value: '500+', label: 'Destinations' },
    { value: '4.9/5', label: 'Average Rating' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .gradient-text { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .slide-up { animation: slideUp 0.6s ease-out; }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
      `}</style>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold gradient-text">SmartTRIP</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="#destinations" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Destinations
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                About Us
              </a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            {/* Auth Buttons */}
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => setShowLoginModal(true)}
                                      className="px-4 py-2 text-purple-600 font-semibold hover:bg-purple-50 rounded-lg transition-colors"
                                    >
                                      Login
                                    </button>
                                    <button
                                      onClick={() => setShowSignupModal(true)}
                                      className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                                    >
                                      Sign Up
                                    </button>
                                    <button
                                      onClick={() => navigate('/vendor-register')}
                                      className="px-6 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors shadow-md"
                                    >
                                      Partner With Us
                                    </button>
                                  </div>                      </div>
                    </div>
                  </nav>
            
                  {/* Hero Section */}
                  <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 gradient-bg">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-12 slide-up">
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                          Plan Your Dream Trip<br />
                          <span className="text-white/90">Within Your Budget</span>
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                          AI-powered travel planning that creates personalized itineraries matching your
                          budget, preferences, and schedule. No hidden fees, complete transparency.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                          <button
                            onClick={() => setShowSignupModal(true)}
                            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-50 transition-all shadow-xl text-lg"
                          >
                            Start Planning Free
                          </button>
                          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30 text-lg">
                            Watch Demo
                          </button>
                        </div>
                      </div>
            
                      {/* Search Preview */}
                      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 fade-in">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                          Quick Search Preview
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Where to?
                            </label>
                            <input
                              type="text"
                              placeholder="Destination"
                              value={searchData.destination}
                              onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Budget (LKR)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., 100,000"
                              value={searchData.budget}
                              onChange={(e) => setSearchData({...searchData, budget: e.target.value})}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Travelers
                            </label>
                            <input
                              type="text"
                              placeholder="2 Adults"
                              value={searchData.travelers}
                              onChange={(e) => setSearchData({...searchData, travelers: e.target.value})}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Dates
                            </label>
                            <input
                              type="text"
                              placeholder="Select dates"
                              value={searchData.dates}
                              onChange={(e) => setSearchData({...searchData, dates: e.target.value})}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => setShowSignupModal(true)}
                          className="w-full py-4 gradient-bg text-white font-bold rounded-lg hover:opacity-90 transition-all text-lg shadow-lg"
                        >
                          🔍 Search Destinations
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                          Sign up to unlock full search and AI planning features
                        </p>
                      </div>
                    </div>
                  </section>
            
                  {/* Stats Section */}
                  <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                              {stat.value}
                            </div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
            
                  {/* How It Works Section */}
                  <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                          How SmartTRIP Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                          Four simple steps to your perfect vacation
                        </p>
                      </div>
            
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((item) => (
                          <div key={item.step} className="relative">
                            <div className="text-center">
                              <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
                                </svg>
                              </div>
                              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-black text-purple-600">{item.step}</span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                            {item.step < 4 && (
                              <div className="hidden lg:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-purple-600 to-purple-300 transform -translate-x-1/2" style={{zIndex: -1}}></div>
                            )}
                          </div>
                        ))}
                      </div>
            
                      <div className="text-center mt-12">
                        <button
                          onClick={() => setShowSignupModal(true)}
                          className="px-8 py-4 gradient-bg text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-xl text-lg"
                        >
                          Get Started Now
                        </button>
                      </div>
                    </div>
                  </section>
            
                  {/* Features Section */}
                  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                          Why Choose SmartTRIP?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                          Intelligent features designed for hassle-free travel planning
                        </p>
                      </div>
            
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                          <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover-lift">
                            <div className="w-16 h-16 gradient-bg rounded-xl flex items-center justify-center mb-6">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}/>
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
            
                  {/* Featured Destinations */}
                  <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                          Popular Destinations
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                          Explore Sri Lanka's most loved destinations with AI-powered itineraries
                        </p>
                      </div>
            
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {destinations.map((destination) => (
                          <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
                            {destination.popular && (
                              <div className="absolute top-4 right-4 z-10">
                                <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full shadow-lg">
                                  ⭐ Popular
                                </span>
                              </div>
                            )}
                            <div className="h-48 relative" style={{ background: destination.image }}>
                              <div className="absolute inset-0 bg-black/20"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{destination.name}</h3>
                              </div>
                            </div>
                            <div className="p-6">
                              <p className="text-gray-600 mb-4">{destination.description}</p>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                  <span className="font-semibold text-gray-700">{destination.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600">{destination.duration}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-purple-600">{destination.price}</span>
                                <button
                                  onClick={() => setShowSignupModal(true)}
                                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                                >
                                  Explore
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
            
                      <div className="text-center">
                        <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all text-lg">
                          View All Destinations →
                        </button>
                      </div>
                    </div>
                  </section>
            
                  {/* Testimonials */}
                  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-blue-600">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                          What Travelers Say
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                          Real experiences from real travelers
                        </p>
                      </div>
            
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                          <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {testimonial.avatar}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.location}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.text}</p>
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-sm font-semibold text-purple-600">{testimonial.trip}</p>
                              <p className="text-sm text-gray-600">{testimonial.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
            
                  {/* FAQ Section */}
                  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                          Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600">
                          Everything you need to know about SmartTRIP
                        </p>
                      </div>
            
                      <div className="space-y-4">
                        {faqs.map((faq) => (
                          <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-bold text-gray-900 pr-4">{faq.question}</span>
                              <svg
                                className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform ${ expandedFaq === faq.id ? 'transform rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                              </svg>
                            </button>
                            {expandedFaq === faq.id && (
                              <div className="px-6 pb-5">
                                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
            
                      <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">Still have questions?</p>
                        <a href="#contact" className="text-purple-600 hover:text-purple-700 font-semibold text-lg">
                          Contact Our Support Team →
                        </a>
                      </div>
                    </div>
                  </section>
            
                  {/* CTA Section */}
                  <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Start Your Adventure?
                      </h2>
                      <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of travelers who've discovered smarter, budget-friendly travel planning
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                                    <button
                                      onClick={() => setShowSignupModal(true)}
                                      className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-50 transition-all shadow-xl text-lg"
                                    >
                                      Create Free Account
                                    </button>                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30 text-lg">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </section>
            
                  {/* Footer */}
                  <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                              </svg>
                            </div>
                            <span className="text-xl font-bold">SmartTRIP</span>
                          </div>
                          <p className="text-gray-400">
                            AI-powered travel planning for budget-conscious explorers
                          </p>
                        </div>
            
                        <div>
                          <h3 className="font-bold mb-4">Company</h3>
                          <ul className="space-y-2 text-gray-400">
                            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                          </ul>
                        </div>
            
                        <div>
                          <h3 className="font-bold mb-4">Support</h3>
                          <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                          </ul>
                        </div>
            
                        <div>
                          <h3 className="font-bold mb-4">Contact</h3>
                          <ul className="space-y-2 text-gray-400">
                            <li>📧 support@smarttrip.lk</li>
                            <li>📞 +94 11 234 5678</li>
                            <li>📍 Colombo, Sri Lanka</li>
                          </ul>
                          <div className="flex gap-3 mt-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                              <span className="text-lg">f</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                              <span className="text-lg">𝕏</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                              <span className="text-lg">in</span>
                            </a>
                          </div>
                        </div>
                      </div>
            
                      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 SmartTRIP. All rights reserved.</p>
                      </div>
                    </div>
                  </footer>
            
                  {/* Login Modal */}
                  {showLoginModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-2xl max-w-md w-full p-8 fade-in">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                          <button 
                            onClick={() => setShowLoginModal(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
            
                        <form className="space-y-4" onSubmit={onLoginSubmit}>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="your@email.com"
                              value={loginData.email}
                              onChange={onLoginChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                              type="password"
                              name="password"
                              placeholder="••••••••"
                              value={loginData.password}
                              onChange={onLoginChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                              <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                              <span className="text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                              Forgot password?
                            </a>
                          </div>
                          <button type="submit" className="w-full py-3 gradient-bg text-white font-bold rounded-lg hover:opacity-90 transition-all">
                            Login
                          </button>
                          <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button 
                              onClick={() => {
                                setShowLoginModal(false);
                                setShowSignupModal(true);
                              }}
                                                className="text-purple-600 hover:text-purple-700 font-semibold"
                                              >
                                                Sign up
                                              </button>                          </p>
                        </form>
                      </div>
                    </div>
                  )}
            
                  {/* Signup Modal */}
                  {showSignupModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-2xl max-w-md w-full p-8 fade-in">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                          <button 
                            onClick={() => setShowSignupModal(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
            
                        <form className="space-y-4" onSubmit={onRegisterSubmit}>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="John Doe"
                              value={name}
                              onChange={onRegisterChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={onRegisterChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                              type="password"
                              name="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={onRegisterChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              placeholder="••••••••"
                              value={confirmPassword}
                              onChange={onRegisterChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                          <label className="flex items-start gap-2 text-sm">
                            <input type="checkbox" required className="w-4 h-4 text-purple-600 rounded mt-0.5" />
                            <span className="text-gray-700">
                              I agree to the{' '}
                              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                                Terms of Service
                              </a>{' '}
                              and{' '}
                              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                                        <button type="submit" className="w-full py-3 gradient-bg text-white font-bold rounded-lg hover:opacity-90 transition-all">
                                          Create Account
                                        </button>                          <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <button 
                              onClick={() => {
                                setShowSignupModal(false);
                                setShowLoginModal(true);
                              }}
                              className="text-purple-600 hover:text-purple-700 font-semibold"
                            >
                              Login
                            </button>
                          </p>
                        </form>
                      </div>
                    </div>
                  )}
                </div>  );
}
