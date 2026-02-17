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
  businessType: {
    type: String,
    required: true
  },
  registrationNumber: String,
  taxId: String,
  yearEstablished: Number,
  businessEmail: {
    type: String,
    required: true,
    unique: true
  },
  businessPhone: String,
  website: String,
  socialMedia: {
    facebook: String,
    instagram: String,
  },
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    province: String,
    postalCode: String,
    country: { type: String, default: 'Sri Lanka' }
  },
  primaryContact: {
    name: String,
    designation: String,
    phone: String,
    email: String,
  },
  services: [String],
  otherServices: String,
  documents: {
    businessCertificate: String,
    taxDocuments: String,
    ownerIdProof: String,
    bankAccountProof: String,
    professionalLicenses: String,
  },
  bankDetails: {
    bankName: String,
    branch: String,
    accountName: String,
    accountNumber: String,
    accountType: String,
    swiftCode: String
  },
  status: {
    type: String,
    enum: ['draft', 'pending_review', 'approved', 'rejected', 'needs_revision'],
    default: 'pending_review'
  }
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;

