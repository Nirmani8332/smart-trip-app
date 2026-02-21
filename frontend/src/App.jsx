import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import VendorRegisterPage from './pages/VendorRegisterPage.jsx';
import InventoryManagement from './pages/InventoryManagement';
import AvailabilityCalendar from './pages/AvailabilityCalendar';
import BookingReview from './pages/BookingReview';
import BulkDataUpload from './pages/BulkDataUpload.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import MyTrips from './pages/MyTrips.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/vendor-register" element={<VendorRegisterPage />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/availability-calendar" element={<AvailabilityCalendar />} />
        <Route path="/booking-review" element={<BookingReview />} />
        <Route path="/bulk-upload" element={<BulkDataUpload />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </Router>
  );
}

export default App;