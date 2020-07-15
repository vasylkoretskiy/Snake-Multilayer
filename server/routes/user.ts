let userRout = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
let dbConnection = require('../modules/db');
var hash: any;
var jwt = require('jsonwebtoken');
userRout.post('/register', (req: any, res: any) => {
    let password = req.body.password;
    let login = req.body.login;
    let nickname = req.body.nickname;
    bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
        bcrypt.hash(password, salt, (err: any, hash: any) => {
            hash = hash;
            let sql = `INSERT INTO users(login, password, nickname) VALUES('${login}','${hash}','${nickname}')`;
            dbConnection.query(sql, function (err: any, results: any) {
                if (err) console.log(err);
            });
        });
    })
    res.send(req.body);
})
userRout.post('/login', (req: any, res: any) => {
    try {
        let password = req.body.password;
        let login = req.body.login;
        let nickname = req.body.nickname;
        dbConnection.query(`SELECT * FROM users WHERE login = '${login}'`, function (err: any, result: any) {
            if (result.length) {
                bcrypt.compare(password, result[0].password, function (err: any, status: any) {
                    if (!status) {
                        res.send('Wrong password');
                    }
                    else {
                        res.send(status);
                    }
                });
            }
            else {
                res.send('User not found');
            }
        });
    }
    catch (err) {
        res.send(err);
    }
})
userRout.post('/getUsers', (req: any, res: any) => {
    const sql = `SELECT * FROM users`;
    dbConnection.query(sql, function (err: any, results: any) {
        if (err) console.log(err);
        res.send(results);
    });
})
module.exports = userRout;