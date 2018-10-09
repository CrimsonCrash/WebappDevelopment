//opretter 2 variabler til brug med cookies
var ID2 = "";
var type2 = "";

//function der køres når hjemmesiden indlæses
$(window).load(function () {

    //køre checkcookie functionen.
    checkCookie();

    //køre en function til er tage json fra api'en
    $.getJSON("http://192.168.4.34:3000/Ordre", function (data) {

        var arrItems = []; // opretter et array til opbevaring af data fra api'en
        $.each(data, function (index, value) {
            arrItems.push(value); // skubber værdierne ind i array'et
        });

        // udtræk titlerne på værdierne i arrayet.
        var col = [];
        for (var i = 0; i < arrItems.length; i++) {
            for (var key in arrItems[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // opretter tabel og giver tabelen en class
        var table = document.createElement("table");
        table.setAttribute("class", "table");

        var tr = table.insertRow(-1); // variablen tr definere et table row
        tr.className = 'table_head'; // table row får tilføjet en class

        // her under oprettes header rækken ud fra titlerne der blev udtrukket længere oppe
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // variablen th definere en table header
            th.innerHTML = col[i];
            tr.appendChild(th); // th proppes på tr
        }



        //køre indtil der ikke er flere arrays i array'et
        for (var i = 0; i < arrItems.length; i++) {

            //definere tr2 som et table row i table.
            tr2 = table.insertRow(-1);

            //køre indtil der ikke er flere værdier i nuværende række i array'et
            for (var j = 0; j < col.length; j++) {
                //opretter variablen tabcell som en celle i  tr2.
                var tabCell = tr2.insertCell(-1);
                //tilføjer værdien til tabcell.
                tabCell.innerHTML = arrItems[i][col[j]];
            }
        }

        // variablen divcontainer oprettes i elementet tabeldiv.
        var divContainer = document.getElementById("tabeldiv");
        //divcontainer får tilføjet tabelen der tidligere blev oprettet.
        divContainer.appendChild(table);
    });
});
// function der køres når der er indtastet et ordre id og klikket på rediger.
function rediger() {
    //den flytter ordre id over til et skjult felt på rediger siden.
    document.getElementById('Hidden_Ordre_ID').value = document.getElementById('Popup_Ordre_ID').value;
    //opretter en variablen med værdien fra ordre_id.
    var ordre_nummer = document.getElementById('Hidden_Ordre_ID').value;
    //opretter variablen url med et forudbestemt url og ordre nummer.
    var url = 'http://192.168.4.34:3000/Ordre/' + ordre_nummer;

    //tager json fra url'et
    $.getJSON(url, function (data) {
        //indsætter værdier fra json på hjemmesiden for udfylde de allerede udfyldte værdier.
        document.getElementById('Navn').value = data[0].Navn;
        document.getElementById('Email').value = data[0].Email;
        document.getElementById('Tlf').value = data[0].Tlf;
        document.getElementById('Adresse').value = data[0].Adresse;
        document.getElementById('Model').value = data[0].Model;
        document.getElementById('Mærke').value = data[0].Maerke;
        document.getElementById('PC_ID_Rediger').value = data[0].PC_ID;
        if (data[0].Ordre_Status == "Annulleret") {
            document.getElementById("Annulleret").checked = true;
        } 
        if (data[0].Ordre_Status == "Gennemført") {
            document.getElementById("Gennemført").checked = true;
        }
        if (data[0].Ordre_Status == "Behandles") {
            document.getElementById("Behandles").checked = true;
        }
        if (data[0].Ordre_Status == "Venter") {
            document.getElementById("Behandles").checked = true;
        }

    });
    //skjuler den første rediger box og viser nummer 2.
    document.getElementById('Rediger_box').style.display = 'block';
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
    type2 = getCookie("BrugerType");
    ID2 = getCookie("ID");
    //checker om user værdien i cookien er udfyldt og hvis den er sker der ingenting
    if (type2 != "") {

        //hvis cookie værdien ikke er udfyldt stilles man tilbage til login siden
    } else {
        window.location.replace("index.html");
    }
}

//når hjemmesiden indlæses indsættes ansat id'et i de 2 skjulte ansat felter på siden.
function page_load() {
    document.getElementById("ansat1").value = ID2
    document.getElementById("ansat2").value = ID2
}