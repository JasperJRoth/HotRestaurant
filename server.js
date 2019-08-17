const express = require("express");
const path = require("path");
const newId = require('uuid/v1');


const app = express();

var tables = [];
var waitList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/css/:css", function(req, res){
    res.sendFile(path.join(__dirname, `assets/css/${req.params.css}.css`));
});
app.get("/js/:file", function(req, res){
    res.sendFile(path.join(__dirname, `${req.params.file}.js`));
});

app.get("/tables", function(req, res){
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/reserve", function (req, res) {
    var reservation = req.body;
    reservation.id = newId();

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