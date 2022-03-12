<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

date_default_timezone_set("America/Mexico_City");

$db = $con;

$zone = $header1->idzone;
$listor = $header1->listord;

$Query = "";

$fecha = new DateTime('NOW');


$Query = "UPDATE canes_tempo set hability = 1 where zona = ? and orden in (?)";

$county = $con->executeStatement($Query, array($zone, $listor));

$Query = "Select 'Todas las ordenes fueron habilitadas para asignacion...' as resultado";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
