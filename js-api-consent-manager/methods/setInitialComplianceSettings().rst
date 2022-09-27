==============================
setInitialComplianceSettings()
==============================

Sets initial compliance settings (no decision signal for each consent type) in the cookie.
Use this command to save "no decision" for the available consent types, to further know that a visitor has seen the form.
Result from getNewComplianceTypes() method can be passed directly.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('setInitialComplianceSettings', settings, onFulfilled, onRejected);

Parameters
----------

| **settings** (object, required)
| The consent settings object. Example: ``{consents: ['analytics']}`` or ``['analytics']``.

| **onFulfilled()** (function, required)
| The fulfillment handler callback (called with result).

| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

  | **error** (string | object, required)
  | Error code or exception

Examples
--------

See `custom consent form example <https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/>`_.
