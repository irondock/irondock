<?php

namespace controllers;

use Exception;
use stdClass;

class Docker
{
  public function request($req, $path)
  {
    $uri = $req->getUri();
    $contentType = $req->getContentType();
    $queryString = $uri->getQuery();
    $parsedBody = $req->getParsedBody();
    $method = strtoupper($req->getMethod());

    $qs = $queryString ? '?'.$queryString : '';
    if ($parsedBody && $contentType === 'application/json') {
      $content = json_encode($parsedBody, JSON_UNESCAPED_SLASHES);
      $contentLength = strlen($content);
    } else {
      $content = null;
    }

    $fp = stream_socket_client('unix:///var/run/docker.sock', $errno, $errstr);
    if (!$fp) {
      throw new Exception($errstr);
    }
    $req = $method." $path$qs HTTP/1.1\r\n".
           ($content ? "Content-Type: $contentType\r\nContent-Length: $contentLength\r\n" : '').
           "Connection: Close\r\n\r\n";

    fwrite($fp, $req);
    if ($content) {
      fwrite($fp, $content);
    }
    $response = stream_get_contents($fp);
    fclose($fp);

    preg_match('|^HTTP/1.1 (\d+) (.+)\r\n*(Content-Type: ([\w/]+)\r\n)?[\s\S]*\r\n\r\n([\s\S]*)|', $response, $matches);
    array_splice($matches, 0, 1);
    array_splice($matches, 2, 1);
    $res = new stdClass;
    $res->statusCode = (int) $matches[0];
    $res->statusText = $matches[1];
    $res->contentType = $matches[2];
    if (count($matches) > 3) {  // has content
      if ($res->statusCode !== 200) {
        $res->content = [
          'error' => trim($matches[3])
        ];
      } else {
        if ($res->contentType === 'application/json') {
          $res->content = json_decode($matches[3]);
        } else {
          $res->content = $matches[3];
        }
      }
    } else {
      $res->content = null;
    }
    return $res;
  }
}
