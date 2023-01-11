.. _android items.addItem():

===============
items.addItem()
===============

The **items.addItem()** method adds a product to the cart.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          EcommerceItems items = new EcommerceItems();

          items.addItem(new EcommerceItems
            .Item("productSKU")
            .name("productName")
            .category("productCategory")
            .price(productPrice)
            .quantity(productQuantity));


    .. group-tab:: Kotlin

        .. code-block:: javascript

          var items: EcommerceItems = EcommerceItems()

          items.addItem(EcommerceItems
            .Item("productSKU")
            .name("productName")
            .category("productCategory")
            .price(productPrice)
            .quantity(productQuantity))


Parameters
----------

| **productSKU** (string, required)
| The stock-keeping unit of the added product.

| **productName** (string, optional)
| The name of the added product.

| **productCategory** (string | array<string>, optional)
| The category of the added product. It can be an array of up to 5 categories.

| **productPrice** (number, optional)
| The price of the added product.

| **productQuantity** (number, optional)
| The number of added items.


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


Notes
-----

* The cart with added items is not stored in the browser storage. Make sure that you add all items again after the page reloads.
* If a product with the same SKU is already in the cart, it'll be removed and replaced with the one added with the items.addItem() method.
* This method doesn't send any data to Piwik PRO. It just creates a cart. You can use the track().order() method to send cart data to Piwik PRO.

Related methods
---------------

* :ref:`android track().order()`
