const fs = require("fs");
const path = require("path");
const rs = fs.createReadStream(
  path.join(__dirname, "text", "BigFile.txt"),
  "utf-8"
);
const ws = fs.createWriteStream(path.join(__dirname, "text", "newBigFile.txt"));

rs.pipe(ws);
