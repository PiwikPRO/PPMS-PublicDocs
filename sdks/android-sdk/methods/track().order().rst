.. _android track().order():

===============
track().order()
===============

The **track().order()** method tracks a confirmed order.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .order("orderID", orderGrandTotal)
            .subTotal(orderSubTotal)
            .tax(orderTax)
            .shipping(orderShipping)
            .discount(orderDiscount)
            .items(items)
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .order("orderID", orderGrandTotal).subTotal(orderSubTotal)
            .tax(orderTax)
            .shipping(orderShipping)
            .discount(orderDiscount)
            .items(items)
            .with(tracker)

Parameters
----------

| **orderID** (string, required)
| The unique order ID.

| **orderGrandTotal** (number, required)
| Total payment for an order. Including tax, shipping and discounts. Format: 1/100 of the basic monetary unit. Example: 100 is 1 USD.

| **orderSubTotal** (number, optional)
| Payment for an order without shipping. Format: 1/100 of the basic monetary unit. Example: 100 is 1 USD.

| **orderTax** (number, optional)
| Tax included in an order. Format: 1/100 of the basic monetary unit. Example: 100 is 1 USD.

| **orderShipping** (number, optional)
| Shipping costs for an order. Format: 1/100 of the basic monetary unit. Example: 100 is 1 USD.

| **orderDiscount** (number, optional)
| Discounts included in an order. Format: 1/100 of the basic monetary unit. Example: 100 is 1 USD.


Examples
--------

To track a confirmed order:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((YourApplication) getApplication()).getTracker();
          EcommerceItems items = new EcommerceItems();

          // register all purchased items
          // EcommerceItems.Item("<SKU>").name("<name>").category("<category>").price(<price>).quantity(<quantity>)

          items.addItem(new EcommerceItems
            .Item("584340")
            .name("Specialized Stumpjumper")
            .category("Mountain bike")
            .price(500000)
            .quantity(1));

          items.addItem(new EcommerceItems
            .Item("460923")
            .name("Specialized Chamonix")
            .category("Helmets")
            .price(20000)
            .quantity(1));

          // track order

          TrackHelper.track()
            .order("43967392", 525000)
            .subTotal(520000)
            .tax(97000)
            .shipping(15000)
            .discount(10000)
            .items(items)
            .with(tracker);



    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          var items: EcommerceItems = EcommerceItems()

          // register all purchased items
          // EcommerceItems.Item("<SKU>").name("<name>").category("<category>").price(<price>).quantity(<quantity>)

          items.addItem(EcommerceItems
            .Item("584340")
            .name("Specialized Stumpjumper")
            .category("Mountain bike")
            .price(500000)
            .quantity(1))

          items.addItem(EcommerceItems
            .Item("460923")
            .name("Specialized Chamonix")
            .category("Helmets")
            .price(20000)
            .quantity(1))

          // track order

          TrackHelper.track()
            .order("43967392", 525000)
            .subTotal(520000)
            .tax(97000)
            .shipping(15000)
            .discount(10000)
            .items(items)
            .with(tracker)

Related methods
---------------

* :ref:`android items.addItem()`
