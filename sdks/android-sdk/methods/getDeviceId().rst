.. _android getDeviceId():

=============
getDeviceId()
=============

The **getDeviceId()** method returns a device ID set for a given user.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().getDeviceId();


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.deviceId

Returns
-------

| The unique device ID
| Format: Example: abcd123e-a123-bcFG-d123
| Type: String


Examples
--------

To get a device ID:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().getDeviceId();


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.deviceId

Related methods
---------------

* :ref:`android setTrackDeviceId()`
* :ref:`android setDeviceId()`
