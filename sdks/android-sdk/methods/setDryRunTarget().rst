.. _android setDryRunTarget():

=================
setDryRunTarget()
=================

The **setDryRunTarget()** method sets a dry-run flag and lets you test and debug tracking. The dry-run flag prevents sending data to Piwik PRO and prints it in the console instead.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDryRunTarget(dryRunTarget);


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.dryRunTarget = Collections.synchronizedList(dryRunTarget)

Parameters
----------

| **dryRunTarget** (Collection, required)
| The data structure where the data should be passed into. Type: List<Packet>. Set it to null to disable a dry-run flag.

Examples
--------

To set a dry-run flag:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDryRunTarget(Collections.synchronizedList(new ArrayList<Packet>()));


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.dryRunTarget = Collections.synchronizedList(Collections.synchronizedList(ArrayList()))
