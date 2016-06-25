<?php
// Routes

$app->any('/[{path:.*}]', function ($req, $res, $args)
{
  $response = $this->docker->request($req);
  return $res->withJson($response->content, $response->statusCode);
});
