import React from 'react';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 mt-6">
            <h1 className="text-4xl font-bold mb-6">Vendor Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/inventory" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="card-body">
                        <h2 className="card-title">Manage Inventory</h2>
                        <p>View, add, edit, and delete your service listings.</p>
                    </div>
                </Link>
                {/* Add other dashboard links here */}
            </div>
        </div>
    );
};

export default VendorDashboard;
