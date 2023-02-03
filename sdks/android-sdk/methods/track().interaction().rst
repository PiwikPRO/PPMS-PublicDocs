.. _android track().interaction():

=====================
track().interaction()
=====================

The **track().interaction()** method tracks the interactions with a content block and passes data about the content name, piece and target.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .impression("contentName", "contentInteraction ")
            .piece("contentPiece")
            .target("contentTarget")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .impression("contentName", "contentInteraction ")
            .piece("contentPiece")
            .target("contentTarget")
            .with(tracker)

Parameters
----------

| **contentName** (string, required)
| The name of the tracked content block.

| **contentInteraction** (string, required)
| The type of interaction with the tracked content block. Example: click.

| **contentPiece** (string, required)
| The piece of the tracked content block. Example: a creative, banner, or video.

| **contentTarget** (string, required)
| The target of the tracked content block. Example: a link in the content block.

Examples
--------

To track the interaction with a content block on your mobile app:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .impression("gravel bikes collection", "click")
            .piece("banner")
            .target("https://example.com/bikes/")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .impression("gravel bikes collection", "click")
            .piece("banner")
            .target("https://example.com/bikes/")
            .with(tracker)

Notes
-----

* To track interactions with content, this option needs to be turned on: Menu > Tag Manager > Tags > Piwik PRO (tracking code) > Data collection > Interactions with popups and content (on). `Read more <https://help.piwik.pro/support/questions/set-up-content-tracking/>`_
* Tracked interactions will be visible in Analytics > Reports > Content performance.


Related methods
---------------

* :ref:`android track().impression()`
