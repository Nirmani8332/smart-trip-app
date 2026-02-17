import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function HelpSupportPage() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('faq');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSupportForm, setShowSupportForm] = useState(false);

    // TODO: Fetch this data from a CMS or backend
    const faqs = [
        {
          id: 1,
          category: 'Booking',
          question: 'How does SmartTRIP work?',
          answer: 'SmartTRIP uses AI to create personalized itineraries based on your budget, preferences, and travel dates. Simply enter your requirements, review AI-generated options, customize as needed, and submit a soft booking request to our partner vendors. You\'ll receive confirmation within 24-48 hours.'
        },
        {
          id: 2,
          category: 'Payment',
          question: 'When do I need to pay?',
          answer: 'Payment is required only after your booking is confirmed by all vendors, typically within 24-48 hours. You\'ll receive a payment link via email and have 48 hours to complete the payment to secure your booking.'
        },
    ];

    const handleSubmitTicket = () => {
        // TODO: Implement API call to submit support ticket
        alert('Support ticket submitted! We\'ll get back to you within 24 hours.');
        setShowSupportForm(false);
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
                    <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
                    </div>
                </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-purple-600 rounded-2xl p-8 mb-8 text-white">
                <h2 className="text-3xl font-bold mb-2">How can we help you today?</h2>
                <div className="relative max-w-2xl">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for answers..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/50 outline-none text-lg"
                    />
                </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                    {faqs.map(faq => (
                        <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-gray-900">{faq.question}</span>
                            <svg
                            className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${expandedFaq === faq.id ? 'transform rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        {expandedFaq === faq.id && (
                            <div className="px-6 pb-4">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
