.. highlight:: js
.. default-domain:: js

Tracker Object Functions
========================

Accessing Tracker Object
------------------------

To access tracker object instance you must use  ``Piwik.getTracker`` function

.. function:: Piwik.getTracker(trackerUrl, siteId);

    Getter for Analytics Tracker instance.

    :param string trackerUrl: Url for tracker
    :param string siteId: Site Id that will be linked to tracked data.
    :returns: Analytics Tracker instance



To access internal instance of the Tracker used for asynchronous tracking you must use  ``Piwik.getAsyncTracker`` function

.. function:: Piwik.getAsyncTracker(trackerUrl, siteId);

    Getter for Analytics Tracker instance.

    :param string trackerUrl: Url for tracker
    :param string siteId: Site Id that will be linked to tracked data.
    :returns: Analytics Tracker instance

Tracking functions
------------------

.. function:: trackPageView(customPageTitle);

    Tracks a visit for page that function was run on.

    :param string customPageTitle: Custom page title, for example ``document.title``

.. function:: trackEvent(category, action, name, value);

    Tracks events that should not trigger on page load, but when user performs an action

    :param string category: Category of event.
    :param string action: Event action, for example ``"link click"``.
    :param string name: Event name, for example ``"Cancel button"``. Optional.
    :param string value: Event value. Optional

.. function:: trackGoal(idGoal, customRevenue, customData);

    Manualy tracks goal (conversion).

    :param int/string idGoal: Id of goal.
    :param int/float customRevenue: Revenue value. Optional
    :param mixed customData: Object that can contain dimensions. Optional. See  :ref:`Custom dimensions` for more information about custom dimensions.

.. todo:: What else can be in customData?

.. function:: trackSiteSearch(keyword, category, resultCount);

    Function that will track internal site searches.

    :param string keyword: String containing keyword that was searched.
    :param string/boolean category: String with category selected in search engine, can set it to false when not used.
    :param number/boolean searchCount: Number of results on the results page, can be set to false when not used.

.. function:: enableHeartBeatTimer(delay);

    When user will enter single page on visit we will assume that total time spent on website was 0 ms.
Function will measure that time more accurately.

    :param number delay: Time in seconds, when send another request with heartbeat, default ``30``

.. function:: enableCrossDomainLinking();

    Function that will enable cross domain linking. That way visitors across domains will be linked.

.. function:: setCrossDomainLinkingTimeout(timeout);

    Function will change default time in which two visits across domains will be linked.

    :param number timeout: Time in seconds in which two visits across domains will be linked. Default is ``180``.

Ecommerce tracking
------------------

.. function:: addEcommerceItem(productSKU, productName, productCategory, price, quantity);

    Function that adds ecommerce item, can be used when adding and removing items from cart.

    :param string productSKU: String with product stock-keeping unit, required parameter.
    :param string productName: String with product name, optional.
    :param Array<string> productCategory: Product category, can be written as Array with up to 5 elements, optional.
    :param string price: String with product price, optional.
    :param string quantity: String with product quantity, optional.

.. function:: trackEcommerceOrder(orderId, orderGrandTotal, orderSubTotal, orderTax, orderShipping, orderDiscount);

    Function that tracks Ecommerce order, also tracks all items previously added.

    :param string orderId: Unique order ID, required.
    :param number orderGrandTotal: Order Revenue grand total  - tax, shipping and discount included, required.
    :param number orderSubTotal: Order sub total - without shipping, optional.
    :param number orderTax: Order tax amount, optional.
    :param number orderShipping: Order shipping costs, optional.
    :param number orderDiscount: Order discount amount, optional.

.. function:: trackEcommerceCartUpdate(grandTotal);

    Function that tracks shopping cart value. Use this each time there is a change in cart as the last function after
adding cart items.

    :param number grandTotal:  Order Revenue grand total  - tax, shipping and discount included, required.

.. function:: setEcommerceView(productSKU, productName, categoryName, productPrice);

    Function to track product or category page view, must be followed by ``trackPageView`` function.

    :param string productSKU: String with product stock-keeping unit, required parameter.
    :param string productName: String with product name, optional.
    :param Array<string> productCategory: Product category, can be written as Array with up to 5 elements, optional.
    :param string price: String with product price, optional.


Custom variables
----------------

.. function:: setCustomVariable(index, name, value, scope);

    Function that sets a custom variable to be used later.

    :param string index: Number from 1 to 5 where variable is stored.
    :param string name: Name of the variable.
    :param string value: Value of the variable.
    :param string scope: Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: deleteCustomVariable(index, scope);

    Function that will delete a custom variable.

    :param string index: Number from 1 to 5 where variable is stored.
    :param string scope: Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: getCustomVariable(index, scope);

    Function that will return value of custom variable.

    :param string index: Number from 1 to 5 where variable is stored.
    :param string scope: Scope of the variable, ``"visit"`` or ``"page"``.

.. function:: storeCustomVariablesInCookie();

Function will enable storing ``"visit"`` type custom variables in a first party cookie.
That will enable getting them via ``getCustomVariable`` function.


Custom dimensions
-----------------

.. function:: setCustomDimension(customDimensionId, customDimensionValue);

    Function that sets a custom dimension to be used later.

    :param string customDimensionId: Id of custom dimension.
    :param string customDimensionValue: Value of custom dimension.

.. function:: deleteCustomDimension(customDimensionId);

    Function that will delete a custom dimension.

    :param string customDimensionId: Id of custom dimension.

.. function:: getCustomDimension(customDimensionId);

    Function that will return value of custom dimension.

    :param string customDimensionId: Id of custom dimension.

Content Tracking
----------------

Impressions
^^^^^^^^^^^

.. function:: trackAllContentImpressions();

    Function that will scan DOM for content blocks and tracks impressions after all page will load.

.. function:: trackVisibleContentImpressions(checkOnScroll, timeIntervalInMs);

    Function that will scan DOM for all visible content blocks and will track these impressions.

    :param boolean checkOnScroll: Enables tracking content blocks that will be visible after scroll event.
    :param number timeIntervalInMs: If set it will invoke this function to track new visible content impressions on every X miliseconds.

.. function:: trackContentImpressionsWithinNode(domNode);

    Function that will scan domNode with its childrens for all content blocks and will track impressions.

    :param domNode domNode: DOM node with content blocks (with ``data-track-content`` attribute) inside.

.. function:: trackContentImpression(contentName, contentPiece, contentTarget);

    Function that manually tracks content impression.

    :param string contentName: String containing name of Content Impression.
    :param string contentPiece: String containing name of Content Impression Piece.
    :param string contentTarget: String containing url of Content Impression Target.

.. function:: logAllContentBlocksOnPage();

Function that will print all content blocks in the console for debugging purposes.



Interactions
^^^^^^^^^^^^

.. function:: trackContentInteractionNode(domNode, contentInteraction);

    Function that tracks interaction within domNode. Can be used as a function inside onClick attribute.

    :param domNode domNode: Any node in content block or the block itself - it won't be tracked if no content block will be found
    :param string contentInteraction: String containing name of interaction it can be anything ("click" etc). "Unknown" used as default.

.. function:: trackContentInteraction(contentInteraction, contentName, contentPiece, contentTarget);

    Function that content interaction using given data.

    :param string contentInteraction: String containing name of interaction it can be anything ("click" etc). "Unknown" used as default.
    :param string contentName: String containing name of Content Impression.
    :param string contentPiece: String containing name of Content Impression Piece.
    :param string contentTarget: String containing url of Content Impression Target.

Download and Outlink Tracking
-----------------------------

.. function:: trackLink(url, linkType, customData, callback);

    Function that will manually track download or outlink depending on type.

    :param string url: Address that link points to.
    :param string linkType: Type of link, if is set to ``"link"`` it will track an outlink, if it is set to ``"download"`` it will track a download.
    :param object customData: Object containing dimensions that should be linked to tracked link. See :ref:`Custom dimensions` for more information about custom dimensions.
    :param function callback: Function that should be triggered after tracking link.

Tracking Outlink
^^^^^^^^^^^^^^^^

.. function:: enableLinkTracking(enable);

    Function that will register all link as trackable. (left and middle mouse buttons are being treated the same, right mouse button is treated as "open in a new tab")

    :param boolean enable: Set it to true to track links, false to disable tracking.

.. function:: setLinkClasses(classes);

    Function that sets classes to be treated as outlink. (``piwik-link`` is the default one)

    :param array/string classes: String containing CSS class, can be written as array of strings.


Tracking Downloads
^^^^^^^^^^^^^^^^^^

.. function:: setDownloadClasses(classes);

    Function that sets classes to be treated as outlink. (``piwik_download`` is the default one)

    :param array/string classes: String containing CSS class, can be written as array of strings.

.. function:: setDownloadExtensions(extensions);

    Function that will set a list of file extension that will be automatically recognized as a download action.

    :param array/string extensions: List of extensions to be set. Can be written as string : ``"zip"`` or an array: ``["zip", "rar"]``

.. function:: addDownloadExtensions(extensions);

    Function that will add extensions to list of known extensions to be automatically recognized as a download action.

    :param array/string extensions: List of extensions to be set. Can be written as string : ``"zip"`` or an array: ``["zip", "rar"]``

.. function:: removeDownloadExtensions(extensions);

    Function that will remove extensions from list of known extensions to be automatically recognized as a download action.

    :param array/string extensions: List of extensions to be set. Can be written as string : ``"zip"`` or an array: ``["zip", "rar"]``

.. function:: setLinkTrackingTimer(time);

    Function that will set delay between tracking and download;

    :param number time: Delay between tracking and download, written in miliseconds.

.. function:: getLinkTrackingTimer();

    Function that will return delay between tracking and download.

Disabling tracking
^^^^^^^^^^^^^^^^^^

.. function:: setIgnoreClasses(classes);

    Function that will set classes to be ignored in tracking download and outlinks.

    :param array/string classes: String containing CSS class, can be written as array of strings.

User ID and Visitor ID Management
---------------------------------

User ID
^^^^^^^

.. function:: getUserId();

    Function that will return userId.

.. function:: setUserId(userId);

    Function that will set user ID to this user.

    :param string userId: Unique, non empty string preserved for each user.

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

    :param string prefix: String that will replace default analytics tracking cookies prefix.

.. function:: setCookieDomain(domain);

    Function that will set domain for the analytics tracking cookies.

    :param string domain: Domain that will be set as cookie domain. For enabling subdomain you can use wildcard sign or dot.

.. function:: setCookiePath(path);

    Function that will set analytics tracking cookies path.

    :param string path: Path that will be set, default is ``"/"``

.. function:: setSecureCookie(bool);

    Function that will toggle Secure cookie flag on all first party cookies. (If you are using HTTPS)

    :param boolean bool: If set to true it will add Secure cookie flag.

.. function:: setVisitorCookieTimeout(seconds);

    Function that will set expire date for visitor cookies.

    :param number seconds: Seconds after which the cookie will expire. Default is 13 months.

.. function:: setReferralCookieTimeout(seconds);

    Function that will set expire date for referral cookies.

    :param number seconds: Seconds after which the cookie will expire. Default is 6 months.

.. function:: setSessionCookieTimeout(seconds);

    Function that will set expire date for session cookies.

    :param number seconds: Seconds after which the cookie will expire. Default is 30 minutes.

Tracker Configuration
---------------------

.. function:: setDocumentTitle(title);

    Function that will set document tile that is being sent with tracking data.

    :param string title: String that will override default ``document.title``

.. function:: setDomains(domains);

    Function that will set array of domains to be treated as local. Wildcards, dots are supported for subdomains.

    :param array<string> domains: Array of hostnames written as strings.

.. function:: setCustomUrl(customUrl);

    Function that will override default pages reported URL.

    :param string customUrl: Value that will override default URL.

.. function:: setReferrerUrl(url);

    Function that will override detected HttpReferer.

    :param string url: Value that will override HttpReferer.

.. function:: setApiUrl(url);

    Function that will set Analytics HTTP API URL endpoint. Usually root directory of analytics.

    :param string url: Path to Analytics HTTP API URL

.. function:: getPiwikUrl();

    Function that will return Analytics server URL.

.. function:: getCurrentUrl();

    Function that will return current url of the page. Custom URL will be returned if set.

.. function:: discardHashTag(bool);

    Function that will toggle url hash tag recording.

    :param boolean bool: If set to true hash tags won't be recorded.

.. function:: setGenerationTimeMs(generationTime);

    Function that override DOM Timing API provided time needed to download page.

    :param number generationTime: Time that will take to download page, in milliseconds.

.. function:: appendToTrackingUrl(appendToUrl);

    Function that will append a custom string to the tracking url.

    :param string appendToUrl: String tht will be added to the tracking url.

.. function:: setDoNotTrack(bool);

    Function that will disable tracking users who set the Do Not Track setting.

    :param boolean bool: When set to true tracking wont occur.

.. function:: killFrame();

    Function that will block site from being iframed.

.. function:: redirectFile(url);

    Function that will force browser to load URL if the tracked web page was saved as file.

    :param string url: Url that should be loaded.

.. function:: setHeartBeatTimer(minimumVisitLength, heartBeatDelay);

    Function that sets for how long the page has been viewed if the minimumVisitLength is attained.

    :param number minimumVisitLength: Minimum visit length in seconds.
    :param number heartBeatDelay: Update sever time threshold.

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

    :param array<string> keyword: Keyword parameters.

.. function:: setConversionAttributionFirstReferrer(bool);

    Function that will set if attribute will conversion to the first referrer

    :param boolean bool: If set to true attribute will convert to the firs referrer otherwise it will be converted to most recent referrer.


Advanced Usage
--------------

.. function:: addListener(domElement);

    Function will add click listener to link element.

    :param DOMElement domElement: Element that click will trigger logging the click automatically.

.. function:: setRequestMethod(method);

    Function that will set the request method.

    :param string method: Method that will be used in requests. ``"GET"`` or ``"POST"`` are supported. The default is ``"GET"``

.. function:: setCustomRequestProcessing(function);

    Function that will process the request content.  The function will be called once the request (query parameters string) has been prepared, and before the request content is sent.

.. function:: setRequestContentType(contentType);

    Function that will set request Content-Type header. Used when ``"POST"`` method is set in ``setRequestMethod``

    :param string contentType: Content-Type value to be set.