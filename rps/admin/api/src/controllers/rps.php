<?php

namespace controllers;

use Exception;
use stdClass;
use Docker;

class RPS
{
  /**
   * Create new nginx server block (virtualhost)
   */
  public function create($req, $res)
  {
    $data = $req->getParsedBody();
    $serverName = $data['serverName'];
    $containerId = $data['containerId'];

    // if subdomain
    if (count(explode('.', $serverName)) > 2) {
      $templateFile = 'subdomain';
      // if starts with "www." remove it and treat it as main domain
      if (strpos($serverName, 'www.') === 0) {
        $serverName = ltrim($serverName, 'www.');
        $templateFile = 'domain';
      }
    }
    // main domain
    else {
      $templateFile = 'domain';
    }

    $ip = $this->getContainerIp($containerId);
    if (!$ip) {
      return $res->withJson([
        'error' => "No container found with id: $containerId"
      ], 404);
    }

    $view = new \Slim\Views\Twig(dirname(__FILE__).'/../../templates');
    $content = $view->fetch($templateFile, [
      'serverName' => $serverName,
      'ip' => $ip
    ]);

    file_put_contents("/tmp/$serverName", $content);
    $this->sudo_exec("chown root:root /tmp/$serverName");
    $this->sudo_exec("mv /tmp/$serverName /etc/nginx/sites-available/$serverName");
    $this->sudo_exec("ln -sf /etc/nginx/sites-available/$serverName /etc/nginx/sites-enabled/$serverName");
    $this->sudo_exec("service nginx reload");
  }

  /**
   * Get an available IP from the pool
   * Return false if no IP is available between 172.68.0.1 and 172.68.0.250
   */
  public function leaseIp($req, $res)
  {
    $containers = json_decode(file_get_contents('http://localhost/api/docker/containers/json?all=true'));
    for ($n = 1; $n <= 250; $n++) {
      foreach ($containers as $container) {
        $available = true;
        $ip = $container->NetworkSettings->Networks->br0->IPAddress;
        if ($ip === "172.68.0.$n") {
          $available = false;
          break;
        }
      }
      if ($available) {
        return $res->withJson([
          'ip' => "172.68.0.$n"
        ]);
      }
    }
    return $res->withJson([
      'error' => 'Could not lease an IP address'
    ], 404);
  }

  /**
   * Run a shell command as sudo
   * @param  String $cmd Command
   * @return String      Output from that command
   */
  private function sudo_exec($cmd)
  {
    return shell_exec("sudo /srv/sites/admin/api/src/commands/sudo '$cmd'");
  }

  /**
   * Get a container's IP address from its ID
   * @param  String $containerId Container ID
   * @return String              IP address of that container
   */
  private function getContainerIp($containerId)
  {
    $containers = json_decode(file_get_contents('http://localhost/api/docker/containers/json?all=true'));
    foreach ($containers as $container) {
      if (strpos($container->Id, $containerId) === 0) {
        return $container->NetworkSettings->Networks->br0->IPAddress;
      }
    }
    return false;
  }
}
