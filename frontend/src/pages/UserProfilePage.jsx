import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';


export default function UserProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);

  // TODO: Fetch this data from the backend
  const [profileData, setProfileData] = useState({
    photo: null,
    fullName: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+94 77 123 4567',
    dateOfBirth: '1990-05-15',
    location: 'Colombo, Sri Lanka',
    preferredLanguage: 'English',
    bio: 'Travel enthusiast exploring the beautiful island of Sri Lanka. Love cultural experiences and scenic destinations.'
  });

  // TODO: Fetch this data from the backend
  const [travelPreferences, setTravelPreferences] = useState({
    accommodationType: ['hotel', 'resort'],
    mealPlan: 'breakfast',
    budgetRange: 50,
    travelStyle: 'family',
    activityInterests: ['cultural', 'nature', 'food'],
    dietaryRestrictions: ['vegetarian'],
    accessibilityNeeds: [],
    petTraveler: false
  });

  // TODO: Fetch this data from the backend
  const [notifications, setNotifications] = useState({
    email: {
      bookingConfirmations: true,
      statusUpdates: true,
      promotions: false,
      tripReminders: true,
      reviewRequests: true
    },
    sms: {
      bookingConfirmations: true,
      urgentUpdates: true
    },
    inApp: 'all'
  });

  // TODO: Handle security updates via API
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // TODO: Fetch this data from the backend
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
  ]);

  // TODO: Fetch this data from the backend
  const [activeSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'Colombo, LK', lastActive: '5 minutes ago', current: true },
  ]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'preferences', label: 'Travel Preferences', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'payment', label: 'Payment Methods', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 'privacy', label: 'Privacy & Data', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // TODO: API call to save profile
    alert('Profile updated successfully!');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    // TODO: API call to change password
    alert('Password changed successfully!');
    setShowPasswordChange(false);
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
              <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 space-y-2 sticky top-24">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}/>
                  </svg>
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'personal' && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Other tabs content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
