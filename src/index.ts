import express from "express";
import bodyParser from "body-parser";
import 'module-alias/register';
import dotenv from 'dotenv';
import cors from "cors";
import stations from "./routes/stations";
import stationInfo from "./routes/station-info";
import arrivals from "./routes/arrivals";
import notifications from "./routes/notifications";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Disable headers
app.disable('x-powered-by');

// Set CORS headers to bypass restrictions temporarily
app.use((req, res, next) => {
  res.header({
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  });
  next();
});

// Set max request body limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

// Routes
app.use("/", stations);
app.use("/", stationInfo);
app.use("/", arrivals);
app.use("/", notifications);

// Main page
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start listening on a port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});