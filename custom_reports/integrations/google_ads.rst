Google Ads
==========

The :ref:`custom-reports-http-api` supports querying Google Ads
data just like the internal analytics data.

.. note::
    You must configure the Google Ads integration before any data
    from it will become available. This can be done in the **Settings / Integrations**
    application's section.

Metrics
-------

The table below lists metrics provided by Google Ads integration.

.. include:: google_ads__metrics.rst

Dimensions
----------

The table below lists dimensions provided by Google Ads integration.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. include:: google_ads__dimensions.rst

Mixed Queries
-------------

It is possible to request both internal analytics and Google Ads
metrics in a single query (for example: "Sessions" and "Clicks (Google
Ads)"), however **only the common dimensions listed below** may be used in
such queries.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. include:: google_ads__common_dimensions.rst

.. warning::
  Using dimensions that are not explicitly listed in the table above in such
  queries (either as query columns or as filters) will result in a **Bad
  Request** response.

