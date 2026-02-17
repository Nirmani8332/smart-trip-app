import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TripDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Fetch this data from the backend using the trip ID from params
  useEffect(() => {
    const fetchTripData = () => {
      const mockTripData = {
        id: 'ST2025-KND-1847',
        name: 'Kandy Cultural Tour',
        destination: 'Kandy',
        status: 'confirmed',
        dates: {
          checkIn: 'March 15, 2025',
          checkOut: 'March 18, 2025',
          duration: '3 Days, 2 Nights'
        },
        totalCost: 90675,
      };
      setTripData(mockTripData);
      setLoading(false);
    };

    fetchTripData();
  }, [id]);

  if (loading) {
    return <div>Loading trip details...</div>;
  }

  if (!tripData) {
    return <div>Trip not found.</div>;
  }

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
                <h1 className="text-xl font-bold text-gray-800">Trip Details</h1>
                <p className="text-sm text-gray-600">{tripData.id}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">{tripData.name}</h1>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700`}>
                        {tripData.status.charAt(0).toUpperCase() + tripData.status.slice(1)}
                    </span>
                </div>
                </div>
                <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Total Cost</p>
                <p className="text-3xl font-bold text-purple-600">LKR {tripData.totalCost.toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
