.. highlight:: js
.. default-domain:: js

JavaScript tracking API
=======================
Following API allows user to:

    * track page views
    * track visits on multiple domains and subdomains
    * track ecommerce events (successful orders, cart changes, product and category views)
    * track content impressions
    * manage custom variables to use them later
    * track clicked links to external domains and download files

Installing Tracking code
------------------------
There are two ways of installing tracking code:

Installing tracking code via Tag Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This is the easiest and recommended way of tracking code installation.

#. Sign in to your Piwik PRO with your admin or Super User account.
#. Click on menu button on the top left.
#. Click on the Websites position.
#. Choose the website for which you want to implement a tracking code.
#. Select Installation tab.
#. The tracking code snippet for your website is displayed under Website code for asynchronous tags or Website code for synchronous tags.


Installing tracking code via code snippet.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Installation via snippet should be done only if Tag Manager is not available or you want to track multiple domains / subdomains.

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. PPMS configuration
additionally requires 2 changes in example code.

    * String ``XXX-XXX-XXX-XXX-XXX`` should be replaces with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    * String ``ppms.example.com`` should be replaced with your PPMS domain name.


.. code-block:: html

    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u="//ppms.example.com/";
        _paq.push(["setTrackerUrl", u+"piwik.php"]);
        _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);
        var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
        g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
      })();
    </script>

Command queue
-------------

Loading snippet creates following API function:

.. function:: _paq.push([command, ...args])

    JavaScript API interface.

    :param string command: Command name.
    :param args: Command arguments. Number of arguments and their function depend on command.
    :rtype: undefined

Commands
--------


Trigger tracking on demand
^^^^^^^^^^^^^^^^^^^^^^^^^^


Trigger custom event
````````````````````
Trigger (custom) events bound to user actions::

    _paq.push(["trackEvent", category, action, name, value, dimensions);

.. data:: category

    **Required** ``string`` Event category.

.. data:: action

    **Required** ``string`` Event action.

.. data:: name

    **Optional** ``string`` Event name.

.. data:: value

    **Optional** ``number`` Event value.

.. data:: dimensions

    **Optional**  :ref:`Custom dimension<Custom Dimensions>` that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage (tracking when user clicks on cancel button with exit intent)::

        _paq.push(["trackEvent", "Exit intent", "Click on button", "Cancel"]);

Track goal conversion
`````````````````````
Allows to manually track goal conversion. Used in `Goals` - `Days to Conversion` report. Command::

    _paq.push(["trackGoal", goal_name, goal_value, dimensions]);

.. data:: goal_name

    **Required** ``string`` Goal Name

.. data:: goal_value

    **Optional** ``number`` Tracked conversion value.

.. data:: dimensions

    **Optional** ``object``  :ref:`Custom dimension<Custom Dimensions>` that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

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
To add ecommerce item (for example to track changes in users cart using ``trackEcommerceCartUpdate``) use ``addEcommerceItem`` function::

    _paq.push(["addEcommerceItem", productSKU, productName, productCategory, productPrice, productQuantity]);

.. note::
    This function does not send any data to the :term:`Analytics`. It only prepares Ecommerce cart/order state to be
    send with :ref:trackEcommerceOrder <Tracking Ecommerce order> or :ref:trackEcommerceCartUpdate <Updating cart>.

.. data:: productSKU

    **Required** ``string`` Product stock-keeping unit.

.. data:: productName

    **Optional** ``string`` Product name.

.. data:: productCategory

    **Optional** ``array/string`` Product category, can be written as Array with up to 5 elements.

.. data:: productPrice

    **Optional** ``number`` with product price.

.. data:: productQuantity

    **Optional** ``number`` with product quantity.

.. warning::

    Product SKU, names and categories should be URL encoded.

.. warning::

    State of the cart is not maintained across the visit. You must add all products after each page view.

Example of usage::

    _paq.push(["addEcommerceItem", "craft-311", "Unicorn Iron on Patch", "Crafts & Sewing", "499", "3"]);

Tracking Ecommerce order
````````````````````````
To track successful ecommerce order (on checkout page for example) use ``trackEcommerceOrder`` function::

    _paq.push(["trackEcommerceOrder", orderId, orderGrandTotal, orderSubTotal, orderTax, orderShipping, orderDiscount]);

.. data:: orderId

    **Required** ``string`` Unique order ID.

.. data:: orderGrandTotal

    **Required** ``number`` Order Revenue grand total  - tax, shipping and discount included.

.. data:: orderSubTotal

    **Optional** ``number`` Order sub total - without shipping.
.. data:: orderTax

    **Optional** ``number`` Order tax amount.

.. data:: orderShipping

    **Optional** ``number`` Order shipping costs.

.. data:: orderDiscount

    **Optional** ``number`` Order discount amount.

Example of usage::

    _paq.push(["trackEcommerceOrder", "3352", 499, 399, 0, 100]);

Updating cart
`````````````
.. todo::
    Why Tracker doesn't count cartAmount by itself? Why user must do this?

To update user cart (when user adds new product or removes them from cart) use ``trackEcommerceCartUpdate`` function::

    _paq.push(["trackEcommerceCartUpdate", cartAmount]);

.. data:: cartAmount

    **Required** ``number`` Cart amount (sum of products).


.. warning::

    Before tracking cart update be sure you added all products in cart by using ``addEcommerceItem`` first.
    (Even ones that were in cart earlier) Then use this function last.

Example of usage::

        _paq.push(["trackEcommerceCartUpdate", 250]);

Tracking product / category view
````````````````````````````````
If you want to track when user enters product site, or is browsing products category use ``setEcommerceView`` function::

    _paq.push(["setEcommerceView", productSKU, productName, productCategory, productPrice]);

.. data:: productSKU

    **Required** ``string/boolean`` Product stock-keeping unit. False for tracking category.

.. data:: productName

    **Optional** ``string/boolean`` Product name. False for tracking category.

.. data:: productCategory

    **Optional** ``array/string`` Product category, can be written as Array with up to 5 elements.

.. data:: productPrice

    **Optional** ``number`` Product price.

.. warning::

    Product SKU, names and categories should be URL encoded.

Example of usage::

    _paq.push(["setEcommerceView", "craft-311", "Unicorn Iron on Patch", "Crafts & Sewing", "499"]);


Custom Variables
^^^^^^^^^^^^^^^^
.. todo::
    What's difference between custom variables and dimensions? Maybe some sort of help.center link?

.. todo::
    Set proper version for deprecated

.. deprecated:: 1.0.0
    We strongly advise to use custom dimensions.

Adding / Editing Custom Variable
````````````````````````````````
.. todo::

    Is this variable set in the portal / using API first, then I can use the id slot to define it's name and value?+
    What's name used for? Can it be accessed later? Is visit and session the same?


To set custom variable that can be used later, use ``setCustomVariable`` function::

    _paq.push(["setCustomVariable", index, name, value, scope]);

.. data:: index

    **Required** ``number`` Index from 1 to 5 where variable is stored

.. data:: name

   **Required** ``string`` Name of the variable

.. data:: value

   **Required** ``string`` Value of the variable limited to 200 characters.

.. data:: scope

   **Required** ``string`` Scope of the variable, "visit" or "page"


    .. note::

        Custom Variable with scope set on "visit" will be saved for visit, you don't need to save it every page.

.. warning::

    Index is separate for each variable scope.

Example of usage::

    _paq.push(["setCustomVariable", 1, "AspectRatio", "16:9", "visit"]);

Removing Custom Variable
````````````````````````
To remove custom variable you can use ``deleteCustomVariable`` function::

    _paq.push(["deleteCustomVariable", index, scope]);

.. data:: index

    **Required** ``number`` Index from 1 to 5 where variable is stored

.. data:: scope

    **Required** ``string`` Scope of the variable, "visit" or "page"

Example of usage::

    _paq.push(["deleteCustomVariable", 1, "visit"]);

Accessing Custom Variable
`````````````````````````
.. todo::
    It would be nice to have some examples of returned data.

You can access custom variables by providing function that will use ``getCustomVariable`` function::

    _paq.push([ function() {
        var customVariable = this.getCustomVariable(index, scope );
    }]);

.. function:: getCustomVariable(index, scope)

    :param number index: **Required** Number from 1 to 5 where variable is stored

    :param string scope: **Required** Scope of the variable, "visit" or "page"

Example of usage::

    _paq.push([ function() {
        var customVariable = this.getCustomVariable(1, "visit" );
        console.log(customVariable);
    }]);

Custom Dimensions
^^^^^^^^^^^^^^^^^

Tracking Custom Dimension
`````````````````````````
If you want to set custom dimension to use it in tracking functions use ``setCustomDimension`` function::

    _paq.push(["setCustomDimension", customDimensionID, customDimensionValue]);

.. data:: customDimensionID

    **Required** ``number`` Id of dimension

.. data:: customDimensionValue

    **Required** ``string`` Value of Custom Dimension - limited to 255 characters.

.. warning::

    When you set Custom Dimension that value will be used in all tracking requests within page load.

Example of usage::

    _paq.push(["setCustomDimension", 3, "loginStatus"]);


Retrieving Custom Dimension
```````````````````````````
.. todo::
    It would be nice to have some examples of returned data.

You can access custom dimension by providing function that will use ``getCustomDimension`` function::

    _paq.push([ function() {
        var customDimension = this.getCustomDimension(index);
    }]);

.. function:: getCustomDimension(index, scope)

    :param number index: **Required** Index of custom dimension

Example of usage::

    _paq.push([ function() {
        var customDimension = this.getCustomDimension(1);
        console.log(customDimension);
    }]);

Content Tracking
^^^^^^^^^^^^^^^^
Content Tracking tracks how many times specific elements were rendered/visible. It can be used to measure if ad placement was visible or if user have seen end of article.

To track content, it has to have ``data-track-content`` css class attached to it.

Tracking all content impressions within a page
``````````````````````````````````````````````
To track all content impression you can use ``trackAllContentImpressions`` function. If this function will be invoked
multiple times it won't send duplicated data unless ``trackPageView`` was used between invocations::

    _paq.push(["trackAllContentImpressions"]);

Tracking all visible content impressions
````````````````````````````````````````
To track all visible content impressions you can use ``trackVisibleContentImpressions`` function.

Code::

    _paq.push(["trackVisibleContentImpressions", checkOnScroll, watchInterval]);

.. data:: checkOnScroll

    **Optional** ``boolean`` If ``true`` it will check new visible content impressions on scroll event.
    Default: ``true``.

    .. note:: It won't detect content blocks placed in a scrollable element.

.. data:: watchInterval

    **Optional** ``number`` Interval, in milliseconds between checking for new visible content. Periodic checks can be disabled for performance reasons by setting ``0``. Default value: ``750``.

.. warning::

    Both options cannot be changed after initial setup.

Example of usage::

    _paq.push(["trackVisibleContentImpressions", true]);


Example of usage::

    _paq.push(["trackVisibleContentImpressions", false, 500]);

Tracking only content impressions for specific page part
````````````````````````````````````````````````````````

To track impressions on part of a webpage that will be populated after page load you
 can use ``trackContentImpressionsWithinNode``::

    _paq.push(["trackContentImpressionsWithinNode", domNode]);

.. data:: domNode

    **Required** ``domNode`` DOM element that will have impression DOM elements with ``data-track-content`` attribute

It can be used with ``trackVisibleContentImpressions`` to track only visible content impressions

Example of usage::

    var element = document.querySelector("#impressionContainer");
    _paq.push(["trackContentImpressionsWithinNode", element]);

Track interactions manually with auto detection
```````````````````````````````````````````````
If you want to trigger an interaction manually (for example on click) you
can do it using ``trackContentInteractionNode``, just add this function as an eventListener for action you want::

    _paq.push(["trackContentInteractionNode", domNode, contentInteraction]);

.. data:: domNode

    **Required** ``domNode`` Any node in content block or the block itself - it won't be tracked if no content block will be found inside or on it.

.. data:: contentInteraction

    **Required** ``string`` Name of interaction it can be anything ("click" etc). "Unknown" used as default.

Example of use

.. code-block:: html

    <button onClick = function(){_paq.push(["trackContentInteractionNode", this, "clicked"]);}>Click me!</button>


Track impression manually
`````````````````````````
If you want to trigger tracking impressions fully manually you can use ``trackContentImpression``

    _paq.push(["trackContentImpression", contentName, contentPiece, contentTarget]);

.. data:: contentName

    **Required** ``string`` Name of Content Impression

.. data:: contentPiece

    **Required** ``string`` Name of Content Impression Piece

.. data:: contentTarget

    **Required** ``string`` Url of Content Impression Target

Example of use::

    _paq.push(["trackContentImpression", "trackingWhitepaper", "document", "http://cooltracker.tr/whitepaper]);




Track user interaction manually
```````````````````````````````
If you want to trigger tracking interactions fully manually you can use ``trackContentInteraction``
Use it as a function inside listener on event::

    _paq.push(["trackContentInteraction", contentInteraction, contentName, contentPiece, contentTarget]);

.. data:: contentInteraction

    **Required** ``string`` Name of interaction it can be anything ("click" etc). "Unknown" used as default.

.. data:: contentName

    **Required** ``string`` Name of Content Impression

.. data:: contentPiece

    **Required** ``string`` Name of Content Impression Piece

.. data:: contentTarget

    **Required** ``string`` Url of Content Impression Target

Example of use::

    _paq.push(["trackContentImpression", "clicked", "trackingWhitepaper", "document", "http://cooltracker.tr/whitepaper]);

.. warning::
    Use this function in conjunction with ``trackContentImpression`` as it can only be mapped with an impression by linking ``contentName``
    it's not mapping automatically as  ``trackContentInteractionNode``.

Download and Outlink Tracking
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Tracking Outlink
````````````````

To enable Download & Outlink tracking run::

    _paq.push(["enableLinkTracking"]);

just after first ``trackPageView`` or ``trackEvent``

.. note::

    All Outlinks are tracked automatically. As ``enableLinkTracking`` is part of default snippet.

Ignoring alias domains
++++++++++++++++++++++

To ignore internal outlinks from alias domains use ``setDomains`` function to define internal domains and subdomains, you can use wildcard::

    _paq(["setDomains", domains]);

.. data:: domains

    **Required** ``array`` Domains written as strings, * are accepted.

Example of usage::

    _paq(["setDomains", ["*.example.com", "*.example.co.uk"]]);

Force Tracking using CSS class
++++++++++++++++++++++++++++++

To track clicking a link as an outlink using CSS class simply add ``piwik_link`` class to link element.
Then it will be considered as an outlink even if it points to the same domain.

This class name can be changed, use ``setLinkClasses`` to define which CSS class should be tracked::

    _paq.push(["setLinkClasses", className]);

.. data:: className

    **Required** ``string`` CSS class that should be tracked instead of ``piwik_link``

Example of usage::

    _paq(["setLinkClasses", "track-this-link"]);

Force Tracking using JS function
++++++++++++++++++++++++++++++++

If you want to use JS to force outlink to be tracked you can add ``trackLink`` function to element ``onClick`` attribute::

    _paq.push(["trackLink", linkAddress, "link", dimensions]);

.. data:: linkAddress

    **Required** ``string`` Address that link points to.

.. data:: dimensions

    **Optional** ``object`` :ref:`Custom dimension<Custom Dimensions>` that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }


Example of usage

.. code-block:: html

    <button onClick = function(){_paq.push(["trackLink", "http://www.example.com/example", "link"]);}>
        Click me!
    </button>

Tracking Downloads
``````````````````
.. todo::
    Is download only tracking links to files ending on extension? What about GET parameters?

Default extensions recognized as download
+++++++++++++++++++++++++++++++++++++++++

Following extensions are tracked as download by default:


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

You can add extension to default extensions list using ``addDownloadExtensions`` function::

    _paq.push(["addDownloadExtensions", extensions]);

.. data:: extensions

    **Required** ``string`` Extensions separated by ``|`` for example ``"mhj|docx"``


Example of usage::

    _paq.push(["addDownloadExtensions", "mhj|docx"]);

Replacing default extensions list
+++++++++++++++++++++++++++++++++

Default extensions list can be overwritten using ``setDownloadExtensions`` function::

    _paq.push(["setDownloadExtensions", extensions]);

.. data:: extensions

    **Required** ``string`` Extensions separated by ``|`` for example ``"7z|apk|mp4"``


Example of usage::

    _paq.push(["setDownloadExtensions", "7z|apk|mp4"]);

Force Tracking download using CSS class
+++++++++++++++++++++++++++++++++++++++

To track clicking a link as an download using css class simply add ``piwik_download`` class to link element.

This class name can be changed, use ``setDownloadClasses`` to define which CSS class should be tracked::

    _paq.push(["setDownloadClasses", className]);


.. data:: className

    **Required** ``string`` CSS class that should be tracked instead of ``piwik_download``

Example of usage::

    _paq(["setDownloadClasses", "track-this-link-for-download"]);

Force Tracking download using JS function
+++++++++++++++++++++++++++++++++++++++++

If you want to use JS to force tracking download can add ``trackLink`` function to element ``onClick`` attribute::

    _paq.push(["trackLink", linkAddress, "download", dimensions]);

.. data:: linkAddress

    **Required** ``string`` Address that link points to.

.. data:: dimensions

    **Optional**  ``object`` :ref:`Custom dimension<Custom Dimensions>` that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage

.. code-block:: html

    <button onClick = function(){_paq.push(["trackLink", "http://www.example.com/example.xrt", "download"]);}>
        Click me!
    </button>

Setting Download delay
++++++++++++++++++++++

After each outbound link there is small time frame after which the file will download that will
ensure there is enough time to track download.
That time frame is set to 500ms by default. To modify it you can use ``setLinkTrackingTimer`` function::

    _paq.push(["setLinkTrackingTimer" time]);

.. data:: time

    **Required** ``number`` Time in ms between user interaction and downloading file.


Disabling tracking
``````````````````

You can disable download and outlink tracking for links using CSS classes, simply add ``piwik_ignore`` css class.

To disable using CSS class you can use ``setIgnoreClassess`` function::

    _paq.push(["setIgnoreClasses", className);

.. data:: className

    **Required** ``string`` Css class name that will be ignored


User ID Management
^^^^^^^^^^^^^^^^^^
User ID enables merging user data that is collected between many devices and browsers.

You must provide unique user-id for every user. To set user ID for tracked data use ``setUserId`` function::

    _paq.push(["setUserId", userID]);

.. data:: userID

    **Required** ``string``  Unique, non empty permanent ID of the user in application.

Tracking domains and subdomains
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. note::

    We highly recommend using template from Tag Manager to set up tracking for Analytics module (including customizations).


Tracking single domain
``````````````````````
To track single domain name without tracking subdomains (or single subdomain) use default snippet code

This code should be added near the top of the ``<head>`` tag and before any other script or CSS tags. PPMS configuration
additionally requires 2 changes in example code.

    * String ``XXX-XXX-XXX-XXX-XXX`` should be replaces with :term:`app ID` (e.g. ``efcd98a5-335b-48b0-ab17-bf43f1c542be``).
    * String ``ppms.example.com`` should be replaced with your PPMS domain name.

.. code-block:: html

    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(["trackPageView"]);
      _paq.push(["enableLinkTracking"]);
      (function() {
        var u="//ppms.example.com/";
        _paq.push(["setTrackerUrl", u+"piwik.php"]);
        _paq.push(["setSiteId", "XXX-XXX-XXX-XXX-XXX"]);
        var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
        g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
      })();
    </script>

Tracking domains and all subdomains of the website
``````````````````````````````````````````````````
To track all data between domain and all its subdomains we must use cookies using this snippet::

    _paq.push(["setSiteId", 1]);
    _paq.push(["setTrackerUrl", u+"piwik.php"]);

    // Share the tracking cookie across example.com, www.example.com, subdomain.example.com, ...
    _paq.push(["setCookieDomain", "*.example.com"]);

    // Tell Piwik the website domain so that clicks on these domains are not tracked as "Outlinks"
    _paq.push(["setDomains", "*.example.com"]);

    _paq.push(["trackPageView"]);

Tracking between multiple domains
`````````````````````````````````
To setup tracking between multiple domains you must use multiple functions ``setDomains`` to set a list of domains and
``enableCrossDomainLinking`` to enable cross domain linking::

    _paq.push(["setDomains", domains]);

.. data:: domains

    **Required** ``array`` Domains array, with wildcards

::

    _paq.push(["enableCrossDomainLinking"]);

Tracking subdirectories of domain in separate websites.
```````````````````````````````````````````````````````
To differentiate parts of website as another site for tracker user must do::

    _paq.push(["setSiteId", "IDSITE1"]);
    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["trackPageView"]);

And on part that user wants to exclude as another site::

    _paq.push(["setSiteId", "IDSITE2"]);

    _paq.push(["setCookiePath", "/data/something_useful"]);

    _paq.push(["setDomains", "example.com/data/something_useful"]);

    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["trackPageView"]);

That way all things tracked on ``/data/something_useful`` will be tracked as site ``IDSITE2``

If you want to track group of pages as separate site you can use wildcard in ``setDomains`` function.

Miscellaneous
^^^^^^^^^^^^^

Custom page name
````````````````

We are using current page URL as the page title. To change this use ``setDocumentTitle`` function::

    _paq.push(["setDocumentTitle", title]);

.. data:: title

    **Required** ``string`` Title to show instead of url

Example of usage::

    _paq.push(["setDocumentTitle", document.title]);

Measuring user time spent on web page
`````````````````````````````````````
When user will enter single page on visit we will assume that total time spent on website was 0 ms.
To measure that time properly you can use ``enableHeartBeatTimer`` function::

    _paq.push(["enableHeartBeatTimer", beat]);

.. data:: beat

    **Required** ``number`` Time in seconds, when send another request with heartbeat, default ``30``

Example of usage::

    _paq.push(["enableHeartBeatTimer", 50]);

Tracking internal searches
``````````````````````````
To track search requests on your site use ``trackSiteSearch`` function::

    _paq.push(["trackSiteSearch", keyword, category, searchCount, dimensions]);

.. data:: keyword

    **Required** ``string`` Keyword that was searched

.. data:: category

    **Required** ``string`` Category seleted in search engine - you can set it to false when not used.

.. data:: searchCount

    **Required** ``number`` Results on the results page - you can set it to false when not used.

.. data:: dimensions

    **Optional**  ``object`` :ref:`Custom dimension<Custom Dimensions>` that should be tracked with this action. Can be multiple dimensions.
    Written as object property using ``dimension{ID}`` notation.

    Example::

        {
           dimension1: "example value",
           dimension2: "example value"
        }

Example of usage::

    _paq.push(["trackSiteSearch", "test", false, 20]);

