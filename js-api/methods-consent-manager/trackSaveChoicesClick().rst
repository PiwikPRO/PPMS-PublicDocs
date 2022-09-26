=======================
trackSaveChoicesClick()
=======================


Command used to track clicks on the `Save choices` button.

Syntax
------

.. code-block:: javascript

    ppms.cm.api('trackSaveChoicesClick', onFulfilled, onRejected);

Parameters
----------

.. function:: onFulfilled()

    The fulfillment handler callback

.. function:: onRejected(error)

    The rejection handler callback (called with error code). If not specified, the exception will be thrown in the main stack trace.

    :param string|object error: **Required** Error code or exception
