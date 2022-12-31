.. _android track().goal():

==============
track().goal()
==============

The **track().goal()** method tracks completed goals. You can set any event as a goal on your app. For example, when visitors sign up, buy your product, download a white paper or do something that you find essential for your business.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .goal("goalID")
            .revenue(conversionValue)
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .goal("goalID")
            .revenue(conversionValue)
            .with(tracker)

Parameters
----------

| **goalID** (string , required)
| The ID of the goal to be tracked. (To find a goal ID go to Menu > Analytics > Goals.)

| **conversionValue** (number, optional)
| The value of the goal. It's used to calculate the goal revenue.

Examples
--------

To send a goal with the ID ``27ecc5e3-8ae0-40c3-964b-5bd8ee3da059`` and value ``20``:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .goal("27ecc5e3-8ae0-40c3-964b-5bd8ee3da059")
            .revenue(20)
            .with(tracker);



    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .goal("27ecc5e3-8ae0-40c3-964b-5bd8ee3da059")
            .revenue(20)
            .with(tracker)

Notes
-----

* After you set up a goal in Analytics > Goals > Add a goal, the goal is tracked automatically. The track().goal() method can be used in addition to the automatic method.
* For more on goals, see our `help center article <https://help.piwik.pro/support/reports/goals/>`_.
