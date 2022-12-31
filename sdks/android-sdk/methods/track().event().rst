.. _android track().event():

===============
track().event()
===============

The **track().event()** method records actions users perform on your mobile app – like button presses, gestures or voice commands.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .event("category", "action")
            .path("path")
            .name("name")
            .value(value)
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .event("category", "action")
            .path("path")
            .name("name")
            .value(value)
            .with(tracker)

Parameters
----------

| **category** (string, required)
| The category of the event you're tracking. You can define event categories based on actions (clicks, gestures, voice commands, and the like) or features (play, pause, fast forward, and the like).

| **action** (string, required)
| The action of the event you're tracking. Example: A category can be user clicks, an action can be a button click.

| **name** (string, optional)
| The name of the event you're tracking. For example, if you have multiple button controls on a screen, you can use the name to record a specific view control identifier that was clicked.

| **value** (float, optional)
| The value you want to assign to the event you're tracking. For example, if you're tracking “Buy” button presses, you can record the number of purchased items or the total cost.

| **path** (string, optional)
| A URL path set for this event.

Examples
--------

To send a custom event when a user clicks on a signup button on ``/main/signup`` and assign ``100`` value to it:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .event("Clicks", "Button")
            .path("/main/signup")
            .name("Sign up")
            .value(100)
            .with(tracker);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .event("Clicks", "Button")
            .path("/main/signup")
            .name("Sign up")
            .value(100)
            .with(tracker)

Notes
-----

* For more on custom events, `see this article <https://help.piwik.pro/support/getting-started/custom-event/>`_.
