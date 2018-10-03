function loginFunction() {

	/*
	const express = require('express');
	const router = express.Router();
	const mysql = require('mysql');
	*/
	//erklæring af variabler
	var UserName = document.getElementById("UserBox").value;
	var Password = document.getElementById("PassBox").value;
	var url = "http://192.168.4.34:3000/Brugere/" + UserName + "/" + Password + ""

	//vi bruger JSON til at kalde dataen på vores server
	if (UserName != "" & Password != "") {
		$.getJSON("http://192.168.4.34:3000/Brugere/" + UserName + "/" + Password + "", function (data) {
			if (data.length) {
				window.location.replace("Ordre.html");
			} else {
				alert("wrong username or password");
				return false;
			}
		});
	} else {
		alert("udfyld venligt brugernavn og password")
	};


	/*
	const pool = mysql.createPool( { 
	connectionLimit: 10,
	host: "localhost",
	UserName: "root",
	Password: "Passw0rd",
	Database: "TEC"
	});
	
	function getConnection() {
		return pool
	}
	
	connect(function(check) {
		if (UserName != "" & Password != ""){
			DBUser = query('SELECT Brugernavn FROM Brugere WHERE Brugernavn = ' + UserName);
			DBPass = query('SELECT Adgangskode FROM Brugere WHERE Adgangskode = ' + Password);
			if (DBUser == UserName && DBPass == Password){
			return true;
			}
			else {
				alert("wrong username or password");
			}
		}
		else {
			alert("wrong username or password");
			return false;
		}
	})
	*/
}

document.getElementById("loginButton").addEventListener("click", loginFunction);