import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password, role, vendorDetails } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({
            name,
            email,
            password,
            role,
        });

        const newUser = await user.save();

        // If the role is vendor, create a corresponding vendor entry
        if (newUser.role === 'vendor') {
            if (!vendorDetails) {
                // If vendor role but no details, we should probably fail
                // For now, rolling back user creation
                await User.findByIdAndDelete(newUser._id);
                return res.status(400).json({ message: "Vendor details are required for vendor registration." });
            }

            try {
                const vendorData = {
                    user: newUser._id,
                    businessName: vendorDetails.businessName,
                    businessType: vendorDetails.businessType,
                    registrationNumber: vendorDetails.registrationNumber,
                    taxId: vendorDetails.taxId,
                    yearEstablished: vendorDetails.yearEstablished,
                    businessEmail: vendorDetails.businessEmail,
                    businessPhone: vendorDetails.businessPhone,
                    website: vendorDetails.website,
                    socialMedia: vendorDetails.socialMedia,
                    address: vendorDetails.address,
                    primaryContact: vendorDetails.primaryContact,
                    services: vendorDetails.services,
                    otherServices: vendorDetails.otherServices,
                    bankDetails: vendorDetails.bankDetails,
                    // Documents would be handled separately after upload
                };

                await Vendor.create(vendorData);

            } catch (vendorError) {
                // If vendor creation fails, roll back user creation
                await User.findByIdAndDelete(newUser._id);
                console.error("Error creating vendor:", vendorError);
                return res.status(500).json({ message: "Failed to create vendor profile." });
            }
        }

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id),
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};
