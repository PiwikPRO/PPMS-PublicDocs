.. _android setPrefixing():

==============
setPrefixing()
==============

The **setPrefixing()** method turns on or off automatic prefixing. If turned on, URLs will get prefixes automatically when certain methods are used. Example: The track().screen() method will add the ``screen`` prefix to the URL.

By default, setPrefixing(true) is set. This means that prefixes are added automatically.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setPrefixing(isAutomatic);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isPrefixing = isAutomatic

Parameters
----------

| **isAutomatic** (boolean, required)
| Whether URLs get prefixes automatically. True: prefixes are added automatically. False: prefixes are not added automatically.

Examples
--------

To turn off automatic prefixing:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setPrefixing(false);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.isPrefixing = false
