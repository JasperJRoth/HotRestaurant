const express = require("express");
const path = require("path");

const app = express();

var tables = [];
var waitList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/assets/css/style.css", function(req, res){
    res.sendFile(path.join(__dirname, "assets/css/style.css"));
});

app.get("/tables", function(req, res){
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/reserve", function (req, res) {
    var reservation = req.body;

    if (tables.length < 5) {
        tables.push(reservation);   
        console.log("Reservation added to tables list");
    }
    else {
        waitList.push(reservation);
        console.log("Reservation added to wait list");
    }
    
    res.json(reservation);
});

app.get("/api/tables", function(req, res){
    res.json(tables);
});

app.get("/api/waitlist", function(req, res){
    res.json(waitList);
});


app.listen(8080);