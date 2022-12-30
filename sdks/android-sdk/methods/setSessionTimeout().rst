.. _android setSessionTimeout():

===================
setSessionTimeout()
===================

The **setSessionTimeout()** method sets the expiration time for the session. The default value is 30 minutes.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setSessionTimeout(milliseconds);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.setSessionTimeout(milliseconds)

Parameters
----------

| **milliseconds** (number, required)
| The time (in milliseconds) after which the session expires.

Examples
--------

To set the expiration time to 60 minutes (60*60*1000 milliseconds):

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setSessionTimeout(30 * 60 * 1000));


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.setSessionTimeout(30 * 60 * 1000))
