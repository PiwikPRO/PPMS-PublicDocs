Installation
------------
Consent Manager is fully integrated with Tag Manager. If you have already installed asynchronous snippet and you are using API only from Tag Manager tags, you are able use JavaScript API without any pitfalls.

The one thing that should be considered before using API is where you call commands. Lets assume that your goal is to perform API method outside Tag Manager tags like in example below:

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8">
        <title></title>
    </head>

    <!-- Start Piwik PRO Tag Manager code -->
    <script>
        // Tag Manager async code snippet
    </script>
    <!-- End Piwik PRO Tag Manager code -->

    <script>
        // API call outside Tag Manager injected manually
        ppms.cm.api(command, ...args);
    </script>

    <body>
        Rest content of document
    </body>

    </html>

When you need to execute API in such manner, you should take care about Tag Manager snippet version.
Because :func:`ppms.cm.api` global object is initialized in snippet and/or in Tag Manager container, if you are using old version of Tag Manager snippet (PPMS version < 6.2), :func:`ppms.cm.api` might be undefined until container will be loaded.
If you want to use your own scripts outside Tag Manager, you need to update the snippet to use :func:`ppms.cm.api`, or use :func:`dataLayer.push` interface if replacing snippet is not possible:

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8">
        <title></title>
    </head>

    <!-- Start Piwik PRO Tag Manager code -->
    <script>
        // Tag Manager async code snippet
    </script>
    <!-- End Piwik PRO Tag Manager code -->

    <script>
        // API call outside Tag Manager injected manually
        dataLayer.push({event: command, ...args});
    </script>

    <body>
        Rest content of document
    </body>

    </html>
