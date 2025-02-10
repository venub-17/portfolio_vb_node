const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const skillRouter = require("./app/routes/Skills");
const bodyParser = require("body-parser");
const connectDB = require("./app/config/db");
const corsops = require("./app/config/corsMiddleware");

// Middleware
app.use(cors());
// app.options("*", cors(corsops));
app.use(morgan("dev"));
app.use(bodyParser.json());

// MongoDB Connection
connectDB();
// console.log("db connect ", process.env.MONGODB_CONNECT_URL);
// Routes
app.use("/skills", skillRouter);

// Handle 404 Errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
