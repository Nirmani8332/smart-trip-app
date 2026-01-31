import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor', 
    required: true 
  },
  type: {
    type: String,
    enum: ['accommodation', 'transport', 'activity'],
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
  },
  basePrice: { 
    type: Number, 
    required: true 
  },
  priceUnit: {
    type: String, // e.g., 'per_night', 'per_person', 'per_trip'
    required: true
  },
  accommodationDetails: {
    category: String,
    amenities: [String],
    mealPlans: [String]
  },
  transportDetails: {
    category: String,
    capacity: Number
  },
  activityDetails: {
    category: String
  }
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
