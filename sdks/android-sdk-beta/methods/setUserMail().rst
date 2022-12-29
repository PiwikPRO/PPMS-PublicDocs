.. _android setUserMail():

================
setUserMail() 🗑
================

.. deprecated::
    16.0.0 This method is no longer recommended. Audience Manager is no longer available in the latest product version.

The **setUserMail()** method sets a user email. The email can then be sent to Audience Manager with a screen view or any other event. The email enriches the user profile in Audience Manager and helps to recognize events belonging to the same user (only in the user profile in Audience Manager, but not in Analytics).

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setUserMail("userEmail");


    .. group-tab:: Kotlin

        .. code-block:: javascript

          getTracker().setUserMail("userEmail");

Parameters
----------

| **userEmail** (string, required)
| The user's email address.

Examples
--------

To set and user's email address and send it to Audience Manager with a screen view:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setUserMail("john.doe@example.com");
          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker);

    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.userMail = "john.doe@example.com"
          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker);

Notes
-----

* The user's email address is only used by Audience Manager. It is visible in Audience Manager > Profiles.
* The user's email address won't be sent if setAnonymizationState(true) is set.
