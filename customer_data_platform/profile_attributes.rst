Profile attributes
==================

Profile attributes in Customer Data Platform are populated with values attached
to events coming from your website, or those sent through `Profile update API <../customer_data_platform/public_api/profiles.html#operation/post-profile-attributes>`_.
For example, user attribute *Medium* collects values associated with event data
key ``analytics.medium``.

When creating custom attributes, either through UI or `Attributes API <../customer_data_platform/authorized_api/attributes.html#operation/post-settings-app-custom-attribute>`_,
you specify from which event data key values will be collected. You can provide
an event data key used by another attribute to collect the same data twice
(potentially with different aggregations), or a new key to collect data
independently.

Events send through `Profile update API <../customer_data_platform/public_api/profiles.html#operation/post-profile-attributes>`_
can specify values for analytics event data keys, as well as custom keys
configured during creation of custom user attributes. This allows you to update
profile data gathered from your website or enrich profiles with information
from other sources, like a CRM system.

Example profile update request body:

.. code-block:: JSON

  {
    "identifiers": {
      "user_id": "tom1998@example.com"
    },
    "attributes": {
      "analytics.medium": "newsletter",
      "crm_user_score": "12"
    }
  }

The following table shows all event data keys available right from the start.

.. list-table::
   :widths: auto
   :header-rows: 1

   * - Event data key
     - Value description
     - Example
     - Type
     - Notes
   * - analytics.server_time
     - Time of the event
     - ``"2023-09-11T17:39:31.000000Z"``
     - datetime
     -
   * - analytics.event_url
     - Event URL
     - ``"https://example.com/hello"``
     - string
     -
   * - analytics.event_title
     - Event title
     - ``"Piwik PRO Analytics Suite"``
     - string
     -
   * - analytics.event_type
     - Event type
     - ``1``
     - number
     - Possible values: :download:`event_type.json </_static/json/enum/event_type.json>`
   * - analytics.is_anonymous
     - Whether event is anonymous and should not be saved
     - ``false``
     - bool
     -
   * - analytics.user_id
     - User identifier
     - ``"mikesmith@example.com"``
     - string
     - When updating profile, this dimension should be sent in **user_id** property of `identifiers`
   * - analytics.cookie_id_hex
     - Cookie identifier
     - ``"8d4dd17c784a6330"``
     - string
     - When updating profile, this dimension should be sent in **cookie_id** property of `identifiers`
   * - analytics.visitor_id_hex
     - Visitor identifier
     - ``"af7a891e65ecf95b"``
     - string
     -
   * - analytics.source
     - Source
     - ``"google"``
     - string
     -
   * - analytics.medium
     - Medium
     - ``"organic"``
     - string
     -
   * - analytics.source_medium
     - Source / Medium
     - ``"google / organic"``
     - string
     -
   * - analytics.keyword
     - Keyword
     - ``"git"``
     - string
     -
   * - analytics.referrer_type
     - Referrer type
     - ``2``
     - number
     - Possible values: :download:`referrer_type.json </_static/json/enum/referrer_type.json>`
   * - analytics.referrer_url
     - Referrer URL
     - ``"https://referrer.example.com/"``
     - string
     -
   * - analytics.campaign_name
     - Campaign name
     - ``"spring_sale"``
     - string
     -
   * - analytics.campaign_id
     - Campaign ID
     - ``"c0172"``
     - string
     -
   * - analytics.campaign_content
     - Campaign content
     - ``"textlink"``
     - string
     -
   * - analytics.campaign_gclid
     - Campaign gclid
     - ``"MFIXNyAtIzlqSWgivr-aAfYFHchmPWSuiFI"``
     - string
     -
   * - analytics.operating_system
     - Operating system
     - ``"WIN"``
     - string
     - Possible values: :download:`operating_system.json </_static/json/enum/operating_system.json>`
   * - analytics.operating_system_version
     - Operating system version
     - ``"10"``
     - string
     -
   * - analytics.browser_name
     - Browser name
     - ``"FF"``
     - string
     - Possible values: :download:`browser_name.json </_static/json/enum/browser_name.json>`
   * - analytics.browser_engine
     - Browser engine
     - ``"Gecko"``
     - string
     -
   * - analytics.browser_version
     - Browser version
     - ``"79.0"``
     - string
     -
   * - analytics.browser_language_iso639
     - Browser language ISO-639
     - ``"en"``
     - string
     - Possible values: :download:`browser_language_iso639.json </_static/json/enum/browser_language_iso639.json>`
   * - analytics.device_type
     - Device type
     - ``0``
     - number
     - Possible values: :download:`device_type.json </_static/json/enum/device_type.json>`
   * - analytics.device_brand
     - Device brand
     - ``"DL"``
     - string
     - Possible values: :download:`device_brand.json </_static/json/enum/device_brand.json>`
   * - analytics.device_model
     - Device model
     - ``"Vostro 3020 MT"``
     - string
     -
   * - analytics.resolution
     - Resolution
     - ``"1920x1080"``
     - string
     -
   * - analytics.resolution_width
     - Resolution width
     - ``1920``
     - number
     -
   * - analytics.resolution_height
     - Resolution height
     - ``1080``
     - number
     -
   * - analytics.location_ipv4
     - IP v4
     - ``"192.168.1.3"``
     - ip
     -
   * - analytics.location_ipv6
     - IP v6
     - ``"2001:0db8:0:0::1428:57ab"``
     - ip
     -
   * - analytics.location_continent_iso_code
     - Location continent ISO code
     - ``"EU"``
     - string
     - Possible values: :download:`location_continent_iso_code.json </_static/json/enum/location_continent_iso_code.json>`
   * - analytics.location_country_iso_code
     - Location country ISO code
     - ``"GB"``
     - string
     - When updating profile, must be provided together with `location_country_name`
   * - analytics.location_country_name
     - Location country name
     - ``"United Kingdom"``
     - string
     - When updating profile, must be provided together with `location_country_iso_code`
   * - analytics.location_subdivision_1_iso_code
     - Location subdivision 1 ISO code
     - ``"EN"``
     - string
     - When updating profile, must be provided together with `location_subdivision_1_name`
   * - analytics.location_subdivision_1_name
     - Location subdivision 1 name
     - ``"England"``
     - string
     - When updating profile, must be provided together with `location_subdivision_1_iso_code`
   * - analytics.location_subdivision_2_iso_code
     - Location subdivision 2 ISO code
     - ``"CAM"``
     - string
     - When updating profile, must be provided together with `location_subdivision_2_name`
   * - analytics.location_subdivision_2_name
     - Location subdivision 2 name
     - ``"Cambridgeshire"``
     - string
     - When updating profile, must be provided together with `location_subdivision_2_iso_code`
   * - analytics.location_city_geoname_id
     - Location city geoname ID
     - ``11609029``
     - number
     - When updating profile, must be provided together with `location_city_name`
   * - analytics.location_city_name
     - Location city name
     - ``"Cambridgeshire"``
     - string
     - When updating profile, must be provided together with `location_city_geoname_id`
   * - analytics.location_provider
     - Location provider
     - ``"provider"``
     - string
     -
   * - analytics.location_organization
     - Location organization
     - ``"organization"``
     - string
     -
   * - analytics.location_latitude
     - Latitude
     - ``52.36717``
     - number
     -
   * - analytics.location_longitude
     - Longitude
     - ``0.00433``
     - number
     -
   * - analytics.timing_dom_interactive
     - DOM interactive time (in milliseconds)
     - ``743``
     - number
     -
   * - analytics.timing_event_end
     - Event end time (in milliseconds)
     - ``259``
     - number
     -
   * - analytics.event_custom_dimension_N
     - Event custom dimension
     - ``"size-m"``
     - string
     -
   * - analytics.session_custom_dimension_N
     - Session custom dimension
     - ``"hight-contrast-on"``
     - string
     -
   * - analytics.outlink_url
     - Outlink URL
     - ``"https://out.example.com"``
     - string
     -
   * - analytics.download_url
     - Download URL
     - ``"https://example.com/file.pdf"``
     - string
     -
   * - analytics.search_keyword
     - Search keyword
     - ``"running shoes"``
     - string
     -
   * - analytics.search_category
     - Search category
     - ``"footwear"``
     - string
     -
   * - analytics.search_results_count
     - Search results count
     - ``165``
     - number
     -
   * - analytics.custom_event_category
     - Custom event category
     - ``"assignment"``
     - string
     -
   * - analytics.custom_event_action
     - Custom event action
     - ``"assignment-submitted"``
     - string
     -
   * - analytics.custom_event_name
     - Custom event name
     - ``"Math - Trigonometry - assignment 4"``
     - string
     -
   * - analytics.custom_event_value
     - Custom event value
     - ``10``
     - number
     -
   * - analytics.content_name
     - Content name
     - ``"promo-video"``
     - string
     -
   * - analytics.content_piece
     - Content piece
     - ``"https://example.com/public/promo-01.mp4"``
     - string
     -
   * - analytics.content_target
     - Content target
     - ``"https://example.com/more"``
     - string
     -
   * - analytics.goal_uuid
     - UUID of the converted goal
     - ``"18344645-84d3-4544-b870-8df42b24d9f2"``
     - string
     -
   * - analytics.goal_revenue
     - Value of the goal conversion
     - ``5``
     - number
     -
   * - analytics.order_id
     - E-commerce order ID
     - ``"1634"``
     - string
     -
   * - analytics.order_time
     - Time of the e-commerce order
     - ``"2023-09-12T09:23:45.000000Z"``
     - datetime
     -
   * - analytics.item_count
     - E-commerce item count
     - ``1``
     - number
     -
   * - analytics.revenue
     - E-commerce order value
     - ``35.5``
     - number
     -
   * - analytics.revenue_subtotal
     - E-commerce order subtotal
     - ``25.5``
     - number
     -
   * - analytics.revenue_tax
     - E-commerce order tax
     - ``7.23``
     - number
     -
   * - analytics.revenue_shipping
     - E-commerce order shipping
     - ``10``
     - number
     -
   * - analytics.revenue_discount
     - E-commerce order discount
     - ``5.5``
     - number
     -
   * - analytics.consent_source
     - Consent source
     - ``1``
     - number
     - Possible values: :download:`consent_source.json </_static/json/enum/consent_source.json>`
   * - analytics.consent_form_button
     - Consent form button
     - ``1``
     - number
     - Possible values: :download:`consent_form_button.json </_static/json/enum/consent_form_button.json>`
   * - analytics.consent_scope
     - Consent scope
     - ``1``
     - number
     - Possible values: :download:`consent_scope.json </_static/json/enum/consent_scope.json>`
   * - analytics.consent_action
     - Consent action
     - ``1``
     - number
     - Possible values: :download:`consent_action.json </_static/json/enum/consent_action.json>`
   * - analytics.consent_type_analytics
     - Whether users consents to analytics
     - ``true``
     - bool
     -
   * - analytics.consent_type_ab_testing_personalization
     - Whether users consents to AB testing and personalization
     - ``true``
     - bool
     -
   * - analytics.consent_type_conversion_tracking
     - Whether users consents to conversion tracking
     - ``true``
     - bool
     -
   * - analytics.consent_type_marketing_automation
     - Whether users consents to marketing automation
     - ``true``
     - bool
     -
   * - analytics.consent_type_remarketing
     - Whether users consents to remarketing
     - ``true``
     - bool
     -
   * - analytics.consent_type_user_feedback
     - Whether users consents to feedback
     - ``true``
     - bool
     -
   * - analytics.consent_type_custom_1
     - Whether users consents to a custom action
     - ``true``
     - bool
     -
