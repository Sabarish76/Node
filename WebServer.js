const express = require("express");
const app = express();
const Path = require("path");
const { logger, ErrorHandler } = require("./middlewares/WebLogEvents");
const CORSCONFIG = require("./middlewares/CorsConfig");
const cors = require("cors");
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(cors(CORSCONFIG));
app.use(express.static(Path.join(__dirname, "./public")));
app.use("/subdir", express.static(Path.join(__dirname, "./public")));
app.use("/", require("./router/root"));
app.use("/subdir", require("./router/subdir"));
app.use("/employees", require("./router/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(Path.join(__dirname, "views", "404.html"));
  } else if (req.accepts(json)) {
    res.json("Error : 404 Not Found");
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(ErrorHandler);
app.listen(PORT, () => console.log(`Server Running On ${PORT}`));
