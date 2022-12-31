.. _android track().visitVariables():

===========================
track().visitVariables() 🗑
===========================

.. deprecated::
    16.0.0 This method is no longer recommended. Audience Manager is no longer available in the latest product version.

The **track().visitVariables()** method sets a custom variable in the visit (session) scope. The value can then be sent to Piwik PRO with a screen view or any other event.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .visitVariables(index, "name", "value");


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .visitVariables(index, "name", "value")

Parameters
----------

| **index** (number, required)
| Index where the variable is stored.

| Note: If setIncludeDefaultCustomVars(true) is set, you can't use the index 4-5 because that method automatically tracks some items under those indexes. The setIncludeDefaultCustomVars(true) method is set by default.

| **name** (string, required)
| Name of the variable. Valid format: UTF-8. Limited to 200 characters.

| **value** (string, optional)
| Value of the variable. Valid format: UTF-8. Limited to 200 characters.

Examples
--------

To set a custom variable in the visit (session) scope and send it with a screen view:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .visitVariables(1, "age", "25")

          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(getTracker());



    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .visitVariables(1, "age", "25")
            
          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker)

Notes
-----

* The visit (session) scope relates to the whole visit and holds captured custom dimension for the whole session.

Related methods
---------------

* :ref:`android setIncludeDefaultCustomVars()`
* :ref:`android track().variable()`
* :ref:`android track().dimension()`
