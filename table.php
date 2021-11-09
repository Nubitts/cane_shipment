<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$zone = substr($header1->zone,4,2);
$div = substr($header1->zone,3,2);
$typeu = $header1->typeu;

$Query = "";

switch($typeu)
{
    case "Z":
        $Query = "select ticket, fullnamefleter, arrivaldate as status,zone from canes_tick where zone = " . $zone . " and isnull(idfleter) = false and grossweight = 0 and zafra = 2021";
        break;
    case "D":
        $Query = "select ticket, fullnamefleter, arrivaldate as status,zone from canes_tick where zone in (select cvezone from div_zones where cvediv = '" . $div . "') and isnull(idfleter) = false  and zafra = 2021";
        break;
}


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
