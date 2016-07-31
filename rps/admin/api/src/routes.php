<?php

$app->any('/docker/[{path:.*}]', function ($req, $res, $args)
{
  $path = '/'.$args['path'];
  $response = $this->docker->request($req, $path);
  return $res->withJson($response->content, $response->statusCode);
});
