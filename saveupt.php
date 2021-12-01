<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$type = $header1->type;
$zone = $header1->id;
$order = $header1->order;
$ticket = $header1->iticket;
$forwarder = $header1->forwarder;
$liftingm = $header1->liftingm;
$harverster = $header1->harvester;
$envy = $header1->envy;

$Query = "";
$filter = "";
$valtick = 0;

$send = "";

switch ($envy) {
  case "today":
    $send = "curdate()";
    break;
  case "tomorrow":
    $send = "DATE_ADD(curdate(),INTERVAL 1 DAY)";
    break;
}

$count = $db->executeStatement("select ticket from canes_tempo where ticket = ? and fullnamefleter is null and round(pesob,0) < 1 and zafrad = zafraday()", array($ticket));

if ($count > 0) {

  $Query = "UPDATE canes_tempo SET fletero = ?, alzadora = ?, idfleter_ = ?,
  fullnamefleter = (select fullname from forwarders where type = 'fl' and  cveforw = ?),
  fullnamelifting = (select fullname from forwarders where type = 'al' and  cveforw = ?), fullnamefleter_ = (select fullname from forwarders where type = 'co' and  cveforw = ?),
  arrivaldate = " . $send . ", rdateassign = now()  WHERE ticket = ? and zafrad = zafraday()";

  $county = $con->executeStatement($Query, array($forwarder, $liftingm, $harverster, $forwarder, $liftingm, $harverster, $ticket));


  $Query = "select ticket, fullnamefleter from canes_tempo where ticket = " . $ticket . " and zafrad = zafraday()";
} else {
  $Query = "select 0 as ticket, 'EL TICKET FUE ASIGNADO ANTERIORMENTE' as fullnamefleter";
}


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
