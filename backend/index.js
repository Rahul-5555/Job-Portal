import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json()); // sending data in JSON format
app.use(express.urlencoded({ extended: true })); // middleware for form data
app.use(cookieParser());

// CORS configuration to handle both localhost (development) and the deployed URL (production)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? "https://jobportalrah.netlify.app" // Deployed frontend URL
    : "http://localhost:5173", // Development URL
  credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
