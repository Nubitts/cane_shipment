<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$type = $header1->type;
$zone = $header1->zone;

$Query = "";

switch ($type) {
  case "id_supplier":
    $Query = "select code_ from canes_tick where zone = " . $zone . "  and ISNULL(idfleter) = true group by code_, supplier order by code_";
    break;
  case "supplier":
    $Query = "select supplier from canes_tick where zone = " . $zone . " and ISNULL(idfleter) = true group by code_, supplier order by code_";
    break;
  case "ticket":
    $Query = "select ticket from canes_tick where zone = " . $zone . "  and ISNULL(idfleter) = true group by ticket order by ticket";
    break;
}

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
