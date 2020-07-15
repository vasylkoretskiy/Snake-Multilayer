let mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    port: '8889',
    user: "root",
    database: "snake",
    password: "root"
});
module.exports = connection;