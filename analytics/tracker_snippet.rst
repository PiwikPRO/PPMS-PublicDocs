.. highlight:: js
.. default-domain:: js

Installing tracking code via code snippet
=========================================
Installation via snippet should be done only if Tag Manager is not available or you want to track multiple domains /
subdomains.

.. note::
    We highly recommend using template from Tag Manager to set up tracking for Analytics module (including
    customizations).

.. todo::
    Check if Tag Manager allows custom settings for domains and subdomains or not. Sentences in previous paragraph
    and note contradict each other.

.. note::
    Basic configuration will setup single domain configuration. For other options see:
    :ref:`AN-tracker-alternative-configuration`.

This code should be added just before of the ``<head>`` tag. Additionally
snippet has to be configured this way:

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

This code initializes Analytics tracker in following ways:

    #. Initializes global ``_paq.push`` command queue that schedules commands to be run when Analytics tracker library
       is loaded.
    #. Schedules basic configuration of Analytics tracker using ``_paq.push``.
    #. Creates a ``<script>`` tag that asynchronously loads Analytics tracker library.

When loading snippet is added on the page, Analytics tracker will start tracking :term:`user` actions starting with page
view.

.. _AN-tracker-alternative-configuration:

Alternative multi-domain configurations
=======================================

Tracking domains and all subdomains
-----------------------------------
To track all data between domain and all its subdomains we must use cookies configured with this snippet::

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
To setup tracking between multiple domains you must use multiple functions ``setDomains`` to set a list of domains and
``enableCrossDomainLinking`` to enable cross domain linking::

    _paq.push(["setDomains", domains]);

.. describe:: domains

    **Required** ``array`` Domains array, with wildcards

::

    _paq.push(["enableCrossDomainLinking"]);

Tracking subdirectories of domain as separate websites
------------------------------------------------------
To differentiate parts of website as another site you must configure tracker this way::

    _paq.push(["setSiteId", "App1"]);
    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["trackPageView"]);

Later you can change configuration for selected paths and track them as another site::

    _paq.push(["setSiteId", "App2"]);

    _paq.push(["setCookiePath", "/data/something_useful"]);

    _paq.push(["setDomains", "example.com/data/something_useful"]);

    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["trackPageView"]);

That way all actions tracked on ``/data/something_useful`` will be tracked for ``App2`` instead of ``App1``.

If you want to track group of pages as separate site you can use wildcard in ``setDomains`` function.

.. deprecated:: 5.5.1
    Older installations using ``piwik.php`` and ``piwik.js`` filenames are deprecated.

