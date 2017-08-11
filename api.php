<?php
$loader = require 'vendor/autoload.php';

$app = new \Slim\Slim(array(
    'templates.path' => 'templates'
));

//Select
$app->get('/carros/', function() use ($app){
	(new \controllers\Carro($app))->select();
});

//Select by ID
$app->get('/carros/:id', function($id) use ($app){
	(new \controllers\Carro($app))->select($id);
});

//Insert
$app->post('/carros/', function() use ($app){
	(new \controllers\Carro($app))->insert();
});

//Update
$app->put('/carros/:id', function($id) use ($app){
	(new \controllers\Carro($app))->update($id);
});

//Delete
$app->delete('/carros/:id', function($id) use ($app){
	(new \controllers\Carro($app))->del($id);
});

$app->run();
?>