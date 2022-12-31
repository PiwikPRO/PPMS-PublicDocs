.. _android track().screen():

================
track().screen()
================

The **track().screen()** method records a screen view on your mobile app. A screen view is similar to a page view on a website.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .screen("path")
            .title("title")
            .with(tracker);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .screen("path")
            .title("title")
            .with(tracker)

Parameters
----------

| **path** (string, required)
| A path set for your screen. Example: ``example/welcome``. A path is automatically translated to a URL and it gets a prefix ``screen`` (if tracker.setPrefixing(true) is set).

| Note: Set the current instance of Android ``Activity`` class instead of the path if you want to use the activity stack. It'll then automatically set the activity stack as a path and activity title as a title.

| **title** (string, optional)
| A title set for your screen. Example: Welcome.

Examples
--------

To send a screen view with a path ``example/welcome`` and title ``Welcome``:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          public class activityClass extends Activity {
          @Override
          public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
            TrackHelper.track()
              .screen("example/welcome")
              .title("Welcome")
              .with(tracker);
            }
          }

    .. group-tab:: Kotlin

        .. code-block:: javascript

          public class activityClass : Activity() {
            override fun onCreate(savedInstanceState: Bundle?) {
              super.onCreate(savedInstanceState)
              val tracker: Tracker = (application as PiwikApplication).tracker
              TrackHelper.track()
                .screen("example/welcome")
                .title("Welcome")
                .with(tracker)
            }
          }

To send a screen view and automatically use the activity stack as a path and activity name as a title if our activity class is activityClass:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          public class activityClass extends Activity {
          …
          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track().screen(activityClass).with(tracker);
          …
          }


    .. group-tab:: Kotlin

        .. code-block:: javascript

          public class activityClass  : Activity() {
          …
          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track().screen(activityClass).with(tracker)
          …
          }

Related methods
---------------

* :ref:`android track().screens()`
