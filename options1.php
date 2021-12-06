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

$complement = "";

if ($id == 5) {
  $complement = " and hability = 1 ";
}

$Query = "";

$count = $db->executeStatement('Delete from table_tempo', array());

switch ($typeb) {
  case "iorder":
    switch ($typeu) {
      case "Z":
        $Query = "insert into table_tempo (data_val) select orden as data_val from canes_tempo where zona = " . $id . " and ISNULL(fullnamefleter) = true group by orden";
        break;
      case "D":
        $Query = "insert into table_tempo (data_val) select orden as data_val from canes_tempo where zona in (select cvezone from div_zones where cvediv = '" . $id . "') and ISNULL(fullnamefleter) = true group by orden";
        break;
    }

    break;
  case "oticket":
    switch ($typeu) {
      case "Z":
        $Query = "insert into table_tempo (data_val) select ticket as data_val from canes_tempo where zona = " . $id . " and orden = " . $order . " and ISNULL(fullnamefleter) = true";
        break;
      case "D":
        $Query = "insert into table_tempo (data_val) select ticket as data_val from canes_tempo where zona in (select cvezone from div_zones where cvediv = '" . $id . "') and orden = " . $order . " and ISNULL(fullnamefleter) = true";
        break;
    }
    break;
  case "isupplier":
    switch ($typeu) {
      case "Z":
        $Query = "insert into table_tempo (data_val) select concat(clave,' ',nombre) as data_val from canes_tempo where zona = " . $id . " and ISNULL(fullnamefleter) = true group by clave,nombre";
        break;
      case "D":
        $Query = "insert into table_tempo (data_val) select concat(clave,' ',nombre) as data_val from canes_tempo where zona in (select cvezone from div_zones where cvediv = '" . $id . "') and ISNULL(fullnamefleter) = true group by clave,nombre";
        break;
    }
    break;

  case "sorder":

    switch ($typeu) {
      case "Z":
        $Query = "insert into table_tempo (data_val) select orden as data_val from canes_tempo where zona = " . $id . " and clave = " . $supplier . " and ISNULL(fullnamefleter) = true group by orden";
        break;
      case "D":
        $Query = "insert into table_tempo (data_val) select orden as data_val from canes_tempo where zona in (select cvezone from div_zones where cvediv = '" . $id . "') and clave = " . $supplier . " and ISNULL(fullnamefleter) = true group by orden";
        break;
    }
    break;
  case "tickett":

    switch ($typeu) {
      case "Z":
        $Query = "insert into table_tempo (data_val) select ticket as data_val from canes_tempo where zona = " . $id . " " . $complement . " and ISNULL(fullnamefleter) = true";
        break;
      case "D":
        $Query = "insert into table_tempo (data_val) select ticket as data_val from canes_tempo where zona in (select cvezone from div_zones where cvediv = '" . $id . "') and ISNULL(fullnamefleter) = true";
        break;
    }

    break;
}

$count = $db->executeStatement($Query, array());

$Query = "Select data_val from table_tempo";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
