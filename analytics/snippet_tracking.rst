:orphan:

.. highlight:: js
.. default-domain:: js
.. _analytics-snippet:

Setting up snippet to track data
================================


Installing tracking code via code snippet.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Installation via snippet should be done only if Tag Manager is not available or you want to track multiple domains / subdomains.

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. Additionally
snippet has to be configured this way:

    * String ``XXX-XXX-XXX-XXX-XXX`` should be replaces with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    * String ``ppms.example.com`` should be replaced with your PPMS domain name.


.. code-block:: html

    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u="//ppms.example.com/";
        _paq.push(["setTrackerUrl", u+"piwik.php"]);
        _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);
        var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
        g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
      })();
    </script>

Tracking domains and subdomains
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. note::

    We highly recommend using template from Tag Manager to set up tracking for Analytics module (including customizations).


Tracking single domain
``````````````````````
To track single domain name without tracking subdomains (or single subdomain) use default snippet code

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. Additionally
snippet has to be configured this way:

    * String ``XXX-XXX-XXX-XXX-XXX`` should be replaces with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    * String ``ppms.example.com`` should be replaced with your PPMS domain name.

.. code-block:: html

    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u="//ppms.example.com/";
        _paq.push(["setTrackerUrl", u+"piwik.php"]);
        _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);
        var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
        g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
      })();
    </script>

Tracking domains and all subdomains of the website
``````````````````````````````````````````````````
To track all data between domain and all its subdomains we must use cookies using this snippet::

    _paq.push(["setSiteId", 1]);
    _paq.push(["setTrackerUrl", u+"piwik.php"]);

    // Share the tracking cookie across example.com, www.example.com, subdomain.example.com, ...
    _paq.push(["setCookieDomain", "*.example.com"]);

    // Tell Piwik the website domain so that clicks on these domains are not tracked as "Outlinks"
    _paq.push(["setDomains", "*.example.com"]);

    _paq.push(["trackPageView"]);

Tracking between multiple domains
`````````````````````````````````
To setup tracking between multiple domains you must use multiple functions ``setDomains`` to set a list of domains and
``enableCrossDomainLinking`` to enable cross domain linking::

    _paq.push(["setDomains", domains]);

.. describe:: domains

    **Required** ``array`` Domains array, with wildcards

::

    _paq.push(["enableCrossDomainLinking"]);

Tracking subdirectories of domain in separate websites.
```````````````````````````````````````````````````````
To differentiate parts of website as another site for tracker user must do::

    _paq.push(["setSiteId", "IDSITE1"]);
    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["trackPageView"]);

And on part that user wants to exclude as another site::

    _paq.push(["setSiteId", "IDSITE2"]);

    _paq.push(["setCookiePath", "/data/something_useful"]);

    _paq.push(["setDomains", "example.com/data/something_useful"]);

    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["trackPageView"]);

That way all things tracked on ``/data/something_useful`` will be tracked as site ``IDSITE2``

If you want to track group of pages as separate site you can use wildcard in ``setDomains`` function.

