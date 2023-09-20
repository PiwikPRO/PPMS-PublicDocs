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

.. include:: columns_metrics.rst

Dimensions
----------

The table below lists core dimensions that may be used in queries.

Note: "Database type" column presents the type of source column of the dimension (in case of enum - type of the ID, in case of dynamic dimensions - not applicable).

.. include:: columns_dimensions.rst

.. note::
    Please note that the number of available custom slots (dimensions,
    variables) depends on your organisation's configuration.

Transformations
---------------

The tables below list all transformations that may be used to transform
dimensions to metrics or different dimensions.

.. include:: columns_transformations.rst
