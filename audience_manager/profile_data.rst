Profile parameters
==================

=====================  ======  ===========================================================================================
key                    type    description
=====================  ======  ===========================================================================================
id                     uuid1   ID of profile.
website_id             string  ID of the website.
user_id                string  Value of user id from the Analytics.
email                  string  Email address of the user (detected from submitted form or imported from e.g. CSV).
analytics_visitor_id   string  Analytics ID of the user. Value of cookie analytics_visitor_id.
analytics_visitor_ids  list    List of analytics_visitor_ids.

                               Example:

                               .. code-block:: python

                                  ['d40bb72cc59e9ef3', 'b98d365b1d464326']
device_ids             list    List of device IDs.
attributes             dict    Key-value dict that contains all data about the user collected from submitted
                               forms and data imports.

                               Example:

                               .. code-block:: python

                                  {
                                      "age_group": "12-18",
                                      "occupation": "wizard"
                                  }
forms                  dict    Key-value dict that contains timestamps and urls of submitted forms (i.e.
                               the most recent submission for each form id).

                               Example:

                               .. code-block:: python

                                  {
                                      "checkout_form": {
                                          "timestamp": "2017-01-01T12:10:30Z",
                                          "url": "http://www.example.com/checkout"
                                      },
                                      "newsletter_form": {
                                          "timestamp": "2017-01-01T12:15:42Z",
                                          "url": "http://www.example.com/newsletter"
                                      }
                                  }
analytics              dict    Data captured from the Analytics. Flat structure (key, value), without nested dictionaries.

                               Example:

                               .. code-block:: python

                                  {
                                      "os": "WIN",
                                      "device_brand": "SA",
                                      "device_model": "Galaxy Tab 8.4"
                                  }
visits                 dict    Data captured from the Analytics.

                               Example:

                               .. code-block:: python

                                  {
                                      "last_visit": "2020-02-11T19:09:46.979906",
                                      "first_visit": "2020-02-11T19:09:28.331501"
                                  }
goals                  dict    Goals captured from the Analytics. The keys are goal ids and the values are
                               dicts containing goal stats.

                               Special key "all" contains aggregated values for all goals.

                               Example:

                               .. code-block:: python

                                  {
                                      "42": {
                                          "conversion_count": 1,
                                          "last_conversion": "2011-12-03T10:15:30+01:00",
                                          "revenue": 1.25,
                                          "last_revenue": 1.25
                                      }
                                  }
ecommerce              dict    Ecommerce conversions captured from the Analytics.

                               Example:

                               .. code-block:: python

                                  {
                                      "number_of_orders": 1,
                                      "last_conversion": "2011-12-03T10:15:30+01:00",
                                      "last_revenue": 12.50,
                                      "total_revenue": 08.32
                                  }
updated_at             date    Timestamp of the last update of the profile.
generic                dict    Key-value dict with generic profile values.

                               Example:

                               .. code-block:: python

                                  {
                                    "total_revenue": 08.32
                                  }
=====================  ======  ===========================================================================================
