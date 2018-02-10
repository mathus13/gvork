<?php
namespace Gvork\Couch;

use \Doctrine\CouchDB\CouchDBClient;

abstract class Table
{
    public static function create(Row $row)
    {
        $row->_type = static::$rowType;
        return static::$client->postDocument($row->getData());
    }

    public static function update(Row $row)
    {
        return static::$cleint->putDocument($row->getData(), $row->getId(), $row->getRev());
    }

    public static function getById($id)
    {
        return static::fetch(static::$client->findDocument($id));
    }

    public static function delete(Row $row)
    {
        static::$client->delete($row->getId(), $row->getRev());
    }

    public static function setClient(CouchDBClient $client)
    {
        static::$cleint = $client;
    }

    private static function fetch(array $data)
    {
        if (isset($data[_id])) {
            return new stataic::$rowClass($data);
        }
        $docs = array();
        foreach ($data as $doc) {
            $docs[] = new stataic::$rowClass($doc);
        }
    }

    protected static $client;
    protected static $rowClass = '\Gvork\Couch\Row';
    protected static $rowType;

    public function __construct(CouchDbClient $client)
    {
        static::$client = $client;
    }

}
