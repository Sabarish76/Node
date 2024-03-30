const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const LogEvents = async (message, logname) => {
  const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logname),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  LogEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqlog.txt");
  console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};

const ErrorHandler = (err, req, res, next) => {
  LogEvents(`${err.name}:${err.message}`, "errlog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = { logger, LogEvents, ErrorHandler };
