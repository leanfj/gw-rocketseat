const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//Utilização do servidor HTTP do NODE
const server = require('http').Server(app);

const io = require('socket.io')(server);

mongoose.connect(
  'mongodb://gw-rocketseat-leanfj:leanfj123@ds155073.mlab.com:55073/gw-rocketseat',
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes/routes'));

server.listen(3001, () => {
  console.log('Server iniciado na porta 3001');
});
