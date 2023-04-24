<?php

$serverName = "localhost";
$userName = "Team18";
$password = "Team18";
$dbName = "Team18";
$dbPort = "3306";

$ID = $_GET['name'];

$conn = mysqli_connect($serverName,$userName,$password,$dbName,$dbPort);

if (!$conn){
	die("Connection falied: " . mysqli_connect_error());
}
else
{
    $query = "SELECT UserID FROM `Users` where Forename = \"$ID\"";
    $queryResult = mysqli_query($conn,$query);

    $taskArray = array();

    while($row = mysqli_fetch_array($queryResult))
    {
        $taskArray[] = $row;
    }

    echo json_encode($taskArray);
}
?>