Profile data
============

=====================  ======  ===========================================================================================
key                    type    description
=====================  ======  ===========================================================================================
id                     uuid    ID of profile.

                               Example:

                               .. code-block:: python

                                  "d9a614a1-1234-11ea-a72c-0202c0f2d936"
website_id             uuid    ID of the website.

                               Example:

                               .. code-block:: python

                                  "5dff7262-731e-291d-ad23-d1aea83ecd51"
user_id                string  Value of user id from the Analytics.

                               Example:

                               .. code-block:: python

                                  "ff1063df11"
email                  string  Email address of the user (detected from submitted form or imported from e.g. CSV).

                               Example:

                               .. code-block:: python

                                  "test@example.com"
analytics_visitor_id   string  Analytics ID of the user. Value of cookie analytics_visitor_id.

                               Example:

                               .. code-block:: python

                                  "b3d31070825871e1"
analytics_visitor_ids  list    List of analytics_visitor_ids.

                               Example:

                               .. code-block:: python

                                  ["d40bb72cc59e9ef3", "b98d365b1d464326"]
device_ids             list    List of device IDs.

                               Example:

                               .. code-block:: python

                                  ["432fdsl4d", "431fdsl4d"]
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
                                      'browser_name': 'Chrome',
                                      'browser_version': '8.0',
                                      'browser_language': 'Polish',
                                      'device_brand': '',
                                      'device_model': '',
                                      'device_type': 'desktop',
                                      'os': 'GNU/Linux',
                                      'os_version': 'UNK',
                                      'continent': 'Europe',
                                      'country': 'Poland (Europe)',
                                      'region': 'region',
                                      'city': 'City',
                                      'organization': 'Organization',
                                      'provider': 'example.org',
                                      'metro_code': '839',
                                      'campaign_name': 'CampaignName',
                                      'campaign_keyword': 'CampignKeyword',
                                      'campaign_source': 'CampaignSource',
                                      'campaign_medium': 'CampaignMedium',
                                      'campaign_content': 'CampaignContent',
                                      'campaign_id': '123'
                                      'referer_type': 'website',
                                      'referer_url': 'https://referer.example/',
                                      'referer_name': 'referer.example',
                                      'referer_keyword': 'keyword'
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
                                      "all": {
                                          "revenue": 92.0,
                                          "last_conversion": "2020-01-29T09:32:41+00:00",
                                          "last_revenue": 2.0,
                                          "conversion_count": 14
                                      },
                                      "1": {
                                          "revenue": 84.0,
                                          "last_conversion": "2020-01-29T09:32:41+00:00",
                                          "last_revenue": 2.0,
                                          "conversion_count": 10
                                      },
                                      "2": {
                                          "revenue": 8.0,
                                          "last_conversion": "2020-01-29T09:32:41+00:00",
                                          "last_revenue": 2.0,
                                          "conversion_count": 4
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

                               Example:

                               .. code-block:: python

                                  "2020-01-29T09:32:43.390962"
generic                dict    Key-value dict with generic profile values.

                               Example:

                               .. code-block:: python

                                  {
                                    "total_revenue": 08.32
                                  }
=====================  ======  ===========================================================================================
