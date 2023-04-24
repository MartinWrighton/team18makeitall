<?php

$serverName = "localhost";
$userName = "Team18";
$password = "Team18";
$dbName = "Team18";
$dbPort = "3306";

$senderID = $_GET['sendID'];
$recvID = $_GET['recvID'];
$date = $_GET['date'];
$time = $_GET['time'];
$content = $_GET['content'];
$sendName = $_GET['sendName'];
$recvName = $_GET['recvName'];


$conn = mysqli_connect($serverName,$userName,$password,$dbName,$dbPort);

if (!$conn){
	die("Connection falied: " . mysqli_connect_error());
}
else
{
    $query = "INSERT INTO `PrivateMessage`(senderID, date,time,content,senderName,receiverName) VALUES(\"$senderID\",\"$date\",\"$time\",\"$content\",\"$sendName\",\"$recvName\"); INSERT INTO `PrivateChats`(senderID, receiverID) VALUES(\"$senderID\", \"$recvID\")";
    $queryResult = mysqli_multi_query($conn,$query);

    $taskArray = array();


    echo "success";
}
?>