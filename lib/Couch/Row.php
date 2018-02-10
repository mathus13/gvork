<?php
namespace Gvork\Couch;

abstract class Row
{
    protected $id;
    protected $rev;
    protected $data = array();
    protected $tableClass;

    public function __constract(array $doc = array())
    {
        $this->id = (isset($doc['_id'])) ? $doc['_id'] : null;
        $this->rev = (isset($doc['_rev'])) ? $doc['_rev'] : null;
        $this->data = (isset($doc['doc'])) ? $doc['doc'] : null;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getRev()
    {
        return $this->rev;
    }

    public function getData()
    {
        return $this->data;
    }

    public function save()
    {
        $table = $this->tableClass;
        if ($this->id && $this->rev) {
            list($id, $rev) = $table::update($this);
        } else {
            list($id, $rev) = $table::create($this);
        }
        $this->id = $id;
        $this->rev = $rev;
    }

    public function delete()
    {
        $table = $this->tableClass;
        $table::delete($this);
    }
}
