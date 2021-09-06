Guides
======

Instalation
-----------

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p

Page views
----------

Page view is the most basic type of the tracked event. It represents a single page viewing action.
By default it's triggered only once as soon as the HTML content is loaded to the browser with the `trackPageView` JS tracker method.

**Example:**
``_paq.push(['trackPageView']);``

.. note:: It's not required for the session to start with the page view or even involve them in any other way. Modern web applications like single page application rely on JS events which may be tracked with `trackEvent` rather then `trackPageView` JS tracker method.

.. note:: AWe recommend to trigger this method more than once for Singe Page Applications (SPA). That way you'll create additional "virtual" page view as the visitor travels across you app.

Downloads and Outlinks
----------------------

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop p
