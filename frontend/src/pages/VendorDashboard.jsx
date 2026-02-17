import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export default function VendorDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    metrics: {},
    recentActivity: [],
    vendorName: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;

        if (!token) {
            setLoading(false);
            toast.error('Authentication token not found. Please log in.');
            navigate('/vendor/login');
            return;
        }

        const res = await api.get('/dashboard', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setDashboardData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error(error.response?.data?.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);


  const handleLogout = () => {
    logout();
    navigate('/vendor/login');
  };
  
  const metrics = dashboardData.metrics;
  const recentActivity = dashboardData.recentActivity;

  const notifications = [
    {
      id: 1,
      title: 'New booking request',
      message: 'You have 8 pending booking requests',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      title: 'Inventory alert',
      message: 'Update your March availability',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'Review reminder',
      message: 'Respond to recent customer review',
      time: '1 day ago',
      unread: false
    }
  ];

  const topServices = [
    { name: 'Deluxe Room with Garden View', bookings: 23, revenue: 165000 },
    { name: 'Cultural Tour Package', bookings: 18, revenue: 135000 },
    { name: 'Tea Plantation Experience', bookings: 15, revenue: 90000 },
    { name: 'Standard Room', bookings: 12, revenue: 72000 },
    { name: 'City Tour Guide Service', bookings: 9, revenue: 45000 }
  ];

  const revenueData = [
    { month: 'Sep', revenue: 380000 },
    { month: 'Oct', revenue: 425000 },
    { month: 'Nov', revenue: 395000 },
    { month: 'Dec', revenue: 510000 },
    { month: 'Jan', revenue: 452000 },
    { month: 'Feb', revenue: 485600 }
  ];

  const bookingsData = [
    { month: 'Sep', bookings: 38 },
    { month: 'Oct', bookings: 42 },
    { month: 'Nov', bookings: 39 },
    { month: 'Dec', bookings: 51 },
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 47 }
  ];

  const serviceBreakdown = [
    { type: 'Accommodation', percentage: 45, color: '#667eea' },
    { type: 'Tours & Activities', percentage: 30, color: '#34C759' },
    { type: 'Transport', percentage: 15, color: '#FF9500' },
    { type: 'Other Services', percentage: 10, color: '#764ba2' }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxBookings = Math.max(...bookingsData.map(d => d.bookings));

  const handleRefresh = () => {
    alert('Dashboard refreshed!');
  };

  const handleDownloadReport = () => {
    toast.success('Downloading monthly report...');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ST</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Vendor Dashboard</h1>
                <p className="text-xs text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Refresh Dashboard"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <div className="relative">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{user?.name?.charAt(0)}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notif => (
                <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notif.unread ? 'bg-purple-50' : ''}`}>
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900">{notif.title}</h4>
                    {notif.unread && <span className="w-2 h-2 bg-purple-600 rounded-full"></span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200">
              <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16 self-start">
          <nav className="p-4 space-y-1">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Dashboard
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Booking Requests
              {metrics.pendingRequests > 0 && (
                <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                  {metrics.pendingRequests}
                </span>
              )}
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              Upload Inventory
            </Link>
            <Link to="/inventory" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              Manage Inventory
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Revenue & Reports
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              Reviews & Ratings
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              My Profile
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Settings
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              Help & Support
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-semibold">+12%</span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Total Bookings</h3>
              <p className="text-3xl font-bold text-gray-900">{metrics.totalBookings}</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6 ring-2 ring-red-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">ACTION REQUIRED</span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Pending Requests</h3>
              <p className="text-3xl font-bold text-red-600">{metrics.pendingRequests}</p>
              <p className="text-xs text-gray-500 mt-1">Requires response</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-semibold">+8%</span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Revenue This Month</h3>
              <p className="text-2xl font-bold text-gray-900">LKR {(metrics.revenueThisMonth / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500 mt-1">Feb 2026</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">LKR {(metrics.totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Active Listings</h3>
              <p className="text-3xl font-bold text-gray-900">{metrics.activeListings}</p>
              <p className="text-xs text-gray-500 mt-1">Services available</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Average Rating</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{metrics.averageRating}</p>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Based on 156 reviews</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Response Rate</h3>
              <p className="text-3xl font-bold text-gray-900">{metrics.responseRate}%</p>
              <p className="text-xs text-gray-500 mt-1">Within 24 hours</p>
            </div>

            <div className="metric-card bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">Last Upload</h3>
              <p className="text-lg font-bold text-gray-900">{metrics.lastUploadDate}</p>
              <p className="text-xs text-gray-500 mt-1">Inventory updated</p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <button className="p-4 border-2 border-purple-600 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <span className="font-semibold">Upload Inventory</span>
              </button>

              <button className="p-4 border-2 border-red-300 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex flex-col items-center gap-2 relative">
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {metrics.pendingRequests}
                </span>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <span className="font-semibold">Pending Requests</span>
              </button>

              <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="font-semibold text-gray-700">Manage Services</span>
              </button>

              <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span className="font-semibold text-gray-700">View Reports</span>
              </button>

              <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span className="font-semibold text-gray-700">Update Profile</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Revenue Trend */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
                  <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Download Report
                  </button>
                </div>
                <div className="h-64">
                  <div className="flex items-end justify-around h-full gap-2 pb-4">
                    {revenueData.map((data, index) => {
                      const height = (data.revenue / maxRevenue) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full group">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all cursor-pointer"
                              style={{ height: `${height}%` }}
                            >
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                LKR {(data.revenue / 1000).toFixed(0)}K
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bookings by Month */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Bookings by Month</h2>
                <div className="h-64">
                  <div className="flex items-end justify-around h-full gap-2 pb-4">
                    {bookingsData.map((data, index) => {
                      const height = (data.bookings / maxBookings) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full group">
                            <div
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all cursor-pointer"
                              style={{ height: `${height}%` }}
                            >
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {data.bookings} bookings
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Service Type Breakdown */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Service Type Breakdown</h2>
                <div className="flex items-center gap-8">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      {serviceBreakdown.map((service, index) => {
                        const prevPercentages = serviceBreakdown.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
                        const offset = (prevPercentages / 100) * 283;
                        const dashArray = (service.percentage / 100) * 283;
                        
                        return (
                          <circle
                            key={service.type}
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={service.color}
                            strokeWidth="10"
                            strokeDasharray={`${dashArray} 283`}
                            strokeDashoffset={-offset}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {serviceBreakdown.map(service => (
                      <div key={service.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: service.color }}></div>
                          <span className="text-sm text-gray-700">{service.type}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{service.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Top Performing Services */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Top Services</h2>
                <div className="space-y-3">
                  {topServices.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{service.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{service.bookings} bookings</span>
                          <span>•</span>
                          <span className="text-green-600 font-semibold">LKR {(service.revenue / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-2xl">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">{activity.title}</h4>
                        <p className="text-xs text-gray-600 truncate">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
