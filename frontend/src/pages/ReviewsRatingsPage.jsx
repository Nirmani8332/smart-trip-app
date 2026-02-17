import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewsRatingsPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('pending');
    const [showReviewForm, setShowReviewForm] = useState(null);

    // TODO: Fetch this data from the backend
    const [pendingReviews, setPendingReviews] = useState([
        {
          id: 1,
          tripId: 'ST2024-ELL-8932',
          destination: 'Ella Hill Country',
          completedDate: 'Dec 13, 2024',
          thumbnail: '#34C759'
        },
    ]);

    // TODO: Fetch this data from the backend
    const [submittedReviews, setSubmittedReviews] = useState([
        {
          id: 1,
          tripId: 'ST2024-KND-5432',
          destination: 'Kandy Cultural Experience',
          review: 'This was an absolutely wonderful trip!',
        }
    ]);

    const handleSubmitReview = () => {
        // TODO: Submit review to the backend
        alert('Review submitted successfully!');
        setShowReviewForm(null);
    };


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
                        <h1 className="text-xl font-bold text-gray-800">Reviews & Ratings</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex gap-2">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'pending'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Pending Reviews ({pendingReviews.length})
                </button>
                <button
                    onClick={() => setActiveTab('submitted')}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'submitted'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Submitted Reviews ({submittedReviews.length})
                </button>
                </div>

                {activeTab === 'pending' && (
                    <div className="space-y-4">
                        {pendingReviews.map(trip => (
                            <div key={trip.id} className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-xl font-bold">{trip.destination}</h3>
                                <p>Completed: {trip.completedDate}</p>
                                <button
                                    onClick={() => setShowReviewForm(trip.id)}
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 mt-4"
                                >
                                    Write Review
                                </button>
                                {showReviewForm === trip.id && (
                                    <div className="mt-4">
                                        <textarea className="w-full p-2 border rounded"></textarea>
                                        <button onClick={handleSubmitReview} className="bg-green-500 text-white p-2 rounded mt-2">Submit</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'submitted' && (
                     <div className="space-y-4">
                        {submittedReviews.map(review => (
                            <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-xl font-bold">{review.destination}</h3>
                                <p>{review.review}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
