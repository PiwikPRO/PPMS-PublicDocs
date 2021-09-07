.. highlight:: js
.. default-domain:: js

Guides
======

Installing Tracking code
------------------------

Using Tag Manager's snippet is the recommended and also the easiest way of installing tracking code on your website. When Tag Manager is added to the site, it automatically starts tracking actions using "Piwik PRO Analytics template".

If you do not have Tag Manager on your website yet, follow this procedure to install it:

#. Sign in to your PPAS with your admin or Super User account.
#. Click on the menu button on the top left.
#. Click on the "Websites" position.
#. Choose the website for which you want to implement a tracking code.
#. Select the "Installation" tab.
#. The Tag Manager code snippet for your website is displayed under the "Website code for asynchronous tags" or "Website code for synchronous tags".

In case you do not want to install Tag Manager on your website, you can install tracking code via JavaScript Tracking Client snippet. Guide how to do it is available here: :ref:`jtc-installation-installing-tracking-code-via-node-snippet`





Page views
----------

Page view is the most basic type of the tracked event. It represents a single page viewing action.
By default it's triggered only once as soon as the HTML content is loaded to the browser with the :ref:`trackPageView<jtc-api-trackPageView>` function.

Example::

    _paq.push(["trackPageView"]);

.. note:: It's not required for the session to start with the page view or even involve them in any other way.

.. note:: We recommend to trigger this function more than once for Singe Page Applications (SPA). That way you'll create additional "virtual" page view as the visitor travels across you app.





Custom Events
-------------

Custom events enable tracking visitor actions that do not have dedicated functions in the existing tracker API, allowing web analysts to accurately measure and analyze any domain. Many integrations, including those offered by Tag Manager, use custom events for tracking actions detectable only on client-side, e.g. scrolling a page, viewing images, interacting with a video player, filling forms etc.

A custom event consists of the following properties:

* **category** - Describes the category of an event, e.g. *video*, *form*, *scroll*
* **action** - Describes what action happened on a website, e.g. *video-play*, *video-pause*, *form-focus*, *scroll-progress*
* **name** (optional) - Usually contains the name of an action target, e.g. the name of a video, label of a form field, name of the scrolled article
* **value** (optional) - Additional numeric value carried with an event, e.g. number of seconds a video has been watched for, how far (in percentages) an article has been scrolled

.. warning::

    Consider designing categories and actions upfront and documenting them at start and as they change. Follow one naming convention, e.g. *snake_case*, *kebab-case*, *camelCase*. This will minimize the risk of making mistakes and having to debug the tracking implementation.

Tracking a custom event together with a page view is straightforward - simply call :ref:`trackEvent<jtc-api-trackEvent>` function after the page view. ::

    _paq.push(["trackPageView"]);
    _paq.push(["trackEvent", "assignment", "assignment-submitted", "Math - Trigonometry - assignment 4", 10]);


The snippet above tracks a custom event with category *assignment*, action *assignment-submitted*, name *Math - Trigonometry - assignment 4* and value *10* (which might indicate the number of pages in a submitted document).

Custom event name and custom event value are optional. You can skip them if there are not meaningful in you use case. ::

    _paq.push(["trackEvent", "category", "action"]); // skip both name and value
    _paq.push(["trackEvent", "category", "action", "name"]); // skip only value
    _paq.push(["trackEvent", "category", "action", undefined, 10.0]); // skip only name


Very often we want to track actions triggered by visitors some time after the page has loaded. One way to do that, is adding tracking code to event handling attributes of HTML elements, e.g. ``onclick`` attribute of ``button`` element.

.. code-block:: html

    <button onclick="likePost(); _paq.push(['trackEvent', 'social', 'like-post', 'top-10-attractions-in-london'])">Like</button>

.. warning::

    When tracking custom events this way, make sure HTML events trigger both the intended action and tracking code.

.. note::

    Notice the change in string quotation style. Because ``onclick`` attribute content is quoted with double quotes, to avoid conflicts, strings in ``_paq.push`` have been surrounded with single quotes.

Tracking more sophisticated events might require attaching listeners to the DOM elements in a script and using :ref:`trackEvent<jtc-api-trackEvent>` inside, for example:

.. code-block:: html

    <script>
        var maxScroll = 0.0;
        window.addEventListener("scroll", function (event) {
            var currentScroll = calculateScrollBetween0And1(event);
            if (currentScroll >= maxScroll + 0.1) {
                _paq.push(["trackEvent", "scroll", "page-scroll", document.title, currentScroll]);
                maxScroll = currentScroll;
            }
        });
    </script>





Site search
-----------

Site search tracking gives you insight into how visitors interact with the
search engine on your website - what they search for and how many results they
get back.

Our data collecting and processing pipeline automatically converts page views
into site search events if the URL contains site search query parameters:
``q``, ``query``, ``s``, ``search``, ``searchword`` and ``keyword``.  You can
customize these parameters in on website settings page. Site search events can
also be tracked manually by calling :ref:`trackSiteSearch<js-api-trackSiteSearch>`
method. It allows to specify not only the keyword and category, but also
the number of results and additional custom dimensions.

:ref:`trackSiteSearch<js-api-trackSiteSearch>` accepts the following parameters:

* **keyword** - what term someone looked for
* **category** (optional) - which category the search was in
* **results** (optional) - how many search results were returned
* **dimensions** (optional) - custom dimensions to send along the site search

It is used like this::

    _paq.push(["trackSiteSearch", "les paul", "electric guitars", 5, { dimension10: "amber" }]);

In this case, we track site search with keyword *les paul*, category *electric
guitars*, *5* search results and custom dimension *10* with value *amber*.

The optional parameters might be skipped or replaced with ``undefined`` to
indicate no value. ::

    _paq.push(["trackSiteSearch", "playstation"]); // only keyword provided
    _paq.push(["trackSiteSearch", "playstation", "consoles"]); // only keyword and category provided
    _paq.push(["trackSiteSearch", "playstation", undefined, 5]); // only keyword and results count provided

.. warning::

    If you can't or don't want to rely on automatic site search detection from
    URL parameters, call ``trackSiteSearch`` method instead of ``trackPageView``
    on search results page. Using both methods might result in a duplication
    of site search events.





E-commerce
----------

JavaScript API supports 3 types of e-commerce interactions: :ref:`Category and product views<guide_tracking_category_and_product_views>`, :ref:`Cart updates<guide_tracking_cart_updates>` and :ref:`Orders<guide_tracking_orders>`.

.. _guide_tracking_category_and_product_views:

Tracking category and product views
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Usually, the first e-commerce-related action a visitor performs on a website is browsing products. :ref:`setEcommerceView<jtc-api-setEcommerceView>` function allows us to track both category views and product views.

To track a category view, use :ref:`setEcommerceView<jtc-api-setEcommerceView>` function **before** tracking the page view, like this::

    // set category to "Smartphones"
    _paq.push(["setEcommerceView", undefined, undefined, "Smartphones"]);

    // track page view
    _paq.push(["trackPageView"]);

The same function can be used for tracking product views. Again, it must be called **before** tracking a page view. Example::

    // set product with...
    _paq.push(["setEcommerceView",
        "71253029",              // SKU (stock-keeping unit)
        "SUPER Phone A40 White", // name
        "Smartphones",           // category
        1499.99                  // price
    ]);

    // track page view
    _paq.push(["trackPageView"]);

``category`` parameter of the :ref:`setEcommerceView<jtc-api-setEcommerceView>` function accepts not only string values, but also arrays of strings. This is useful for tracking products that belong to more than one category, or tracking pages that list products from multiple categories. ::

    // set product with...
    _paq.push(["setEcommerceView",
        "00492710",                    // SKU (stock-keeping unit)
        "SUPER Watch B20 Silver",      // name
        ["New offer", "Smartwatches"], // categories
        700.00                         // price
    ]);

    // track page view
    _paq.push(["trackPageView"]);

.. _guide_tracking_cart_updates:

Tracking cart updates
^^^^^^^^^^^^^^^^^^^^^

Another type of e-commerce activity you can track is an update of a shopping cart. With it, we are able to measure how often visitors don't complete the ordering process and what products stay in abandoned carts.

Tracking a cart update has two steps: registering items from the cart and sending them. The following example uses two functions - :ref:`addEcommerceItem<jtc-api-addEcommerceItem>` and :ref:`trackEcommerceCartUpdate<jtc-api-trackEcommerceCartUpdate>` - to achieve exactly that. ::

    // visitor added one chocolate bar to an empty shopping cart

    // register chocolate bar with...
    _paq.push(["addEcommerceItem",
        "82775027",                 // SKU (stock-keeping unit)
        "MEGA Milk Chocolate 200g", // name
        "Candy",                    // category
        6.00,                       // price
        1                           // quantity
    ]);

    // track cart update with a total value of 6.00
    _paq.push(["trackEcommerceCartUpdate", 6.00]);

This code snippet sends a cart update event with a cart containing one item (SKU *candy-12837*, name *MEGA Milk Chocolate 200g*, category *Candy*, price *6.00*) and having total value of *6.00*.

The list of registered items is stored only in memory. **Reloading the page will clear the list** and the previously registered items will have to be added again. ::

    // visitor added one mango fruit to a shopping cart with one chocolate bar

    // register previously added items
    _paq.push(["addEcommerceItem", "82775027", "MEGA Milk Chocolate 200g", "Candy", 6.00, 1]);

    // register the new item
    _paq.push(["addEcommerceItem", "01809926", "FRUTASTIC Mango", "Fruits & vegetables", 4.00, 1]);

    // track cart update with a total value of 10.00
    _paq.push(["trackEcommerceCartUpdate", 10.00]);

.. note::

    If you are not sure what items have been registered, use :ref:`getEcommerceCart<jtc-api-getEcommerceItems>` function. ::

        _paq.push([function() { console.log(this.getEcommerceItems()); }]);

Because single page applications do not refresh the page when a visitor manipulates the cart, an e-commerce implementation in SPAs must either:

1. Clear the cart using :ref:`clearEcommerceCart<jtc-api-clearEcommerceCart>` and register all items from the cart before tracking cart update, e.g. ::

    // visitor added one chocolate bar to an empty shopping cart
    _paq.push(["clearEcommerceCart"]);
    _paq.push(["addEcommerceItem", "82775027", "MEGA Milk Chocolate 200g", "Candy", 6.00, 1]);
    _paq.push(["trackEcommerceCartUpdate", 6.00]);

    // visitor added one mango fruit to a shopping cart with one chocolate bar
    _paq.push(["clearEcommerceCart"]);
    _paq.push(["addEcommerceItem", "82775027", "MEGA Milk Chocolate 200g", "Candy", 6.00, 1]);
    _paq.push(["addEcommerceItem", "01809926", "FRUTASTIC Mango", "Fruits & vegetables", 4.00, 1]);
    _paq.push(["trackEcommerceCartUpdate", 10.00]);

    // visitor removed one chocolate from a shopping cart with one chocolate bar and one mango
    _paq.push(["clearEcommerceCart"]);
    _paq.push(["addEcommerceItem", "01809926", "FRUTASTIC Mango", "Fruits & vegetables", 4.00, 1]);
    _paq.push(["trackEcommerceCartUpdate", 4.00]);

2. Replicate visitor's interactions with the cart using functions :ref:`addEcommerceItem<jtc-api-addEcommerceItem>`, :ref:`removeEcommerceItem<jtc-api-addEcommerceItem>`, :ref:`clearEcommerceCart<jtc-api-clearEcommerceCart>`. ::

    // visitor added one chocolate bar to an empty shopping cart
    _paq.push(["addEcommerceItem", "82775027", "MEGA Milk Chocolate 200g", "Candy", 6.00, 1]);
    _paq.push(["trackEcommerceCartUpdate", 6.00]);

    // visitor added one mango fruit to a shopping cart with one chocolate bar
    _paq.push(["addEcommerceItem", "01809926", "FRUTASTIC Mango", "Fruits & vegetables", 4.00, 1]);
    _paq.push(["trackEcommerceCartUpdate", 10.00]);

    // visitor removed one chocolate bar from a shopping cart with one chocolate bar and one mango
    _paq.push(["removeEcommerceItem", "82775027"]);
    _paq.push(["trackEcommerceCartUpdate", 4.00]);

.. _guide_tracking_orders:

Tracking orders
^^^^^^^^^^^^^^^

Perhaps the most important element of an e-commerce implementation is tracking orders. Just like with :ref:`cart updates<guide_tracking_cart_updates>`, tracking orders has two steps: registering items that have been purchased and tracking the order. Registering items looks exactly the same - we use :ref:`addEcommerceItem<jtc-api-addEcommerceItem>`, :ref:`removeEcommerceItem<jtc-api-addEcommerceItem>` and :ref:`clearEcommerceCart<jtc-api-clearEcommerceCart>`. The actual tracking of an order is done with a call to :ref:`trackEcommerceOrder<jtc-api-trackEcommerceOrder>` function. ::

    // register all purchased items

    _paq.push(["addEcommerceItem",
        "66251929",               // SKU
        "Red Unicorn Coffee Mug", // name
        "Tableware",              // category
        8.00,                     // price
        1                         // quantity
    ]);

    _paq.push(["addEcommerceItem",
        "08273511",               // SKU
        "SUPER Blue Ink Pen 0.2", // name
        "Office products",        // category
        2.00,                     // price
        2                         // quantity
    ]);

    // track order
    _paq.push(["trackEcommerceOrder",
        "online-5289",            // ID
        16.00,                    // grand total (value + tax + discount + shipping)
        10.00,                    // sub total (value + tax + discount)
        1.00,                     // tax
        6.00,                     // shipping
        2.00                      // discount
    ]);

.. warning::

    :ref:`trackEcommerceOrder<jtc-api-trackEcommerceOrder>` function clears the list with registered e-commerce items.





Content tracking
----------------

What is content tracking
^^^^^^^^^^^^^^^^^^^^^^^^

Let's talk about a scenario in which simple page-view tracking is not enough. It will just tell you which page was loaded, but it won't point out how visitor interacts with the content on that particular page.
Content impression and content interaction tracking feature fills that gap.

Content impression allows you to track what content is visible to the visitor. On the bigger pages it may tell what particular parts/blocks of it the visitor has reached. When they keep scrolling and new content is presented on the screen it will be tracked automatically. This is useful for ads and banners but may be also attached to a image carousell or other forms of image galleries.

Now we know what block became visible on the screen but we would also like to know how the visitor interacted with them. Content interaction tracking completes this feature. After particular block became visible on the viewport JS Tracker will automatically record visitor clicks related to it.

JS tracker distinguishes three parts of the content structure: `content name`, `content piece` and `content target`. All together they are called `content block`.

* `Content name` - this is the title describing the content block, tracked data will be visible as an entry in the reports under that name
* `Content piece` - gives us the specific piece that was reached on the page (typically an image or other media)
* `Content target` - if the content block you want to track is an anchor, content target will contain the url this anchor links to

Enabling automatic content tracking
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Simply use one of:

* track all content blocks: ``_paq.push(["trackAllContentImpressions"]);``
* track only the visible blocks: ``_paq.push(["trackVisibleContentImpressions"]);`` (generally visible, not only the ones currently visible on the screen)

For more information visit the :ref:`Content tracking<jtc-api-content-tracking>` section of the JavaScript Tracking Client API documentation.

**But how JS tracker will know what blocks you would like to track?**
There are two ways of marking the blocks, you should either use a ``piwikTrackContent`` CSS class or a special html attribute ``data-track-content`` on them.
Same technique is used for pointing out the content piece (``piwikContentPiece`` CSS class or ``data-content-piece`` attribute) and the content target (``piwikContentTarget`` CSS class or ``data-content-target`` attribute).

Although JS Tracker has the ability of auto-detection for name, piece and target metrics, we still recommend providing those values manually as was described in the previous paragraph. If you don't then JS Tracked will try to fill them as follows:

* it will read block ``title`` attribute as for the Content name
* it will read piece from the ``src`` attribute of an image
* it will read target from the ``href`` attribute of an anchor wrapping the image

As you can imagine this may produce inconsistent results, providing those values manually seems like a more desired approach.

Manual content tracking
^^^^^^^^^^^^^^^^^^^^^^^

If for some reason automatic content tracking does not suit you needs you may still trigger :ref:`trackContentImpression<jtc-api-trackContentImpression>` and :ref:`trackContentInteraction<jtc-api-trackContentInteraction>` JS tracker functions manually.

Example:

.. code-block:: javascript
   :linenos:

    _paq.push(["trackContentImpression", "Ads", "Partner banner", "http://some-company.tld"]);

    some_dom_node.addEventListener("click", function () {
        _paq.push(["trackContentInteraction", "bannerClicked", "Ads", "Partner banner", "http://some-company.tld"]);
    });

Half way between automatic and manual content tracking
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There is also a third way for successful the content tracking in more complicated situations. Automatic scenario will track clicks as a visitor interaction, but sometimes other activity may interest you more. Hovering the mouse over an element of submiting a form. In such scenario you would like to enable automatic content impression tracking but track interaction manually.

Example:

.. code-block:: javascript
   :linenos:

    some_image_node.addEventListener("dblclick", function () {
        _paq.push(["trackContentInteractionNode", this, "imageDoubleClick"]);
    });

.. note:: It may be important that your "custom" interaction tracking is not later on doubled by the automatic one. To disable automatic content interaction tracking you should either apply ``piwikContentIgnoreInteraction`` CSS class or ``data-content-ignoreinteraction`` HTML attribute to the given element.

Examples
^^^^^^^^

Simple HTML content block may look like this:

.. code-block:: html
   :linenos:

    <a href="http://some-company.tld" title="Our business partner ad" data-track-content>
        Click here to see the website
    </a>

    // content name   = Our business partner ad
    // content piece  = Unknown
    // content target = http://some-company.tld

More advanced HTML content block with all attributes prepared (leaving nothing to chance) may look like this:

.. code-block:: html
   :linenos:

    <a href="http://some-company.tld" title="Click here" data-track-content data-content-name="Our business partner ad">
        <img src="/images/business-partners/banners/some-company.png" data-content-piece />
    </a>

    // content name   = Our business partner ad
    // content piece  = /images/business-partners/banners/some-company.png
    // content target = http://some-company.tld

Form submission:

.. code-block:: html
   :linenos:

    <form data-track-content data-content-name="Survey form">
        <input type="submit" data-content-target="http://our-company.tld/form-handler" />
    </form>

    // content name   = Survey form
    // content piece  = Unknown
    // content target = http://our-company.tld/form-handler





Downloads and Outlinks
----------------------

Downloads
^^^^^^^^^

Download data helps you learn which files people pick from your site — be it a white paper, a case study, or a guide in pdf. Piwik PRO will automatically track clicks on such links as `Downloads`, and reports them in `Downloads` report.

Our JS tracker is able to recognize when a click on a link is a download link.

It will automatically recognize such when a clicked link contains one of following file extensions (extensions starts with "``.``" character and one of following characters sets):

.. note::
  7z, aac, apk, arc, arj, asf, asx, avi, azw3, bin, bz, bz2, csv, deb, dmg, doc, docx, epub, exe, flv, gif, gz, gzip, hqx, ibooks, jar, jpg, jpeg, js, mp2, mp3, mp4, mpg, mpeg, mobi, mov, movie, msi, msp, odb, odf, odg, ods, odt, ogg, ogv, pdf, phps, png, ppt, pptx, qt, qtm, ra, ram, rar, rpm, sea, sit, tar, tbz, tbz2, tgz, torrent, txt, wav, wma, wmv, wpd, xls, xlsx, xml, z, zip


In one of following link schemas:

 - file extension is at the very end of a link eg. ``http://example.com/file.7z`` or ``http://example.com/article?click=file.7z``
 - file extension directly proceeds query part (``?``), eg. ``http://example.com/article/file.7z?source=user#how-to``
 - file extension directly proceeds fragment part (``#``) ``http://example.com/article?target=file.7z#how-to``
 - file extension is at the end of query param, eg. ``http://example.com/article?click=file.7z&page=3``

Customizing list of file extensions
"""""""""""""""""""""""""""""""""""

You can customize list of file extensions you want to track as downloads. For example, if you want to track only images as downloads, you can use `setDownloadExtensions` function to replace the list this:

.. code-block:: javascript

  // track clicks on images links (eg. <a href="image.png">) only
  _paq.push(["setDownloadExtensions", "png|jpg|webp|gif"]);

You can add new extensions, to an existing list with `addDownloadExtensions`:

.. code-block:: javascript

  // add other image formats
  _paq.push(["setDownloadExtensions", "svg|xcf"]);

Or remove some of extenstions from the existing list with `removeDownloadExtensions`:

.. code-block:: javascript

  _paq.push(["removeDownloadExtensions", "jpg|jpeg"]);


Manually marking links as downloads
"""""""""""""""""""""""""""""""""""

.. note::
  If you want to use CSS classes or HTML attributes to mark links as download or outlink and you have modified default JS snippet, make sure that :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` is called. It is enabled in default snippet, but if you use a custom one, then you have to enable it by yourself.

  .. code-block:: javascript

    // Enable Download & Outlink tracking
    _paq.push(["enableLinkTracking"]);

If your case of download links does not fall in above cases you still have options to use, to tell tracker that link should be tracked as a download.

You can add a download attribute to a link HTML tag. eg.

.. code-block:: html

  <a href="/target-file" download>

Or if you have to be strict with your HTML, you can add a HTML tag class. Default classes are ``piwik_download`` and ``piwik-download``. Eg.

.. code-block:: html

  <a href="/taget-file" class="piwik-download">

Additionally you can define your custom CSS classes for download links with our :ref:`JavaScript Tracking Client API<jtc-api-setDownloadClasses>`. Eg.

.. code-block:: javascript

  _paq.push(["setDownloadClasses", "custom-download-class"]);
  _paq.push(["trackPageView"]);

or you can define a list of classes at once, by passing an array list of CSS classes:

.. code-block:: javascript

  _paq.push(["setDownloadClasses", ["custom-download-class", "other-download-class", "another-class"]]);
  _paq.push(["trackPageView"]);

and in HTML code:

.. code-block:: html

  <a href="/taget-file" class="custom-download-class">

.. note::
  You have to remember that using ``setDownloadClasses`` always overwrite current list of CSS classes.


Tracking downloads with inline Javascript
"""""""""""""""""""""""""""""""""""""""""

There is another alternative for above methods. You can track a download with inline javascript. Insert inline javascript to HTML tag with ``onclick`` attribute:

.. code-block:: html

  <a href="https://piwik.pro/document-url" target="_blank" onClick="_paq.push(['trackLink', 'https://piwik.pro/document-url', 'download']);">Download document</a>

.. hide::
  Tracking downloads when using log importer
  """"""""""""""""""""""""""""""""""""""""""

  When you use the :ref:`Log Importer<data-collection-web-log-analytics>`, files with one of the file extensions listed above will be automatically tracked as downloads in Piwik PRO.

Outlinks
^^^^^^^^

The Piwik PRO `Outlinks` report shows the list of external URLs that were clicked by your visitors. Outlinks are links that have different domain than those configured for your website. For example, if your visitor click on a link to `piwik.pro` and your website domain is `example.org`, this will be reported as an outlink, no matter if the website opens in current tab/window or a new one.

.. code-block:: html

  <a href="https://piwik.pro">Piwik PRO</a>

Configuring which domains are outlinks
""""""""""""""""""""""""""""""""""""""

When, for example your main page is `piwik.pro` and you want to track views of `help.piwik.pro` without additional outlink click, you have to confgure tracker to recognize this additional domain. You can do it in two ways.

You can configure it in website settings section of the Administration panel. Go to the Administration > Websites & apps > Settings > General settings > URLs. Add all the domains that should not be treated as outlinks.

.. image:: /_static/images/data_collection/website_settings_urls.jpg

You can use :ref:`setDomains<jtc-api-setDomains>` function of JavaScript Tracking Client API.

.. code-block:: javascript

  _paq.push(["setDomains", ["help.piwik.pro", "piwik.pro", "*.other-domain.pro"]]);
  _paq.push(["trackPageView"]);

.. note::
  Using ``setDomains`` will overwrite URLs configured in Administration panel, use it wisely.

Marking links as outlinks in HTML code
""""""""""""""""""""""""""""""""""""""

Similar as downloads, links can be set to be treated as outlinks manually, but only with CSS classes, you cannot use a HTML attribute.

You can use one of default CSS classes: ``piwik_link`` or ``piwik-link``. eg.

.. code-block:: html

  <a href="https://piwik.pro" class="piwik-link">Piwik PRO</a>

Or you can define your custom CSS classes for outlinks with :ref:`JavaScript Tracking Client API<jtc-api-setLinkClasses>`.

.. code-block:: javascript

  // now all clicks on links with the css class "custom-link-class" will be counted as outlinks
  // you can also pass an array of strings
  _paq.push(["setLinkClasses", "custom-link-class"]);
  _paq.push(["trackPageView"]);


or a list of classes

.. code-block:: javascript

  _paq.push(["setLinkClasses", ["custom-link-class", "other-link-class"]]);
  _paq.push(["trackPageView"]);

and in HTML code

.. code-block:: html

  <a href="https://piwik.pro" class="custom-link-class">Piwik PRO</a>


.. _marking-outlinks-inline-calls:

Marking outlinks with inline Javascript
"""""""""""""""""""""""""""""""""""""""

Alternatively you can use an inline javascript and onclick attribute to track any link as an outlink.

.. code-block:: html

  <a href="mailto:support@piwik.pro" target="_blank" onClick="_paq.push(['trackLink', 'https://piwik.pro/support-contact-form', 'link']);">Write us a message.</a>

Other related  abilities
^^^^^^^^^^^^^^^^^^^^^^^^

Changing delay for link tracking
""""""""""""""""""""""""""""""""

All link tracking uses a slight delay of click execution, so the browser won't exit the page before a click is tracked. The default value of such delay is 500ms, but you can modify it as you wish. You have to remember that if you set this value too low, it might be not enough to track the click, if you set it too high, the browser might ignore the delay.

.. code-block:: javascript

  _paq.push(["setLinkTrackingTimer", 300]); // 300 milliseconds
  _paq.push(["trackPageView"]);

Disable download and outlink tracking
"""""""""""""""""""""""""""""""""""""

To explicitly disable link tracking you can use `disableLinkTracking` function. After adding it to tracking code, all of link clicks won't be tracked.

.. code-block:: javascript

  _paq.push(["disableLinkTracking"]);

Disabling link tracking with CSS classes
""""""""""""""""""""""""""""""""""""""""

You can mark links that you do not with to track with CSS classes. JS Tracker will ignore such links and won't track them.

.. code-block:: javascript

  _paq.push(["setIgnoreClasses", "do-not-track"]);
  _paq.push(["trackPageView"]);

or a list of classes:

.. code-block:: javascript

  _paq.push(["setIgnoreClasses", ["dont-track-this", "this-either", "nor-this"]]);
  _paq.push(["trackPageView"]);

and later in HTML code:

.. code-block:: html

  <a href="https://piwik.pro/document.pdf" class="dont-track-this">A document, that should not be tracked.</a>

Tracking link clicks on pages with dynamically generated content
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

When you want to track clicks on the links, which are dynamically added to the HTML document, you have to call :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` every time when the new links are added to the document.

For fully static pages calling :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` once is enough, because each call adds listeners only for those links, which are currently present in the HTML document. So if you add new links to the document and you want to track them, you have to call :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` multiple times.

.. code-block:: javascript

    // Add click listeners to new links
    _paq.push(["enableLinkTracking"]);

.. note::

  You don't have to call :ref:`enableLinkTracking<jtc-api-enableLinkTracking>` if you are :ref:`already adding and inline call to a link<marking-outlinks-inline-calls>`.


A Tip
"""""

To increase accuracy of download and outlink tracking, you can consider enabling the use of :ref:`navigator.sendBeacon<navigation-send-beacon>`.

.. todo:: Beacon is the default method for outlink events. Update/remove this section.

Goal tracking
-------------

At this point we have tracked lot's of various typose of events. We have regular page views, we have downloads, outlinks, custom events and others. Above them all there's one more event type we can track: a conversion.
And goal tracking is about tracking conversions. If you can point out parts of your website/application more important from your bisness perspective, you could :ref:`define those parts as goals<https://help.piwik.pro/support/analytics-new/goals/>`.
Visiting a specific landing page, submitting a contact form, downloading a PDF file with your product manual - these are popular examples of goal definitions. You can even define a goal based on the custom event you are tracking.

Once the goal is defined, every time a tracked event fits it's definition, an additional conversion event will be created. We call this procedure an "automatic conversion".

Alternatively, you can trigger a goal manually with the used of

.. code-block:: javascript

    // force conversion of the goal with ID 17
    _paq.push(["trackGoal", 17]);

.. note::

before `trackPageView` was triggered.

We call this procedure a "manual conversion". Manual conversion doesn't cause an additional conversion event to be tracked like the automatic conversion does.
Automatic conversion tracking requires a "source" event that is analyzed and if it fits some goal definition then it causes an addition conversion event.
