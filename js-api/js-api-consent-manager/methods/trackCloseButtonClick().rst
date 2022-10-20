=======================
trackCloseButtonClick()
=======================

Command used to track clicks on the close button (``X``).

Syntax
------

.. code-block:: javascript

    ppms.cm.api('trackCloseButtonClick', onFulfilled, onRejected);

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
