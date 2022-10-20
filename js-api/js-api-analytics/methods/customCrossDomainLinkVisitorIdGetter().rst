.. _customCrossDomainLinkVisitorIdGetter():

======================================
customCrossDomainLinkVisitorIdGetter()
======================================

The **customCrossDomainLinkVisitorIdGetter()** method gets a visitor ID from a page URL if customCrossDomainLinkDecorator() was set. The visitor ID is held in a query parameter and passed between domains when they are linked with enableCrossDomainLinking().

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

            customCrossDomainLinkVisitorIdGetter(urlParser)

Parameters
----------

| **urlParser** (function, required)
| Extracts a visitor ID from a page URL.

| **urlParser** (url, name)
| The urlParser() method accepts a URL and name, and returns a visitor ID.

| **url** (string, required)
| A page URL.

| **name** (string, required)
| A parameter name that holds a visitor ID.

Returns
-------

| A visitor ID extracted from a page URL.
| Format: Example: c52b5d0969220761
| Type: string

Example
-------

To do something:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

            _paq.push(["customCrossDomainLinkVisitorIdGetter", function (url, name) {
                return (new URL(url)).searchParams.get(name) || "";
            }]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

            var jstc = Piwik.getTracker(
              "https://example.com/",
              "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
            );
            jstc.customCrossDomainLinkVisitorIdGetter(function (url, name) {
                return (new URL(url)).searchParams.get(name) || "";
            });


Related methods
---------------

* enableCrossDomainLinking()
* disableCrossDomainLinking()
* isCrossDomainLinkingEnabled()
* setCrossDomainLinkingTimeout()
* getCrossDomainLinkingUrlParameter()
* customCrossDomainLinkDecorator()
