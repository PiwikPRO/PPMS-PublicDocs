.. _android setOfflineCacheAge():

====================
setOfflineCacheAge()
====================

The **setOfflineCacheAge()** method sets the time limit for storing events in the local storage. The default value is 24 hours (24 * 60 * 60 * 1000 milliseconds).

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          tracker.setOfflineCacheAge(milliseconds);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.offlineCacheAge = milliseconds

Parameters
----------

| **milliseconds** (number, required)
| The time (in milliseconds) after which events are removed from the local storage. Default value: 24 hours (24 * 60 * 60 * 1000 milliseconds). If 0 is set, events are stored forever (unlimited time). If -1 is set, storing is turned off.

Examples
--------

To set the time limit to 12 hours (12 * 60 * 60 * 1000 milliseconds):

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          tracker.setOfflineCacheAge(12 * 60 * 60 * 1000);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.offlineCacheAge = 12 * 60 * 60 * 1000


Related methods
---------------

* :ref:`android setOfflineCacheSize()`
