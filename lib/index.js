// ./lib/index.js

let server = () => {
  const chokidar = require('chokidar')
      , fs = require('fs')
      , socket = require('socket.io')
      , express = require('express');
  
  const app = express()
      , http = require('http').Server(app)
      , io = require('socket.io')(http);
  
  io.on('connection', socket => {
    console.log(`connected: ${socket.id}`)
  })
  
  // emits when a file is created or changed
  let syncData = (savPath, srcPath) => {
      fs.readFile(srcPath, 'utf8', (err, data) => {
              if (err) throw err;
              io.emit('syncFile', { data, path: savPath })
      });
  }
  
  // emits when a directory is created
  let createDir = (savPath, srcPath) => {
    fs.readdir(srcPath, 'utf8', (err, data) => {
            if (err) throw err;
            io.emit('createDir', { data, path: savPath })
    });
  }

  // emits when a file is deleted
  let unlinkFile = (path) => {
    io.emit('unlinkFile', { path })
  }

  // emits when a directory is deleted
  let unlinkDir = (path) => {
    io.emit('unlinkDir', { path })
  }
  
  // ignoring .dotfiles and node_modules
  let watcher = chokidar.watch('.', {ignored: [/(^|[\/\\])\../, 'node_modules']})
  
  watcher
    .on('addDir', path => createDir(path, path))
    .on('add', path => syncData(path, path))
    .on('change', path => syncData(path, path))
    .on('unlink', path => unlinkFile(path))
    .on('unlinkDir', path => unlinkDir(path))
  
  const port = 5050;
  http.listen(port, () => console.log(`Syncing on port ${port}`));
  }
  
  exports.server = server;