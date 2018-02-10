<?php
namespace Gvork\Events;

class Table extends \Gvork\Counch\Table
{
    protected static $rowClass = '\Gvork\Events\Row';
    protected static $rowType = 'event';

    public static function getTodaysEvents()
    {
        $query = self::$client->createViewQuery('events', 'today');
        $query->setReduce(false);
        $query->setIncludeDocs(true);
        return self::fetch($query->execute());
    }

    public static function getByDateRange(\DateTime $start, \DateTime $end)
    {
        $query = self::$client->createViewQuery('events', 'byStartDate');
        $query->setReduce(false);
        $query->setIncludeDocs(true);
        $query->setStartKey($start->format('c'));
        $query->setEndKey($end->format('c'));
        return self::fetch($query->execute());
    }
}
