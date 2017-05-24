const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE");
//   next();
// });

io.on('connection', socket => {
  let id = socket.id;
  io.emit('user joined', id);
  socket.on('user named', msg => {
    io.emit('user named', { id, name: msg });
  });
  socket.on('chat message', msg => {
    io.emit('chat message', { id, msg });
  });
  socket.on('disconnect', () => {
    io.emit('user left', id);
  });
});

http.listen(5000, () => {
  console.log('listening on *:5000');
});
