.. _android track().sendApplicationDownload():

=================================
track().sendApplicationDownload()
=================================

The **track().sendApplicationDownload()** method records app installations. The event is sent the first time the app is launched, once per installation. If a user installs your app but doesn't run it, the event is not sent.

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

To track the installation of your app:

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
