.. _android setTrackDeviceId():

==================
setTrackDeviceId()
==================

The **setTrackDeviceId()** method turns on or off fetching the device ID from the tracker instance. The device ID is the `advertising ID (AAID) assigned by Google <https://support.google.com/googleplay/android-developer/answer/6048248?hl=en>`_.

By default, setTrackDeviceId(true) is set.


Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setTrackDeviceId(isFetched);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isTrackDeviceId = isFetched

Parameters
----------

| **isFetched** (boolean, required)
| Weather a user ID is fetched automatically from the tracker instance. A user ID is the advertising ID (AAID) assigned by Google.  True: is fetched. False: is not fetched.

Examples
--------

To turn off fetching a device ID from the tracker instance:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setTrackDeviceId(false);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isTrackDeviceId = false

Notes
-----

* The device ID won't be sent if setAnonymizationState(true) is set.
* If your app uses the device ID (AAID) and you plan to send your app to the Google Play, you need to ask each user for permission to share their data.

Related methods
---------------

* :ref:`android setDeviceId()`
* :ref:`android getDeviceId()`
