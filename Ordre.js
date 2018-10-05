var ID2 = "";
var type2 = "";

$(window).load(function () {

    checkCookie();

    $.getJSON("http://192.168.4.34:3000/Ordre", function (data) {

        var arrItems = []; // THE ARRAY TO STORE JSON ITEMS.
        $.each(data, function (index, value) {
            arrItems.push(value); // PUSH THE VALUES INSIDE THE ARRAY.
        });

        // EXTRACT VALUE FOR TABLE HEADER.
        var col = [];
        for (var i = 0; i < arrItems.length; i++) {
            for (var key in arrItems[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute("class", "table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1); // TABLE ROW.
        tr.className = 'table_head';

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }


        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < arrItems.length; i++) {

            tr2 = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr2.insertCell(-1);
                tabCell.innerHTML = arrItems[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("tabeldiv");
        divContainer.appendChild(table);
    });
});
// THIS IS WHERE WE EDIT THE ORDER ID
function rediger() {
    document.getElementById('Hidden_Ordre_ID').value = document.getElementById('Popup_Ordre_ID').value;
    var ordre_nummer = document.getElementById('Hidden_Ordre_ID').value;
    var url = 'http://192.168.4.34:3000/Ordre/' + ordre_nummer;
    alert("url: " + url);

    $.getJSON(url, function (data) {
        document.getElementById('Navn').value = data[0].Navn;
        document.getElementById('Email').value = data[0].Email;
        document.getElementById('Tlf').value = data[0].Tlf;
        document.getElementById('Adresse').value = data[0].Adresse;
        document.getElementById('Model').value = data[0].Model;
        document.getElementById('Mærke').value = data[0].Maerke;
        document.getElementById('PC_ID_Rediger').value = data[0].PC_ID;
    });
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

function page_load() {
    document.getElementById("ansat1").value = ID2
    document.getElementById("ansat2").value = ID2
}