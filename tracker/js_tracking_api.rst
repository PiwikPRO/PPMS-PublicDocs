.. highlight:: js
.. default-domain:: js

.. _tracker-js-tracking-api:

JavaScript tracking API
=======================
The following API allows the user to:

    * track page views
    * track visits on multiple domains and subdomains
    * track e-commerce events (successful orders, cart changes, product and category views)
    * track content impressions
    * manage custom variables to use them later
    * track clicked links to external domains and download files

Installing Tracking code
------------------------
There are two ways of installing a tracking code:

Installing tracking code via Tag Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This is the easiest and recommended way of tracking code installation. When Tag Manager is added to the site - it automatically publishes tracking code (using "Piwik PRO Analytics template").

If you do not have Tag Manager on your website yet, follow this procedure to install it:
#. Sign in to your PPAS with your admin or Super User account.
#. Click on the menu button on the top left.
#. Click on the "Websites" position.
#. Choose the website for which you want to implement a tracking code.
#. Select the "Installation" tab.
#. The Tag Manager code snippet for your website is displayed under the "Website code for asynchronous tags" or "Website code for synchronous tags".


Installing tracking code via code snippet.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. toctree::
    tracker_snippet

Command queue
-------------

Loading snippet creates the following API function:

.. function:: _paq.push(command)

    JavaScript API interface.

    :param Array<string> command: Array containing command `name` followed by its arguments. The number of arguments and
        their function depend on command.
    :rtype: undefined

Commands
--------


Trigger tracking on demand
^^^^^^^^^^^^^^^^^^^^^^^^^^


Trigger custom event
````````````````````

.. todo:: Maybe add section about using tag template from Tag Manager.

Trigger (custom) events bound to user actions::

    _paq.push(["trackEvent", category, action, name, value, dimensions]);

.. describe:: category

    **Required** ``string`` Event category.

.. describe:: action

    **Required** ``string`` Event action.

.. describe:: name

    **Optional** ``string`` Event name.

.. describe:: value

    **Optional** ``number`` Event value.

.. describe:: dimensions

    **Optional** ``object`` `Custom dimensions <Custom Dimensions_>`_ which should be tracked using
    this action. It can set multiple dimensions at once. Dimensions are defined as object properties
    using the ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage (tracking when the user clicks on the cancel button with exit intent)::

        _paq.push(["trackEvent", "Exit intent", "Click on button", "Cancel"]);

Track goal conversion
`````````````````````
.. todo:: Maybe add section about using tag template from Tag Manager.

Allows the manual tracking of goal conversion. Used in `Goals` - `Days to Conversion` report. Command::

    _paq.push(["trackGoal", goal_name, goal_value, dimensions]);

.. describe:: goal_name

    **Required** ``string`` Goal Name

.. describe:: goal_value

    **Optional** ``number`` Tracked conversion value.

.. describe:: dimensions

    **Optional** ``object``  `Custom dimensions <Custom Dimensions_>`_ which should be tracked using
    this action. Dimensions are defined as object properties using the ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage::

    _paq.push(["trackGoal" 1, 15]);

Ecommerce tracking
^^^^^^^^^^^^^^^^^^

Adding Ecommerce item
`````````````````````
To add an e-commerce item (for example to track changes in the user's cart using ``trackEcommerceCartUpdate``), use the
``addEcommerceItem`` function::

    _paq.push(["addEcommerceItem", productSKU, productName, productCategory, productPrice, productQuantity]);

.. note::
    This function does not send any data to the :term:`Analytics`. It only prepares E-commerce cart/order state to be
    sent with `trackEcommerceOrder <Tracking Ecommerce order_>`_ or `trackEcommerceCartUpdate <Updating cart_>`_.

.. describe:: productSKU

    **Required** ``string`` Product stock-keeping unit.

.. describe:: productName

    **Optional** ``string`` Product name.

.. describe:: productCategory

    **Optional** ``Array<string>|string`` Product category, can be written as Array with up to 5 elements.

.. describe:: productPrice

    **Optional** ``number`` with product price.

.. describe:: productQuantity

    **Optional** ``number`` with product quantity.

.. warning::

    Product SKU, names and categories should be URL encoded.

.. warning::

    The state of the cart is not maintained across the visit. You must add all products after each page view.

Example of usage::

    _paq.push(["addEcommerceItem", "craft-311", "Unicorn Iron on Patch", "Crafts & Sewing", 499, 3]);

Remove Ecommerce item
`````````````````````
To remove an e-commerce item (for example to track changes in the user's cart using ``trackEcommerceCartUpdate``), use
the ``removeEcommerceItem`` function::

    _paq.push(["removeEcommerceItem", productSKU]);

.. note::
    This function does not send any data to the :term:`Analytics`. It only prepares E-commerce cart/order state to be
    sent with `trackEcommerceOrder <Tracking Ecommerce order_>`_ or `trackEcommerceCartUpdate <Updating cart_>`_.

.. describe:: productSKU

    **Required** ``string`` Product stock-keeping unit.

.. warning::

    Product SKU, names and categories should be URL encoded.

.. warning::

    The state of the cart is not maintained across the visit. You must add all products after each page view.

Example of usage::

    _paq.push(["removeEcommerceItem", "craft-311"]);

Clear Ecommerce items
`````````````````````
To clear all e-commerce items (for example to track changes in the user's cart using ``trackEcommerceCartUpdate``), use
the ``clearEcommerceCart`` function::

    _paq.push(["clearEcommerceCart"]);

.. note::
    This function does not send any data to the :term:`Analytics`. It only prepares E-commerce cart/order state to be
    sent with `trackEcommerceOrder <Tracking Ecommerce order_>`_ or `trackEcommerceCartUpdate <Updating cart_>`_.

.. warning::

    The state of the cart is not maintained across the visit. You must add all products after each page view.

Example of usage::

    _paq.push(["clearEcommerceCart"]);

Tracking Ecommerce order
````````````````````````
To successfully track the e-commerce order(s) (on the checkout page, for example) use the ``trackEcommerceOrder`` function::

    _paq.push(["trackEcommerceOrder", orderId, orderGrandTotal, orderSubTotal, orderTax, orderShipping, orderDiscount]);

.. describe:: orderId

    **Required** ``string`` Unique order ID.

.. describe:: orderGrandTotal

    **Required** ``number`` Order Revenue grand total  - tax, shipping and discount included.

.. describe:: orderSubTotal

    **Optional** ``number`` Order subtotal - without shipping.
.. describe:: orderTax

    **Optional** ``number`` Order tax amount.

.. describe:: orderShipping

    **Optional** ``number`` Order shipping costs.

.. describe:: orderDiscount

    **Optional** ``number`` Order discount amount.

Example of usage::

    _paq.push(["trackEcommerceOrder", "3352", 499, 399, 0, 100]);

Updating cart
`````````````
.. todo::
    Why Tracker doesn't count cartAmount by itself? Why user must do this?

To update the user cart (when the user adds new products or removes them from cart) use the ``trackEcommerceCartUpdate`` function::

    _paq.push(["trackEcommerceCartUpdate", cartAmount]);

.. describe:: cartAmount

    **Required** ``number`` Cart amount (sum of products).


.. warning::

    Before updating the tracking cart, be sure to add all products in the cart by using ``addEcommerceItem`` first
    (including the ones that were previously in the cart). Then, use this function.

Example of usage::

        _paq.push(["trackEcommerceCartUpdate", 250]);

Tracking product / category view
````````````````````````````````
If you wish to track when the user enters the product site or is browsing products category, use the ``setEcommerceView`` function::

    _paq.push(["setEcommerceView", productSKU, productName, productCategory, productPrice]);

.. describe:: productSKU

    **Required** ``string/boolean`` Product stock-keeping unit. False for tracking category.

.. describe:: productName

    **Optional** ``string/boolean`` Product name. False for tracking category.

.. describe:: productCategory

    **Optional** ``Array<string>|string`` Product category, can be written as Array with up to 5 elements.

.. describe:: productPrice

    **Optional** ``number`` Product price.

.. warning::

    Product SKU, names and categories should be URL encoded.

Example of usage::

    _paq.push(["setEcommerceView", "craft-311", "Unicorn Iron on Patch", "Crafts & Sewing", 499]);


Custom Variables
^^^^^^^^^^^^^^^^
.. todo::
    What's difference between custom variables and dimensions? Maybe some sort of help.center link?

.. deprecated:: 5.5
    We strongly advise using custom dimensions instead.

Adding / Editing Custom Variable
````````````````````````````````
.. todo::

    Is this variable set in the portal / using API first, then I can use the id slot to define it's name and value?+
    What's name used for? Can it be accessed later? Is visit and session the same?


To set a custom variable that can be used later, use the ``setCustomVariable`` function::

    _paq.push(["setCustomVariable", index, name, value, scope]);

.. describe:: index

    **Required** ``number`` Index from 1 to 5 where the variable is stored

.. describe:: name

   **Required** ``string`` Name of the variable

.. describe:: value

   **Optional** ``string`` Value of the variable limited to 200 characters.

.. describe:: scope

   **Optional** ``string`` Scope of the variable, "visit" or "page". The default value is ``"visit"``


    .. note::

        A Custom Variable with the scope set on "visit" will be saved for visit, you don't need to save it for every page.

.. warning::

    Index is separate for each variable scope.

Example of usage::

    _paq.push(["setCustomVariable", 1, "AspectRatio", "16:9", "visit"]);

Removing Custom Variable
````````````````````````
To remove the custom variable, you can use the ``deleteCustomVariable`` function::

    _paq.push(["deleteCustomVariable", index, scope]);

.. describe:: index

    **Required** ``number`` Index from 1 to 5 where the variable is stored

.. describe:: scope

   **Optional** ``string`` Scope of the variable, "visit" or "page". The default value is ``"visit"``

Example of usage::

    _paq.push(["deleteCustomVariable", 1, "visit"]);

Accessing Custom Variable
`````````````````````````
.. todo::
    It would be nice to have some examples of returned data.

You can access custom variables by providing a function that will use the ``getCustomVariable`` function::

    _paq.push([ function() {
        var customVariable = this.getCustomVariable(index, scope );
    }]);

.. function:: getCustomVariable(index[, scope])

    :param number index: **Required** Number from 1 to 5 where variable is stored

    :param string scope: **Optional** Scope of the variable, "visit" or "page". Default value is ``"visit"``

Example of usage::

    _paq.push([ function() {
        var customVariable = this.getCustomVariable(1, "visit" );
        console.log(customVariable);
    }]);

Custom Dimensions
^^^^^^^^^^^^^^^^^

Tracking Custom Dimension
`````````````````````````
.. todo:: Maybe add section about using tag template from Tag Manager.

If you wish to set a custom dimension to use it in tracking functions, use the ``setCustomDimension`` function::

    _paq.push(["setCustomDimension", customDimensionID, customDimensionValue]);

.. describe:: customDimensionID

    **Required** ``number`` ID of dimension

.. describe:: customDimensionValue

    **Required** ``string`` Value of Custom Dimension - limited to 255 characters.

.. warning::

    When you set a Custom Dimension, that value will be used in all tracking requests within a page load.

.. warning::
    This function does not send any data to the :term:`Analytics`. It sets a Custom Dimension to be sent with following events (e.g. page view, ecommerce events, outlink or download events).


Example of usage::

    _paq.push(["setCustomDimension", 3, "loginStatus"]);


Retrieving Custom Dimension
```````````````````````````
.. todo::
    It would be nice to have some examples of returned data.

You can access custom dimension by providing a function that will use the ``getCustomDimension`` function::

    _paq.push([ function() {
        var customDimension = this.getCustomDimension(index);
    }]);

.. function:: getCustomDimension(index)

    :param number index: **Required** Index of custom dimension

Example of usage::

    _paq.push([ function() {
        var customDimension = this.getCustomDimension(1);
        console.log(customDimension);
    }]);

Content Tracking
^^^^^^^^^^^^^^^^
Content Tracking tracks how many times specific elements were rendered/visible. It can be used to measure if the ad placement was visible or if the user saw the end of an article.

To track content, it has to have the ``data-track-content`` attribute or ``piwikTrackContent`` CSS class attached to it.

Tracking all content impressions within a page
``````````````````````````````````````````````
To track all content impression, you can use the ``trackAllContentImpressions`` function. If this function is invoked
multiple times, it will not send duplicated data unless the ``trackPageView`` was used between invocations::

    _paq.push(["trackAllContentImpressions"]);

Tracking all visible content impressions
````````````````````````````````````````
To track all visible content impressions you can use the ``trackVisibleContentImpressions`` function.

Code::

    _paq.push(["trackVisibleContentImpressions", checkOnScroll, watchInterval]);

.. describe:: checkOnScroll

    **Optional** ``boolean`` If ``true``, it will check new visible content impressions on the scroll event.
    Default: ``true``.

    .. note:: It will not detect content blocks placed in a scrollable element.

.. describe:: watchInterval

    **Optional** ``number`` Interval, in milliseconds between checking for new visible content. Periodic checks can be disabled for performance reasons by setting ``0``. Default value: ``750``.

.. warning::

    Both options cannot be changed after the initial setup.

Example of usage::

    _paq.push(["trackVisibleContentImpressions", true]);


Example of usage::

    _paq.push(["trackVisibleContentImpressions", false, 500]);

Tracking only content impressions for specific page part
````````````````````````````````````````````````````````

To track impressions on part of a webpage that will be populated after a page load, you can use the ``trackContentImpressionsWithinNode``::

    _paq.push(["trackContentImpressionsWithinNode", domNode]);

.. describe:: domNode

    **Required** ``domNode`` DOM element that will have impression DOM elements with ``data-track-content`` attribute

It can be used with ``trackVisibleContentImpressions`` to track only visible content impressions

Example of usage::

    var element = document.querySelector("#impressionContainer");
    _paq.push(["trackContentImpressionsWithinNode", element]);

Track interactions manually with auto detection
```````````````````````````````````````````````
If you wish to trigger an interaction manually (for example on click event), you
can do it using ``trackContentInteractionNode``, just add this code in the action you want to track::

    _paq.push(["trackContentInteractionNode", domNode, contentInteraction]);

.. describe:: domNode

    **Required** ``domNode`` Node marked as content block or containing content blocks. If no content block is
    found - nothing will be tracked.

.. describe:: contentInteraction

    **Optional** ``string`` Name of interaction (e.g. ``"click"``). Default value: ``"Unknown"``.

Example of use

.. code-block:: html

    <button onClick="function(){_paq.push(['trackContentInteractionNode', this, 'clicked']);}">Click me!</button>


Track impression manually
`````````````````````````
If you wish to trigger tracking impressions entirely manually, you can use the ``trackContentImpression``::

    _paq.push(["trackContentImpression", contentName, contentPiece, contentTarget]);

.. describe:: contentName

    **Required** ``string`` Name of Content Impression

.. describe:: contentPiece

    **Required** ``string`` Name of Content Impression Piece

.. describe:: contentTarget

    **Required** ``string`` URL of Content Impression Target

Example of use::

    _paq.push(["trackContentImpression", "trackingWhitepaper", "document", "http://cooltracker.tr/whitepaper"]);

Track user interaction manually
```````````````````````````````
If you wish to trigger tracking interactions entirely manually, you can use the ``trackContentInteraction``.
Use it as a function inside listener on event::

    _paq.push(["trackContentInteraction", contentInteraction, contentName, contentPiece, contentTarget]);

.. describe:: contentInteraction

    **Required** ``string`` Name of interaction (e.g. ``"click"``).

.. describe:: contentName

    **Required** ``string`` Name of Content Impression

.. describe:: contentPiece

    **Required** ``string`` Name of Content Impression Piece

.. describe:: contentTarget

    **Required** ``string`` URL of Content Impression Target

Example of use::

    _paq.push(["trackContentImpression", "clicked", "trackingWhitepaper", "document", "http://cooltracker.tr/whitepaper"]);

.. warning::
    Use this function in conjunction with ``trackContentImpression``, as it can only be mapped with an impression by linking ``contentName``.
    It does not map automatically as  ``trackContentInteractionNode``.

Download and Outlink Tracking
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Tracking Outlink
````````````````

To enable the Download & Outlink tracking, run::

    _paq.push(["enableLinkTracking"]);

just after the first ``trackPageView`` or ``trackEvent``

.. note::

    All Outlinks are tracked automatically. As ``enableLinkTracking`` is part of the default snippet.

Ignoring alias domains
++++++++++++++++++++++

To ignore internal outlinks from alias domains, use the ``setDomains`` function to define internal domains and subdomains, you can use the wildcard::

    _paq(["setDomains", domains]);

.. describe:: domains

    **Required** ``array`` Domains written as strings, * are accepted.

Example of usage::

    _paq(["setDomains", ["*.example.com", "*.example.co.uk"]]);

Force Tracking using CSS class
++++++++++++++++++++++++++++++

To track clicking a link as an outlink using the CSS class, simply add the ``piwik_link`` class to the link element.
It will then be considered as an outlink, even if it points to the same domain.

This class name can be changed, use ``setLinkClasses`` to define which CSS class should be tracked::

    _paq.push(["setLinkClasses", className]);

.. describe:: className

    **Required** ``string`` CSS class that should be tracked instead of ``piwik_link``

Example of usage::

    _paq(["setLinkClasses", "track-this-link"]);

Force Tracking using JS function
++++++++++++++++++++++++++++++++

If you wish to use JS to force the outlink to be tracked, you can add the ``trackLink`` function on element ``onClick`` attribute::

    _paq.push(["trackLink", linkAddress, "link", dimensions]);

.. describe:: linkAddress

    **Required** ``string`` Address that link points to.

.. describe:: dimensions

    **Optional** ``object`` `Custom dimension <Custom Dimensions_>`_  that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }


Example of usage

.. code-block:: html

    <button onClick="function(){_paq.push(['trackLink', 'http://www.example.com/example', 'link']);}">
        Click me!
    </button>

Tracking Downloads
``````````````````
.. todo::
    Is download only tracking links to files ending on extension? What about GET parameters?

Default extensions recognized as download
+++++++++++++++++++++++++++++++++++++++++

The following extensions are tracked as download by default:


+-------+-----+-----+-----+------+-----+-----+-----+------+-----+------+-----+---------+-----+-----+
| 7z    | aac | arc | arj | apk  | asf | asx | avi | bin  | bz  | bz2  | csv | deb     | dmg | doc |
+-------+-----+-----+-----+------+-----+-----+-----+------+-----+------+-----+---------+-----+-----+
| exe   | flv | gif | gz  | gzip | hqx | jar | jpg | jpeg | js  | mp2  | mp3 | mp4     | mpg | mov |
+-------+-----+-----+-----+------+-----+-----+-----+------+-----+------+-----+---------+-----+-----+
| movie | msi | msp | odb | odf  | odg | odp | ods | odt  | ogg | ogv  | pdf | phps    | png | ppt |
+-------+-----+-----+-----+------+-----+-----+-----+------+-----+------+-----+---------+-----+-----+
| qt    | qtm | ra  | ram | rar  | rpm | sea | sit | tar  | tbz | tbz2 | tgz | torrent | txt | wav |
+-------+-----+-----+-----+------+-----+-----+-----+------+-----+------+-----+---------+-----+-----+
| wma   | wmv | wpd | xls | xml  | z   | zip |     |      |     |      |     |         |     |     |
+-------+-----+-----+-----+------+-----+-----+-----+------+-----+------+-----+---------+-----+-----+

Adding extension to default extensions
++++++++++++++++++++++++++++++++++++++

You can add an extension to the default extensions list using the ``addDownloadExtensions`` function::

    _paq.push(["addDownloadExtensions", extensions]);

.. describe:: extensions

    **Required** ``string|Array<string>`` Extensions separated by ``|`` for example ``"7z|apk|mp4"`` can also be written as an Array, for example: ``["7z","apk","mp4"]``


Example of usage::

    _paq.push(["addDownloadExtensions", "mhj|docx"]);

Replacing default extensions list
+++++++++++++++++++++++++++++++++

Default extensions list can be overwritten using the ``setDownloadExtensions`` function::

    _paq.push(["setDownloadExtensions", extensions]);

.. describe:: extensions

    **Required** ``string|Array<string>`` Extensions separated by ``|`` for example ``"7z|apk|mp4"`` can also be written as an Array, for example: ``["7z","apk","mp4"]``


Example of usage::

    _paq.push(["setDownloadExtensions", "7z|apk|mp4"]);

Force Tracking download using CSS class
+++++++++++++++++++++++++++++++++++++++

To track clicking a link as a download using css class simply add the ``piwik_download`` class to link element.

This class name can be changed, use ``setDownloadClasses`` to define which CSS class should be tracked::

    _paq.push(["setDownloadClasses", className]);


.. describe:: className

    **Required** ``string`` CSS class that should be tracked instead of ``piwik_download``

Example of usage::

    _paq(["setDownloadClasses", "track-this-link-for-download"]);

Force Tracking download using JS function
+++++++++++++++++++++++++++++++++++++++++

If you wish to use JS to force tracking download, you can add ``trackLink`` function on element ``onClick`` attribute::

    _paq.push(["trackLink", linkAddress, "download", dimensions]);

.. describe:: linkAddress

    **Required** ``string`` Address that link points to.

.. describe:: dimensions

    **Optional**  ``object`` `Custom dimension <Custom Dimensions_>`_ that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage

.. code-block:: html

    <button onClick="function(){_paq.push(['trackLink', 'http://www.example.com/example.xrt', 'download']);}">
        Click me!
    </button>

Setting link tracking delay
+++++++++++++++++++++++++++

After each outbound/download link click, there is a small delay introduced, after which the browser
navigates to the new URL. This ensures there is enough time to track link interactions.
That delay is set by default to 500ms. To modify it you can use the ``setLinkTrackingTimer`` function::

    _paq.push(["setLinkTrackingTimer", time]);

.. describe:: time

    **Required** ``number`` Time in ms between user action (click) and changing a website (for outlink) or downloading a file.


Disabling tracking
``````````````````

You can disable download and outlink tracking for links using CSS classes, simply add ``piwik_ignore`` css class.

To disable using CSS class you can use ``setIgnoreClassess`` function::

    _paq.push(["setIgnoreClasses", className);

.. describe:: className

    **Required** ``string|Array<string>`` Css class name that will be ignored, can be written as Array with CSS classes.


User ID Management
^^^^^^^^^^^^^^^^^^
User ID enables merging user data that is collected between many devices and browsers.

Setting UserId
``````````````

You must provide unique user-id for every user. To set user ID for tracked data use ``setUserId`` function::

    _paq.push(["setUserId", userID]);

.. describe:: userID

    **Required** ``string``  Unique, non-empty permanent ID of the user in application.

Reset UserId
````````````

When UserId becames unavailable anymore (eg. user logged out) you may clean the value out with ``resetUserId`` function::

    _paq.push(["resetUserId"]);


Miscellaneous
^^^^^^^^^^^^^

Custom page name
````````````````

We are using the current page URL as the page title. To change this use the ``setDocumentTitle`` function::

    _paq.push(["setDocumentTitle", title]);

.. describe:: title

    **Required** ``string`` Title to show instead of URL

Example of usage::

    _paq.push(["setDocumentTitle", document.title]);

Measuring user time spent on web page
`````````````````````````````````````
When the user will enter a single page during a visit, we will assume that his total time spent on the website was 0 ms.
To measure that time more accurately you can use the ``enableHeartBeatTimer`` function::

    _paq.push(["enableHeartBeatTimer", beat]);

.. describe:: beat

    **Required** ``number`` Time in seconds between cyclical heartbeat requests, default ``30``

Example of usage::

    _paq.push(["enableHeartBeatTimer", 50]);

Tracking internal searches
``````````````````````````
To track search requests on your site use the ``trackSiteSearch`` function::

    _paq.push(["trackSiteSearch", keyword, category, searchCount, dimensions]);

.. describe:: keyword

    **Optional** ``string`` Keyword that was searched

.. describe:: category

    **Optional** ``string`` Category seleted in search engine - you can set it to false when not used.

.. describe:: searchCount

    **Optional** ``number`` Results on the results page - you can set it to false when not used.

.. describe:: dimensions

    **Optional**  ``object`` `Custom dimension <Custom Dimensions_>`_ that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage::

    _paq.push(["trackSiteSearch", "test", false, 20]);



Tracking user anonymously
``````````````````````````
To track visitor anonymously (without consent) use the ``setUserIsAnonymous`` function::

    _paq.push(["setUserIsAnonymous", isAnonymous]);

.. describe:: isAnonymous

    **Required** ``boolean`` Flag that sets anonymous tracking on and off

Example of usage::

    _paq.push(["setUserIsAnonymous", true]);

To disable tracking user anonymously (after visitor gave consent) use ``deanonymizeUser`` function::

    _paq.push(["deanonymizeUser"]);



Gathering navigation timing page performance metrics
``````````````````````````
To set up page performance metrics gathering use the ``setTimingDataSamplingOnPageLoad`` function::

    _paq.push(["setTimingDataSamplingOnPageLoad", updateTimingDataOnPageLoadSampling]);

.. describe:: updateTimingDataOnPageLoadSampling

    **Required** ``integer`` Value between 1 and 100 describing the percentage for data sampling

It sets another request triggered onLoad, after trackPageView setting timing data.
Normally we try to use trackPageView as soon as possible, not to lose any actions
but since it's usually before the full page was loaded then we don't have complete data about timing.
You may either trigger trackPageView after onLoad event or enable this option so the followup request
containing all timing values is sent after onLoad.

Argument to this function represents data sampling percentage (with possible integer values between 0 and 100).

Example of usage::

    _paq.push(["setTimingDataSamplingOnPageLoad", 0]); // disables timing data collection
    _paq.push(["setTimingDataSamplingOnPageLoad", 5]); // this is the default setting, uses 5% data sampling
    _paq.push(["setTimingDataSamplingOnPageLoad", 30]); // enables 30% data sampling (only around 30% of all tracked actions will collect timing data if possible)
    _paq.push(["setTimingDataSamplingOnPageLoad", 100]); // enables 100% data sampling (which means that all tracked actions will collect timing data if possible)

.. note::
    In order for this setting to make effect `setTimingDataSamplingOnPageLoad()` should be used before the `trackPageView()` function

.. note::
    If enabled, timing data is collected only when page view lasted longer than the time it takes the page to load no partial information is stored, all metrics or nothing
