===================
trackMainFormView()
===================


Command used to track Consent Form main view (automatic view, when user enters the website for the first time).

Syntax
------

.. code-block:: javascript

    ppms.cm.api('trackMainFormView', onFulfilled, onRejected);

Parameters
----------

| **onFulfilled()** (function, required)
| The fulfillment handler callback (called with result).

| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

  | **error** (string | object, required)
  | Error code or exception

Examples
--------

See `custom consent form example <https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/>`_.
