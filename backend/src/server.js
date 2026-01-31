import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.CORS_ORIGIN 
        : 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.use(express.json()); // This middleware will parse JSON bodies: req.body

// API Routes
app.use("/api/auth", authRoutes);
// Placeholder for other routes
// app.use("/api/users", userRoutes);
// app.use("/api/vendors", vendorRoutes);
// app.use("/api/inventory", inventoryRoutes);
// app.use("/api/bookings", bookingRoutes);


// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
});
