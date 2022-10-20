.. _addTracker():

============
addTracker()
============

The **addTracker()** method creates a new tracker's instance with a new tracking endpoint.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          addTracker(trackerUrl, siteId)


Parameters
----------

| **trackerURL** (string, required)
| A tracker URL (tracking endpoint).

| **siteID** (string, required)
| A site or app ID in Piwik PRO where you want to send data. (Where to find it?)

Returns
-------

| A tracker's instance.
| Format: Example:
| Type: object

Examples
--------

To create a new tracker's instance:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["addTracker", "https://example.piwik.pro/ppms.php", "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.setTrackerUrl("https://example.piwik.pro/ppms.php");


Related methods
---------------

* setTrackerUrl()
* getTrackerUrl()
