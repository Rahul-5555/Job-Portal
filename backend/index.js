import express, { urlencoded } from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
dotenv.config({});
import applicationRoute from "./routes/application.route.js"

const app = express();



// middleware
app.use(express.json()); // sending data in json format
app.use(express.urlencoded({ extended: true })) // midd
app.use(cookieParser());
const corsOptions = {
  origin: "https://jobportalrah.netlify.app",
  credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`)
})