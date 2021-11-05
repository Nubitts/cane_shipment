<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$typeb = $header1->typeb;
$zone = $header1->zone;
$order = $header1->order;
$code = $header1->code;
$supplier = $header1->supplier;

$Query = "";

switch ($typeb) {
  case "id_supplier":
    $Query = "select code_ as data_val from canes_tick where zone = " . $zone . "  and ISNULL(idfleter) = true group by code_, supplier order by code_";
    break;
  case "supplier":
    $Query = "select supplier as data_val from canes_tick where zone = " . $zone . " and ISNULL(idfleter) = true group by code_, supplier order by code_";
    break;
  case "ticket":
    $Query = "select ticket as data_val from canes_tick where zone = " . $zone . " and order_ = " . $order . " and ISNULL(idfleter) = true group by ticket order by ticket";
    break;
  case "order":
    $Query = "select order_ as data_val from canes_tick where zone = " . $zone . " and code_ = " . $code . " and ISNULL(idfleter) = true group by order_";
    break;
  case "ordert":
    $Query = "select order_ as data_val from canes_tick where zone = " . $zone . " and supplier = '" . $supplier . "' and ISNULL(idfleter) = true group by order_";
    break;
  case "tickett":
    $Query = "select ticket as data_val from canes_tick where zone = " . $zone . " and ISNULL(idfleter) = true group by ticket order by ticket";
    break;
}



$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
