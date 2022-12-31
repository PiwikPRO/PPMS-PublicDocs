.. _android audienceManagerSetProfileAttribute():

=======================================
audienceManagerSetProfileAttribute() 🗑
=======================================

.. deprecated::
    16.0.0 This method is no longer recommended. Audience Manager is no longer available in the latest product version.

The **audienceManagerSetProfileAttribute()** method sets profile attributes for Audience Manager. The attributes can then be sent to Audience Manager with a screen view or any other event. Attributes are all kind of information about the user. They help you build audiences.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .audienceManagerSetProfileAttribute("name", "value")
            .add("name", "value")
            .with(getTracker());

    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .audienceManagerSetProfileAttribute("name", "value")
            .add("name", "value")
            .with(tracker)

Parameters
----------

| **name** (string, required)
| The name of the profile attribute. Example: plan type.

| **value** (string, required)
| The value of the profile attribute. Example: premium.

| **add()** (chain method)
| Other attributes that you want to send with the same event.

Examples
--------

To set the attribute ``plan type`` with the value ``premium`` and send it with ``.with(getTracker())`` to Audience Manager:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .audienceManagerSetProfileAttribute("plan type", "premium")
            .add("", "")
            .with(getTracker());

    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .audienceManagerSetProfileAttribute(("plan type"), "premium")
            .add("", "")
            .with(tracker)

Notes
-----

* Each event always sends the following attributes: Site or app ID, Visitor ID, and Device ID.
* If setAnonymizationState(false) is set and User ID and Email are set, each event will also send User ID and Email.
* You can see all added attributes in Audience Manager > Profile.

Related methods
---------------

* :ref:`android audienceManagerGetProfileAttributes()`
* :ref:`android OnCheckAudienceMembership()`
