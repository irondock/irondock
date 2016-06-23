<?php
// Routes

$app->get('/[{path:.*}]', function ($request, $response, $args)
{
  $path = '/'.$args['path'];
  $dockerResponse = $this->docker->request('get', $path);
  return $response->withJson($dockerResponse->content, $dockerResponse->statusCode);
});
