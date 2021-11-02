<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$user_ = substr($header1->user_, 4, 2);
$pass_ = $header1->pass_;

$count = $db->executeStatement("select cvezone from zones where cvezone = ? and password_ = ? and activate = 1", array($user_, $pass_));

if ($count > 0) {

  $Query = "select cvezone, description, hash_ from zones where cvezone = '" . $user_ . "' and password_ = '" . $pass_ . "' and activate = 1";
} else {

  $Query = "select '0' as cvezone, '" . substr($user_, 4, 2) . "' as description, '' as hash_ ";
}

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
