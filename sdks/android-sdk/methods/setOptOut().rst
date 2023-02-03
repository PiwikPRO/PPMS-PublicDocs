.. _android setOptOut():

===========
setOptOut()
===========

The **setOptOut()** method sets the opt-out flag for the entire app. Once the opt-out flag is set, no data is collected.

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
| Whether the opt-out flag is set. True: is set. False: is not set.

Examples
--------

To set the opt-out flag and not collect any data:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setOptOut(true);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isOptOut = true
