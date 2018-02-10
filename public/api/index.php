<?php
session_start();

date_default_timezone_set('America/New_York');
$time = time();
require_once '../vendor/autoload.php';


use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Slim;

$container = new Pimple\Container;

$app = new \Slim\Slim();

$body = file_get_contents('php://input');
$body = ($body = json_decode($body, true)) ? $body : array();

$args = array_merge(
    $app->request->get(),
    $app->request->post(),
    $app->request->put(),
    $body
);

$app->group('/api', function () use ($container, $app) {
});
