//når documentet indlæses køres denne function.
$(document).ready(function () {
    //skjuler reperation og reservedele felter på rediger og opret siderne.
    $('#rep2').hide();
    $('#res2').hide();
    $('#rep4').hide();
    $('#res4').hide();
    //hvis der klikker på checkboxene over felterne enten skjules eller vises felterne.
    $('#rep').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#rep2').show();
        } else {
            $('#rep2').hide();
        }
    });
    $('#res').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#res2').show();
        } else {
            $('#res2').hide();
        }
    });
    $('#rep3').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#rep4').show();
        } else {
            $('#rep4').hide();
        }
    });
    $('#res3').click(function () {
        var $this = $(this);
        if ($this.is(':checked')) {
            $('#res4').show();
        } else {
            $('#res4').hide();
        }
    });
});

//køre når siden indlæses
$(window).load(function () {
    //køre checkcookie functionen
    checkCookie();
    //køre getjson for at få en liste over alle pcer fra api'en
    $.getJSON("http://192.168.4.34:3000/PCer", function (data) {

        var arrItems = []; // opretter et array til opbevaring af data fra api'en
        $.each(data, function (index, value) {
            arrItems.push(value); // skubber værdier fra api'en ind i arrayet
        });

        // opretter en tabel på siden og definere dens class.
        var table = document.createElement("table");
        table.setAttribute("class", "table");

        //opretter variablen tr (table row) og giver det en class.
        var tr = table.insertRow(-1);
        tr.className = 'table_head';


        //Her under oprettes table headersne
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "PC ID";
        tr.appendChild(th);
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Mærke";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Model";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Reparation";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Reparation Text";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Reservedele";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Reservedele Text";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "OS";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Til Salg";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Solgt";
        tr.appendChild(th);
        th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = "Skrottet";
        tr.appendChild(th);

        // for loopet her under køres indtil der ikke er flere PC'er i arrayet.
        for (var i = 0; i < arrItems.length; i++) {

            //tr2 tilføjes som en tabel række og sættes ind i tabelen som en række.
            tr2 = table.insertRow(-1);

            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            tabCell.innerHTML = arrItems[i].PC_ID;
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            tabCell.innerHTML = arrItems[i].Maerke;
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            tabCell.innerHTML = arrItems[i].Model;
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            //check om værdien er 1, og hvis den er indsæt ja.
            if (arrItems[i].Reparation == 1) {
                tabCell.innerHTML = "ja";
            } else {
                tabCell.innerHTML = "nej";
            }
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            tabCell.innerHTML = arrItems[i].Reparation_txt;
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            //check om værdien er 1, og hvis den er indsæt ja.
            if (arrItems[i].Reservedele == 1) {
                tabCell.innerHTML = "ja";
            } else {
                tabCell.innerHTML = "nej";
            }
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            tabCell.innerHTML = arrItems[i].Reservedele_txt;
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            tabCell.innerHTML = arrItems[i].OS;
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            //check om værdien er 1, og hvis den er indsæt ja.
            if (arrItems[i].Til_Salg == 1) {
                tabCell.innerHTML = "ja";
            } else {
                tabCell.innerHTML = "nej";
            }
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            //check om værdien er 1, og hvis den er indsæt ja.
            if (arrItems[i].solgt == 1) {
                tabCell.innerHTML = "ja";
            } else {
                tabCell.innerHTML = "nej";
            }
            //tabcell oprettes og sættes ind i tr2 som en celle.
            var tabCell = tr2.insertCell(-1);
            //check om værdien er 1, og hvis den er indsæt ja.
            if (arrItems[i].skrottet == 1) {
                tabCell.innerHTML = "ja";
            } else {
                tabCell.innerHTML = "nej";
            }
        }


        // der oprettes en variable divcontainer som kobles på tabeldiv.
        var divContainer = document.getElementById("tabeldiv");
        //divcontainer får koblet den tabel vi lige har oprettet på.
        divContainer.appendChild(table);
    });
});

//function der køres når der er indtastet et pc id og klikket på rediger.
function rediger() {
    //den flytter pc id over til et skjult felt på rediger siden.
    document.getElementById('pcID2').value = document.getElementById('pcID').value;
    //opretter en variablen med værdien fra pcid.
    var pcid = document.getElementById('pcID').value;
    //opretter variablen url med et forudbestemt url og pcid.
    var url = 'http://192.168.4.34:3000/PCer/' + pcid;

    //tager json fra url'et
    $.getJSON(url, function (data) {
        //indsætter værdier fra json på hjemmesiden for udfylde de allerede udfyldte værdier.
        document.getElementById('Maerke').value = data[0].Maerke;
        document.getElementById('Model').value = data[0].Model;
        document.getElementById('Reperation2').value = data[0].Reparation_txt;
        document.getElementById('Reservedele2').value = data[0].Reservedele_txt;
        document.getElementById('OS').value = data[0].OS;

        //checker om reparation er 0 og an på om den er så checkes boksen af.
        if (data[0].Reparation == 0) {
            $('#rep3').prop('checked', false)
        } else if (data[0].Reparation == 1) {
            $('#rep3').prop('checked', true)
            $('#rep4').show();
        }
        //checker om reservedele er 0 og an på om den er så checkes boksen af.
        if (data[0].Reservedele == 0) {
            $('#res3').prop('checked', false)
        } else if (data[0].Reservedele == 1) {
            $('#res3').prop('checked', true)
            $('#res4').show();
        }
        //checker om salg er 0 og an på om den er så checkes boksen af.
        if (data[0].Salg == 0) {
            $('#Salg').prop('checked', false)
        } else if (data[0].Salg == 1) {
            $('#Salg').prop('checked', true)
        }
        //checker om skrottet er 0 og an på om den er så checkes boksen af.
        if (data[0].skrottet == 0) {
            $('#Skrottet').prop('checked', false)
        } else if (data[0].skrottet == 1) {
            $('#Skrottet').prop('checked', true)
        }
    });
    //skjuler den første rediger box og viser nummer 2.
    document.getElementById('Rediger2').style.display = 'block';
    document.getElementById('Rediger').style.display = 'none'
}

//get cookie funktionen med cname værdien som er overført fra checkcookie.
function getCookie(cname) {
    //variablen name oprettes.
    var name = cname + "=";
    //opretter ca og opdeler cookien ved ; dette gøres for kun at få værdien før datoen.
    var ca = document.cookie.split(';');
    //køre cookien igennem et for der køre indtil i er lige så stort som ca er langt.
    for (var i = 0; i < ca.length; i++) {
        //variablen c skabes ud fra en lokation i ca, lokationen er defineret af i.
        var c = ca[i];
        //mens det første tegn i c er et mellem rum udfør nedenstående opgave.
        while (c.charAt(0) == ' ') {
            //c er nu lig med c's tidligere værdi minus det første tegn i variablen
            c = c.substring(1)
        }
        //hvis variablen c indeholder variablen name ved start positionen.
        if (c.indexOf(name) == 0) {
            //så sendes resten af c retur
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    //modtager user fra getcookie funktionen.
    var type2 = getCookie("BrugerType");
    //checker om user værdien i cookien er udfyldt og hvis den er sker der ingenting
    if (type2 != "") {
        //hvis cookie værdien ikke er udfyldt stilles man tilbage til login siden
    } else {
        window.location.replace("index.html");
    }
}