.. _android setDeviceId():

=============
setDeviceId()
=============

The **setDeviceId()** method sets a custom device ID.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDeviceId(deviceID)


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.deviceId = deviceID

Parameters
----------

| **deviceID** (string, optional)
| A custom device ID. If the value is not set, the automatic value is generated.

Examples
--------

To set a device ID to ``ABC123``:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDeviceId(ABC123)


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.deviceId = ABC123

Notes
-----

* The device ID won't be sent if setAnonymizationState(true) is set.


Related methods
---------------

* :ref:`android setTrackDeviceId()`
* :ref:`android getDeviceId()`
