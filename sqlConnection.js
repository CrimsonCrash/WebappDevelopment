function loginFunction(){
	$(window).load(function () {
		$.getJSON("http://192.168.4.34:3000/Bruger", function (data){
			
		});
	});
	/*
	const express = require('express');
	const router = express.Router();
	const mysql = require('mysql');
	*/
	var UserName = document.getElementById(UserBox);
	var Password = document.getElementById(PassBox);
	var check = false;
	var DBUser = "";
	var DBPass = "";


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
	
}

document.getElementById("loginButton").addEventListener("click", loginFunction);