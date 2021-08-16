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

.. table:: Google Search Console Metrics

    +--------------------------------+------------------------------+--------+-----+
    |          Metric Name           |          Column ID           | Scope  |Type |
    +================================+==============================+========+=====+
    |Clicks (search engine)          |search_engine_clicks          |external|int  |
    +--------------------------------+------------------------------+--------+-----+
    |Impressions (search engine)     |search_engine_impressions     |external|int  |
    +--------------------------------+------------------------------+--------+-----+
    |CTR (search engine)             |search_engine_ctr             |external|float|
    +--------------------------------+------------------------------+--------+-----+
    |Average position (search engine)|search_engine_average_position|external|float|
    +--------------------------------+------------------------------+--------+-----+

Dimensions
----------

The table below lists dimensions provided by Google Search Console integration.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. table:: Google Search Console Dimensions

    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |   Dimension Name    |         Column ID         | Scope  |   Type   |Database Type |Nullable|                                              Notes                                               |
    +=====================+===========================+========+==========+==============+========+==================================================================================================+
    |Source               |source                     |session |str       |string        |False   |                                                                                                  |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Medium               |medium                     |session |str       |string        |False   |                                                                                                  |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Source/Medium        |source_medium              |session |str       |string        |False   |                                                                                                  |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Channel              |referrer_type              |session |[int, str]|uint8         |False   |:download:`referrer_type.json </_static/json/enum/referrer_type.json>`                            |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Referrer URL         |referrer_url               |session |str       |string        |False   |                                                                                                  |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Device type          |device_type                |session |[int, str]|uint8         |True    |:download:`device_type.json </_static/json/enum/device_type.json>`                                |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Continent            |location_continent_iso_code|session |[str, str]|string(2)     |True    |:download:`location_continent_iso_code.json </_static/json/enum/location_continent_iso_code.json>`|
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Country              |location_country_name      |session |[str, str]|string        |True    |ISO 3166-2 codes (e.g. "PL")                                                                      |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Session entry URL    |session_entry_url          |session |str       |string        |False   |                                                                                                  |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Timestamp            |timestamp                  |session |date      |not applicable|False   |by default in Raw data API                                                                        |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Search engine keyword|search_engine_keyword      |external|str       |string        |False   |not available in Raw data API                                                                     |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Website Name         |website_name               |session |[str, str]|not applicable|False   |website UUID                                                                                      |
    +---------------------+---------------------------+--------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+

Mixed Queries
-------------

It is possible to request both internal analytics and Google Search
Console metrics in a single query (for example: "Sessions" and "Clicks (search
engine)"), however **only the common dimensions listed below** may be used in
such queries.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. table:: Common Dimensions

    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    | Dimension Name  |         Column ID         | Scope |   Type   |Database Type |Nullable|                                              Notes                                               |
    +=================+===========================+=======+==========+==============+========+==================================================================================================+
    |Source           |source                     |session|str       |string        |False   |                                                                                                  |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Medium           |medium                     |session|str       |string        |False   |                                                                                                  |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Source/Medium    |source_medium              |session|str       |string        |False   |                                                                                                  |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Channel          |referrer_type              |session|[int, str]|uint8         |False   |:download:`referrer_type.json </_static/json/enum/referrer_type.json>`                            |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Referrer URL     |referrer_url               |session|str       |string        |False   |                                                                                                  |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Device type      |device_type                |session|[int, str]|uint8         |True    |:download:`device_type.json </_static/json/enum/device_type.json>`                                |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Continent        |location_continent_iso_code|session|[str, str]|string(2)     |True    |:download:`location_continent_iso_code.json </_static/json/enum/location_continent_iso_code.json>`|
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Country          |location_country_name      |session|[str, str]|string        |True    |ISO 3166-2 codes (e.g. "PL")                                                                      |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Session entry URL|session_entry_url          |session|str       |string        |False   |                                                                                                  |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Timestamp        |timestamp                  |session|date      |not applicable|False   |by default in Raw data API                                                                        |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+
    |Website Name     |website_name               |session|[str, str]|not applicable|False   |website UUID                                                                                      |
    +-----------------+---------------------------+-------+----------+--------------+--------+--------------------------------------------------------------------------------------------------+

.. warning::
  Using dimensions that are not explicitly listed in the table above in such
  queries (either as query columns or as filters) will result in a **Bad
  Request** response.

