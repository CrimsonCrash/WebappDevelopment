//opretter cookie med de værdier der er blevet overført fra checkcookie funktionen
function setCookie(cname, cvalue, exdays) {
	//opretter en nye variable d som indeholder nuværende dato + exdays.
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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
	var user = getCookie("username");
	//checker om user værdien i cookien er udfyldt og hvis den er videre stilles der automatisk til ordre siden
	if (user != "") {
		window.location.replace("Ordre.html");
	//hvis cookie værdien ikke er udfyldt oprettes en cookie gennem setcookie funktionen
	} else {
		//sætter user variablen til værdien fra userbox
		user = document.getElementById(UserBox).value;
		//checker for at sikre at user ikke er tom eller null
		if (user != "" && user != null) {
			setCookie("username", user, 1);
		}
	}
}

document.getElementById("loginButton").addEventListener("click", checkCookie);

console.log("skriptet svarer")