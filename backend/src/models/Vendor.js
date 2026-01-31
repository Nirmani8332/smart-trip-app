import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  businessName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  contactInfo: {
    phone: String,
    address: String
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
