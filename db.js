const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ghost"
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySql DB');
});

module.exports = conn;