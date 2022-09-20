.. _addEcommerceItem():

==================
addEcommerceItem()
==================

The **addEcommerceItem()** method adds a product to the cart.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          addEcommerceItem(productSKU[, productName[, productCategory[, productPrice[, productQuantity]]]])

    .. group-tab:: Angular

        .. code-block:: javascript

          addEcommerceItem(productSKU: string, productName: string, productCategory: string | string[], productPrice: number, productQuantity: number)

    .. group-tab:: React

        .. code-block:: javascript

          addEcommerceItem(productSKU: string, productName: string, productCategory: string | string[], productPrice: number, productQuantity: number)


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

To add one product to the cart:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push([
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1,
          ]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.addEcommerceItem(
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1
          );


    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript




To add two products to the cart:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push([
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1,
          ]);
          _paq.push([
            "addEcommerceItem",
            "460923",
            "Specialized Chamonix",
            "Helmets",
            200,
            1,
          ]);


    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.addEcommerceItem(
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1
          );
          jstc.addEcommerceItem(
            "addEcommerceItem",
            "460923",
            "Specialized Chamonix",
            "Helmets",
            200,
            1
          );


    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript


To add a product and send a cart update to Piwik PRO:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push([
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1,
          ]);
          _paq.push(["trackEcommerceCartUpdate", 5000]);


    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.addEcommerceItem(
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1
          );
          jstc.trackEcommerceCartUpdate(5000);


    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript


To add two products to the cart and send a cart update:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push([
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1,
          ]);
          _paq.push([
            "addEcommerceItem",
            "460923",
            "Specialized Chamonix",
            "Helmets",
            200,
            1,
          ]);
          _paq.push(["trackEcommerceCartUpdate", 5200]);


    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.addEcommerceItem(
            "addEcommerceItem",
            "584340",
            "Specialized Stumpjumper",
            "Mountain bike",
            5000,
            1
          );
          jstc.addEcommerceItem(
            "addEcommerceItem",
            "460923",
            "Specialized Chamonix",
            "Helmets",
            200,
            1
          );
          jstc.trackEcommerceCartUpdate(5200);



    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript




To track a confirmed order:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          // register all purchased items

          _paq.push([
            "addEcommerceItem",
            "584340", // SKU
            "Specialized Stumpjumper", // name
            "Mountain bike", // category
            5000, // price
            1, // quantity
          ]);

          _paq.push([
            "addEcommerceItem",
            "460923", // SKU
            "Specialized Chamonix", // name
            "Helmets", // category
            200, // price
            1, // quantity
          ]);

          // track order
          _paq.push([
            "trackEcommerceOrder",
            "43967392", // order ID
            5250, // grand total (value + tax + discount + shipping)
            5200, // sub total (value + tax + discount)
            970, // tax
            150, // shipping
            100, // discount
          ]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.trackEcommerceOrder(
            "584340", // SKU
            "Specialized Stumpjumper", // name
            "Mountain bike", // category
            5000, // price
            1 // quantity
          );

          jstc.trackEcommerceOrder(
            "460923", // SKU
            "Specialized Chamonix", // name
            "Helmets", // category
            200, // price
            1 // quantity
          );

          // track order
          jstc.trackEcommerceOrder(
            "43967392", // order ID
            5250, // grand total (value + tax + discount + shipping)
            5200, // sub total (value + tax + discount)
            970, // tax
            150, // shipping
            100 // discount
          );



    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript



Notes
-----

* The cart with added items is not stored in the browser storage. Make sure that you add all items again after the page reloads.
* If a product with the same SKU is already in the cart, it'll be removed and replaced with the one added with the addEcommerceItem() method.
* This method doesn't send any data to Piwik PRO. It just creates a cart. You can use the trackEcommerceCartUpdate() or trackEcommerceOrder() method to send cart data to Piwik PRO.

Related methods
---------------

* removeEcommerceItem()
* clearEcommerceCart()
* getEcommerceItems()
* setEcommerceView()
* trackEcommerceCartUpdate()
* trackEcommerceOrder()
