import express from "express";
import http from "http";
import bodyParser from "body-parser";
import stations from "./routes/stations";
import stationInfo from "./routes/station-info";
import arrivals from "./routes/arrivals";
import notifications from "./routes/notifications";

const app = express();
const server = http.createServer(app);

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
const PORT: number = parseInt(process.env.PORT || "3000", 10);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
