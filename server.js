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

app.get("/checkout/:id", function (req, res) {
    var id = req.params.id.trim();
    var idFound = false;

    console.log(id);
    //removes the reserve from the tables and add the first reserve on the waiting list
    for (i in tables) {
        if (tables[i].id === id) {
            tables.splice(i, 1);
            if (waitList.length > 0) {
                tables.push(waitList[0]);
                waitList.splice(0, 1);
            }
            idFound = true;
            break;
        }
    }
    if (idFound) {
        res.json({ success: false, message: "ID not found!" });
        console.log("Error");
    }
    else {
        res.json({ sucess: true, message: "The checkout was made it!" });
        console.log("Success:");
    }
    
});

app.get("/api/tables", function(req, res){
    res.json(tables);
});

app.get("/api/waitlist", function(req, res){
    res.json(waitList);
});



app.listen(8080);