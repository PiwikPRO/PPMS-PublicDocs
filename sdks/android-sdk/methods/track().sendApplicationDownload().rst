.. _android track().sendApplicationDownload():

=================================
track().sendApplicationDownload()
=================================

The **track().sendApplicationDownload()** method records app installs. The event is sent during the first app launch, once per install. If a user installs your app but doesn't run it, the event won't be sent.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .sendApplicationDownload()
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .sendApplicationDownload()
            .with(tracker)

Example
-------

To track your app install:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .sendApplicationDownload()
            .with(tracker);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .sendApplicationDownload()
            .with(tracker)
