.. _clearEcommerceCart():

====================
clearEcommerceCart()
====================

The **clearEcommerceCart()** method removes all items added to the cart.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          clearEcommerceCart()

    .. group-tab:: Angular

        .. code-block:: javascript

          clearEcommerceCart()

    .. group-tab:: React

        .. code-block:: javascript

          clearEcommerceCart()


Examples
--------


To remove all items from the cart:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["clearEcommerceCart"]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          jstc.clearEcommerceCart();

    .. group-tab:: Angular

        .. code-block:: javascript


    .. group-tab:: React

        .. code-block:: javascript



Notes
-----

* The cart with cleared items is not stored in the browser storage. Make sure that you add or clear all items again after the page reloads.
* This method doesn't send any data to Piwik PRO. It just updates the cart. You can use the trackEcommerceCartUpdate() or trackEcommerceOrder() method to send cart data to Piwik PRO.

Related methods
---------------

* addEcommerceItem()
* removeEcommerceItem()
* getEcommerceItems()
* setEcommerceView()
* trackEcommerceCartUpdate()
* trackEcommerceOrder()
