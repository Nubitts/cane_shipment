<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$zone = substr($header1->zone, 4, 2);
$div = substr($header1->zone, 3, 2);
$typeu = $header1->typeu;

$Query = "";

switch ($typeu) {
  case "Z":
    $Query = "select ticket, concat(fletero,' ',fullnamefleter) as fullnamefleter, arrivaldate as fstatus,zona as zone, concat('quiteass(',ticket,')') as accion from canes_tempo where zona = " . $zone . " and isnull(fullnamefleter) = false and pesob = 0 and zafrad = zafraday()";
    break;
  case "D":
    $Query = "select ticket, concat(fletero,' ',fullnamefleter) as fullnamefleter, arrivaldate as fstatus,zona as zone, concat('quiteass(',ticket,')') as accion from canes_tempo where zona in (select cvezone from div_zones where cvediv = '" . $div . "') and isnull(fullnamefleter) = false and pesob = 0 and zafrad = zafraday()";
    break;
}


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
