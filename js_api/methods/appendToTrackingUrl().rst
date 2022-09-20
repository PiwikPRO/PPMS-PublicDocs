.. _appendToTrackingUrl():

=====================
appendToTrackingUrl()
=====================

The **appendToTrackingUrl()** method adds a query string to the tracking request.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          appendToTrackingUrl(appendToUrl)

Parameters
----------

| **appendToUrl** (string, required)
| A custom query string that'll be attached to each tracking request. Parameter names and values need to be URL encoded. Example: lat=140&long=100

Examples
--------

To add lat=140&long=100 parameter to each request:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["appendToTrackingUrl", "lat=140&long=100"]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.appendToTrackingUrl("lat=140&long=100");
