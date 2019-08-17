var $reservations = $("#current-reservations");
var $waitList = $("#wait-list");

$.get("/api/waitlist", data => {
    addEntry(data, $waitList);
});

$.get("/api/tables", data => {
    addEntry(data, $reservations);
});

function addEntry(data, parent){
    for (i in data) {
        var $check = $(`<i class="far fa-check-square"></i>`);

        $check.addClass("right");
        $check.css("display", "none");
        $check.data("id", data[i].id);

        var $p = $("<p>").html(`${i + 1} - ${data[i].name} - ${data[i].phone} - ${data[i].email}`);

        $p.hover(function(){
            $(this).find("i").css("display", "block");
        }, function(){
            $(this).find("i").css("display", "none");
        });

        $check.on("click", function(){
            console.log("test");
            $.get("/checkout/" + $(this).data("id")).then(function(res, err){
                console.log(res);
                console.log(err);
            });
        });

        $p.append($check);
        parent.append($p);
        console.log("enter");
    }
    console.log("aui");
}