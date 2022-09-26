=======================
getNewComplianceTypes()
=======================

Fetches a list of the consent types which a visitor did not see yet.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('getNewComplianceTypes', onFulfilled, onRejected);

Parameters
----------


| **onFulfilled(types)** (function, required)
| The fulfillment handler callback (called with result).
| Parameters: types (string, required) Array of consent types. Example: ["remarketing", "analytics"]

| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.
| Parameters: error (string | object, required) Error code or exception


Examples
--------
