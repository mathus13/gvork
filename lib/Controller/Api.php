<?php

namespace Gvork\Controller;

abstract class Api extends Action
{
    protected $return = array();
    protected $errorCodes = array(
        100 => array(
            'status' => 400,
            'message' => 'Invalid ID',
            'title' => 'Invalid ID',
            'details' => 'The item your requested seems to have never existed'
        ),
        101 => array(
            'status' => 404,
            'message' => 'Deleted',
            'title' => 'Item has been deleted',
            'details' => 'The item you are trying to view has been deleted'
        ),
        4031 => array(
            'status' => 403,
            'message' => 'Unautherized',
            'title' => 'You are not authorized',
            'details' => 'The user credentials are not valid on this system'
        ),
        400 => array(
            'status' => 400,
            'message' => 'Invalid user or password',
            'title' => 'You are not authorized',
            'details' => 'The user credentials are not valid on this system'
        ),
        102 => array(
            'status' => 500,
            'message' => 'Error Deleting',
            'title' => 'Error deleting item',
            'details' => 'There was an error deleting the item.'
        ),
        103 => array(
            'status' => 400,
            'message' => 'Missing Param',
            'title' => 'Request missing parameter',
            'details' => 'There is a required parameter missing from this request'
        ),
        999 => array(
            'status' => 500,
            'message' => 'Unknown Error',
            'title' => 'An Unknown errorhas occured',
            'details' => 'There was an error, but we dont kow what it was'
        ),
    );

    protected function dispatch()
    {
        if (!empty($this->return)) {
            $this->response->setBody(json_encode($this->return));
        }
    }

    protected function requireFound($item)
    {
        if (!$item) {
            $this->throwError(100);
        }
        return $item;
    }

    protected function throwError($code, $detail = null)
    {
        if (isset($this->errorCodes[$code])) {
            $error = $this->errorCodes[$code];
        } else {
            $error = $this->errorCodes[999];
        }
        if (!array_key_exists('errors', $this->return)) {
            $this->return['errors'] = array();
        }
        $this->return['errors'][] = array(
            'title' => "Error {$code}: {$error['title']}",
            'code' => $code,
            'detail' => $error['details'],
            'links' => array(
                'self' => $this->getUri()
            )
        );
        $r = $this->response->setStatus($error['status']);
        $this->app->halt($error['status']);
    }
}
