import React, { useState } from 'react';

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  const trips = [
    {
      id: 'ST2025-KND-1847',
      destination: 'Kandy Cultural Tour',
      location: 'Kandy',
      dates: { from: 'Mar 15, 2025', to: 'Mar 18, 2025' },
      status: 'pending',
      totalCost: 90675,
      travelers: { adults: 2, children: 1 },
      bookingDate: 'Feb 05, 2025',
      image: '#667eea',
      duration: '3 Days',
      vendor: 'Earl\'s Regency Hotel'
    },
    {
      id: 'ST2025-GAL-2341',
      destination: 'Galle Beach Getaway',
      location: 'Galle',
      dates: { from: 'Apr 20, 2025', to: 'Apr 25, 2025' },
      status: 'confirmed',
      totalCost: 125000,
      travelers: { adults: 4, children: 0 },
      bookingDate: 'Jan 28, 2025',
      image: '#1E90FF',
      duration: '5 Days',
      vendor: 'Jetwing Lighthouse'
    },
    {
      id: 'ST2024-ELL-8932',
      destination: 'Ella Hill Country',
      location: 'Ella',
      dates: { from: 'Dec 10, 2024', to: 'Dec 13, 2024' },
      status: 'completed',
      totalCost: 65000,
      travelers: { adults: 2, children: 1 },
      bookingDate: 'Nov 15, 2024',
      image: '#34C759',
      duration: '3 Days',
      vendor: '98 Acres Resort',
      reviewStatus: 'pending'
    },
    {
      id: 'ST2025-SIG-4521',
      destination: 'Sigiriya Adventure',
      location: 'Sigiriya',
      dates: { from: 'Jul 12, 2025', to: 'Jul 15, 2025' },
      status: 'pending',
      totalCost: 78000,
      travelers: { adults: 2, children: 0 },
      bookingDate: 'Feb 03, 2025',
      image: '#FF9500',
      duration: '3 Days',
      vendor: 'Aliya Resort'
    },
    {
      id: 'ST2024-NUW-7654',
      destination: 'Nuwara Eliya Tea Country',
      location: 'Nuwara Eliya',
      dates: { from: 'Nov 05, 2024', to: 'Nov 08, 2024' },
      status: 'completed',
      totalCost: 52000,
      travelers: { adults: 3, children: 0 },
      bookingDate: 'Oct 10, 2024',
      image: '#764ba2',
      duration: '3 Days',
      vendor: 'Grand Hotel',
      reviewStatus: 'completed'
    },
    {
      id: 'ST2025-YAL-3214',
      destination: 'Yala Safari Experience',
      location: 'Yala',
      dates: { from: 'Mar 01, 2025', to: 'Mar 03, 2025' },
      status: 'cancelled',
      totalCost: 45000,
      travelers: { adults: 2, children: 2 },
      bookingDate: 'Jan 15, 2025',
      image: '#FF3B30',
      duration: '2 Days',
      vendor: 'Cinnamon Wild'
    }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Trips', count: trips.filter(t => t.status === 'confirmed').length },
    { id: 'pending', label: 'Pending Approval', count: trips.filter(t => t.status === 'pending').length },
    { id: 'confirmed', label: 'Confirmed', count: trips.filter(t => t.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: trips.filter(t => t.status === 'cancelled').length }
  ];

  const statusConfig = {
    pending: { color: 'yellow', label: 'Pending Approval', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    confirmed: { color: 'green', label: 'Confirmed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    completed: { color: 'blue', label: 'Completed', icon: 'M5 13l4 4L19 7' },
    cancelled: { color: 'red', label: 'Cancelled', icon: 'M6 18L18 6M6 6l12 12' }
  };

  const filterTrips = () => {
    let filtered = trips;

    // Filter by active tab
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(t => t.status === 'confirmed' || t.status === 'pending');
    } else if (activeTab !== 'all') {
      filtered = filtered.filter(t => t.status === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(t => t.status === selectedStatus);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        case 'oldest':
          return new Date(a.bookingDate) - new Date(b.bookingDate);
        case 'price-high':
          return b.totalCost - a.totalCost;
        case 'price-low':
          return a.totalCost - b.totalCost;
        case 'date':
          return new Date(a.dates.from) - new Date(b.dates.from);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredTrips = filterTrips();

  const toggleTripSelection = (tripId) => {
    if (selectedTrips.includes(tripId)) {
      setSelectedTrips(selectedTrips.filter(id => id !== tripId));
    } else {
      setSelectedTrips([...selectedTrips, tripId]);
    }
  };

  const selectAllTrips = () => {
    if (selectedTrips.length === filteredTrips.length) {
      setSelectedTrips([]);
    } else {
      setSelectedTrips(filteredTrips.map(t => t.id));
    }
  };

  const handleBulkExport = () => {
    alert(`Exporting ${selectedTrips.length} trips...`);
  };

  const handleBulkPrint = () => {
    alert(`Printing ${selectedTrips.length} trips...`);
  };

  const handleCancelTrip = (tripId) => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      alert(`Trip ${tripId} cancelled`);
    }
  };

  const getTripActions = (trip) => {
    const actions = [
      { id: 'details', label: 'View Full Details', icon: 'eye', color: 'purple' },
      { id: 'pdf', label: 'Download PDF', icon: 'download', color: 'gray' },
      { id: 'share', label: 'Share Trip', icon: 'share', color: 'gray' }
    ];

    if (trip.status === 'pending') {
      actions.push(
        { id: 'track', label: 'Track Status', icon: 'clock', color: 'blue' },
        { id: 'modify', label: 'Modify Trip', icon: 'edit', color: 'orange' }
      );
    }

    if (trip.status === 'confirmed') {
      actions.push(
        { id: 'contact', label: 'Contact Vendor', icon: 'message', color: 'green' }
      );
    }

    if (trip.status === 'completed' && trip.reviewStatus === 'pending') {
      actions.push(
        { id: 'review', label: 'Leave Review', icon: 'star', color: 'yellow' }
      );
    }

    if (trip.status === 'completed') {
      actions.push(
        { id: 'book-again', label: 'Book Again', icon: 'refresh', color: 'purple' }
      );
    }

    if (trip.status === 'pending' || trip.status === 'confirmed') {
      actions.push(
        { id: 'cancel', label: 'Cancel Booking', icon: 'x', color: 'red' }
      );
    }

    return actions;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .trip-card { transition: transform 0.2s, box-shadow 0.2s; }
        .trip-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
      `}</style>

      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800">My Trips</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Plan New Trip
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by destination, location, or booking ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="date">Travel Date</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTrips.length === filteredTrips.length && filteredTrips.length > 0}
                  onChange={selectAllTrips}
                  className="w-5 h-5 text-purple-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Select All ({filteredTrips.length})
                </span>
              </label>
              {selectedTrips.length > 0 && (
                <span className="text-sm text-purple-600 font-medium">
                  {selectedTrips.length} selected
                </span>
              )}
            </div>
            {selectedTrips.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkExport}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Export Selected
                </button>
                <button
                  onClick={handleBulkPrint}
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  Print Selected
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trip Cards Grid */}
        {filteredTrips.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No trips found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or start planning a new adventure!</p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
              Plan New Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTrips.map(trip => {
              const status = statusConfig[trip.status];
              const actions = getTripActions(trip);
              const isSelected = selectedTrips.includes(trip.id);

              return (
                <div
                  key={trip.id}
                  className={`trip-card bg-white rounded-xl shadow-md overflow-hidden ${
                    isSelected ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {/* Trip Header */}
                  <div className="relative h-40" style={{ background: trip.image }}>
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-${status.color}-700`}>
                        {status.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTripSelection(trip.id)}
                        className="w-5 h-5 text-purple-600 rounded bg-white"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {trip.destination}
                      </h3>
                      <p className="text-white/90 text-sm drop-shadow-lg">{trip.location}</p>
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Travel Dates</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {trip.dates.from} - {trip.dates.to}
                        </p>
                        <p className="text-xs text-gray-600">{trip.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Travelers</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {trip.travelers.adults} Adult{trip.travelers.adults > 1 ? 's' : ''}
                          {trip.travelers.children > 0 && `, ${trip.travelers.children} Child${trip.travelers.children > 1 ? 'ren' : ''}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Booking ID</p>
                        <p className="text-sm font-semibold text-gray-800">{trip.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Cost</p>
                        <p className="text-sm font-semibold text-purple-600">
                          LKR {trip.totalCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span>Primary Vendor: <span className="font-medium text-gray-800">{trip.vendor}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Booked on: {trip.bookingDate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {actions.slice(0, 3).map(action => (
                        <button
                          key={action.id}
                          onClick={() => {
                            if (action.id === 'cancel') {
                              handleCancelTrip(trip.id);
                            } else {
                              alert(`${action.label} for ${trip.id}`);
                            }
                          }}
                          className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                            action.color === 'purple'
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : action.color === 'red'
                              ? 'border border-red-300 text-red-600 hover:bg-red-50'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>

                    {actions.length > 3 && (
                      <details className="mt-3">
                        <summary className="text-sm text-purple-600 hover:text-purple-700 cursor-pointer font-medium">
                          More Actions ({actions.length - 3})
                        </summary>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {actions.slice(3).map(action => (
                            <button
                              key={action.id}
                              onClick={() => {
                                if (action.id === 'cancel') {
                                  handleCancelTrip(trip.id);
                                } else {
                                  alert(`${action.label} for ${trip.id}`);
                                }
                              }}
                              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                                action.color === 'red'
                                  ? 'border border-red-300 text-red-600 hover:bg-red-50'
                                  : action.color === 'yellow'
                                  ? 'border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                                  : action.color === 'blue'
                                  ? 'border border-blue-300 text-blue-600 hover:bg-blue-50'
                                  : action.color === 'green'
                                  ? 'border border-green-300 text-green-600 hover:bg-green-50'
                                  : action.color === 'orange'
                                  ? 'border border-orange-300 text-orange-600 hover:bg-orange-50'
                                  : action.color === 'purple'
                                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {filteredTrips.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}