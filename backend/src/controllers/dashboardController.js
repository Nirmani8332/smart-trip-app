import Vendor from '../models/Vendor.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

// @desc    Get dashboard data for a vendor
// @route   GET /api/dashboard
// @access  Private
export const getDashboardData = async (req, res) => {
    try {
        // The user ID is available from the 'protect' middleware
        const userId = req.user._id;

        // Find the vendor associated with the user
        const vendor = await Vendor.findOne({ user: userId });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor profile not found." });
        }

        // --- Mock Data Generation ---
        // In a real application, you would query your database and aggregate this data.
        
        const totalBookings = 50 + Math.floor(Math.random() * 20);
        const pendingRequests = 5 + Math.floor(Math.random() * 5);
        const revenueThisMonth = 400000 + Math.floor(Math.random() * 150000);
        const totalRevenue = 2500000 + Math.floor(Math.random() * 500000);
        const activeListings = 10 + Math.floor(Math.random() * 10);
        const averageRating = (4.5 + Math.random() * 0.5).toFixed(1);
        const responseRate = 90 + Math.floor(Math.random() * 10);

        const metrics = {
            totalBookings,
            pendingRequests,
            revenueThisMonth,
            totalRevenue,
            activeListings,
            averageRating,
            responseRate,
            lastUploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };

        const recentActivity = [
            {
              id: 1,
              type: 'booking_request',
              title: 'New booking from Jane Doe',
              description: 'Beachside Villa - 4 Nights',
              time: '15 minutes ago',
              icon: '📋',
            },
            {
              id: 2,
              type: 'confirmation',
              title: 'Booking #ST2026-001 confirmed',
              description: 'Payment received successfully',
              time: '2 hours ago',
              icon: '✅',
            },
            {
              id: 3,
              type: 'review',
              title: 'New 4-star review',
              description: 'From Mark Evans for "City Tour"',
              time: '1 day ago',
              icon: '⭐',
            },
        ];
        
        // --- End Mock Data ---

        res.status(200).json({
            metrics,
            recentActivity,
            vendorName: vendor.businessName 
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error while fetching dashboard data." });
    }
};
