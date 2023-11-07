Columns
=======

This article documents core columns available in the :ref:`custom-reports-http-api`.
Additional columns may become available through
:ref:`custom-reports-integrations`.

.. note::
    Each column listed in this document defines a *Scope* attribute.
    If you request a query that includes at least one column which requires
    *event* scope, the entire query will be calculated using events,
    instead of sessions. This might distort some custom metrics such as
    averages of a *session* dimension (e.g. average session time).

Metrics
-------

The table below lists core metrics that may be used in queries.
Additional metrics may be created using dimension transformations.

.. include:: columns__metrics.rst

Dimensions
----------

The table below lists core dimensions that may be used in queries.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. include:: columns__dimensions.rst

.. _slots:
.. note::
    Please note that the number of available custom slots (dimensions,
    variables) depends on your organisation's configuration.
    Standard number of slots is:

    - session_custom_dimension/event_custom_dimension: 200
    - session_custom_variable/event_custom_variable: 10
    - product_custom_dimension: 20

Transformations
---------------

The tables below list all transformations that may be used to transform
dimensions to metrics or different dimensions.

.. include:: columns__dimension_to_metric_transformations.rst
.. include:: columns__dimension_to_dimension_transformations.rst

Exporter
--------

The tables in the following sections shows all columns that may be easily used in Exporter config.
For sessions and events scope there is preferred list of columns due to performance and reliability reasons.

.. note::
    The table below presents a short description of the selected fields.

+--------------------------------+-------------------------------------------------------+
| Column                         | Description                                           |
+================================+=======================================================+
| app_uuid                       | Binary format (16 bytes).                             |
+--------------------------------+-------------------------------------------------------+
| server_time                    | In UTC.                                               |
+--------------------------------+-------------------------------------------------------+
| location_ipv4                  | May be partially anonymized. Binary format (4 bytes). |
+--------------------------------+-------------------------------------------------------+
| location_ipv6                  | May be partially anonymized. Binary format (16 bytes).|
+--------------------------------+-------------------------------------------------------+
| session_custom_dimension_1     | Number of custom dimension slots is configurable.     |
+--------------------------------+-------------------------------------------------------+
| event_custom_dimension_1       | Number of custom dimension slots is configurable.     |
+--------------------------------+-------------------------------------------------------+
| session_custom_variable_key_1  | Number of custom variable slots is configurable.      |
+--------------------------------+-------------------------------------------------------+
| event_custom_variable_key_1    | Number of custom variable slots is configurable.      |
+--------------------------------+-------------------------------------------------------+
| event_index                    | Starts from 0.                                        |
+--------------------------------+-------------------------------------------------------+
| page_view_index                | Starts from 0.                                        |
+--------------------------------+-------------------------------------------------------+


Sessions scope - preferred
``````````````````````````

.. include:: columns__exporter_preferred_sessions_columns.rst

Sessions scope
``````````````

.. include:: columns__exporter_all_sessions_columns.rst

Events scope - preferred
````````````````````````

.. include:: columns__exporter_preferred_events_columns.rst

Events scope
````````````

.. include:: columns__exporter_all_events_columns.rst

Google Ads scope
````````````````

.. include:: columns__exporter_all_google_ads_columns.rst
