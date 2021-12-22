<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$zone = $header1->idzone;


$Query = "";


$Query = "select orden from canes_tempo where pesob = 0 and IFNULL(hability,0) = 0 and zafrad = zafraday() and zona = " . $zone . " group by orden";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
