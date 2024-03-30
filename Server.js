const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const Path = require("path");
const LogEvents = require("./LogEvents");
const EventEmitter = require("events");
const PORT = process.env.PORT || 8000;

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg, filename) => {
  LogEvents(msg, filename);
});

const ServeFile = async (ContentType, FilePath, res) => {
  try {
    const rawData = await fsPromises.readFile(
      FilePath,
      !ContentType.includes("image") ? "utf8" : ""
    );

    const data =
      ContentType === "application/json" ? JSON.parse(rawData) : rawData;
    res.writeHead(FilePath.includes("404.html") ? 404 : 200, {
      ContentType: ContentType,
    });
    res.end(ContentType === "application/json" ? JSON.stringify(data) : data);
  } catch (error) {
    console.error(error);
    myEmitter.emit("log", `${error.name}: ${error.message}`, "errLog.txt");
    res.statusCode = 500;
    res.end();
  }
};

const Server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  myEmitter.emit("log", `${req.url}\t${req.method}`, "logtxt.txt");

  const extension = Path.extname(req.url);

  let ContentType;

  switch (extension) {
    case ".css":
      ContentType = "text/css";
      break;
    case ".js":
      ContentType = "text/javascript";
      break;
    case ".json":
      ContentType = "application/json";
      break;
    case ".jpg":
      ContentType = "image/jpg";
      break;
    case ".png":
      ContentType = "image/png";
      break;
    case ".txt":
      ContentType = "plain/txt";
      break;
    default:
      ContentType = "text/html";
  }

  let FilePath =
    ContentType === "text/html" && req.url === "/"
      ? Path.join(__dirname, "views", "index.html")
      : ContentType === "text/html" && req.url.slice(-1) === "/"
      ? Path.join(__dirname, "views", req.url, "index.html")
      : ContentType === "text/html"
      ? Path.join(__dirname, "views", req.url)
      : Path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") FilePath += ".html";

  const FileExists = fs.existsSync(FilePath);

  if (FileExists) {
    ServeFile(ContentType, FilePath, res);
  } else {
    switch (Path.parse(FilePath).base) {
      case "home.html":
        res.writeHead(301, { location: "/" });
        res.end();
        break;
      case "img.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "test.html":
        res.writeHead(301, { location: "/subdir/test.html" });
        res.end();
        break;
      case "sub.html":
        res.writeHead(301, { location: "/subdir/index.html" });
        res.end();
        break;
      default:
        ServeFile("text/html", Path.join(__dirname, "views", "404.html"), res);
        break;
    }
  }
});

Server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is Running on" + " " + PORT);
  }
});
