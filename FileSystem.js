const path = require("path");
const fsPromises = require("fs").promises;

const fileops = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "text", "text.txt"),
      "utf-8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "text", "async.txt"),
      "This is async text"
    );
    console.log("write completed");
    await fsPromises.appendFile(
      path.join(__dirname, "text", "async.txt"),
      "\n\n Async Text Append"
    );
    console.log("append Successful");
    await fsPromises.rename(
      path.join(__dirname, "text", "write.txt"),
      path.join(__dirname, "text", "AsyncRename.txt")
    );
    console.log("Rename Completed");
    await fsPromises.unlink(path.join(__dirname, "text", "text.txt"));
    console.log("Delete Successful");
  } catch (err) {
    console.error(err);
  }
};

fileops();

// fs.readFile(path.join(__dirname, "text", "text.txt"), "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(
//   path.join(__dirname, "text", "write.txt"),
//   "This is Write File",
//   (err) => {
//     if (err) throw err;
//     console.log("write SuccessFull");
//     fs.appendFile(
//       path.join(__dirname, "text", "write.txt"),
//       "\n\n\n This is Append File",
//       (err) => {
//         if (err) throw err;
//         console.log("Append Completed");
//         fs.rename(
//           path.join(__dirname, "text", "Rename.txt"),
//           path.join(__dirname, "text", "Rename.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename Success");
//           }
//         );
//       }
//     );
//   }
// );

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Error${err}`);
  process.exit(1);
});
