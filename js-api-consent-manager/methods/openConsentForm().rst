=================
openConsentForm()
=================

Command used to open consent form. Works only for built-in consent forms, it will not do anything if Custom consent form mode is enabled.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('openConsentForm', onFulfilled, onRejected);

Parameters
----------

| **onFulfilled(popupId, consentTypes, consents)**
| The fulfillment handler callback

  | **popupId** (string)
  | ID of the consent popup. Example: ``"ppms_cm_consent_popup_30a851b6-6bf4-45f9-9a53-583401bb5d60"``

  | **consentTypes** (array)
  | Array of consent types. Example: ``["analytics", "conversion_tracking", "remarketing"]``

  | **consents** (string)
  | Array list of all given consents. Example: ``["analytics", "remarketing"]``


| **onRejected(error)**
| The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

  | **error** (string | object, required)
  | Error code or exception

Examples
--------

See `custom consent form example <https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/>`_.
