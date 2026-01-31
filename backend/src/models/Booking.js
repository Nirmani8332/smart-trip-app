import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    inventory: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Inventory' 
    },
    priceAtBooking: { 
      type: Number, 
      required: true 
    }
  }],
  totalCost: { 
    type: Number, 
    required: true 
  },
  tripDates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  pax: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected', 'cancelled'],
    default: 'pending',
    required: true
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
