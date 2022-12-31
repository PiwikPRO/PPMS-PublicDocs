.. _android track().dimension():

===================
track().dimension()
===================

The **track().dimension()** method sets a value for a custom dimension. The value can then be sent to Piwik PRO with a screen view or any other event.

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
| An ID of the custom dimension.

| **customDimensionValue** (string, required)
| A value of the custom dimension.

Examples
--------

To set a custom dimension with the ID ``1`` and value ``5 stars`` and send it with a screen view:

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

To set a custom dimension with the ID ``2`` and value ``paid subscriber`` and send it with an event:

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

* After sending the set dimension with the event, the dimension is deleted. It won't be sent with the next event. So you need to set it each time you want to send it.
