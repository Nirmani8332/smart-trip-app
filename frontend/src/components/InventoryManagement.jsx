import React, { useState, useEffect } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const CreateServiceModal = ({ setShowModal, setServices }) => {
    const [newItem, setNewItem] = useState({
        type: 'accommodation',
        name: '',
        description: '',
        basePrice: '',
        priceUnit: 'per_night'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.basePrice) {
            return toast.error('Name and Base Price are required.');
        }

        const token = ""; // Replace with a valid token

        try {
            const res = await api.post('/inventory', newItem, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Add the new service to the top of the list
            setServices(prev => [res.data, ...prev]);
            toast.success('Service created successfully!');
            setShowModal(false);
        } catch (error) {
            console.error("Error creating inventory:", error);
            toast.error(error.response?.data?.message || 'Failed to create service.');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Service</h2>
                <form onSubmit={handleCreateService} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                        <select name="type" value={newItem.type} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="accommodation">Accommodation</option>
                            <option value="transport">Transport</option>
                            <option value="activity">Activity</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
                        <input type="text" name="name" value={newItem.name} onChange={handleInputChange} placeholder="e.g., Deluxe Room" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea name="description" value={newItem.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Base Price (LKR)</label>
                            <input type="number" name="basePrice" value={newItem.basePrice} onChange={handleInputChange} placeholder="e.g., 15000" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Unit</label>
                            <input type="text" name="priceUnit" value={newItem.priceUnit} onChange={handleInputChange} placeholder="e.g., per_night" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                            Create Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function InventoryManagement() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // In a real app, the token would be retrieved from a global state/storage
                const token = ""; // Replace with a valid token for testing
                
                const res = await api.get('/inventory', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setServices(res.data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
                toast.error(error.response?.data?.message || 'Failed to fetch inventory.');
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-50">
            {showModal && <CreateServiceModal setShowModal={setShowModal} setServices={setServices} />}
            
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                            <p className="text-gray-600 mt-1">Manage all your service listings and availability</p>
                        </div>
                        <div className="flex gap-2">
                             <button 
                                onClick={() => setShowModal(true)}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                                </svg>
                                Add New Service
                              </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center">Loading inventory...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <div key={service._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                                {service.type}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <p className="text-2xl font-bold text-purple-600">LKR {service.basePrice.toLocaleString()}</p>
                                            <p className="text-xs text-gray-600">{service.priceUnit}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
