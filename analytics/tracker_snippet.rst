.. highlight:: js
.. default-domain:: js

Installing tracking code via code snippet
=========================================
Installation via snippet should only be carried out if the Tag Manager is not available or when options of "Piwik PRO Analytics template" do not let you configure your use case.

.. note::
    We highly recommend using the template from the Tag Manager to set up tracking for the Analytics module (including
    customizations).

.. note::
    Basic configuration will setup a single domain configuration. For other options, see:
    :ref:`AN-tracker-alternative-configuration`.

This code should be added in the head section of the page just before the closing ``</head>`` tag.
Additionally, the snippet must be configured in the following way:

    * String ``XXX-XXX-XXX-XXX-XXX`` should be replaced with :term:`app ID` (e.g.
      ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    * String ``ppms.example.com`` should be replaced with your PPMS domain name.

.. code-block:: html

    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u="//ppms.example.com/";
        _paq.push(["setTrackerUrl", u+"ppms.php"]);
        _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);
        var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
        g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"ppms.js"; s.parentNode.insertBefore(g,s);
      })();
    </script>

.. deprecated:: 5.5.1
     Older installations using ``piwik.php`` and ``piwik.js`` filenames are deprecated.

This code initializes the Analytics tracker in following ways:

    #. Initializes the global ``_paq.push`` command queue that schedules commands to be run when the Analytics tracker library
       is loaded.
    #. Schedules basic configuration of Analytics tracker using ``_paq.push``.
    #. Creates a ``<script>`` tag that asynchronously loads the Analytics tracker library.

When loading, the snippet is added on the page. The Analytics tracker will start tracking :term:`user` actions starting with page
view.

.. _AN-tracker-alternative-configuration:

Alternative multi-domain configurations
=======================================

Tracking domains and all subdomains
-----------------------------------
To track all data between domain and all its subdomains, we must use cookies configured with the following snippet::

    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);

    // Share the tracking cookie across example.com, www.example.com, subdomain.example.com, ...
    _paq.push(["setCookieDomain", "*.example.com"]);

    // Tell Piwik the website domain so that clicks on these domains are not tracked as "Outlinks"
    _paq.push(["setDomains", "*.example.com"]);

    _paq.push(["trackPageView"]);

.. deprecated:: 5.5.1
    Older installations using ``piwik.php`` and ``piwik.js`` filenames are deprecated.


Tracking multiple domains as one site
-------------------------------------
To set up tracking between multiple domains, you must use multiple functions ``setDomains`` to set a list of domains and
``enableCrossDomainLinking`` to enable cross domain linking::

    _paq.push(["setDomains", domains]);

.. describe:: domains

    **Required** ``array`` Domains array, with wildcards

::

    _paq.push(["enableCrossDomainLinking"]);

Tracking subdirectories of domain as separate websites
------------------------------------------------------
To differentiate parts of a website as another site, you must configure tracker this way::

    _paq.push(["setSiteId", "App1"]);
    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["trackPageView"]);

Afterwards, you can change configuration for selected paths and track them as another site::

    _paq.push(["setSiteId", "App2"]);

    _paq.push(["setCookiePath", "/data/something_useful"]);

    _paq.push(["setDomains", "example.com/data/something_useful"]);

    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["trackPageView"]);

In this way, all actions tracked on ``/data/something_useful`` will be tracked for ``App2`` instead of ``App1``.

If you wish to track a group of pages as separate site, you can use the wildcard in the ``setDomains`` function.

.. deprecated:: 5.5.1
    Older installations using ``piwik.php`` and ``piwik.js`` filenames are deprecated.



Navigation timing page performance metrics
-------------------------------------
To set up page performance metrics gathering use the
``setTimingDataSamplingOnPageLoad`` function::

    _paq.push(["setTimingDataSamplingOnPageLoad", updateTimingDataOnPageLoadSampling]);

.. describe:: updateTimingDataOnPageLoadSampling

    **Required** ``integer`` Value between 1 and 100 describing the percentage for data sampling

::

    _paq.push(["setTimingDataSamplingOnPageLoad", 33]);