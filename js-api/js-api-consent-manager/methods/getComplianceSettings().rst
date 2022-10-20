=======================
getComplianceSettings()
=======================

Returns current privacy settings. Use this command to get visitor's decisions.
This command returns an empty object if there were no decisions registered yet.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('getComplianceSettings', onFulfilled, onRejected);

Parameters
----------

| **onFulfilled(settings)** (function, required)
| The fulfillment handler callback (called with result).

  | **settings** (object, required)
  | The consent setting object
  | Example: ``{consents: {analytics: {status: -1, updatedAt: '2018-07-03T12:18:19.957Z'}}}``
  | Where ``consent.analytics`` is consent type and status indicate:
  * ``-1``: A vistior didn't interact. For example, they closed a consent popup without any decision.
  * ``0``: A visitor rejected consent.
  * ``1``: A vistior approved consent.

| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

  | **error** (string | object, required)
  | Error code or exception


Examples
--------

See `custom consent form example <https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/>`_.
