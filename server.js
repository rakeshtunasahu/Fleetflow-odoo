import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes.js"

// Route Imports

import analyticsRoutes from "./modules/analytics/analytic.routes.js";
import driverRoutes from "./modules/drivers/driver.routes.js";
import vehicleRoutes from "./modules/vehicles/vehicle.routes.js";
import tripRoutes from "./modules/trips/trip.routes.js";
import fuelRoutes from "./modules/fuelLogs/fuel.routes.js";
import maintenanceRoutes from "./modules/maintenances/maintenance.routes.js";

// Middleware
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ====================
// Global Middlewares
// ====================
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes)

// ====================
// API Routes
// ====================
app.use("/api/analytics", analyticsRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/maintenances", maintenanceRoutes);

// ====================
// Health Check Route
// ====================
app.get('/db-test', (req, res) => {
    res.send("Database test successful!");
});
app.get("/", (req, res) => {
  res.json({
    message: "FleetFlow Backend Running 🚀"
  });
});

// ====================
// Global Error Handler
// ====================
app.use(errorHandler);

// ====================
// Server Start
// ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});