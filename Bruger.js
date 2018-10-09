//opretter variablen type2 til brug i cookie checket.
var type2 = "";

//opretter et array til opbevarin af data
var arrItems = [];
var brugernavn = "";
var brugernavn2 = "";
var eksistere = 1;

//function der køres når hjemmesiden indlæses.
$(window).load(function () {
    //køre functionen checkcookie
    checkCookie();
    //henter json fra et url
    $.getJSON("http://192.168.4.34:3000/Brugere", function (data) {
        $.each(data, function (index, value) {
            arrItems.push(value); // dataen skubbes ind i arrayet
        });
        // tilføj json data'en til hjemmesiden, i dette tilfælde tilføjes det til en ul = unordered list. Denne køres indtil der ikke er flere brugere i array'et
        for (var i = 0; i < arrItems.length; i++) {

            //opretter list item og giver den en klass og et id.
            li = document.createElement('li');
            li.setAttribute('class', 'bar');
            li.setAttribute('id', arrItems[i].Bruger_ID);
            //checker om bruger typen ikke er en bruger.
            if (type2 != "Bruger") {
                //hvis brugertypen er Ejer oprettes en slet knap
                if (type2 == "Ejer") {
                    span = document.createElement('span');
                    span.innerHTML = "&times;";
                    span.setAttribute("onclick", "slet(" + arrItems[i].Bruger_ID + ")");
                    span.setAttribute("class", "remove");
                    li.appendChild(span);
                }
                //checker om bruger typen ikke er ejer.
                if (type2 == "SuperBruger") {
                    //hvis bruger typen er SuperBruger og brugeren der er ved at blive tilføjet til listen ikke er ejer så oprettes en slet knap
                    if (arrItems[i].Bruger_type != "Ejer") {
                        span = document.createElement('span');
                        span.innerHTML = "&times;";
                        span.setAttribute("onclick", "slet(" + arrItems[i].Bruger_ID + ")");
                        span.setAttribute("class", "remove");
                        li.appendChild(span);
                    }
                }
            }
            //tilføjer et billede til list item'en.
            img = document.createElement('img');
            img.setAttribute('src', arrItems[i].Bruger_type + '.png');
            img.setAttribute('class', 'bar_item image');
            li.appendChild(img);
            //tilføjer et div til list item'en.
            div = document.createElement('div');
            div.setAttribute('class', 'bar_item');
            li.appendChild(div);
            //tilføjer et span til list item'en.
            span2 = document.createElement('span');
            span2.innerHTML = arrItems[i].Navn;
            span2.setAttribute("class", "large");
            div.appendChild(span2);
            //tilføjer et br til div'en
            br = document.createElement('br');
            div.appendChild(br);
            //tilføjer endnu et span, denne gang til div'en
            span3 = document.createElement('span');
            span3.innerHTML = arrItems[i].Bruger_type;
            div.appendChild(span3);

            //tilføjer list item'en til elementet liste på siden.
            document.getElementById("liste").appendChild(li);

        }
    });
});

//functionen skjul, denne skjuler 
function skjul() {
    //hvis brugertypen er Bruger skjules opret bruger knappen.
    if (type2 == "Bruger") {
        document.getElementById("knap").style.display = "none";
    }
    //hvis brugertypen er Superbruger skjules ejer radioknappen 
    if (type2 == "SuperBruger") {
        document.getElementById("Ejer").style.display = "none";
        document.getElementById("Ejer2").style.display = "none";
    }
};

//functionen slet
function slet(i) {
    //popup boks der spørger indtil om brugeren virkelig skal slettes.
    var r = confirm("Er du sikker på at du vil slette brugeren?!");
    //hvis brugeren svare ja
    if (r == true) {
        //skjul brugeren på siden og send slet anmodning til api'en
        document.getElementById(i).style.display = "none";
        var url = "http://192.168.4.34:3000/Bruger/" + i;
        $.ajax({
            url: url,
            method: 'DELETE'
        })
        //hvis brugeren svare nej sker der ingenting.
    } else {

    }
}

function validate() {
    for (var i = 0; i < arrItems.length; i++) {
        brugernavn = arrItems[i].Brugernavn;
        brugernavn2 = document.getElementById("brugernavn").value;
        var sammenligning = brugernavn.localeCompare(brugernavn2, 'da', {sensitivity: 'accent'});
        if  (sammenligning == 0) {
            eksistere = 0;
        }
    }
    if (eksistere == 0) {
        brugernavn2 = brugernavn2+(Math.floor(Math.random() * 9000) + 1000);
        alert("der eksistere allerede en bruger med dette brugernavn, prøv i stedet med: " + brugernavn2)
        return false;
    } else {
        return true;
    }
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
    //checker om user værdien i cookien er udfyldt og hvis den er sker der ingenting
    if (type2 != "") {
        //hvis cookie værdien ikke er udfyldt stilles man tilbage til login siden
    } else {
        window.location.replace("index.html");
    }
}