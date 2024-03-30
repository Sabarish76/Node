const express = require("express");
const router = express.Router();
const Path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(Path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(Path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html");
});

module.exports = router;
