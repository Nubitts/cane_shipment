<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$cve = $header1->cve;
$pass_ = $header1->pass_;

$Query = "select user_ from vUsersapptc where cve = '" . $cve . "' and password_ = '" . $pass_ . "'";
$Query1 = "";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$exis = $resultSet->fetchAllAssociative();

$count = count($exis);

if ($count > 0) {

  $Query1 = "select cve, user_, hash_, tu from vUsersapptc where cve = '" . $cve . "' and password_ = '" . $pass_ . "'";
} else {

  $Query1 = "select '0' as cve, '' as user_, '' as hash_, '' as tu ";
}

$statement = $db->prepare($Query1);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


echo json_encode($movi);
