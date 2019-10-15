Commands
--------
All commands work in context of the current visitor and website. Additionally they sometimes require communication with a PPAS server and are asynchronous. Callback functions are used to provide response value or information about errors. ``onSuccess(...args)`` callback is always required. ``onFailure(exception)`` callback is optional and if is specified, any error object occurred will be passed as a argument. If not specified, error is reported directly on console output.

Get compliance types
````````````````````
Fetches a list of consent types.

Code::

    ppms.cm.api('getComplianceTypes', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getComplianceTypes', parameters: [onFulfilled, onRejected]});

:func:`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend :func:`ppms.cm.api`.

.. function:: onFulfilled(types)

    **required** The fulfilment handler callback (called with result).

    :param Array<string> types: **Required** Array of consent types

        Example::

            ["remarketing", "analytics"]

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Get new compliance types
````````````````````````
Fetches a list of new consent types which were appearing after given consents.

Code::

    ppms.cm.api('getNewComplianceTypes', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getNewComplianceTypes', parameters: [onFulfilled, onRejected]});

:func:`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend :func:`ppms.cm.api`.

.. function:: onFulfilled(types)

    **required** The fulfilment handler callback (called with result).

    :param Array<string> types: **Required** Array of consent types

        Example::

            ["remarketing", "analytics"]

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception.


Set initial compliance settings
```````````````````````````````
Sets initial compliance settings.
This API command might be useful to note that user has seen a popup with consents but didn't make a decision (popup was closed).
After successful, Consent Manager internally sends only to stats endpoint an information that user has seen consents.
Result from getNewComplianceTypes method can be passed directly.

Code::

    ppms.cm.api('setInitialComplianceSettings', settings, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:setInitialComplianceSettings', parameters: [settings, onFulfilled, onRejected]});

:func:`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend :func:`ppms.cm.api`.

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
```````````````````````
Set compliance settings base on user decision.
This API command might be useful when user interact with custom, extended UI that reacts on user approve/reject action.
After successful, Consent Manager internally send consent settings to tracking server and force page view on tags.
Additionally information to statistics is sent about user decisions.

Code::

    ppms.cm.api('setComplianceSettings', settings, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:setComplianceSettings', parameters: [settings, onFulfilled, onRejected]});

:func:`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend :func:`ppms.cm.api`.

.. object:: settings

    **required** The consent settings object.

        Example::

            {consents: {analytics: {status: 1}}}

    Where ``consent.analytics`` is consent type and status indicate:

    * ``0`` - user has rejected the consent
    * ``1`` - user has approved the consent

.. function:: onFulfilled()

     **required** The fulfilment handler callback. This function is **required**.

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Get compliance settings
```````````````````````
Return current privacy settings. Might be useful for initializing custom decision view.
When there is no decisions, just returns empty object. This state can be used to detect first time user interaction with consent mechanism.

Code::

    ppms.cm.api('getComplianceSettings', onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:getComplianceSettings', parameters: [onFulfilled, onRejected]});

:func:`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend :func:`ppms.cm.api`.

.. object:: settings

     **required** The consent settings object.

        Example::

            {consents: {analytics: {status: -1, updatedAt: '2018-07-03T12:18:19.957Z'}}}

    Where ``consent.analytics`` is consent type and status indicate:

    * ``-1`` - user has not interacted, e.g. has closed a consent popup without any decision
    * ``0`` - user reject consent
    * ``1`` - user approve consent

.. function:: onFulfilled(settings)

    **required** The fulfilment handler callback (called with result).

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.

Send data subject request
`````````````````````````
Command send data subject request to Consent Manager collector.

Code::

    ppms.cm.api('sendDataRequest', request, onFulfilled, onRejected);
    dataLayer.push({'event': 'ppms.cm:sendDataRequest', parameters: [request, onFulfilled, onRejected]});

:func:`dataLayer.push` interface is only for backward compatibility and you can read more about this particular case below. We recommend :func:`ppms.cm.api`.

.. object:: request

    **required** The subject data request.

        Example::

            {content: 'user input', email: 'example@example.org', type: 'delete_data'}

    Where ``type`` is request type, and can be one of:

    * ``change_data`` for data alteration request
    * ``view_data`` for view data request
    * ``delete_data`` for delete data request

.. function:: onFulfilled()

    **required** The fulfilment handler callback.

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, exception will be thrown in main stacktrace.

    :param string|object error: **Required** Error code or exception.
