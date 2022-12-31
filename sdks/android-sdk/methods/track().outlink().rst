.. _android track().outlink():

=================
track().outlink()
=================

The **track().outlink()** method records clicks on links to external websites or apps (different domain).

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .outlink("outlink")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .outlink("outlink")
            .with(tracker)

Parameters
----------

| **outlink** (string, required)
| The outlink. Example: ``https://example.com``.

Examples
--------

To track an outlink to ``https://example.com``:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .outlink("https://example.com")
            .with(tracker);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .outlink("https://example.com")
            .with(tracker)
