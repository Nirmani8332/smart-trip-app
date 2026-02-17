import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItineraryCustomizationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // TODO: All of this state should be fetched from the backend based on the itinerary ID
  const [budget, setBudget] = useState(150000); 
  const [currentTotal, setCurrentTotal] = useState(125000);
  const [selectedDay, setSelectedDay] = useState(1);
  const [itinerary, setItinerary] = useState({
    day1: {
      date: 'Mar 15, 2025',
      hotel: { id: 'h1', name: 'Earl\'s Regency Hotel', price: 15000 },
      activities: [{ id: 'a1', name: 'Temple of the Tooth Visit', price: 2000 }],
    },
    day2: {
      date: 'Mar 16, 2025',
      hotel: { id: 'h1', name: 'Earl\'s Regency Hotel', price: 15000 },
      activities: [{ id: 'a3', name: 'Royal Botanical Gardens', price: 1500 }],
    },
  });

  useEffect(() => {
    // TODO: Fetch itinerary data from /api/itinerary/:id
    // For now, we use mock data.
    const calculatedTotal = Object.values(itinerary).reduce((total, day) => {
        let dayTotal = 0;
        if (day.hotel) dayTotal += day.hotel.price;
        if (day.activities) day.activities.forEach(a => dayTotal += a.price);
        return total + dayTotal;
    }, 0);
    setCurrentTotal(calculatedTotal);
  }, [itinerary]);

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
                <h1 className="text-xl font-bold text-gray-800">Customize Your Trip</h1>
                <p className="text-sm text-gray-600">Kandy Cultural Tour • 3 Days</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Trip Summary</h2>
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">LKR {currentTotal.toLocaleString()}</span>
                    <span className="text-gray-600">/ LKR {budget.toLocaleString()}</span>
                </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="p-6 max-w-5xl">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800">Day {selectedDay}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
