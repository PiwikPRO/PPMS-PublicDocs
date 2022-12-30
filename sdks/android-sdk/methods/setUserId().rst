.. _android setUserId():

===========
setUserId()
===========

The **setUserId()** method sets a user ID for a user. It can be the same user ID as in your CMS, CRM or sales system. The user ID helps to identify a visitor across devices.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setUserId("userId");


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.userId = "userId"

Parameters
----------

| **userId** (string, required)
| A non-empty unique ID of a user. Example: customer ID. It needs to be unique for each user. Can be up to 1024 bytes (1024 ASCII characters).

Examples
--------

To set a user ID as ``ABC123`` and send it with a screen view:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setUserId("ABC123");
          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.userId = "ABC123"
          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker);

Notes
-----

* The user ID won't be sent if setAnonymizationState(true) is set.
* For more on user ID, `see this article <https://help.piwik.pro/support/getting-started/userid/>`_.
