.. _android setAnonymizationState():

=======================
setAnonymizationState()
=======================

The **setAnonymizationState()** method marks a user as anonymous or non-anonymous. If set to anonymous, the user's IP address, location information (only the country is known), user ID and device ID are not collected. Every time the application is started, a new visitor ID is generated for anonymous users.

The setAnonymizationState(true) is set by default. This means that each user is anonymous by default.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          ((PiwikApplication) getApplication()).getTracker().setAnonymizationState(isAnonymous);

    .. group-tab:: Kotlin

        .. code-block:: javascript

          (application as PiwikApplication).tracker.setAnonymizationState(
            isAnonymous
          )



Parameters
----------

| **isAnonymous** (boolean, required)
| Weather a user is anonymous or non-anonymous. True: anonymous. False: non-anonymous.

Examples
--------

To mark a visitor as non-anonymous:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          ((PiwikApplication) getApplication()).getTracker().setAnonymizationState(false);

    .. group-tab:: Kotlin

        .. code-block:: javascript

          (application as PiwikApplication).tracker.setAnonymizationState(
            false
          )


Related methods
---------------

* :ref:`android isAnonymizationOn()`
