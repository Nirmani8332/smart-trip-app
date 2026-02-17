import VendorLoginPage from "./pages/VendorLoginPage";
import VendorRegistrationPage from "./pages/VendorRegistrationPage";
import UserProfilePage from "./pages/UserProfilePage";
import MyTripsPage from "./pages/MyTripsPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import SavedTripsPage from "./pages/SavedTripsPage";
import ItineraryCustomizationPage from "./pages/ItineraryCustomizationPage";
import ReviewsRatingsPage from "./pages/ReviewsRatingsPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VendorDashboard from "./pages/VendorDashboard.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vendor/login" element={<VendorLoginPage />} />
        <Route path="/vendor/register" element={<VendorRegistrationPage />} />
        <Route path="/dashboard" element={<VendorDashboard />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/my-trips" element={<MyTripsPage />} />
        <Route path="/trips/:id" element={<TripDetailsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />
        <Route path="/saved-trips" element={<SavedTripsPage />} />
        <Route path="/itinerary/customize/:id" element={<ItineraryCustomizationPage />} />
        <Route path="/reviews-ratings" element={<ReviewsRatingsPage />} />
      </Routes>
    </div>
  )
}

export default App
