.. _android setDispatchInterval():

=====================
setDispatchInterval()
=====================

The **setDispatchInterval()** method sets a custom dispatch interval time. Tracked events are stored temporarily in the queue and are dispatched in batches. The default dispatch interval time is 30 seconds (3000 milliseconds) – batches are sent every 30 seconds.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDispatchInterval(milliseconds)


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.dispatchInterval = milliseconds

Parameters
----------

| **milliseconds** (number, required)
| The interval time (in milliseconds) for dispatching tracked events. If 0 milliseconds, events will be sent right away. If -1 milliseconds, events won't be sent automatically, and you'll be able to send them manually.

Examples
--------

To set the dispatch interval time to 60 seconds (60*1000 milliseconds):

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDispatchInterval(60 * 1000)


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.dispatchInterval = 60 * 1000

To block sending events automatically and send it manually:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((MyApplication) getApplication()).getTracker();
          tracker.setDispatchInterval(-1);
          // Catch and track exception
          try {
            cartItems = getCartItems();
          } catch (Exception e) {
            TrackHelper.track().exception(e).description(e.getMessage());
            tracker.dispatch();
            cartItems = null;
          }



    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).getTracker()
          tracker.dispatchInterval = -1
          // Catch and track exception
          try {
            cartItems = tracker.getCartItems()
          } catch (e: java.lang.Exception) {
            TrackHelper.track().exception(e).description(e.message)
            tracker.dispatch()
            cartItems = null
          }

Notes
-----

* If there's more than one event in the queue, data is sent in bulk using the POST method with the JSON payload.
