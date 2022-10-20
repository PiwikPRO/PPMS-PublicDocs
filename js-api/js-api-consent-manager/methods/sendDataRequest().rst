=================
sendDataRequest()
=================

Command that sends a Data subject request to the Consent Manager.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('sendDataRequest', request, onFulfilled, onRejected);


Parameters
----------

| **request** (object, required)
| The subject data request. Example: ``{content: 'user input', email: 'example@example.org', type: 'delete_data'}``
| Where ``type`` is request type, and can be one of:
* ``change_data`` for data alteration request
* ``view_data`` for view data request
* ``delete_data`` for delete data request

| **onFulfilled()** (function, required)
| The fulfillment handler callback (called with result).

| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

  | **error** (string | object, required)
  | Error code or exception


Examples
--------

See `custom consent form example <https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/>`_.
