.. highlight:: js
.. default-domain:: js

.. _data-collection-javascript-tracking-client-installation:

Installation
============

.. _jtc-installation-installing-tracking-code-via-node-snippet:

Installing tracking code via code snippet
-----------------------------------------

Installation via snippet should only be carried out if the Tag Manager is not available or when options of "Piwik PRO Analytics template" do not let you configure your use case.

.. note::
    We highly recommend using the template from the Tag Manager to set up tracking for the Analytics module (including
    customizations).

.. note::
    Basic configuration will setup a single domain configuration. For other options, see:
    :ref:`jtc-installation-alternative-configurations`.

.. _jtc-installation-jsts-example:

This code should be added in the head section of the page just before the closing ``</head>`` tag.
Additionally, the snippet must be configured in the following way:

    * String ``XXX-XXX-XXX-XXX-XXX`` should be replaced with :term:`app ID` (e.g.
      ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    * String ``https://your-instance-name.piwik.pro/`` should be replaced with your PPAS instance address.

.. code-block:: html

    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u="https://your-instance-name.piwik.pro/";
        _paq.push(["setTrackerUrl", u+"ppms.php"]);
        _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);
        var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
        g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"ppms.js"; s.parentNode.insertBefore(g,s);
      })();
    </script>

This code initializes the JavaScript Tracking Client in following ways:

    #. Initializes the global ``_paq`` command queue that schedules commands to be run when the JavaScript Tracking Client library
       is loaded.
    #. Schedules basic configuration of JavaScript Tracking Client using ``_paq.push``.
    #. Creates a ``<script>`` tag that asynchronously loads the JavaScript Tracking Client library.

When loading, the snippet is added on the page. The JavaScript Tracking Client will start tracking :term:`visitor` actions starting with page
view.

.. _jtc-installation-alternative-configurations:

Alternative configurations
--------------------------

Tracking domains and all subdomains
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To track all data between domain and all its subdomains, we must use cookies configured with the following snippet::

    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);

    // Share the tracking cookie across example.com, www.example.com, subdomain.example.com, ...
    _paq.push(["setCookieDomain", "*.example.com"]);

    // Tell Piwik the website domain so that clicks on these domains are not tracked as "Outlinks"
    _paq.push(["setDomains", "*.example.com"]);

    _paq.push(["trackPageView"]);

Tracking multiple domains as one site
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To set up tracking between multiple domains, you must use multiple functions: :ref:`setDomains<jtc-api-setDomains>` to set a list of domains and
:ref:`enableCrossDomainLinking<jtc-api-enableCrossDomainLinking>` to enable cross domain linking::

    // specify which domains should be linked
    _paq.push(["setDomains", ["*.example.com", "otherdomain.com"]]);

    // enable cross domains linking
    _paq.push(["enableCrossDomainLinking"]);

.. note::

  For cross-domain linking to work, you have to enable link tracking using :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` function. Remember that links added dynamically to the HTML document won't be tracked unless you call :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` again. You can learn more about tracking dynamically added links :ref:`here<guide_tracking_link_clicks_on_pages_with_dynamically_generated_content>`.

Tracking subdirectories of domain as separate websites
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To differentiate parts of a website as another site, you must configure JavaScript Tracking Client this way::

    _paq.push(["setSiteId", "App1"]);
    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["trackPageView"]);

Afterwards, you can change configuration for selected paths and track them as another site::

    _paq.push(["setSiteId", "App2"]);

    _paq.push(["setCookiePath", "/data/something_useful"]);

    _paq.push(["setDomains", "example.com/data/something_useful"]);

    _paq.push(["setTrackerUrl", u+"ppms.php"]);
    _paq.push(["trackPageView"]);

This way, all actions tracked on ``/data/something_useful`` will be tracked for ``App2`` instead of ``App1``.

If you wish to track a group of pages as separate site, you can use the wildcard in the :ref:`setDomains<jtc-api-setDomains>` function.

Collecting page performance metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To set up page performance metrics gathering use the :ref:`setTimingDataSamplingOnPageLoad<jtc-api-setTimingDataSamplingOnPageLoad>` function::

    // measure performance on 33% of page loads
    _paq.push(["setTimingDataSamplingOnPageLoad", 33]);

    // track page view and potentially measure page performance
    _paq.push(["trackPageView"]);
