.. _`Piwik PRO - Custom consent form example`: https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/

Commands
--------
All commands work in the context of the current visitor and website. Additionally, they sometimes require communication with a PPAS server and are asynchronous. Callback functions are used to provide response value or information about errors. ``onSuccess(...args)`` callback is required, with the exception of ``openConsentForm`` command where it is optional. ``onFailure(exception)`` callback is optional and if is specified, any error object occurred will be passed as an argument. If not specified, an error is reported directly on the console output.

.. note::
    For examples of how to use a specific command in your custom consent form
    implementation (including how to track consent stats), refer to the
    `Piwik PRO - Custom consent form example`_


Get compliance types
````````````````````
Fetches a list of consent types for the current setup. For the consent type to appear in the output, at least one tag must have it set.

Code::

    ppms.cm.api('getComplianceTypes', onFulfilled, onRejected);


.. function:: onFulfilled(types)

    **required** The fulfillment handler callback (called with result)

    :param Array<string> types: **Required** Array of consent types

        Example::

            ['remarketing', 'analytics']

        Available consent types you'll find here: `Consent types reference`_

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Get new compliance types
````````````````````````
Fetches a list of the consent types which a visitor did not see yet.

Code::

    ppms.cm.api('getNewComplianceTypes', onFulfilled, onRejected);


.. function:: onFulfilled(types)

    **required** The fulfillment handler callback (called with result)

    :param Array<string> types: **Required** Array of consent types

        Example::

            ['remarketing', 'analytics']

        Available consent types you'll find here: `Consent types reference`_

.. function:: onRejected(error)

    The rejection handler callback (called with error code).

    :param string|object error: **Required** Error code or exception


Set initial compliance settings
```````````````````````````````
Sets initial compliance settings (no decision signal for each consent type) in the cookie.
Use this command to save 'no decision' for the available consent types, to further know that a visitor has seen the form.
Result from `getNewComplianceTypes` method can be passed directly.

Code::

    ppms.cm.api('setInitialComplianceSettings', settings, onFulfilled, onRejected);


.. object:: settings

    **required** The consent settings object

        Example::

            {consents: ['analytics']}

        or

        Example::

            ['analytics']

        Available consent types you'll find here: `Consent types reference`_

.. function:: onFulfilled()

     **required** The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Set compliance settings
```````````````````````
Set compliance settings based on visitor's decisions.
Use this command to save visitor's consent choices from the consent form.
Consent Manager forces a page view after the command is invoked, so all tags requiring certain choices will be fired immediately after the consent is given.

Code::

    ppms.cm.api('setComplianceSettings', settings, onFulfilled, onRejected);


.. object:: settings

    **required** The consent settings object

        Example::

            {consents: {analytics: {status: 1}}}

        Available consent types you'll find here: `Consent types reference`_

        Where ``consent.analytics`` is consent type and status indicate:

        * ``0`` - user has rejected the consent
        * ``1`` - user has approved the consent

.. function:: onFulfilled()

     **required** The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Get compliance settings
```````````````````````
Returns current privacy settings. Use this command to get visitor's decisions.
This command returns an empty object if there were no decisions registered yet.

Code::

    ppms.cm.api('getComplianceSettings', onFulfilled, onRejected);


.. object:: settings

     **required** The consent settings object

        Example::

            {consents: {analytics: {status: -1, updatedAt: '2018-07-03T12:18:19.957Z'}}}

        Available consent types you'll find here: `Consent types reference`_

        Where ``consent.analytics`` is consent type and status indicate:

        * ``-1`` - user has not interacted, e.g. has closed a consent popup without any decision
        * ``0`` - user reject consent
        * ``1`` - user approve consent

.. function:: onFulfilled(settings)

    **required** The fulfillment handler callback (called with result)

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Send data subject request
`````````````````````````
Command that sends a Data subject request to the Consent Manager.

Code::

    ppms.cm.api('sendDataRequest', request, onFulfilled, onRejected);


.. object:: request

    **required** The subject data request.

        Example::

            {content: 'user input', email: 'example@example.org', type: 'delete_data'}

    Where ``type`` is request type, and can be one of:

    * ``change_data`` for data alteration request
    * ``view_data`` for view data request
    * ``delete_data`` for delete data request

.. function:: onFulfilled()

    **required** The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Open consent form
`````````````````
.. versionadded:: 12.0
Command used to open consent form. Works only for built-in consent forms, it will not do anything if Custom consent form mode is enabled.

Code::

    ppms.cm.api('openConsentForm', onFulfilled, onRejected);


.. function:: onFulfilled(popupId, consentTypes, consents)

    The fulfillment handler callback

    :param string popupId: Id of the consent popup

        Example::

            'ppms_cm_consent_popup_30a851b6-6bf4-45f9-9a53-583401bb5d60'

    :param array<string> consentTypes: Array of consent types


        Example::

            ['analytics', 'conversion_tracking', 'remarketing']

    :param array<string> consents: Array list of all given consents

        Example::

            ['analytics', 'remarketing']

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track Main Form view
````````````````````
.. versionadded:: 15.3
Command used to track Consent Form main view (automatic view, when user enters the website for the first time).

Code::

    ppms.cm.api('trackMainFormView', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track Reminder Widget view
``````````````````````````
.. versionadded:: 15.3
Command used to track Consent Form view caused by clicking on Reminder Widget.

Code::

    ppms.cm.api('trackReminderWidgetView', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track Privacy Policy Link view
``````````````````````````````
.. versionadded:: 15.3
Command used to track Consent Form view caused by clicking on Privacy Policy Link.

Code::

    ppms.cm.api('trackPrivacyPolicyLinkView', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track `Agree to all` click
``````````````````````````
.. versionadded:: 15.3
Command used to track clicks on the `Agree to all` button.

Code::

    ppms.cm.api('trackAgreeToAllClick', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track `Reject all` click
````````````````````````
.. versionadded:: 15.3
Command used to track clicks on the `Reject all` button.

Code::

    ppms.cm.api('trackRejectAllClick', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track `Save choices` click
``````````````````````````
.. versionadded:: 15.3
Command used to track clicks on the `Save choices` button.

Code::

    ppms.cm.api('trackSaveChoicesClick', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Track close button click
````````````````````````
.. versionadded:: 15.3
Command used to track clicks on the close button (`X`).

Code::

    ppms.cm.api('trackCloseButtonClick', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception

Clear privacy settings
````````````````````````
.. versionadded:: 18.11
Command used to clear visitor's privacy settings. Removes `ppms_privacy_[appId]` cookie and updates the value of the `Consents` variable.

Code::

    ppms.cm.api('clearPrivacySettings', onFulfilled, onRejected);

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
