=====
React
=====

This library lets you start collecting data from your web app. It also helps you control which data you collect –– like screen views, custom events, goals, and more. The library contains modules with methods.

To call methods in React, you'll use ``CustomEventsService`` or ``PageViewsService``.

Installation
------------
To install JS library for React, follow these steps:

1. In your project folder, run the following command:

.. code-block:: javascript

  npm install @piwik-pro/react-piwik-pro

or

.. code-block:: javascript

  yarn add ​​@piwikpro/react-piwik-pro

2. Add the ``PiwikPro`` module to your project files. Call the **initialize()** method by passing your account address (Example: \https://example.piwik.pro/) and the site ID (`Where to find it? <https://help.piwik.pro/support/questions/find-website-id/>`_):

.. code-block:: javascript

  import PiwikPro from '@piwik-pro/react-piwik-pro';

  PiwikPro.initialize('site-id', 'account-address');

  ReactDOM.render(<App />, document.getElementById('root'))

Note: This method makes sure that collected data is sent to the your account in Piwik PRO and is reported as a corresponding site or app.

3. Add tracking methods like screen views or custom events to your application.
4. Data will appear in reports in about an hour. Data in the tracker debugger will appear instantly.

Additional setup for SPA
------------------------

If your web app is built as a single-page application (SPA), you need to track virtual page views. In SPAs, when a user goes from one page to the other, the page doesn't reload. It loads just once at the beginning of the session. Because of that, page views can't be recorded in the usual way. You need virtual page views.

To automatically track virtual page views in React projects, you need to follow these steps:

1. Something
2. Something
3. Something



Methods
-------

Here's a list of all JS methods you can use in your React project. Descriptions and other information are available after clicking on links.

A

* `addDownloadExtensions() <https://help.piwik.pro>`_
* `addEcommerceItem() <https://help.piwik.pro>`_

C

* `clearEcommerceCart() <https://help.piwik.pro>`_

D

* `deleteCustomDimension() <https://help.piwik.pro>`_

E

* `enableLinkTracking() <https://help.piwik.pro>`_

G

* `getCustomDimensionValue() <https://help.piwik.pro>`_
* `getEcommerceItems() <https://help.piwik.pro>`_
* `getLinkTrackingTimer() <https://help.piwik.pro>`_
* `getUserId() <https://help.piwik.pro>`_
* `getVisitorId() <https://help.piwik.pro>`_
* `getVisitorInfo() <https://help.piwik.pro>`_

R

* `removeDownloadExtensions() <https://help.piwik.pro>`_
* `removeEcommerceItem() <https://help.piwik.pro>`_
* `resetUserId() <https://help.piwik.pro>`_

S

* `setCustomDimensionValue() <https://help.piwik.pro>`_
* `setDownloadClasses() <https://help.piwik.pro>`_
* `setDownloadExtensions() <https://help.piwik.pro>`_
* `setEcommerceView() <https://help.piwik.pro>`_
* `setIgnoreClasses() <https://help.piwik.pro>`_
* `setLinkClasses() <https://help.piwik.pro>`_
* `setLinkTrackingTimer() <https://help.piwik.pro>`_
* `setUserId() <https://help.piwik.pro>`_

T

* `trackContentImpression() <https://help.piwik.pro>`_
* `trackContentInteraction() <https://help.piwik.pro>`_
* `trackEcommerceCartUpdate() <https://help.piwik.pro>`_
* `trackEcommerceOrder() <https://help.piwik.pro>`_
* `trackEvent() <https://help.piwik.pro>`_
* `trackGoal() <https://help.piwik.pro>`_
* `trackLink() <https://help.piwik.pro>`_
* `trackPageView() <https://help.piwik.pro>`_
* `trackSiteSearch() <https://help.piwik.pro>`_
