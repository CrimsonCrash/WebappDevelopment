var type2 = "";

$(window).load(function () {
    checkCookie();
    $.getJSON("http://192.168.4.34:3000/Brugere", function (data) {
        var arrItems = [];      // THE ARRAY TO STORE JSON ITEMS.
        $.each(data, function (index, value) {
            arrItems.push(value);       // PUSH THE VALUES INSIDE THE ARRAY.
        });
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < arrItems.length; i++) {

            li = document.createElement('li');
            li.setAttribute('class','bar');
            li.setAttribute('id',arrItems[i].Bruger_ID);
            if (type2 != "Bruger") {
                if  (type2 != "SuperBruger") {
                    span = document.createElement('span');
                    span.innerHTML = "&times;";
                    span.setAttribute("onclick","slet("+arrItems[i].Bruger_ID+")");
                    span.setAttribute("class","remove");
                    li.appendChild(span);
                }
                if (type2 != "Ejer") {
                    if (arrItems[i].Bruger_type != "Ejer") {
                        span = document.createElement('span');
                        span.innerHTML = "&times;";
                        span.setAttribute("onclick","slet("+arrItems[i].Bruger_ID+")");
                        span.setAttribute("class","remove");
                        li.appendChild(span);
                    }
                }
            }
            img = document.createElement('img');
            img.setAttribute('src',arrItems[i].Bruger_type + '.png');
            img.setAttribute('class','bar_item image');
            li.appendChild(img);
            div = document.createElement('div');
            div.setAttribute('class','bar_item');
            li.appendChild(div);
            span2 = document.createElement('span');
            span2.innerHTML = arrItems[i].Navn;
            span2.setAttribute("class","large");
            div.appendChild(span2);
            br = document.createElement('br');
            div.appendChild(br);
            span3 = document.createElement('span');
            span3.innerHTML = arrItems[i].Bruger_type;
            div.appendChild(span3);

            document.getElementById("liste").appendChild(li);

        }
    });
});

function skjul() {
    if (type2 == "Bruger") {
        document.getElementById("knap").style.display = "none";
    }
    if (type2 == "SuperBruger") {
        document.getElementById("Ejer").style.display = "none";
        document.getElementById("Ejer2").style.display = "none";
    }
};
function slet(i) {
    var r = confirm("Er du sikker på at du vil slette brugeren?!");
    if (r == true) {
        document.getElementById(i).style.display = "none";
        var url = "http://192.168.4.34:3000/Bruger/"+i;
        $.ajax({
            url: url,
            method: 'DELETE'
        })
    } else {
    
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
