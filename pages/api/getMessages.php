<?php

$serverName = "35.246.55.159";
$userName = "Team18";
$password = "Team18";
$dbName = "Team18";
$dbPort = "3306";
$conn = mysqli_connect($serverName,$userName,$password,$dbName,$dbPort);

if (!$conn){
	die("Connection falied: " . mysqli_connect_error());
}
else{
    echo"<p>success</p>";
}
?>