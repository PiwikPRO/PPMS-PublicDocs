.. _tracking-api-http:

HTTP API
========
Tracking HTTP API allows sending to analytics information about Visitors page views, events and visits.

.. deprecated:: 5.5.1
    Endpoint ``/piwik.php`` is moved to ``/ppms.php``. The old endpoint still works, but its support will be disabled at
    some point.

.. raw:: html

    <div id='redoc-container'>
    </div>
    <script>
        (function() {
            Redoc.init('../_static/api/tracker_tracking_api.json', {}, document.getElementById('redoc-container'), () => {window.prepareRedocMenu()});
        })();
    </script>
