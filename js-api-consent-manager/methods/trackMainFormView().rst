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

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
