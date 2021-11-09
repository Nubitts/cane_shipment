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
$typeu = $header1->typeu;
$id = $header1->id;

$Query = "";

switch ($typeb) {
  case "iorder":

    switch ($typeu) {
      case "Z":
        $Query = "select order_ as data_val from canes_tick where zone = " . $id . " and ISNULL(idfleter) = true group by order_";
        break;
      case "D":
        $Query = "select order_ as data_val from canes_tick where zone in (select cvezone from div_zones where cvediv = '" . $id . "') and ISNULL(idfleter) = true group by order_";
        break;
    }

    break;
  case "oticket":
    switch ($typeu) {
      case "Z":
        $Query = "select ticket as data_val from canes_tick where zone = " . $id . " and order_ = " . $order . " and ISNULL(idfleter) = true";
        break;
      case "D":
        $Query = "select ticket as data_val from canes_tick where zone in (select cvezone from div_zones where cvediv = '" . $id . "') and order_ = " . $order . " and ISNULL(idfleter) = true";
        break;
    }
    break;
  case "isupplier":
    switch ($typeu) {
      case "Z":
        $Query = "select concat(code_,' ',supplier) as data_val from canes_tick where zone = " . $id . " and ISNULL(idfleter) = true group by code_,supplier";
        break;
      case "D":
        $Query = "select concat(code_,' ',supplier) as data_val from canes_tick where zone in (select cvezone from div_zones where cvediv = '" . $id . "') and ISNULL(idfleter) = true group by code_,supplier";
        break;
    }
    break;

  case "sorder":

    switch ($typeu) {
      case "Z":
        $Query = "select order_ as data_val from canes_tick where zone = " . $id . " and code_ = " . $supplier . " and ISNULL(idfleter) = true group by order_";
        break;
      case "D":
        $Query = "select order_ as data_val from canes_tick where zone in (select cvezone from div_zones where cvediv = '" . $id . "') and code_ = " . $supplier . " and ISNULL(idfleter) = true group by order_";
        break;
    }
    break;
  case "tickett":

    switch ($typeu) {
      case "Z":
        $Query = "select ticket as data_val from canes_tick where zone = " . $id . " and ISNULL(idfleter) = true";
        break;
      case "D":
        $Query = "select ticket as data_val from canes_tick where zone in (select cvezone from div_zones where cvediv = '" . $id . "') and ISNULL(idfleter) = true";
        break;
    }

    break;
}


$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
