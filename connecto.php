<?php

require 'vendor/autoload.php';

use Doctrine\DBAL\DriverManager;


$connectionParams = array(
  'dbname' => 'applications',
  'user' => 'root',
  'password' => '12345',
  'host' => 'localhost:3306',
  'driver' => 'pdo_mysql',
);
$con = Doctrine\DBAL\DriverManager::getConnection($connectionParams);
