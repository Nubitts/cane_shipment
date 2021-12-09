<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$tstart = $header1->tstart;
$end = $header1->tend;

$Query = "";

$Query = "UPDATE canes_tempo SET tpocan = null, typeburn = null, fecque = null, horque = null, rdateburn = null WHERE (ticket BETWEEN ? and ?) and zafrad = zafraday()";

$county = $con->executeStatement($Query, array($tstart,$tend));

$zone = substr($header1->zone, 4, 2);
$div = substr($header1->zone, 3, 2);
$typeu = $header1->typeu;

$Query = "";

$Query = "select rdateburn,fecque,horque,orden, tstart, tend, tickets, tpocan, typeburn from vburnorders";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
