.. highlight:: php
.. default-domain:: php
.. _data-collection-php_tracking_client:

PHP Tracking Client
===================

With PHP Tracking Client you can track your data using server-to-server communication.

Set up PHP traking client
-------------------------

To setup PHP Tracking Client you have to be familiar with basic of PHP and object oriented programing.

Basic setup consists of client initialization and ordering it to track a page view, and it is a bit similar to tracking with JSTC.

.. code-block:: php
    // Import and set tracking address
    require_once "/path/to/PiwikPhpTracker.php";

    // Initialize tracker object with tracked idSite and tracker URL
    $piwikTracker = new PiwikTracker( $idSite = '4f855ee3-2eda-4f7b-98e8-e34ff5e3ac48', $apiUrl = 'https://piwik.example.org/ppas.php' );

    // Track a page view, PTC will automatically extract current Document URL
    $matomoTracker->doTrackPageView('Page title');

Above code will send a tracking request when the Visitor request for a page with his browser.

PHP Tracking Client API
-----------------------

PTC object methods
^^^^^^^^^^^^^^^^^^


setPageCharset()





