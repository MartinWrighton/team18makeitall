<?php

$serverName = "localhost";
$userName = "Team18";
$password = "Team18";
$dbName = "Team18";
$dbPort = "3306";
$conn = mysqli_connect($serverName,$userName,$password,$dbName,$dbPort);

if (!$conn){
	die("Connection falied: " . mysqli_connect_error());
}
else
{
    $query = "SELECT * FROM (`PrivateChats` Join PrivateMessage on PrivateMessage.messageID = PrivateChats.messageID) join Users on PrivateMessage.senderID = Users.userID";
    $queryResult = mysqli_query($conn,$query);

    $taskArray = array();

    while($row = mysqli_fetch_array($queryResult))
    {
        $taskArray[] = $row;
    }

    echo json_encode($taskArray);
}
?>