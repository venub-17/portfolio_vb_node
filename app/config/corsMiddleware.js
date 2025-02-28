const cors = require("cors");

// Allowed origins
const allowedOrigins = [
  "https://vb-portfolio-17.netlify.app", // Netlify domain
  "http://localhost:5173", // Localhost (adjust the port if necessary)
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    // Only allow requests from the allowed origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject other origins
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
};

module.exports = cors(corsOptions);
