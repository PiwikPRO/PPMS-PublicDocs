============================
setInitialComplianceSettings
============================

Sets initial compliance settings (no decision signal for each consent type) in the cookie.
Use this command to save "no decision" for the available consent types, to further know that a visitor has seen the form.
Result from `getNewComplianceTypes` method can be passed directly.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('setInitialComplianceSettings', settings, onFulfilled, onRejected);

Parameters
----------

.. object:: settings

    **required** The consent settings object

        Example::

            {consents: ['analytics']}

        or

        Example::

            ['analytics']

.. function:: onFulfilled()

     **required** The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
