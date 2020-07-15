import { func } from "prop-types";

let roomRout = require('express').Router();
let DbConnection = require('../modules/db');

roomRout.post('/saveRoom', (req: any, res: any) => {
    var name = req.body.name;

    let sql = `INSERT INTO rooms(name) VALUES('${name}')`;
    DbConnection.query(sql, function (err: any, results: any) {
                if (err) console.log(err);
    });
    res.send(req.body);
});
roomRout.get('/getRooms', (req: any, res: any) => {
    const sql = `SELECT * FROM rooms`;
    DbConnection.query(sql, function (err: any, results: any) {

        if (err) console.log(err);
        res.send(results);
    });
})
roomRout.post('/setSize', (req: any, res: any) => {
    let fieldSize = req.body.fieldSize;
    let snakeSize = req.body.snakeSize;
    let name = req.body.name;
    const sql = `UPDATE rooms SET fieldSize=${fieldSize},snakeSize=${snakeSize} WHERE name='${name}'`;
    DbConnection.query(sql, function (err: any, results: any) {
        console.log(results);
        if (err) console.log(err);
        res.send(results);
    });
})


module.exports = roomRout;