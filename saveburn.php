<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$zone = $header1->zone;
$datinitial = $header1->datinitial;
$horinitial = $header1->horinitial;
$order = $header1->order;
$tickinitial = $header1->tickinitial;
$tickend = $header1->tickend;
$typecane = $header1->typecane;
$typeburn = $header1->typeburn;


$Query = "";
$filter = "";
$valtick = 0;
$tipocan = "";


$count = $db->executeStatement("select count(*) as cuenta from canes_tempo where orden = ? and (ticket BETWEEN ? and ?) and pesob < 1 and zafrad = zafraday()", array($order, $tickinitial, $tickend));

if ($count > 0) {

  switch ($typecane) {
    case "Q":
      $tipocan = "QUEMADA";
      break;
    case "C":
      $tipocan = "CRUDA";
      break;
  }

  $Query = "UPDATE canes_tempo SET fecque = ?, horque = ?, tpocan = ?, typeburn = ?, rdateburn = now() WHERE orden = ? and (ticket BETWEEN ? and ?) and zafrad = zafraday()";

  $county = $con->executeStatement($Query, array($datinitial, $horinitial, $typecane, $typeburn, $order, $tickinitial, $tickend));


  $Query = "select 'LOS TICKETS DEL " . $tickinitial . " AL " . $tickend . " DE LA ORDEN " . $order . " TIENEN FECHA DE " . $tipocan . " " . $datinitial . " CON HORA " . $horinitial . "' as resultado ";
} else {
  $Query = "select 'LOS TICKETS YA ESTAN EN BATEY O YA DIERON SALIDA' as resultado";
}


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
