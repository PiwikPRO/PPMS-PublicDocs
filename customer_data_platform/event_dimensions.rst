Event dimensions
================

Profile attributes in Customer Data Platform are populated with values of event
dimensions sent in events. The table below shows all event dimensions that are
available out of the box.

`Profile update API </customer_data_platform/public_api/public_api.html#operation/post-profile-attributes>`_
allows you to send events with event dimensions and thus update profiles the
same way events coming from your website would. Use dimension's incoming key as
property name in `identifiers` object to specify value for that dimension.

You can also provide incoming key of a predefined event dimension when creating
custom profile attributes. The attribute will collect values of the associated
event dimension.

.. list-table::
   :widths: auto
   :header-rows: 1

   * - Incoming key
     - Description
     - Example
     - Type
     - Notes
   * - server_time
     - Time of the event
     - ``"2023-09-11T17:39:31.000000Z"``
     - datetime
     -
   * - event_url
     - Event URL
     - ``"https://example.com/hello"``
     - string
     -
   * - event_title
     - Event title
     - ``"Piwik PRO Analytics Suite"``
     - string
     -
   * - event_type
     - Event type
     - ``1``
     - number
     - Possible values: :download:`event_type.json </_static/json/enum/event_type.json>`
   * - is_anonymous
     - Whether event is anonymous and should not be saved
     - ``false``
     - bool
     -
   * - user_id
     - User identifier
     - ``"mikesmith@example.com"``
     - string
     - When updating profile, this dimension should be sent in **user_id** property of `identifiers`
   * - cookie_id_hex
     - Cookie identifier
     - ``"8d4dd17c784a6330"``
     - string
     - When updating profile, this dimension should be sent in **cookie_id** property of `identifiers`
   * - visitor_id_hex
     - Visitor identifier
     - ``"af7a891e65ecf95b"``
     - string
     -
   * - source
     - Source
     - ``"google"``
     - string
     -
   * - medium
     - Medium
     - ``"organic"``
     - string
     -
   * - source_medium
     - Source / Medium
     - ``"google / organic"``
     - string
     -
   * - keyword
     - Keyword
     - ``"git"``
     - string
     -
   * - referrer_type
     - Referrer type
     - ``2``
     - number
     - Possible values: :download:`referrer_type.json </_static/json/enum/referrer_type.json>`
   * - referrer_url
     - Referrer URL
     - ``"https://referrer.example.com/"``
     - string
     -
   * - campaign_name
     - Campaign name
     - ``"spring_sale"``
     - string
     -
   * - campaign_id
     - Campaign ID
     - ``"c0172"``
     - string
     -
   * - campaign_content
     - Campaign content
     - ``"textlink"``
     - string
     -
   * - campaign_gclid
     - Campaign gclid
     - ``"MFIXNyAtIzlqSWgivr-aAfYFHchmPWSuiFI"``
     - string
     -
   * - operating_system
     - Operating system
     - ``"WIN"``
     - string
     - Possible values: :download:`operating_system.json </_static/json/enum/operating_system.json>`
   * - operating_system_version
     - Operating system version
     - ``"10"``
     - string
     -
   * - browser_name
     - Browser name
     - ``"FF"``
     - string
     - Possible values: :download:`browser_name.json </_static/json/enum/browser_name.json>`
   * - browser_engine
     - Browser engine
     - ``"Gecko"``
     - string
     -
   * - browser_version
     - Browser version
     - ``"79.0"``
     - string
     -
   * - browser_language_iso639
     - Browser language ISO-639
     - ``"en"``
     - string
     - Possible values: :download:`browser_language_iso639.json </_static/json/enum/browser_language_iso639.json>`
   * - device_type
     - Device type
     - ``0``
     - number
     - Possible values: :download:`device_type.json </_static/json/enum/device_type.json>`
   * - device_brand
     - Device brand
     - ``"DL"``
     - string
     - Possible values: :download:`device_brand.json </_static/json/enum/device_brand.json>`
   * - device_model
     - Device model
     - ``"Vostro 3020 MT"``
     - string
     -
   * - resolution
     - Resolution
     - ``"1920x1080"``
     - string
     -
   * - resolution_width
     - Resolution width
     - ``1920``
     - number
     -
   * - resolution_height
     - Resolution height
     - ``1080``
     - number
     -
   * - location_ipv4
     - IP v4
     - ``"192.168.1.3"``
     - ip
     -
   * - location_ipv6
     - IP v6
     - ``"2001:0db8:0:0::1428:57ab"``
     - ip
     -
   * - location_continent_iso_code
     - Location continent ISO code
     - ``"EU"``
     - string
     - Possible values: :download:`location_continent_iso_code.json </_static/json/enum/location_continent_iso_code.json>`
   * - location_country_iso_code
     - Location country ISO code
     - ``"GB"``
     - string
     - When updating profile, must be provided together with `location_country_name`
   * - location_country_name
     - Location country name
     - ``"United Kingdom"``
     - string
     - When updating profile, must be provided together with `location_country_iso_code`
   * - location_subdivision_1_iso_code
     - Location subdivision 1 ISO code
     - ``"EN"``
     - string
     - When updating profile, must be provided together with `location_subdivision_1_name`
   * - location_subdivision_1_name
     - Location subdivision 1 name
     - ``"England"``
     - string
     - When updating profile, must be provided together with `location_subdivision_1_iso_code`
   * - location_subdivision_2_iso_code
     - Location subdivision 2 ISO code
     - ``"CAM"``
     - string
     - When updating profile, must be provided together with `location_subdivision_2_name`
   * - location_subdivision_2_name
     - Location subdivision 2 name
     - ``"Cambridgeshire"``
     - string
     - When updating profile, must be provided together with `location_subdivision_2_iso_code`
   * - location_city_geoname_id
     - Location city geoname ID
     - ``11609029``
     - number
     - When updating profile, must be provided together with `location_city_name`
   * - location_city_name
     - Location city name
     - ``"Cambridgeshire"``
     - string
     - When updating profile, must be provided together with `location_city_geoname_id`
   * - location_provider
     - Location provider
     - ``"provider"``
     - string
     -
   * - location_organization
     - Location organization
     - ``"organization"``
     - string
     -
   * - location_latitude
     - Latitude
     - ``52.36717``
     - number
     -
   * - location_longitude
     - Longitude
     - ``0.00433``
     - number
     -
   * - timing_dom_interactive
     - DOM interactive time (in milliseconds)
     - ``743``
     - number
     -
   * - timing_event_end
     - Event end time (in milliseconds)
     - ``259``
     - number
     -
   * - event_custom_dimension_N
     - Event custom dimension
     - ``"size-m"``
     - string
     -
   * - session_custom_dimension_N
     - Session custom dimension
     - ``"hight-contrast-on"``
     - string
     -
   * - outlink_url
     - Outlink URL
     - ``"https://out.example.com"``
     - string
     -
   * - download_url
     - Download URL
     - ``"https://example.com/file.pdf"``
     - string
     -
   * - search_keyword
     - Search keyword
     - ``running shoes``
     - string
     -
   * - search_category
     - Search category
     - ``footwear``
     - string
     -
   * - search_results_count
     - Search results count
     - ``165``
     - number
     -
   * - custom_event_category
     - Custom event category
     - ``"assignment"``
     - string
     -
   * - custom_event_action
     - Custom event action
     - ``"assignment-submitted"``
     - string
     -
   * - custom_event_name
     - Custom event name
     - ``"Math - Trigonometry - assignment 4"``
     - string
     -
   * - custom_event_value
     - Custom event value
     - ``10``
     - number
     -
   * - content_name
     - Content name
     - ``"promo-video"``
     - string
     -
   * - content_piece
     - Content piece
     - ``"https://example.com/public/promo-01.mp4"``
     - string
     -
   * - content_target
     - Content target
     - ``"https://example.com/more"``
     - string
     -
   * - goal_uuid
     - UUID of the converted goal
     - ``"18344645-84d3-4544-b870-8df42b24d9f2"``
     - string
     -
   * - goal_revenue
     - Value of the goal conversion
     - ``5``
     - number
     -
   * - order_id
     - E-commerce order ID
     - ``"1634"``
     - string
     -
   * - order_time
     - Time of the e-commerce order
     - ``"2023-09-12T09:23:45.000000Z"``
     - datetime
     -
   * - item_count
     - E-commerce item count
     - ``1``
     - number
     -
   * - revenue
     - E-commerce order value
     - ``35.5``
     - number
     -
   * - revenue_subtotal
     - E-commerce order subtotal
     - ``25.5``
     - number
     -
   * - revenue_tax
     - E-commerce order tax
     - ``7.23``
     - number
     -
   * - revenue_shipping
     - E-commerce order shipping
     - ``10``
     - number
     -
   * - revenue_discount
     - E-commerce order discount
     - ``5.5``
     - number
     -
   * - consent_source
     - Consent source
     - ``1``
     - number
     - Possible values: :download:`consent_source.json </_static/json/enum/consent_source.json>`
   * - consent_form_button
     - Consent form button
     - ``1``
     - number
     - Possible values: :download:`consent_form_button.json </_static/json/enum/consent_form_button.json>`
   * - consent_scope
     - Consent scope
     - ``1``
     - number
     - Possible values: :download:`consent_scope.json </_static/json/enum/consent_scope.json>`
   * - consent_action
     - Consent action
     - ``1``
     - number
     - Possible values: :download:`consent_action.json </_static/json/enum/consent_action.json>`
   * - consent_type_analytics
     - Whether users consents to analytics
     - ``true``
     - bool
     -
   * - consent_type_ab_testing_personalization
     - Whether users consents to AB testing and personalization
     - ``true``
     - bool
     -
   * - consent_type_conversion_tracking
     - Whether users consents to conversion tracking
     - ``true``
     - bool
     -
   * - consent_type_marketing_automation
     - Whether users consents to marketing automation
     - ``true``
     - bool
     -
   * - consent_type_remarketing
     - Whether users consents to remarketing
     - ``true``
     - bool
     -
   * - consent_type_user_feedback
     - Whether users consents to feedback
     - ``true``
     - bool
     -
   * - consent_type_custom_1
     - Whether users consents to a custom action
     - ``true``
     - bool
     -
   * - sharepoint_action
     - Sharepoint action
     - ``1``
     - number
     - Deprecated. Possible values: :download:`sharepoint_action.json </_static/json/enum/sharepoint_action.json>`
   * - sharepoint_object_type
     - Sharepoint object type
     - ``2``
     - number
     - Deprecated. Possible values: :download:`sharepoint_object_type.json </_static/json/enum/sharepoint_object_type.json>`
   * - sharepoint_content_type
     - Sharepoint content type
     - ``"document"``
     - string
     - Deprecated
   * - sharepoint_display_name
     - Sharepoint display name
     - ``"Trixie Smith"``
     - string
     - Deprecated
   * - sharepoint_office
     - Sharepoint office
     - ``"Human Resources office"``
     - string
     - Deprecated
   * - sharepoint_department
     - Sharepoint department
     - ``"Human Resources"``
     - string
     - Deprecated
   * - sharepoint_job_title
     - Sharepoint job title
     - ``"Human Resources Manager"``
     - string
     - Deprecated
   * - sharepoint_author
     - Sharepoint author
     - ``"rob.thompson@example.com"``
     - string
     - Deprecated
   * - sharepoint_author_display_name
     - Sharepoint author display name
     - ``"Rob Thompson"``
     - string
     - Deprecated
   * - sharepoint_author_office
     - Sharepoint author office
     - ``"Security office"``
     - string
     - Deprecated
   * - sharepoint_author_department
     - Sharepoint author department
     - ``"Security and Compliance"``
     - string
     - Deprecated
   * - sharepoint_author_job_title
     - Sharepoint author job title
     - ``"Security Researcher"``
     - string
     - Deprecated
   * - sharepoint_file_url
     - Sharepoint file URL
     - ``"https://example.com/documents/report.pdf"``
     - string
     - Deprecated
   * - sharepoint_file_type
     - Sharepoint File Type
     - ``"pdf"``
     - string
     - Deprecated
