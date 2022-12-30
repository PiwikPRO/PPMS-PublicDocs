.. _android setOptOut():

===========
setOptOut()
===========

The **setOptOut()** method sets the opt-out flag for the whole app. When the opt-out flag is set, no data is collected.

By default, setOptOut(false) is set.


Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setOptOut(isOptOut);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isOptOut = isOptOut

Parameters
----------

| **isOptOut** (boolean, required)
| Whether or not. True: is opted out. False: is opted in.

Examples
--------

To set the opt-out flag and don't collect any data:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setOptOut(true);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isOptOut = true
