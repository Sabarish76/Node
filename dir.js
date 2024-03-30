const fs = require("fs");

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory Created");
  });
}
if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory deleted");
  });
}

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Error${err}`);
  process.exit(1);
});
