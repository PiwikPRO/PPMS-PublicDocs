.. _customCrossDomainLinkDecorator():

================================
customCrossDomainLinkDecorator()
================================

The **customCrossDomainLinkDecorator()** method sets a custom query parameter that holds a visitor ID when domains are linked. The default parameter is ``pk_vid``.

This method works when you use enableCrossDomainLinking().


Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          customCrossDomainLinkDecorator(urlDecorator)


Parameters
----------

| **urlDecorator** (function, required)
| Defines parameters that are used to hold a visitor ID when domains are linked.

| **urlDecorator** (url, value, name)
| The urlDecorator() method accepts a URL, value and name, and returns a decorated URL.

| **url** (string, required)
| A page URL.

| **value** (string, required)
| The visitor ID that should be passed via the URL.

| **name** (string, required)
| The name of the visitor ID used in Piwik PRO. It can be customized.

Returns
-------

| A decorated URL or null.
| Format: Example: \https://example.com?pk_vid=36
| Type: string | null

Examples
--------

To xxxxxxxxxxx:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["customCrossDomainLinkDecorator", function (url, value, name) {
              var parsedUrl = new URL(url);
              parsedUrl.searchParams.append(name, value);
              return parsedUrl.href;
          }]);

    .. group-tab:: JS (direct)

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

* enableCrossDomainLinking()
* disableCrossDomainLinking()
* isCrossDomainLinkingEnabled()
* setCrossDomainLinkingTimeout()
* getCrossDomainLinkingUrlParameter()
* customCrossDomainLinkVisitorIdGetter()
