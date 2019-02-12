var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "terserahh",
    database: "reactnative"
});

db.connect(() => {
    console.log("db connected");
})
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({ "status": "aktif" })
})

app.get("/data", (req, res) => {
    let sql = "SELECT * FROM reactnative ORDER BY id DESC";
    db.query(sql, (err, result) => {
        res.send(result);
    })
})

app.post("/data", (req, res) => {
    console.log(req.body)
    let sql = `INSERT INTO reactnative (name, age, email) VALUES ('${req.body.name}', ${req.body.age}, '${req.body.email}')`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
            console.log("post sukses!");
        }

    })
})

app.listen(1234, () => {
    console.log("app running in 1234..");
})