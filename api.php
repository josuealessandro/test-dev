<?php
$loader = require 'vendor/autoload.php';

$app = new \Slim\Slim(array(
    'templates.path' => 'templates'
));

//Select
//=================================================
//All
$app->get('/carros/', function() use ($app){
	(new \controllers\Carro($app))->select();
});

//With filter
$app->get('/carros/search?:search', function($search) use ($app){
	(new \controllers\Carro($app))->select($search);
});

//Insert
//=================================================
$app->post('/carros/', function() use ($app){
	(new \controllers\Carro($app))->insert();
});

//Update
//=================================================
$app->put('/carros/id=:id', function($id) use ($app){
	(new \controllers\Carro($app))->update($id);
});

//Delete
//=================================================
$app->delete('/carros/id=:id', function($id) use ($app){
	(new \controllers\Carro($app))->del($id);
});

$app->run();
?>