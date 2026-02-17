import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // TODO: Fetch notifications from the backend
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking_confirmed',
      title: 'Booking Confirmed!',
      message: 'Your Kandy Cultural Tour booking (ST2025-KND-1847) has been confirmed by all vendors.',
      timestamp: '2 hours ago',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      category: 'booking'
    },
    {
      id: 2,
      type: 'trip_reminder',
      title: 'Upcoming Trip Reminder',
      message: 'Your Kandy Cultural Tour starts in 3 days! Don\'t forget to pack and prepare.',
      timestamp: '5 hours ago',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isRead: false,
      category: 'system'
    },
  ]);

  const filterTabs = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread Only', count: notifications.filter(n => !n.isRead).length },
    { id: 'booking', label: 'Booking Updates', count: notifications.filter(n => n.category === 'booking').length },
  ];

  const notificationTypes = {
    booking_confirmed: {
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    trip_reminder: {
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
  };

  const filteredNotifications = notifications; // Simplified for now
  
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
                <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex gap-2 overflow-x-auto">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${ 
                activeFilter === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const typeConfig = notificationTypes[notification.type];
              return (
                <div key={notification.id} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${typeConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <svg className={`w-6 h-6 ${typeConfig.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={typeConfig.icon}/>
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-gray-900">{notification.title}</h3>
                                <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{notification.message}</p>
                        </div>
                    </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
