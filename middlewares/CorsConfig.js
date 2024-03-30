const whitelist = [
  "https://zesty-frangipane-607990.netlify.app",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS Origin Not Allowed"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
