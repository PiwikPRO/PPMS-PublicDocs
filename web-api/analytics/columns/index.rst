Columns in API
==============

When making API calls you can use columns that contain core dimensions, metrics and transformations. And when you use one of our integrations, you can use columns that contain additional metrics and dimensions -- like the ones from Google Ads, Google Search Console, SharePoint.

Before you start
----------------

Here are some things to know before you start working with columns:

* Each listed column defines a *scope* attribute. If you make a call that includes one or more columns with the *event* scope, the whole query will be calculated using events -- not sessions. This might distort some custom metrics like average session time.


.. toctree::
  :maxdepth: 1

  columns
  google-ads
  google-searh-console
  sharepoint
