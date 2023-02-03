.. _android setDryRunTarget():

=================
setDryRunTarget()
=================

The **setDryRunTarget()** method sets a dry-run flag and lets you test and debug tracking. The dry-run flag prevents data from being sent to Piwik PRO and instead prints it to the console.

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
| The data structure to which data is to be sent. Type: List<Packet>. Set it to null to disable the dry-run flag.

Examples
--------

To set the dry-run flag:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          getTracker().setDryRunTarget(Collections.synchronizedList(new ArrayList<Packet>()));


    .. group-tab:: Kotlin

        .. code-block:: javascript

          tracker.dryRunTarget = Collections.synchronizedList(Collections.synchronizedList(ArrayList()))
