$(window).load(function () {
    $.getJSON("http://192.168.4.34:3000/Brugere", function (data) {
        alert(JSON.stringify(data[0].Navn));
    });
});