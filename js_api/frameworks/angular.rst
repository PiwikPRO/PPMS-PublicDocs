.. _angular:

=======
Angular
=======

This library lets you start collecting data from your web app. It also helps you control which data you collect –– like page views, virtual page views, custom events, and more. The library contains modules with methods.

To call methods in Angular, you'll use ``CustomEventsService`` or ``PageViewsService``.

Installation
------------

To install JS library for Angular, follow these steps:

1. In your project folder, run the following command:

.. code-block:: javascript

    npm install @piwik-pro/ngx-piwik-pro

or

.. code-block:: javascript

    yarn add @piwikpro/ngx-piwik-pro

2. Add the ``NgxPiwikProModule`` module in your highest level app module. Call the **forRoot()** method by passing your account address (Example: \https://example.piwik.pro/) and the site ID (`Where to find it? <https://help.piwik.pro/support/questions/find-website-id/>`_):

.. code-block:: javascript

    import { NgxPiwikProModule } from '@piwik-pro/ngx-piwik-pro';

      @NgModule({
        declarations: [
          AppComponent
          ],
        imports: [
          BrowserModule,
          NgxPiwikProModule.forRoot('site-id', 'account-address')
          ],
        providers: [],
        bootstrap: [AppComponent]
        })
        export class AppModule { }

Note: This method makes sure that collected data is sent to the your account in Piwik PRO and is reported as a corresponding site or app.

3. Add tracking methods like page views or custom events to your application.
4. Data will appear in reports in about an hour. Data in the tracker debugger will appear instantly.

Additional setup for SPA
------------------------

If your web app is built as a single-page application (SPA), you need to track virtual page views. In SPAs, when a user goes from one page to the other, the page doesn't reload. It loads just once at the beginning of the session. Because of that, page views can't be recorded in the usual way. You need virtual page views.

To automatically track virtual page views in Angular projects, you need to follow these steps:

1. Add ``NgxPiwikProRouterModule`` on AppModule to enable automatic tracking of Router events.

Example:

.. code-block:: javascript

    import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwik-pro/ngx-piwik-pro';
    ...

    @NgModule({
    ...
      imports: [
      ...
      NgxPiwikProModule.forRoot('account-address'),
      NgxPiwikProRouterModule
      //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      ]
      })
      export class AppModule {}

Note: The ``NgxPiwikProRouterModule`` module subscribes to Router events when the bootstrap component is created. After that, it cleans up any subscriptions related to the previous component when it is destroyed. If you use this module with server-side rendering or multiple bootstrap components, you may get some issues. In that case, we recommend subscribing to the page view events manually.


2. Additionally, you can use the following include/exclude settings:

 * { include: [ '/full-uri-match' ] } – simple route matching
 * { include: [ '*/public/*' ] } – wildcard route matching
 * { include: [ /^\/public\/.*/ ] } – regular expression route matching

Example:

.. code-block:: javascript

    import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwik-pro/ngx-piwik-pro';
      ...

    @NgModule({
      ...
      imports: [
        ...
        NgxPiwikProModule.forRoot('account-address'),
        NgxPiwikProRouterModule.forRoot({ include: [...], exclude: [...] })
    //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      ]
    })
    export class AppModule {}




Methods
-------
Here's a list of all JS methods you can use in your Angular project. Descriptions and other information are available after clicking on links.


**A**

* :ref:`addDownloadExtensions()`
* :ref:`addEcommerceItem()`

**C**

* :ref:`clearEcommerceCart()`

**D**

* :ref:`deleteCustomDimension()`

**E**

* enableLinkTracking()

**G**

* getCustomDimensionValue()
* getEcommerceItems()
* getLinkTrackingTimer()
* getUserId()
* getVisitorId()
* getVisitorInfo()

**R**

* removeDownloadExtensions()
* removeEcommerceItem()
* resetUserId()

**S**

* setCustomDimensionValue()
* setDownloadClasses()
* setDownloadExtensions()
* setEcommerceView()
* setIgnoreClasses()
* setLinkClasses()
* setLinkTrackingTimer()
* setUserId()

**T**

* trackContentImpression()
* trackContentInteraction()
* trackEcommerceCartUpdate()
* trackEcommerceOrder()
* trackEvent()
* trackGoal()
* trackLink()
* trackPageView()
* trackSiteSearch()
