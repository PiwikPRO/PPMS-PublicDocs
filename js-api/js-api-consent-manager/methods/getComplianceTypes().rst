====================
getComplianceTypes()
====================

Fetches a list of consent types for the current setup. For the consent type to appear in the output, at least one tag must have it set.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('getComplianceTypes', onFulfilled, onRejected);

Parameters
----------

| **onFulfilled(types)** (function, required)
| The fulfillment handler callback (called with result).

  | **types** (string, required)
  | Array of consent types. Example: ``["remarketing", "analytics"]``

| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

  | **error** (string | object, required)
  | Error code or exception


Examples
--------

See `custom consent form example <https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/>`_.
