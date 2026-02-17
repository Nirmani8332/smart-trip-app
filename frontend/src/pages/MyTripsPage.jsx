import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function MyTripsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  // TODO: Fetch this data from the backend
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
      vendor: "Earl's Regency Hotel"
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
  ];

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Trips', count: trips.filter(t => t.status === 'confirmed').length },
    { id: 'pending', label: 'Pending Approval', count: trips.filter(t => t.status === 'pending').length },
    { id: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: trips.filter(t => t.status === 'cancelled').length }
  ];

  const statusConfig = {
    pending: { color: 'yellow', label: 'Pending Approval' },
    confirmed: { color: 'green', label: 'Confirmed' },
    completed: { color: 'blue', label: 'Completed' },
    cancelled: { color: 'red', label: 'Cancelled' }
  };

  // TODO: Implement filtering and sorting logic with backend
  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'upcoming') {
        return trip.status === 'confirmed' || trip.status === 'pending';
    }
    return trip.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
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
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTrips.map(trip => {
              const status = statusConfig[trip.status];
              return (
                <Link to={`/trips/${trip.id}`} key={trip.id}>
                  <div
                    
                    className={`trip-card bg-white rounded-xl shadow-md overflow-hidden`}
                  >
                    <div className="relative h-40" style={{ background: trip.image }}>
                       <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-${status.color}-700`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                          {trip.destination}
                        </h3>
                        <p className="text-white/90 text-sm drop-shadow-lg">{trip.location}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
