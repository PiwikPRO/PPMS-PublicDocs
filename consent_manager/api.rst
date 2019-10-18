.. highlight:: js
.. default-domain:: js

JavaScript API
==============

Introduction
------------------------

Consent Manager provide JavaScript API that allows the user to:

    * get consent types
    * get new consent types
    * get consent settings
    * set consent settings
    * send data subject request

JavaScript API is implemented by providing global JavaScript objects queue responsible for executing command:

.. function:: ppms.cm.api(command, ...args)
.. function:: dataLayer.push({event: command, ...args})

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

    :param string command: Command name.
    :param args: Command arguments. The number of arguments and their function depend on command.
    :returns: Commands are expected to be run asynchronously and return no value.
    :rtype: undefined

Installation
------------------------

Consent Manager is fully integrated with Tag Manager. If you have already installed asynchronous snippet and you are using API only from Tag Manager tags, you are able use JavaScript API without aby pitfalls.

Only one thing should be considered before using API is where you call commands. If your goal is to perform API method outside Tag Manager tags like in below example:

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

When you need execute API in such manner, you should take care about Tag Manager snippet version.
Because `ppms.cm.api` global object is initialized in snippet and/or in Tag Manager container, if you are using old version of Tag Manager snippet (PPAS version > 6.2), `ppms.cm.api` might be undefined until container will be loaded.
So if you want use own scripts outside Tag Manager, you need update snippet to use `ppms.cm.api`, or use `dataLayer` interface if replacing snippet is not possible:

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


Commands
--------
All commands work in context of the current visitor and website. Additionally they sometimes require communication with a PPAS server and are asynchronous. Callback functions are used to provide response value or information about errors. `onSuccess(...args)` callback is always required. `onFailure(exception)` callback is optional and if is specified, any error object occurred will be passed as a argument. If not specified, error is reported directly on console output.

Get consent types
`````````````````````````````````````
Fetches a list of consent types.

Code::

    ppms.cm.api('getComplianceTypes', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getComplianceTypes', parameters: [onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. function:: onFulfilled(types)

    **required** The fulfilment handler callback (called with result).

    :param Array<string> types: **Required** Array of consent types

        Example::

            ["remarketing", "analytics"]

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Get new consent types
`````````````````````````````````````
Fetches a list of new consent types which were appearing after given consents.

Code::

    ppms.cm.api('getNewComplianceTypes', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getNewComplianceTypes', parameters: [onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. function:: onFulfilled(types)

    **required** The fulfilment handler callback (called with result).

    :param Array<string> types: **Required** Array of consent types

        Example::

            ["remarketing", "analytics"]

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.


Set initial compliance settings
`````````````````````````````````````
Sets initial compliance settings.
This API command might be useful to note that user has seen a popup with consents but didn't make a decision (popup was closed).
After successful, Consent Manager internally sends only to stats endpoint an information that user has seen consents.
Result from getNewComplianceTypes method can be passed directly.

Code::

    ppms.cm.api('setInitialComplianceSettings', settings, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:setInitialComplianceSettings', parameters: [settings, onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. object:: settings

    **required** The consent settings object.

        Example::

            {consents: ['analytics']}

        or

        Example::

            ['analytics']

.. function:: onFulfilled()

     **required** The fulfilment handler callback. This function is **required**.

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Set compliance settings
`````````````````````````````````````
Set compliance settings base on user decision.
This API command might be useful when user interact with custom, extended UI that reacts on user approve/reject action.
After successful, Consent Manager internally send consent settings to tracking server and force page view on tags.
Additionally information to statistics is sent about user decisions.

Code::

    ppms.cm.api('setComplianceSettings', settings, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:setComplianceSettings', parameters: [settings, onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. object:: settings

    **required** The consent settings object.

        Example::

            {consents: {analytics: {status: -1}}}

    Where `consent.analytics` is consent type and status indicate:

    * `0` - user has rejected the consent
    * `1` - user has approved the consent

.. function:: onFulfilled()

     **required** The fulfilment handler callback. This function is **required**.

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Get compliance settings
`````````````````````````````````````
Return current privacy settings. Might be useful for initializing custom decision view.
When there is no decisions, just returns empty object. This state can be used to detect first time user interaction with consent mechanism.

Code::

    ppms.cm.api('getComplianceSettings', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getComplianceSettings', parameters: [onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. object:: settings

     **required** The consent settings object.

        Example::

            {consents: {analytics: {status: -1, updatedAt: '2018-07-03T12:18:19.957Z'}}}

    Where `consent.analytics` is consent type and status indicate:

    * `-1` - user has not interacted, e.g. has closed a consent popup without any decision
    * `0` - user reject consent
    * `1` - user approve consent

.. function:: onFulfilled(settings)

    **required** The fulfilment handler callback (called with result).

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Send data request
`````````````````````````````````````
Command send data subject request to Consent Manager collector.

Code::

    ppms.cm.api('sendDataRequest', request, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:sendDataRequest', parameters: [request, onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. object:: request

    **required** The subject data request.

        Example::

            {content: '', email: '', type: 'change_data|view_data|delete_data'}

.. function:: onFulfilled()

    **required** The fulfilment handler callback.

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Send initial stats
`````````````````````````````````````
Command sends initial stats (no decision) to Consent Manager stats collector.

Code::

    ppms.cm.api('sendInitialStats', consentTypes, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:sendInitialStats', parameters: [consentTypes, onFulfilled, onRejected]});

`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend ```ppms.cm.api```.

.. object:: consentTypes

    **required** The types of consents.

        Example::

            ["remarketing", "analytics"]

.. function:: onFulfilled()

    **required** The fulfilment handler callback.

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Example usage
-------------
Based on above listed commands there are many possibilities to implement custom consent gathering. Below is listed a simple implementation using jQuery library.

.. literalinclude:: examples/api_full_example.html
    :language: html
