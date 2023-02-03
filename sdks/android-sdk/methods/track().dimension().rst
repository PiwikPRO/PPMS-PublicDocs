.. _android track().dimension():

===================
track().dimension()
===================

The **track().dimension()** method sets a value for the custom dimension. The value can be sent to Piwik PRO with a screen view or other event.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .dimension(customDimensionId, "customDimensionValue");


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .dimension(customDimensionId, "customDimensionValue")

Parameters
----------

| **customDimensionId** (number, required)
| The ID of the custom dimension.

| **customDimensionValue** (string, required)
| The value of the custom dimension.

Examples
--------

To set a custom dimension with the ID ``1`` and the value ``5 stars`` and send it with a screen view:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .dimension(1, "5 stars");
            .screen("example/product-rating")
            .title("Product rating")
            .with(tracker)



    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .dimension(1, "5 stars");
            .screen("example/product-rating")
            .title("Product rating")
            .with(tracker)

To set a custom dimension with the ID ``2`` and the value ``paid subscriber`` and send it with an event:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .dimension(2, "paid subscriber");

          TrackHelper.track()
            .event("Button", "Sign up")
            .with(tracker);



    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .dimension(2, "paid subscriber");

          TrackHelper.track()
            .event("Button", "Sign up")
            .with(tracker);

Notes
-----

* After a dimension is sent with an event, it is deleted and will not be sent with the next event. So, you have to set it each time you want to send it.
