
=======================
setAnonymizationState()
=======================

The **setAnonymizationState()** method marks a user as anonymous or non-anonymous. An anonymous user has a hidden IP address (Example: 0.0.0.0) and hidden location data (only Country data is available). You also don't collect their user ID and device ID. And each time an application starts, a new visitor ID is created.

The **setAnonymizationState()** method is enabled by default. This means each user is anonymous by default.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          ((PiwikApplication) getApplication()).getTracker().setAnonymizationState(isAnonymous);

    .. group-tab:: Kotlin


Parameters
----------

| **isAnonymous** (boolean, required)
| Weather a user is anonymous or non-anonymous. True: anonymous. False: non-anonymous.

Examples
--------

To mark a visitor as non-anonymous:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          ((PiwikApplication) getApplication()).getTracker().setAnonymizationState(false);

    .. group-tab:: Kotlin

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.customCrossDomainLinkDecorator(function (url, value, name) {
              var parsedUrl = new URL(url);
              parsedUrl.searchParams.append(name, value);
              return parsedUrl.href;
          }]);


Related methods
---------------

* isAnonymizationOn()
