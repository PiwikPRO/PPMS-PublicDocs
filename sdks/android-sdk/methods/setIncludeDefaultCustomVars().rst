.. _android setIncludeDefaultCustomVars():

=============================
setIncludeDefaultCustomVars()
=============================

The **setIncludeDefaultCustomVars()** method turns on or off fetching the platform version, OS version and app version from the tracker instance. It is turned on by default.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setIncludeDefaultCustomVars(isFetched);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.includeDefaultCustomVars = isFetched

Parameters
----------

| **isFetched** (boolean, required)
| Whether the platform version, OS version and app version is fetched from the tracker instance or not. True: is fetched. False: is not fetched.

Examples
--------

To turn off automatic fetching of the platform version, OS version and app version from the tracker instance:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setIncludeDefaultCustomVars(false);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.includeDefaultCustomVars = false

Notes
-----

* If setIncludeDefaultCustomVars(true) is set, indexes 1-3 are used to track the platform version, OS version and app version as custom variables.

Related methods
---------------

* :ref:`android track().dimension()`
* :ref:`android track().variable()`
* :ref:`android track().visitVariables()`
