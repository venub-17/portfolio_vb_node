const cors = require("cors");

var whitelist = [
  "http://localhost:5173",
  "https://wonderful-pony-a87fa9.netlify.app",
];
const corsOptions = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = corsOptions;
