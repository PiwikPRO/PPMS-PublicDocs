.. _android track().screens():

=================
track().screens()
=================

The **track().screens()** method automatically records screen views on your mobile app. It automatically uses the activity stack as a path and activity name as a title.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .screens(getApplication())
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .screens(getApplication())
            .with(tracker)

Examples
--------

To automatically record screen views:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .screens(getApplication())
            .with(tracker);



    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .screens(getApplication())
            .with(tracker)

Related methods
---------------

* :ref:`android track().screen()`
