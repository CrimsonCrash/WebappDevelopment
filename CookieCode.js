//opsætter en cookie
function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//hænter en cookie
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

//tjekker om der er en cookie der allerede eksisterer
function checkCookie() {
	var user = getCookie(document.getElementById(UserBox).value);
	if (user != "" && user != null) {
		user=setCookie("username", user, 1);
	}
}

document.getElementById("loginButton").addEventListener("click", checkCookie);

console.log("skriptet svarer")