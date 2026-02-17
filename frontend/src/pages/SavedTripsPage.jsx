import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SavedTripsPage() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [selectedTrips, setSelectedTrips] = useState([]);

    // TODO: Fetch this data from the backend
    const [savedTrips, setSavedTrips] = useState([
        {
          id: 1,
          destination: 'Kandy Cultural Tour',
          location: 'Kandy',
          estimatedCost: 90675,
          duration: '3 Days, 2 Nights',
          dateSaved: 'Feb 05, 2025',
          thumbnail: '#667eea',
        },
        {
          id: 2,
          destination: 'Galle Beach Getaway',
          location: 'Galle',
          estimatedCost: 125000,
          duration: '5 Days, 4 Nights',
          dateSaved: 'Jan 28, 2025',
          thumbnail: '#1E90FF',
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Saved Trips</h1>
                            <p className="text-sm text-gray-600">{savedTrips.length} saved itineraries</p>
                        </div>
                        </div>
                        <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {savedTrips.length === 0 ? (
                    <div className="text-center">
                        <h3 className="text-xl font-bold">No saved trips yet</h3>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                        {savedTrips.map(trip => (
                            <div key={trip.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="h-48 relative" style={{ background: trip.thumbnail }}>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1">{trip.destination}</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600">{trip.duration}</p>
                                    <p className="text-2xl font-bold text-purple-600">LKR {trip.estimatedCost.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
