<?php

require 'config.php';
require 'util/Auth.php';


// Use an autoloader!

function __autoload($class) {
    require LIBS . $class . ".php";
}

//require 'libs/Bootstrap.php';
//require 'libs/Controller.php';
//require 'libs/View.php';
//require 'libs/Model.php';
//
//require 'libs/Database.php';
//require 'libs/Session.php';

//Load the Bootstrap
$bootstrap = new Bootstrap();

//Optional Path Settings
//$bootstrap->setControllerPath('c');
//$bootstrap->setModelPath('m');
//$bootstrap->setDefaultFile('optional.php');
//$bootstrap->setErrorFile('error.php');
//

$bootstrap->init();