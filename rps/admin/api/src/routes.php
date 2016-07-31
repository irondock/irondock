<?php

$app->any('/docker/[{path:.*}]', function ($req, $res, $args)
{
  $path = '/'.$args['path'];
  $response = $this->docker->request($req, $path);
  return $res->withJson($response->content, $response->statusCode);
});

$app->post('/rps', function ($req, $res)
{
  return $this->rps->create($req, $res);
});

$app->post('/rps/leaseip', function ($req, $res)
{
  return $this->rps->leaseIp($req, $res);
});
