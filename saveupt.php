<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$type = $header1->type;
$zone = $header1->zone;
$valtype = $header1->valtype;
$order = $header1->order;
$ticket = $header1->ticket;
$forwarder = $header1->forwarder;
$liftingm = $header1->liftingm;
$harverster = $header1->harvester;
$envy = $header1->envy;

$Query = "";
$filter = "";
$valtick = 0;

if ($type == "tickett") {
  $filter = "ticket =" . $valtype;
  $valtick = $valtype;
} else {
  $filter = "ticket =" . $ticket;
  $valtick = $ticket;
}

$send = "";

switch ($envy) {
  case "today":
    $send = "curdate()";
    break;
  case "tomorrow":
    $send = "DATE_ADD(curdate(),INTERVAL 1 DAY)";
    break;
}

$count = $db->executeStatement("select ticket from canes_tick where zone = ? and ticket = ? and ISNULL(fullnamefleter) = false and grossweight = 0", array($zone, $valtick));

if ($count == 0) {

  $Query = "UPDATE canes_tick SET idfleter = (select cveforw from forwarders where type = 'fl' and  fullname = ?),
  idlifting = (select cveforw from forwarders where type = 'al' and  fullname = ?),
  idfleter_ = (select cveforw from forwarders where type = 'co' and  fullname = ?), fullnamefleter = ?, fullnamelifting = ?, fullnamefleter_ = ?, zone = ?,
  arrivaldate = " . $send . " WHERE ticket = ? and zafra = 2021";

  $count = $con->executeStatement($Query, array($forwarder, $liftingm, $harverster, $forwarder, $liftingm, $harverster, $zone, $valtick));

  $Query = "select " . $valtick . " as ticket, '" . $forwarder . "' as fullnamefleter";
} else {
  $Query = "select 0 as ticket, 'EL TICKET FUE ASIGNADO ANTERIORMENTE' as fullnamefleter";
}


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
