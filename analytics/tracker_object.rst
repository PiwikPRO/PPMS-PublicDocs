.. highlight:: js
.. default-domain:: js

Tracker Object Functions
========================

This document describes all the functions available for the Tracker object and how to create its instances.
This enables users to track multiple Trackers at once.

Accessing Tracker Object
------------------------

To access Tracker object instance you must use the ``Piwik.getTracker`` function

.. function:: Piwik.getTracker(trackerUrl, siteId)

    Getter for Analytics Tracker instance.

    :param string trackerUrl: **Required** URL for Tracker
    :param string siteId: **Required** Site ID that will be linked to tracked data.
    :returns: Analytics Tracker instance



To access internal instance of the Tracker used for asynchronous tracking you must use the ``Piwik.getAsyncTracker`` function

.. function:: Piwik.getAsyncTracker(trackerUrl, siteId)

    Getter for Analytics Tracker instance.

    :param string trackerUrl: **Required** URL for Tracker
    :param string siteId: **Required** Site Id that will be linked to tracked data.
    :returns: Analytics Tracker instance

Tracking functions
------------------

.. function:: trackPageView([customPageTitle])

    Tracks a visit on the page that the function was run on.

    :param string customPageTitle: **Optional** Custom page title, for example ``document.title``

.. function:: trackEvent(category, action[, name, value])

    Tracks events that should not trigger on page loading, but only when user performs an action

    :param string category: **Required** Category of event.
    :param string action: **Required** Event action, for example ``"link click"``.
    :param string name: **Optional** Event name, for example ``"Cancel button"``.
    :param string value: **Optional** Event value.

.. function:: trackGoal(idGoal[, customRevenue, customData])

    Manually tracks goal (conversion).

    :param int/string idGoal: **Required** Id of goal.
    :param int/float customRevenue: **Optional** Revenue value
    :param mixed customData: **Optional** Object with `Custom dimensions <Custom dimensions_>`_.

.. todo:: What else can be in customData?

.. function:: trackSiteSearch(keyword[, category, resultCount])

    The function that tracks internal site searches.

    :param string keyword: **Required** String containing keyword that was searched.
    :param string/boolean category: **Optional** String with category selected in search engine, can set it to false when not used.
    :param number/boolean searchCount:  **Optional** Number of results on the results page, can be set to false when not used.

.. function:: enableHeartBeatTimer(delay)

    When the user will enter a single page during a visit, we will assume that his total time spent on the website was 0 ms.
    To measure that time more accurately you can use the ``enableHeartBeatTimer`` function::

    :param number delay: **Required** Time in seconds between cyclical heartbeat requests, default ``30``

.. function:: enableCrossDomainLinking()

    The function that will enable cross domain linking. That way visitors across domains will be linked.

.. function:: setCrossDomainLinkingTimeout(timeout)

    The function will change default time in which two visits across domains will be linked.

    :param number timeout: **Required** Time in seconds in which two visits across domains will be linked. Default is ``180``.

Ecommerce tracking
------------------

.. function:: addEcommerceItem(productSKU[, productName, productCategory, price, quantity])

    The function that adds ecommerce item, can be used when adding and removing items from cart.

    :param string productSKU: **Required** String with product stock-keeping unit.
    :param string productName: **Optional** String with product name.
    :param Array<string> productCategory: **Optional** Product category, can be written as Array with up to 5 elements.
    :param string price: **Optional** String with product price.
    :param string quantity: **Optional** String with product quantity.

.. function:: trackEcommerceOrder(orderId, orderGrandTotal[, orderSubTotal, orderTax, orderShipping, orderDiscount])

    The function that tracks Ecommerce order, also tracks all items previously added.

    :param string orderId: **Required** Unique order ID.
    :param number orderGrandTotal: **Required** Order Revenue grand total  - tax, shipping and discount included.
    :param number orderSubTotal: **Optional** Order sub total - without shipping.
    :param number orderTax: **Optional** Order tax amount.
    :param number orderShipping: **Optional** Order shipping costs.
    :param number orderDiscount: **Optional** Order discount amount.

.. function:: trackEcommerceCartUpdate(grandTotal)

    The function that tracks the shopping cart value. Use this each time there is a change in cart as the last function after
    adding cart items.

    :param number grandTotal:  **Required** Order Revenue grand total  - tax, shipping and discount included.

.. function:: setEcommerceView(productSKU[, productName, categoryName, productPrice])

    The function to track product or category page view, must be followed by the ``trackPageView`` function.

    :param string productSKU: **Required** String with product stock-keeping unit.
    :param string productName: **Optional** String with product name.
    :param Array<string> productCategory: **Optional** Product category, can be written as Array with up to 5 elements.
    :param string price: **Optional** String with product price.


Custom variables
----------------

.. function:: setCustomVariable(index, name, value, scope)

    The function that sets a custom variable to be used later.

    :param string index: **Required** Number from 1 to 5 where variable is stored.
    :param string name: **Required** Name of the variable.
    :param string value: **Required** Value of the variable.
    :param string scope: **Required** Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: deleteCustomVariable(index, scope)

    The function that will delete a custom variable.

    :param string index: **Required** Number from 1 to 5 where variable is stored.
    :param string scope: **Required** Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: getCustomVariable(index, scope)

    The function that will return the value of custom variable.

    :param string index: **Required** Number from 1 to 5 where variable is stored.
    :param string scope: **Required** Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: storeCustomVariablesInCookie()

    The function will enable storing ``"visit"`` type custom variables in a first party cookie.
    That will enable getting them via the ``getCustomVariable`` function.


Custom dimensions
-----------------

.. function:: setCustomDimension(customDimensionId, customDimensionValue)

    The function that sets a custom dimension to be used later.

    :param string customDimensionId: **Required** Id of custom dimension.
    :param string customDimensionValue: **Required** Value of custom dimension.

.. function:: deleteCustomDimension(customDimensionId)

    The function that will delete a custom dimension.

    :param string customDimensionId: **Required** Id of custom dimension.

.. function:: getCustomDimension(customDimensionId)

    The function that will return the value of custom dimension.

    :param string customDimensionId: **Required** Id of custom dimension.

Content Tracking
----------------

Impressions
^^^^^^^^^^^

.. function:: trackAllContentImpressions()

    The function that will scan DOM for content blocks and tracks impressions after all page will load.

.. function:: trackVisibleContentImpressions([checkOnScroll, watchInterval])

    The function that will scan DOM for all visible content blocks and will track these impressions.

    :param boolean checkOnScroll: **Optional** Enables tracking content blocks that will be visible after scroll event.
    :param number watchInterval: **Optional**  Interval, in milliseconds between checking for new visible content. Periodic checks can be disabled for performance reasons by setting ``0``. Default value: ``750``.

.. function:: trackContentImpressionsWithinNode(domNode)

    The function that will scan domNode (with its children) for all content blocks and will track impressions.

    :param domNode domNode: **Required** DOM node with content blocks (with ``data-track-content`` attribute) inside.

.. function:: trackContentImpression(contentName, contentPiece, contentTarget)

    The function that manually tracks content impression.

    :param string contentName: **Required** String containing name of Content Impression.
    :param string contentPiece: **Required** String containing name of Content Impression Piece.
    :param string contentTarget: **Required** String containing URL of Content Impression Target.

.. function:: logAllContentBlocksOnPage()

    The function that will print all content blocks in the console for debugging purposes.



Interactions
^^^^^^^^^^^^

.. function:: trackContentInteractionNode(domNode[, contentInteraction])

    The function that tracks interaction within domNode. This can be used as a function inside the onClick attribute.

    :param domNode domNode: **Required** Node marked as content block or containing content blocks. If no content block
        will be found - nothing will be tracked.
    :param string contentInteraction: **Optional** Name of interaction (e.g. ``"click"``). Default value: ``"Unknown"``.

.. function:: trackContentInteraction(contentInteraction, contentName, contentPiece, contentTarget)

    The function that tracks content interaction using the given data.

    :param string contentInteraction: **Required** Name of interaction (e.g. ``"click"``).
    :param string contentName: **Required** Name of Content Impression.
    :param string contentPiece: **Required** Name of Content Impression Piece.
    :param string contentTarget: **Required** URL of Content Impression Target.

Download and Outlink Tracking
-----------------------------

.. function:: trackLink(url, linkType[, customData, callback])

    The function that will manually track downloads or outlinks, depending on type.

    :param string url: **Required** Address that link points to.
    :param string linkType: **Required** Type of link, if is set to ``"link"`` it will track an outlink, if it is set to ``"download"`` it will track a download.
    :param object customData: **Optional** Object containing `Custom dimension <Custom dimensions_>`_ that should be linked to tracked link.
    :param function callback: **Optional** The function that should be triggered after tracking link.

Tracking Outlink
^^^^^^^^^^^^^^^^

.. function:: enableLinkTracking(enable)

    The function that will register all links as trackable (left and middle mouse buttons are being treated the same, right mouse button is treated as "open in a new tab").

    :param boolean enable: **Required** Set it to true to track links, false to disable tracking.

.. function:: setLinkClasses(classes)

    The function that sets classes to be treated as outlinks (``piwik-link`` is the default one).

    :param array/string classes: **Required** String containing CSS class, can be written as array of strings.


Tracking Downloads
^^^^^^^^^^^^^^^^^^

.. function:: setDownloadClasses(classes)

    The function that sets classes to be treated as downloads (``piwik_download`` is the default one).

    :param array/string classes: **Required** String containing CSS class, can be written as array of strings.

.. function:: setDownloadExtensions(extensions)

    The function that will set a list of file extensions that will automatically be recognized as a download action.

    :param array/string extensions: **Required** List of extensions to be set. Can be written as string : ``"zip|rar"`` or an array: ``["zip", "rar"]``

.. function:: addDownloadExtensions(extensions)

    The function that will add extensions to a list of known extensions to be automatically recognized as a download action.

    :param array/string extensions: **Required** List of extensions to be set. Can be written as string : ``"zip|rar"`` or an array: ``["zip", "rar"]``

.. function:: removeDownloadExtensions(extensions)

    The function that will remove extensions from a list of known extensions to be automatically recognized as a download action.

    :param array/string extensions: **Required** List of extensions to be set. Can be written as string : ``"zip|rar"`` or an array: ``["zip", "rar"]``

.. function:: setLinkTrackingTimer(time)

    The function that will set delay between tracking and download;

    :param number time: **Required** Delay between tracking and download, written in miliseconds.

.. function:: getLinkTrackingTimer()

    The function that will return delay between tracking and download.

Disabling tracking
^^^^^^^^^^^^^^^^^^

.. function:: setIgnoreClasses(classes)

    The function that will set classes to be ignored in tracking download and outlinks.

    :param array/string classes: **Required** String containing CSS class, can be written as array of strings.

User ID and Visitor ID Management
---------------------------------

User ID
^^^^^^^

.. function:: getUserId()

    The function that will return user ID.

.. function:: setUserId(userId)

    The function that will set user ID to this user.

    :param string userId: **Required** Unique, non-empty string preserved for each user.

Visitor ID
^^^^^^^^^^

.. function:: getVisitorId()

    The function that will return 16 characters ID for the visitor.

.. function:: getVisitorInfo()

    The function that will return visitor information in an array:

    * new visitor flag indicating new (``1``) or returning (``0``) visitor
    * visitor ID (UUID)
    * first visit timestamp (Unix epoch time)
    * previous visit count (``0`` for first visit)
    * current visit timestamp (Unix epoch time)
    * last visit timestamp (Unix epoch time or ``''`` if N/A)
    * last e-commerce order timestamp (Unix epoch time or ``''`` if N/A)

Tracking cookies management
---------------------------

Cookies that are used by analytics are first party cookies.

.. function:: disableCookies()

    The function that will disable all first party cookies. Existing ones will be deleted in the next page view.

.. function:: deleteCookies()

    The function that will delete existing tracking cookies after the next page view.

.. function:: hasCookies()

    The function that will return ``true`` if cookies are enabled in this browser.

.. function:: setCookieNamePrefix(prefix)

    The function that will set the prefix for analytics tracking cookies. Default is ``"_pk_"``

    :param string prefix: **Required** String that will replace default analytics tracking cookies prefix.

.. function:: setCookieDomain(domain)

    The function that will set the domain for the analytics tracking cookies.

    :param string domain: **Required** Domain that will be set as cookie domain. For enabling subdomain you can use wildcard sign or dot.

.. function:: setCookiePath(path)

    The function that will set the analytics tracking cookies path.

    :param string path: **Required** Path that will be set, default is ``"/"``

.. function:: setSecureCookie(bool)

    The function that will toggle the Secure cookie flag on all first party cookies (if you are using HTTPS).

    :param boolean bool: **Required** If set to true it will add Secure cookie flag.

.. function:: setVisitorCookieTimeout(seconds)

    The function that will set the expiration time of visitor cookies.

    :param number seconds: **Required** Seconds after which the cookie will expire. Default is 13 months.

.. function:: setReferralCookieTimeout(seconds)

    The function that will set the expiration time of referral cookies.

    :param number seconds: **Required** Seconds after which the cookie will expire. Default is 6 months.

.. function:: setSessionCookieTimeout(seconds)

    The function that will set the expiration time of session cookies.

    :param number seconds: **Required** Seconds after which the cookie will expire. Default is 30 minutes.

Tracker Configuration
---------------------

.. function:: setDocumentTitle([title])

    The function that will set the document tile that is being sent with tracking data.

    :param string title: **Optional** String that will override default ``document.title``

.. function:: setDomains(domains)

    The function that will set an array of domains to be treated as local. Sub-domain wildcards are supported (e.g. ``*.example.com``).

    :param array<string> domains: **Required** Array of hostnames written as strings.

.. function:: setCustomUrl(customUrl)

    The function that will override tracked page URL. Tracker will use current page URL if custom URL was not set.

    :param string customUrl: **Required** Value that will override default URL.

.. function:: setReferrerUrl(url)

    The function that will override the detected HTTP referrer.

    :param string url: **Required** Value that will override HTTP referrer.

.. function:: setApiUrl(url)

    The function that will set the Analytic's HTTP API URL endpoint. Usually the root directory of analytics.

    :param string url: **Required** Path to Analytic's HTTP API URL

.. function:: getPiwikUrl()

    The function that will return the Analytic's server URL.

.. function:: getCurrentUrl()

    The function that will return the current URL of the page. The custom URL will be returned if set.

.. function:: discardHashTag(enableFilter)

    The function that will set tracker to include or remove
    `URL fragment identifier<https://en.wikipedia.org/wiki/Fragment_identifier>`_ from tracked URLs.

    :param boolean enableFilter: **Required** If set to true, URL fragment identifier will be removed from tracked URLs.

.. function:: setGenerationTimeMs(generationTime)

    The function that overrides DOM Timing API provided time needed to download the page.

    :param number generationTime: **Required** Time that will take to download page, in milliseconds.

.. function:: appendToTrackingUrl(appendToUrl)

    The function that will append a custom string to the tracking URL.

    :param string appendToUrl: **Required** String that will be added to the tracking URL.

.. function:: setDoNotTrack(enable)

    The function that will disable tracking users who set the Do Not Track setting.

    :param boolean enable: **Required** When set to true tracking wont occur.

.. function:: killFrame()

    The function that will block a site from being iframed.

.. function:: redirectFile(url)

    The function that will force the browser to load URL if the tracked web page was saved as a file.

    :param string url: **Required** URL that should be loaded.

.. function:: setHeartBeatTimer(minimumVisitLength, heartBeatDelay)

    The function that sets how long the page has been viewed for if the minimumVisitLength is attained.

    :param number minimumVisitLength: **Required** Minimum visit length in seconds.
    :param number heartBeatDelay: **Required** Update sever time threshold.

.. function:: getAttributionInfo()

    The function that will return visitor attribution array (Referrer and Campaign data).

.. function:: getAttributionCampaignName()

    The function that will return the Attribution Campaign name.

.. function:: getAttributionCampaignKeyword()

    The function that will return the Attribution Campaign keywords.

.. function:: getAttributionReferrerTimestamp()

    The function that will return the Attribution Referrer timestamp.

.. function:: getAttributionReferrerUrl()

    The function that will return the Attribution Referrer URL.

.. function:: setCampaignNameKey(name)

    The function that will set campaign name parameters.

    :param string name: **Required** Campaign name.

.. function:: setCampaignKeywordKey(keyword)

    The function that will set campaign keyword parameters.

    :param array<string> keyword: **Required** Keyword parameters.

.. function:: setConversionAttributionFirstReferrer(bool)

    The function that will set if an attribute will convert to the first referrer

    :param boolean bool: **Required** If set to true attribute will convert to the first referrer otherwise it will be converted to most recent referrer.


Advanced Usage
--------------

.. function:: addListener(domElement)

    The function will add a click listener to link element.

    :param DOMElement domElement: **Required** Element that click will trigger logging the click automatically.

.. function:: setRequestMethod(method)

    The function that will set the request method.

    .. todo:: Check if parameter is really required (it has default value in it's description).
    .. todo:: Check if it's needed to mention same domain or CORS setup for "POST".

    :param string method: **Required** Method that will be used in requests. ``"GET"`` or ``"POST"`` are supported. The default is ``"GET"``

.. function:: setCustomRequestProcessing(function)

    The function that will process the request content. The function will be called once the request (query parameters string) has been prepared, and before the request content is sent.

    .. todo::
        Change description to be more clear. I can't tell how passed function is used and what are it's parameters.
        It's mentioned in https://help.piwik.pro/account-basics/javascript-tracking-client/ but that description is also
        vague.

    .. todo:: Add parameter description.

.. function:: setRequestContentType(contentType)

    The function that will set tracking requests ``Content-Type`` header. Used when tracking uses the ``"POST"`` method (set by ``setRequestMethod``).

    :param string contentType: **Required** Content-Type value to be set.