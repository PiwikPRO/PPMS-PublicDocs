.. highlight:: js
.. default-domain:: js

Tracker Object Functions
========================

This document describes all functions available for Tracker object and how to create its instance.
This enables user to track on multiple Trackers at once.

Accessing Tracker Object
------------------------

To access Tracker object instance you must use  ``Piwik.getTracker`` function

.. function:: Piwik.getTracker(trackerUrl, siteId);

    Getter for Analytics Tracker instance.

    :param string trackerUrl: **Required** Url for Tracker
    :param string siteId: **Required** Site Id that will be linked to tracked data.
    :returns: Analytics Tracker instance



To access internal instance of the Tracker used for asynchronous tracking you must use  ``Piwik.getAsyncTracker`` function

.. function:: Piwik.getAsyncTracker(trackerUrl, siteId);

    Getter for Analytics Tracker instance.

    :param string trackerUrl: **Required** Url for Tracker
    :param string siteId: **Required** Site Id that will be linked to tracked data.
    :returns: Analytics Tracker instance

Tracking functions
------------------

.. function:: trackPageView(customPageTitle);

    Tracks a visit for page that function was run on.

    :param string customPageTitle: **Optional** Custom page title, for example ``document.title``

.. function:: trackEvent(category, action, name, value);

    Tracks events that should not trigger on page load, but when user performs an action

    :param string category: **Required** Category of event.
    :param string action: **Required** Event action, for example ``"link click"``.
    :param string name: **Optional** Event name, for example ``"Cancel button"``.
    :param string value: **Optional** Event value.

.. function:: trackGoal(idGoal, customRevenue, customData);

    Manualy tracks goal (conversion).

    :param int/string idGoal: **Required** Id of goal.
    :param int/float customRevenue: **Optional** Revenue value
    :param mixed customData: **Optional** Object with `Custom dimensions <Custom dimensions_>`_.

.. todo:: What else can be in customData?

.. function:: trackSiteSearch(keyword, category, resultCount);

    Function that tracks internal site searches.

    :param string keyword: **Required** String containing keyword that was searched.
    :param string/boolean category: **Optional** String with category selected in search engine, can set it to false when not used.
    :param number/boolean searchCount:  **Optional** Number of results on the results page, can be set to false when not used.

.. function:: enableHeartBeatTimer(delay);

    When user will enter single page on visit we will assume that total time spent on website was 0 ms.
    This Function will enable to measure that time more accurately.

    :param number delay: **Required** Time in seconds, when Tracker will send another request with heartbeat, default ``30``

.. function:: enableCrossDomainLinking();

    Function that will enable cross domain linking. That way visitors across domains will be linked.

.. function:: setCrossDomainLinkingTimeout(timeout);

    Function will change default time in which two visits across domains will be linked.

    :param number timeout: **Required** Time in seconds in which two visits across domains will be linked. Default is ``180``.

Ecommerce tracking
------------------

.. function:: addEcommerceItem(productSKU, productName, productCategory, price, quantity);

    Function that adds ecommerce item, can be used when adding and removing items from cart.

    :param string productSKU: **Required** String with product stock-keeping unit.
    :param string productName: **Optional** String with product name.
    :param Array<string> productCategory: **Optional** Product category, can be written as Array with up to 5 elements.
    :param string price: **Optional** String with product price.
    :param string quantity: **Optional** String with product quantity.

.. function:: trackEcommerceOrder(orderId, orderGrandTotal, orderSubTotal, orderTax, orderShipping, orderDiscount);

    Function that tracks Ecommerce order, also tracks all items previously added.

    :param string orderId: **Required** Unique order ID.
    :param number orderGrandTotal: **Required** Order Revenue grand total  - tax, shipping and discount included.
    :param number orderSubTotal: **Optional** Order sub total - without shipping.
    :param number orderTax: **Optional** Order tax amount.
    :param number orderShipping: **Optional** Order shipping costs.
    :param number orderDiscount: **Optional** Order discount amount.

.. function:: trackEcommerceCartUpdate(grandTotal);

    Function that tracks shopping cart value. Use this each time there is a change in cart as the last function after
    adding cart items.

    :param number grandTotal:  **Required** Order Revenue grand total  - tax, shipping and discount included.

.. function:: setEcommerceView(productSKU, productName, categoryName, productPrice);

    Function to track product or category page view, must be followed by ``trackPageView`` function.

    :param string productSKU: **Required** String with product stock-keeping unit.
    :param string productName: **Optional** String with product name.
    :param Array<string> productCategory: **Optional** Product category, can be written as Array with up to 5 elements.
    :param string price: **Optional** String with product price.


Custom variables
----------------

.. function:: setCustomVariable(index, name, value, scope);

    Function that sets a custom variable to be used later.

    :param string index: **Required** Number from 1 to 5 where variable is stored.
    :param string name: **Required** Name of the variable.
    :param string value: **Required** Value of the variable.
    :param string scope: **Required** Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: deleteCustomVariable(index, scope);

    Function that will delete a custom variable.

    :param string index: **Required** Number from 1 to 5 where variable is stored.
    :param string scope: **Required** Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: getCustomVariable(index, scope);

    Function that will return value of custom variable.

    :param string index: **Required** Number from 1 to 5 where variable is stored.
    :param string scope: **Required** Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: storeCustomVariablesInCookie();

Function will enable storing ``"visit"`` type custom variables in a first party cookie.
That will enable getting them via ``getCustomVariable`` function.


Custom dimensions
-----------------

.. function:: setCustomDimension(customDimensionId, customDimensionValue);

    Function that sets a custom dimension to be used later.

    :param string customDimensionId: **Required** Id of custom dimension.
    :param string customDimensionValue: **Required** Value of custom dimension.

.. function:: deleteCustomDimension(customDimensionId);

    Function that will delete a custom dimension.

    :param string customDimensionId: **Required** Id of custom dimension.

.. function:: getCustomDimension(customDimensionId);

    Function that will return value of custom dimension.

    :param string customDimensionId: **Required** Id of custom dimension.

Content Tracking
----------------

Impressions
^^^^^^^^^^^

.. function:: trackAllContentImpressions();

    Function that will scan DOM for content blocks and tracks impressions after all page will load.

.. function:: trackVisibleContentImpressions(checkOnScroll, watchInterval);

    Function that will scan DOM for all visible content blocks and will track these impressions.

    :param boolean checkOnScroll: **Optional** Enables tracking content blocks that will be visible after scroll event.
    :param number watchInterval: **Optional**  Interval, in milliseconds between checking for new visible content. Periodic checks can be disabled for performance reasons by setting ``0``. Default value: ``750``.

.. function:: trackContentImpressionsWithinNode(domNode);

    Function that will scan domNode with its childrens for all content blocks and will track impressions.

    :param domNode domNode: **Required** DOM node with content blocks (with ``data-track-content`` attribute) inside.

.. function:: trackContentImpression(contentName, contentPiece, contentTarget);

    Function that manually tracks content impression.

    :param string contentName: **Required** String containing name of Content Impression.
    :param string contentPiece: **Required** String containing name of Content Impression Piece.
    :param string contentTarget: **Required** String containing url of Content Impression Target.

.. function:: logAllContentBlocksOnPage();

Function that will print all content blocks in the console for debugging purposes.



Interactions
^^^^^^^^^^^^

.. function:: trackContentInteractionNode(domNode, contentInteraction);

    Function that tracks interaction within domNode. Can be used as a function inside onClick attribute.

    :param domNode domNode: **Required** Any node in content block or the block itself - it won't be tracked if no content block will be found
    :param string contentInteraction: **Optional** String containing name of interaction it can be anything ("click" etc). "Unknown" used as default.

.. function:: trackContentInteraction(contentInteraction, contentName, contentPiece, contentTarget);

    Function that tracks content interaction using given data.

    :param string contentInteraction: **Optional** String containing name of interaction it can be anything ("click" etc). "Unknown" used as default.
    :param string contentName: **Required** String containing name of Content Impression.
    :param string contentPiece: **Required** String containing name of Content Impression Piece.
    :param string contentTarget: **Required** String containing url of Content Impression Target.

Download and Outlink Tracking
-----------------------------

.. function:: trackLink(url, linkType, customData, callback);

    Function that will manually track download or outlink depending on type.

    :param string url: **Required** Address that link points to.
    :param string linkType: **Required** Type of link, if is set to ``"link"`` it will track an outlink, if it is set to ``"download"`` it will track a download.
    :param object customData: **Optional** Object containing `Custom dimension <Custom dimensions_>`_ that should be linked to tracked link.
    :param function callback: **Optional** Function that should be triggered after tracking link.

Tracking Outlink
^^^^^^^^^^^^^^^^

.. function:: enableLinkTracking(enable);

    Function that will register all link as trackable. (left and middle mouse buttons are being treated the same, right mouse button is treated as "open in a new tab")

    :param boolean enable: **Required** Set it to true to track links, false to disable tracking.

.. function:: setLinkClasses(classes);

    Function that sets classes to be treated as outlink. (``piwik-link`` is the default one)

    :param array/string classes: **Required** String containing CSS class, can be written as array of strings.


Tracking Downloads
^^^^^^^^^^^^^^^^^^

.. function:: setDownloadClasses(classes);

    Function that sets classes to be treated as outlink. (``piwik_download`` is the default one)

    :param array/string classes: **Required** String containing CSS class, can be written as array of strings.

.. function:: setDownloadExtensions(extensions);

    Function that will set a list of file extension that will be automatically recognized as a download action.

    :param array/string extensions: **Required** List of extensions to be set. Can be written as string : ``"zip|rar"`` or an array: ``["zip", "rar"]``

.. function:: addDownloadExtensions(extensions);

    Function that will add extensions to list of known extensions to be automatically recognized as a download action.

    :param array/string extensions: **Required** List of extensions to be set. Can be written as string : ``"zip|rar"`` or an array: ``["zip", "rar"]``

.. function:: removeDownloadExtensions(extensions);

    Function that will remove extensions from list of known extensions to be automatically recognized as a download action.

    :param array/string extensions: **Required** List of extensions to be set. Can be written as string : ``"zip|rar"`` or an array: ``["zip", "rar"]``

.. function:: setLinkTrackingTimer(time);

    Function that will set delay between tracking and download;

    :param number time: **Required** Delay between tracking and download, written in miliseconds.

.. function:: getLinkTrackingTimer();

    Function that will return delay between tracking and download.

Disabling tracking
^^^^^^^^^^^^^^^^^^

.. function:: setIgnoreClasses(classes);

    Function that will set classes to be ignored in tracking download and outlinks.

    :param array/string classes: **Required** String containing CSS class, can be written as array of strings.

User ID and Visitor ID Management
---------------------------------

User ID
^^^^^^^

.. function:: getUserId();

    Function that will return userId.

.. function:: setUserId(userId);

    Function that will set user ID to this user.

    :param string userId: **Required** Unique, non empty string preserved for each user.

Visitor ID
^^^^^^^^^^

.. function:: getVisitorId();

    Function that will return 16 characters ID for the visitor.

.. function:: getVisitorInfo();

    Function that will return visitor cookie contents outputed in array.

Tracking cookies management
---------------------------

Cookies that are used by analytics are first party cookies.

.. function:: disableCookies();

    Function that will disable all first party cookies. Existing ones will be deleted in the next page view.

.. function:: deleteCookies();

    Function that will delete existing tracking cookies after next page view.

.. function:: hasCookies();

    Function that will return if cookies are enabled in this browser.

.. function:: setCookieNamePrefix(prefix);

    Function that will set prefix for analytics tracking cookies. Default is ``"_pk_"``

    :param string prefix: **Required** String that will replace default analytics tracking cookies prefix.

.. function:: setCookieDomain(domain);

    Function that will set domain for the analytics tracking cookies.

    :param string domain: **Required** Domain that will be set as cookie domain. For enabling subdomain you can use wildcard sign or dot.

.. function:: setCookiePath(path);

    Function that will set analytics tracking cookies path.

    :param string path: **Required** Path that will be set, default is ``"/"``

.. function:: setSecureCookie(bool);

    Function that will toggle Secure cookie flag on all first party cookies. (If you are using HTTPS)

    :param boolean bool: **Required** If set to true it will add Secure cookie flag.

.. function:: setVisitorCookieTimeout(seconds);

    Function that will set expire date for visitor cookies.

    :param number seconds: **Required** Seconds after which the cookie will expire. Default is 13 months.

.. function:: setReferralCookieTimeout(seconds);

    Function that will set expire date for referral cookies.

    :param number seconds: **Required** Seconds after which the cookie will expire. Default is 6 months.

.. function:: setSessionCookieTimeout(seconds);

    Function that will set expire date for session cookies.

    :param number seconds: **Required** Seconds after which the cookie will expire. Default is 30 minutes.

Tracker Configuration
---------------------

.. function:: setDocumentTitle(title);

    Function that will set document tile that is being sent with tracking data.

    :param string title: **Optional** String that will override default ``document.title``

.. function:: setDomains(domains);

    Function that will set array of domains to be treated as local. Wildcards, dots are supported for subdomains.

    :param array<string> domains: **Required** Array of hostnames written as strings.

.. function:: setCustomUrl(customUrl);

    Function that will override default page's reported URL.

    :param string customUrl: **Required** Value that will override default URL.

.. function:: setReferrerUrl(url);

    Function that will override detected HttpReferer.

    :param string url: **Required** Value that will override HttpReferer.

.. function:: setApiUrl(url);

    Function that will set Analytics HTTP API URL endpoint. Usually root directory of analytics.

    :param string url: **Required** Path to Analytics HTTP API URL

.. function:: getPiwikUrl();

    Function that will return Analytics server URL.

.. function:: getCurrentUrl();

    Function that will return current url of the page. Custom URL will be returned if set.

.. function:: discardHashTag(enableFilter);

    Function that will toggle url hash tag recording.

    :param boolean enableFilter: **Required** If set to true hash tags won't be recorded.

.. function:: setGenerationTimeMs(generationTime);

    Function that override DOM Timing API provided time needed to download page.

    :param number generationTime: **Required** Time that will take to download page, in milliseconds.

.. function:: appendToTrackingUrl(appendToUrl);

    Function that will append a custom string to the tracking url.

    :param string appendToUrl: **Required** String tht will be added to the tracking url.

.. function:: setDoNotTrack(enable);

    Function that will disable tracking users who set the Do Not Track setting.

    :param boolean enable: **Required** When set to true tracking wont occur.

.. function:: killFrame();

    Function that will block site from being iframed.

.. function:: redirectFile(url);

    Function that will force browser to load URL if the tracked web page was saved as file.

    :param string url: **Required** Url that should be loaded.

.. function:: setHeartBeatTimer(minimumVisitLength, heartBeatDelay);

    Function that sets for how long the page has been viewed if the minimumVisitLength is attained.

    :param number minimumVisitLength: **Required** Minimum visit length in seconds.
    :param number heartBeatDelay: **Required** Update sever time threshold.

.. function:: getAttributionInfo();

    Function that will return visitor attribution array. (Referer and Campaign data)

.. function:: getAttributionCampaignName();

    Function that will return Attribution Campaign name.

.. function:: getAttributionCampaignKeyword();

    Function that will return Attribution Campaign keywords.

.. function:: getAttributionReferrerTimestamp();

    Function that will return Attribution Referrer timestamp.

.. function:: getAttributionReferrerUrl();

    Function that will return Attribution Referer Url.

.. function:: setCampaignNameKey(name);

    Function that will set campaign name parameters.

    :param string name: Campaign name.

.. function:: setCampaignKeywordKey(keyword);

    Function that will set campaign keyword parameters.

    :param array<string> keyword: **Required** Keyword parameters.

.. function:: setConversionAttributionFirstReferrer(bool);

    Function that will set if attribute will conversion to the first referrer

    :param boolean bool: **Required** If set to true attribute will convert to the first referrer otherwise it will be converted to most recent referrer.


Advanced Usage
--------------

.. function:: addListener(domElement);

    Function will add click listener to link element.

    :param DOMElement domElement: **Required** Element that click will trigger logging the click automatically.

.. function:: setRequestMethod(method);

    Function that will set the request method.

    :param string method: **Required** Method that will be used in requests. ``"GET"`` or ``"POST"`` are supported. The default is ``"GET"``

.. function:: setCustomRequestProcessing(function);

    Function that will process the request content.  The function will be called once the request (query parameters string) has been prepared, and before the request content is sent.

.. function:: setRequestContentType(contentType);

    Function that will set request Content-Type header. Used when ``"POST"`` method is set in ``setRequestMethod``

    :param string contentType: **Required** Content-Type value to be set.