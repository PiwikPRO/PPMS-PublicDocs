.. _deleteCustomDimension():

=======================
deleteCustomDimension()
=======================

The **deleteCustomDimension()** method removes a custom dimension.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          getCustomDimensionValue(customDimensionID)

    .. group-tab:: Angular

        .. code-block:: javascript

          deleteCustomDimension(customDimensionId: string)

    .. group-tab:: React

        .. code-block:: javascript

          deleteCustomDimension(customDimensionId: string)


Parameters
----------

| **customDimensionID** (number, required)
| An ID of the custom dimension.

Examples
--------

To remove a custom dimension:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["deleteCustomDimension", 1]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.deleteCustomDimension(1);

    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript


Related methods
---------------

* setCustomDimensionValue()
* getCustomDimensionValue()
