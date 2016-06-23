<?php

namespace Docker;

use Exception;
use stdClass;

class Docker {

  public function request($method, $endpoint) {
    $socket = stream_socket_client('unix:///var/run/docker.sock', $errno, $errstr);
    if (!$socket) {
      throw new Exception($errstr);
    }
    $request = strtoupper($method)." $endpoint HTTP/1.1\r\n".
               "Connection: Close\r\n\r\n";
    fwrite($socket, $request);
    $rawResponse = stream_get_contents($socket);
    fclose($socket);
    preg_match('|^HTTP/1.1 (\d+) (.+)[\s\S]*Content-Type: ([\w/]+)[\s\S]*\r\n\r\n([\s\S]+)|', $rawResponse, $matches);
    $response = new stdClass;
    $response->statusCode = (int) $matches[1];
    $response->statusText = $matches[2];
    $response->contentType = $matches[3];
    if ($response->statusCode !== 200) {
      $response->content = [
        'error' => trim($matches[4])
      ];
    } else {
      if ($response->contentType === 'application/json') {
        $response->content = json_decode($matches[4]);
      } else {
        $response->content = $matches[4];
      }
    }
    return $response;
  }

}
