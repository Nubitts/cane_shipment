<?php

include('./connecto.php');

$header1 = json_decode(file_get_contents("php://input"));

require './vendor/autoload.php';

use Doctrine\DBAL\DriverManager;

$db = $con;

/* $zone = substr($header1->zone, 4, 2);
$div = substr($header1->zone, 3, 2);
$typeu = $header1->typeu;
 */
$Query = "";


$Query = "select zafrad, ticket,ifnull(concat(fletero,' ',fullnamefleter),' Sin Asignar ') as fletero, concat(clave,' ',nombre) as productor,concat(alzadora,' ',fullnamelifting) as alzadora,concat('Orden ',orden,' Zona ',zona,' Tabla ',tabla) as detalle,DATE_FORMAT(arrivaldate,'%d-%m-%y') as arrivaldate from ticket_assign";

$statement = $db->prepare($Query);
$resultSet = $statement->execute();
$movi = $resultSet->fetchAllAssociative();

$db = null;

echo json_encode($movi);
