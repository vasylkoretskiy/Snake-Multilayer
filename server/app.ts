import bodyParser = require("body-parser");
import express = require('express');
import cors = require('cors');
let dbConnection = require('./modules/db');
const tabelUser = `create table if not exists users(
    id int primary key auto_increment,
    login varchar(255) not null,
    password varchar(255) not null,
    nickname varchar(255) not null
  )`;
  const tabelRoom = `create table if not exists rooms(
    id int primary key auto_increment,
    name varchar(255) not null,
    fieldSize int(255) default 100,
    snakeSize int(255) default 10
  )`;

dbConnection.query(tabelUser, function (err: any, results: any) {
});
dbConnection.query(tabelRoom, function (err: any, results: any) {
  console.log(results);
});
dbConnection.connect(function (err: any) {
    if (err) {
        return console.error("Помилка: " + err.message);
    }
    else {
    }
});
const app: express.Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let server = app.listen(8080, () => {
    console.log('server work');
});
let user = require('./routes/user');
let room = require('./routes/room');
app.use('/user', user);
app.use('/room',room)
let io = require('socket.io')(server);
let socket = require('./modules/socket')(io);


