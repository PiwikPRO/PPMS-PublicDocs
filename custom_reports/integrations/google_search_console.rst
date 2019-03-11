Google Search Console
=====================

The :ref:`custom-reports-http-api` supports querying Google Search Console
data just like the internal analytics data.

.. note::
    You must configure the Google Search Console integration before any data
    will become available. This can be done in the **Settings / Integrations**
    application's section.

Metrics
-------

The table below lists new metrics available for the Google Search Console data.

.. table:: Google Search Console Metrics

    +--------------------------------+------------------------------+-----+
    |          Metric Name           |          Column ID           |Type |
    +================================+==============================+=====+
    |Clicks (search engine)          |search_engine_clicks          |int  |
    +--------------------------------+------------------------------+-----+
    |Impressions (search engine)     |search_engine_impressions     |int  |
    +--------------------------------+------------------------------+-----+
    |CTR (search engine)             |search_engine_ctr             |float|
    +--------------------------------+------------------------------+-----+
    |Average position (search engine)|search_engine_average_position|float|
    +--------------------------------+------------------------------+-----+

Dimensions
----------

The table below lists new dimensions available for the Google Search Console
data.

.. table:: Google Search Console Dimensions

    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |   Dimension Name    |         Column ID         |   Type   |Nullable|                                            Enum Table                                            |
    +=====================+===========================+==========+========+==================================================================================================+
    |Source/Medium        |source_medium              |str       |False   |                                                                                                  |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Channel              |referrer_type              |[int, str]|False   |:download:`referrer_type.json </_static/json/enum/referrer_type.json>`                            |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Referrer URL         |referrer_url               |str       |False   |                                                                                                  |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Device type          |device_type                |[int, str]|True    |:download:`device_type.json </_static/json/enum/device_type.json>`                                |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Continent            |location_continent_iso_code|[str, str]|True    |:download:`location_continent_iso_code.json </_static/json/enum/location_continent_iso_code.json>`|
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Country              |location_country_name      |[str, str]|True    |ISO 3166-2 codes (e.g. "PL")                                                                      |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Session entry URL    |session_entry_url          |str       |False   |                                                                                                  |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Timestamp            |timestamp                  |date      |False   |                                                                                                  |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Search engine keyword|search_engine_keyword      |str       |False   |                                                                                                  |
    +---------------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+

Mixed Queries
-------------

It is also possible to request both internal analytics and Google Search
Console metrics in a single query (for example: "Sessions" and "Clicks (search
engine)").

However, **only the common dimensions listed below** may be used in such queries.

.. table:: Common Dimensions

    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    | Dimension Name  |         Column ID         |   Type   |Nullable|                                            Enum Table                                            |
    +=================+===========================+==========+========+==================================================================================================+
    |Source/Medium    |source_medium              |str       |False   |                                                                                                  |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Channel          |referrer_type              |[int, str]|False   |:download:`referrer_type.json </_static/json/enum/referrer_type.json>`                            |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Referrer URL     |referrer_url               |str       |False   |                                                                                                  |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Device type      |device_type                |[int, str]|True    |:download:`device_type.json </_static/json/enum/device_type.json>`                                |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Continent        |location_continent_iso_code|[str, str]|True    |:download:`location_continent_iso_code.json </_static/json/enum/location_continent_iso_code.json>`|
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Country          |location_country_name      |[str, str]|True    |ISO 3166-2 codes (e.g. "PL")                                                                      |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Session entry URL|session_entry_url          |str       |False   |                                                                                                  |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+
    |Timestamp        |timestamp                  |date      |False   |                                                                                                  |
    +-----------------+---------------------------+----------+--------+--------------------------------------------------------------------------------------------------+

.. warning::
  Using dimensions that are not explicitly listed in the table above in such
  queries (either as query columns or as filters) will result in a **Bad
  Request** response.

