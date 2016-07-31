<?php
require dirname(__FILE__).'/controllers/docker.php';
require dirname(__FILE__).'/controllers/rps.php';

// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], Monolog\Logger::DEBUG));
    return $logger;
};

// docker
$container['docker'] = function ($c) {
    $settings = $c->get('settings')['docker'];
    return new controllers\Docker();
};

// rps
$container['rps'] = function ($c) {
    $settings = $c->get('settings')['rps'];
    return new controllers\RPS();
};
