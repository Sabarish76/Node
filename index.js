const LogEvents = require("./LogEvents");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg) => {
  LogEvents(msg);
});

myEmitter.emit("log", "Log Event Emitted");
