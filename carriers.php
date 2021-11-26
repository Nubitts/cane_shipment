<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$typef = $header1->typef;

$Query = "select concat(cveforw,' ',fullname) as descripcion from forwarders where fullname <> 'x' and type = '" . $typef . "' and idzone > 0 and zafra = zafraday()";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();


$db = null;

echo json_encode($movi);
