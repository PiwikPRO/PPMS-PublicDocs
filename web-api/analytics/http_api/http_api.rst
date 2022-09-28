.. _custom-reports-http-api:

Reporting
=========

**Before you start**

Here are some things to know before you start working with our API:

* Each API call needs to be authenticated.
* You can use automaticaly generated API call deinition for each report in Piwik PRO. `Read more <https://help.piwik.pro/support/questions/how-can-i-fetch-report-data-using-api/>`_
* When requesting large amount of data, make sure to include an **Accept-Encoding: gzip** header to enable compression.
* All query results are cached for 10 minutes.

.. raw:: html

    <div id='redoc-container'>
    </div>
    <script>
        (function() {
            Redoc.init('../../../_static/api/custom_reports_http_api.json', {}, document.getElementById('redoc-container'), () => {window.prepareRedocMenu ? window.prepareRedocMenu() : setTimeout(()=>{window.prepareRedocMenu()}, 2000)});
        })();
    </script>
