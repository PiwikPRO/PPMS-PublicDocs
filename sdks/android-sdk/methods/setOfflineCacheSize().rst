.. _android setOfflineCacheSize():

=====================
setOfflineCacheSize()
=====================

The **setOfflineCacheSize()** method sets the size limit for storing events in the local storage. The default value is 4 Mb (4*1024*1024 bytes).

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          tracker.setOfflineCacheSize(bytes);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.offlineCacheSize = bytes

Parameters
----------

| **bytes** (number, required)
| The size limit (in bytes) for storing events in the local storage. Default value: 4 Mb (4*1024*1024 bytes). If 0 is set, the size is unlimited.

Examples
--------

To set the size limit to 2 Mb (2 * 1024 * 1024 bytes):

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          tracker.setOfflineCacheSize(2 * 1024 * 1024);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.offlineCacheSize = 2 * 1024 * 1024

Related methods
---------------

* :ref:`android setOfflineCacheAge()`
