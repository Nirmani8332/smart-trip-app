import Inventory from '../models/Inventory.js';
import Vendor from '../models/Vendor.js';

// @desc    Get all inventory items for the logged-in vendor
// @route   GET /api/inventory
// @access  Private (Vendor)
export const getInventoryForVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ user: req.user._id });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor profile not found for this user.' });
        }

        const inventory = await Inventory.find({ vendor: vendor._id });
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error in getInventoryForVendor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a new inventory item
// @route   POST /api/inventory
// @access  Private (Vendor)
export const createInventoryItem = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ user: req.user._id });
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor profile not found. Cannot create inventory.' });
        }

        const newItemData = { ...req.body, vendor: vendor._id };
        const newItem = await Inventory.create(newItemData);
        
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error in createInventoryItem:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update an inventory item
// @route   PUT /api/inventory/:id
// @access  Private (Vendor)
export const updateInventoryItem = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ user: req.user._id });
        const item = await Inventory.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        // Check if the item belongs to the logged-in vendor
        if (item.vendor.toString() !== vendor._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to update this item' });
        }

        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error in updateInventoryItem:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete an inventory item
// @route   DELETE /api/inventory/:id
// @access  Private (Vendor)
export const deleteInventoryItem = async (req, res) => {
    try {
        const vendor = await Vendor.findOne({ user: req.user._id });
        const item = await Inventory.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        // Check if the item belongs to the logged-in vendor
        if (item.vendor.toString() !== vendor._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this item' });
        }

        await item.deleteOne(); // Mongoose v6+

        res.status(200).json({ message: 'Inventory item removed' });
    } catch (error) {
        console.error('Error in deleteInventoryItem:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
