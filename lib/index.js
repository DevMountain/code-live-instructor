// ./lib/index.js

let server = () => {
  const chokidar = require("chokidar"),
    fs = require("fs"),
    os = require("os"),
    express = require("express"),
    message = require("./messageCtrl");

  const app = express(),
    http = require("http").Server(app),
    io = require("socket.io")(http);

  process.stdin.on("data", function(data) {
    data = (data + "")
      .trim()
      .toLowerCase()
      .split(" ");
    switch (data[0]) {
      case "all":
        message.allMessage();
        io.emit("clear_instructor_folder");
        let watcher = chokidar.watch(".", {
          ignored: [/(^|[\/\\])\../, "node_modules"]
        });
        watcher
          .on("addDir", path => createDir(path, path))
          .on("add", path => syncData(path, path))
          .on("change", path => syncData(path, path))
          .on("unlink", path => unlinkFile(path))
          .on("unlinkDir", path => unlinkDir(path));
        setTimeout(function() {
          watcher.close();
          message.syncComplete();
        }, 3000);
        break;
      case "file":
        let filePath = data[1];
        if (!fs.existsSync(filePath)) {
          message.incorrectPath(filePath);
          break;
        }
        message.syncFile(filePath);
        syncData(filePath, filePath);
        break;
      case "end":
        for (let key in io.sockets.sockets) {
          io.sockets.sockets[key].disconnect(true);
        }
        message.connectionsClosed();
        break;
      case "help":
        message.help();
        break;
      case "command":
        let ipaddress = os.networkInterfaces().en0[1].address;
        message.studentCommand(ipaddress);
        break;
      default:
        message.default();
    }
  });

  io.on("connection", socket => {
    message.connected(socket);
  });

  // emits when a file is created or changed
  let syncData = (savPath, srcPath) => {
    if (!fs.existsSync(srcPath)) {
      message.incorrectPath(srcPath);
      return;
    }
    fs.readFile(srcPath, "utf8", (err, data) => {
      if (err) throw err;
      io.emit("syncFile", { data, path: savPath });
    });
  };

  // emits when a directory is created
  let createDir = (savPath, srcPath) => {
    if (srcPath === ".") return;
    fs.readdir(srcPath, "utf8", (err, data) => {
      if (err) throw err;
      io.emit("createDir", { data, path: savPath });
    });
  };

  // emits when a file is deleted
  let unlinkFile = path => {
    io.emit("unlinkFile", { path });
  };

  // emits when a directory is deleted
  let unlinkDir = path => {
    io.emit("unlinkDir", { path });
  };

  // ignoring .dotfiles and node_modules
  let watcher = chokidar.watch(".", {
    ignored: [/(^|[\/\\])\../, "node_modules"]
  });

  watcher
    .on("addDir", path => createDir(path, path))
    .on("add", path => syncData(path, path))
    .on("change", path => syncData(path, path))
    .on("unlink", path => unlinkFile(path))
    .on("unlinkDir", path => unlinkDir(path));

  const port = 5050;
  http.listen(port, () => {
    let ipaddress = os.networkInterfaces().en0[1].address;
    message.syncOnPort(port);
    message.studentCommand(ipaddress);
  });
};

exports.server = server;
