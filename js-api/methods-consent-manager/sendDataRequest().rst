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

.. object:: request

    **required** The subject data request.

        Example::

            {content: 'user input', email: 'example@example.org', type: 'delete_data'}

    Where ``type`` is request type, and can be one of:

    * ``change_data`` for data alteration request
    * ``view_data`` for view data request
    * ``delete_data`` for delete data request

.. function:: onFulfilled()

    **required** The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
