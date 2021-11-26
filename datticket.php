<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

$ticket = $header1->iticket;

$Query = "select concat(nombre,' Ord-',orden, ' tab-',tabla) as descripcion from canes_tempo where ticket = " . $ticket . " and zafrad = zafraday()";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
