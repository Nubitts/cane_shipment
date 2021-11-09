<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$zone = $header1->zone;
$type = $header1->typef;

$Query = "select concat(cveforw,' ', fullname) as data_val from forwarders where type = '" . $type . "' and idzaf in (select idzaf from zafraparams where actual =1) ";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
