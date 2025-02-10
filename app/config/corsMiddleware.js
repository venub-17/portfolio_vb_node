const cors = require("cors");

const corsOptions = {
  origin: "*", // You can specify allowed origins instead of "*"
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

module.exports = cors(corsOptions);
