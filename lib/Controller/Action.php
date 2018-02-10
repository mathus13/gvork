<?php

namespace Gvork\Controller;

abstract class Action
{
    protected $request;
    protected $response;
    protected $args;
    protected $container;

    public function __construct(
        \Slim\Http\Request $request,
        \Slim\Http\Response $response,
        \Pimple\Container $container,
        array $args
    ) {
        $this->request = $request;
        $this->response = $response;
        $this->container = $container;
        $this->args = $args;
    }

    public function fire($action)
    {
        if (!method_exists($this, $action)) {
            $this->response->setStatus(404, "Action '{$action}' not found");
            return $this->response;
        }
        $this->beforeAction();
        $this->{$action}();
        $this->afterAction();
        $this->dispatch();
        return $this->response;
    }

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->{$property};
        }
        if ($this->container->offsetExists($property)) {
            return $this->container[$property];
        }
        if (isset($this->args[$property])) {
            return $this->args[$property];
        }
        return false;
    }

    protected function get($param, $default = null)
    {
        if ($val = $this->{$param}) {
            return $this->{$param};
        }
        return $default;
    }

    public function getUri()
    {
        $uri = $this->request->getRootUri().$this->request->getResourceUri();
        return $uri;
    }

    protected function requireLogin()
    {
        if (!isset($_SESSION['user_id'])) {
            $this->response->setStatus(401, "Must be logged in to use this resource");
            return false;
        }
        return true;
    }

    protected function required($param)
    {
        $found = $this->{$param};
        if (!$found) {
            $this->response->setStatus(400, "Required element {$param} not found");
        }
        return $found;
    }

    /**
     * prepare the response for return
     * @return \Psr\Http\Message\ResponseInterface PSR7 Response Object
     */
    protected function dispatch()
    {

    }

    protected function beforeAction()
    {

    }

    protected function afterAction()
    {
    }

    /**
     * Gets the value of request.
     *
     * @return Slim\Http\Request
     */
    protected function getRequest()
    {
        return $this->request;
    }

    /**
     * Gets the value of responce.
     *
     * @return Slim\Http\Response
     */
    protected function getResponse()
    {
        return $this->responce;
    }

    /**
     * Gets the value of args.
     *
     * @return mixed
     */
    protected function getArgs()
    {
        return $this->args;
    }
}
