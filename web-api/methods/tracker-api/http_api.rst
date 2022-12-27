.. _data-collection-tracking-api-http:

Tracking HTTP API
=================

Tracking HTTP API collects events such as page views, custom events and content impressions. The data sent to this API will be processed and eventually appear in Analytics reports.

.. warning::

    All query parameter values inserted into URL must be URL encoded. For example, ``action_name`` parameter with value ``#1 Coffee & Cookies`` should become ``action_name=%231%20Coffee%20%26%20Cookies`` in the URL. Requests with unencoded parameter values can create malformed events or be rejected completely.

.. raw:: html

    <div id='redoc-container'>
    </div>
    <script>
        (function() {
            Redoc.init('../../_static/api/tracker_tracking_api.json', {}, document.getElementById('redoc-container'), () => {window.prepareRedocMenu ? window.prepareRedocMenu() : setTimeout(()=>{window.prepareRedocMenu()}, 2000)});
        })();
    </script>
