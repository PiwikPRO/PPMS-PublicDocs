.. _android isAnonymizationOn():

===================
isAnonymizationOn()
===================

The **isAnonymizationOn()** method checks if a visitor is marked as anonymous or non-anonymous.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          ((PiwikApplication) getApplication()).getTracker().isAnonymizationOn();


    .. group-tab:: Kotlin

        .. code-block:: javascript

          (application as PiwikApplication).tracker.isAnonymizationOn

Returns
-------

| Whether a user is marked as anonymous or non-anonymous.
| Format: True: is anonymous. False: is non-anonymous.
| Type: Boolean

Examples
--------

To check if data anonymization is turned on or off for a given visitor:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          ((PiwikApplication) getApplication()).getTracker().isAnonymizationOn();


    .. group-tab:: Kotlin

        .. code-block:: javascript

          (application as PiwikApplication).tracker.isAnonymizationOn


Related methods
---------------

* :ref:`android setAnonymizationState()`
