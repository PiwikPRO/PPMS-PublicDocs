Content Security Policy (CSP)
=============================

Introduction
------------

Specifying Content Security Policy is a common way to secure web applications. This mechanism allows specifying which scripts and styles can execute on page. It can be done either by adding a ``Content-Security-Policy`` header or an appropriate meta tag.

You can read about Consent Security Policy here: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP


Content Security Policy configuration
-------------------------------------

It is common to allow only scripts and connections from known domains.


JavaScript Tracking Client
--------------------------

To load all necessary assets for JavaScript Tracking Client to work you need to define source with ``script-src``, ``img-src`` and ``connect-src`` sources:

.. code-block:: javascript

	script-src <your-sources> https://client.piwik.pro/ppms.js;
	img-src <your-sources> https://client.piwik.pro/ppms.php;
	connect-src <your-sources> https://client.piwik.pro/ppms.php;

.. note::

    These paths may require adjusting if you don't use default settings.
    For instance JavaScript library may be loaded as an alternative build that doesn't conflict with Matomo script: ``https://client.piwik.pro/ppas.js``.

Tracking with custom domain
---------------------------

If your tracking domain is custom, then you need to define it in CSP sources:

.. code-block:: javascript

	script-src <your-sources> https://your-custom-domain.com/ppms.js;
	img-src <your-sources> https://your-custom-domain.com/ppms.php;
	connect-src <your-sources> https://your-custom-domain.com/ppms.php;


Allowing Site Inspector extention to work on site
-------------------------------------------------

`Site Inspector <https://chrome.google.com/webstore/detail/piwik-pro-site-inspector/njcnagohlmamfijimejlnelenhahnoce>`_
is a Chrome browser extension that helps visualize analytics data (e.g.
click heat map, scroll map) on tracked pages. Default configuration of
JavaScript Tracking Client will add configuration for this extension (in a page HTML), but it
is possible to disable this behavior if necessary (:ref:`setSiteInspectorSetup<jtc-api-setSiteInspectorSetup>`).

This extension integrates with a page on which it is run so additional CSP rules are needed to allow it's normal functioning:

.. code-block:: javascript

    connect-src <your-sources+necessary-Piwik-PRO-sources> https://client.piwik.pro/api/;
    frame-src <your-sources+necessary-Piwik-PRO-sources> https://client.piwik.pro/site-inspector/;

.. note::

    If you use custom domain for tracking then the domain used in CSP rules should be adjusted accordingly.

Example Content Security Policy definition
------------------------------------------

Following example configuration of CSP assumes:

- client's website address: **client.com**
- client's organization name in Piwik PRO: **client**
- client's domain: **client.piwik.pro**
- client uses default tracking domain: **client.piwik.pro**
- client wants to also allow Site Inspector extention on their site
- configuration allows ``'self'`` source which is: **client.com**

.. code-block:: text

    Content-Security-Policy: default-src 'none';
                             script-src  'self' https://client.piwik.pro/ppms.js;
                             img-src     'self' https://client.piwik.pro/ppms.php;
                             connect-src 'self' https://client.piwik.pro/ppms.php https://client.piwik.pro/api/;
                             frame-src https://client.piwik.pro/site-inspector/;
