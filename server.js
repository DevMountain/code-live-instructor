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

function copyData(savPath, srcPath) {
    fs.readFile(srcPath, 'utf8', function (err, data) {
            if (err) throw err;
            io.emit('update', {data: data, path: savPath})
    });
}

// ignoring .dotfiles and node_modules
let watcher = chokidar.watch('.', {ignored: [/(^|[\/\\])\../, 'node_modules']})

watcher.on('all', (event, path) => {
  console.log(event, path)
  if(event !== 'addDir' && path === 'test.js') {
    copyData(path, path)
  }
});  

const port = 3007;
http.listen(port, () => console.log(`Listening on port: ${port}`));