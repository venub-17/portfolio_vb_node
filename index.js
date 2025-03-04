const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./app/config/db");
// const cors = require("cors");

const skillRouter = require("./app/routes/Skills");
const authRouter = require("./app/routes/authRouter");
// const session = require("express-session");

const corsops = require("./app/config/corsMiddleware");

// Middleware
// app.use(corsops);
app.use(corsops);
app.options("*", corsops);
app.use(morgan("dev"));
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// console.log("db connect ", process.env.MONGODB_CONNECT_URL);
// Routes
// app.use(session({ secret: "my secret", resave: false }));
app.use("/skills", skillRouter);
app.use("/auth", authRouter);

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
