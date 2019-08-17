var $reservations = $("#current-reservations");
var $waitList = $("#wait-list");

$.get("/api/waitlist", data => {
    for (i in data) {
        var $p = $("<p>").text(`${i} - ${data[i].name} - ${data[i].id}`);
        $waitList.append($p);
        console.log("enter");
    }
    console.log("aui");
});

$.get("/api/tables", data => {
    for (i in data) {
        var $p = $("<p>").text(`${i.toNumber() + 1} - ${data[i].name} - ${data[i].phone} - ${data[i].email}`);
        $reservations.append($p);
        console.log("enter");
    }
    console.log("aui");
});

