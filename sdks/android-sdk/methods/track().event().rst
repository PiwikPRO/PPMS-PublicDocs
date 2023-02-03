.. _android track().event():

===============
track().event()
===============

The **track().event()** method records actions performed by users on your mobile app – like button presses, gestures or voice commands.

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
| The category of the tracked event. You can define event categories based on actions (clicks, gestures, voice commands) or features (play, pause, fast forward).

| **action** (string, required)
| The action of the tracked event. Example: A category could be user clicks, an action could be a button click.

| **name** (string, optional)
| The name of the tracked event. For example, if you have multiple button controls on the screen, you can use the name to record the specific ID of the button that was clicked.

| **value** (float, optional)
| The value you want to assign to the tracked event. For example, if you're tracking “Buy” button presses, you can record the number of purchased items or the total cost.

| **path** (string, optional)
| The URL path set for this event.

Examples
--------

To send a custom event when a user clicks a sign-up button on ``/main/sign-up'' and assign the value ``100'' to the event:

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
