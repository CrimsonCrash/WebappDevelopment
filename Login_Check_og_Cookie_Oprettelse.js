//sætter variablen input til at være værdien fra passbox.
var input = document.getElementById("PassBox");
//lytter til events i input boksen, hvis en knap bliver løftet køres en funktion.
input.addEventListener("keyup", function(event) {
	event.preventDefault();
	//hvis knappen der løftes har keycode 13 (https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes) så klikkes der på login knappen.
    if (event.keyCode === 13) {
        document.getElementById("loginButton").click();
    }
});

//funktion der køres ved indlæsning af siden.
$(window).load(function () {
	checkCookie()
});

//function der køres når der klikkes på login knappen
function loginFunction() {
	//erklæring af variabler
	var UserName = document.getElementById("UserBox").value;
	var Password = document.getElementById("PassBox").value;

	//checker om brugernavn og password er tomt.
	if (UserName != "" & Password != "") {
		//afsender en anmodning til api'en med brugernavn og password.
		$.getJSON("http://192.168.4.34:3000/Brugere/" + UserName + "/" + Password + "", function (data) {
			//hvis der kommer data tilbage (sker kun hvis der findes en bruger med det brugernavn og password).
			if (data.length) {
				//køre checkcookie og checkcookie2 med data fra api'en.
				checkCookie(data[0].Bruger_type);
				checkCookie2(data[0].Bruger_ID);
				//videre stiller brugeren til ordre siden.
				window.location.replace("Ordre.html");
			} else {
				//hvis popup der fortæller brugeren at de har tastet brugernavn eller password forkert.
				alert("wrong username or password");
				return false;
			}
		});
	} else {
		//hvis brugernavn og password er tomt vises en popup boks der beder brugeren indtaste informationen.
		alert("udfyld venligt brugernavn og password")
	};
}

//opretter cookie med de værdier der er blevet overført fra checkcookie funktionen
function setCookie(cname, cvalue, exdays) {
	//opretter en nye variable d som indeholder nuværende dato + exdays.
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 5 * 1 * 60 * 1000));
	//opretter variable expires som overføre værdien fra d som udløbs dato.
	var expires = "expires=" + d.toUTCString();
	//opretter cookien med de værdier der tidligere er oprettet/modtaget.
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//get cookie funktionen med cname værdien som er overført fra checkcookie.
function getCookie(cname) {
	//variablen name oprettes.
	var name = cname + "=";
	//opretter ca og opdeler cookien ved ; dette gøres for kun at få værdien før datoen.
	var ca = document.cookie.split(';');
	//køre cookien igennem et for, der køre indtil i er lige så stort som ca er langt.
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

function checkCookie(type) {
	//modtager user fra getcookie funktionen.
	var type2 = getCookie("BrugerType");
	//checker om user værdien i cookien er udfyldt og hvis den er videre stilles der automatisk til ordre siden
	if (type2 != "") {
		window.location.replace("Ordre.html");
	//hvis cookie værdien ikke er udfyldt oprettes en cookie gennem setcookie funktionen
	} else {
		//sætter user variablen til værdien fra userbox
		type2 = type;
		//checker for at sikre at user ikke er tom eller null
		if (type2 != "" && type2 != null) {
			setCookie("BrugerType", type, 1);
		}
	}
}

function checkCookie2(ID) {
	//modtager user fra getcookie funktionen.
	var ID2 = getCookie("ID");
	//checker om user værdien i cookien er udfyldt og hvis den er videre stilles der automatisk til ordre siden
	if (ID2 != "") {
		window.location.replace("Ordre.html");
	//hvis cookie værdien ikke er udfyldt oprettes en cookie gennem setcookie funktionen
	} else {
		//sætter user variablen til værdien fra userbox
		ID2 = ID;
		//checker for at sikre at user ikke er tom eller null
		if (ID2 != "" && ID2 != null) {
			setCookie("ID", ID2, 1);
		}
	}
}

//lytter efter når der klikkes på login knappen og køre loginfunction når der klikkes.
document.getElementById("loginButton").addEventListener("click", loginFunction);