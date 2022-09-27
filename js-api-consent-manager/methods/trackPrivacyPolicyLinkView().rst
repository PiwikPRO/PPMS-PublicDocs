============================
trackPrivacyPolicyLinkView()
============================

Command used to track Consent Form view caused by clicking on Privacy Policy Link.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('trackPrivacyPolicyLinkView', onFulfilled, onRejected);


Parameters
----------

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
