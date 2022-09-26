=======================
setComplianceSettings()
=======================

Set compliance settings based on visitor's decisions.
Use this command to save visitor's consent choices from the consent form.
Consent Manager forces a page view after the command is invoked, so all tags requiring certain choices will be fired immediately after the consent is given.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('setComplianceSettings', settings, onFulfilled, onRejected);


Parameters
----------

.. object:: settings

    **required** The consent settings object

        Example::

            {consents: {analytics: {status: 1}}}

    Where ``consent.analytics`` is consent type and status indicate:

    * ``0`` - user has rejected the consent
    * ``1`` - user has approved the consent

.. function:: onFulfilled()

     **required** The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
