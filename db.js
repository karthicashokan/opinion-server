const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "0.0.0.0",
    user: "root",
    password: "25425255",
    database: "ghost"
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySql DB');
});

module.exports = conn;