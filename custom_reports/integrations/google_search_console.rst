Google Search Console
=====================

The :ref:`custom-reports-http-api` supports querying Google Search Console
data just like the internal analytics data.

.. note::
    You must configure the Google Search Console integration before any data
    from it will become available. This can be done in the **Settings / Integrations**
    application's section.

Metrics
-------

The table below lists metrics provided by Google Search Console integration.

.. include:: google_search_console__metrics.rst

Dimensions
----------

The table below lists dimensions provided by Google Search Console integration.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. include:: google_search_console__dimensions.rst

Mixed Queries
-------------

It is possible to request both internal analytics and Google Search
Console metrics in a single query (for example: "Sessions" and "Clicks (search
engine)"), however **only the common dimensions listed below** may be used in
such queries.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. include:: google_search_console__common_dimensions.rst

.. warning::
  Using dimensions that are not explicitly listed in the table above in such
  queries (either as query columns or as filters) will result in a **Bad
  Request** response.

