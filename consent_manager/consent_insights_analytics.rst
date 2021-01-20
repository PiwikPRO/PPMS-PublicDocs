Consent insights analytics
==========================

.. versionadded:: 15.3

Introduction
------------

Since the release of PPAS 15.3, Consent Manager stats tracking presented on Insights tab has been redesigned to utilize
the custom event tracking API available in our Tracker (read more in `Trigger custom event` section of :ref:`Tracker
documentation <tracker-js-tracking-api>`).

Consent insights Analytics events breakdown
-------------------------------------------

The events connected to Consent Manager insights Analytics have been divided into following categories:

  1. Consent form views
  2. Consent form interactions
  3. Consent decisions
  4. Consent decisions by type

Details about each category - what is their scope and what events are emitted - are described below.

Consent form views
``````````````````
This category encompases all events connected to consent form impressions. Here, you can extract the data not only about
the number of consent form views, the method used to trigger the popup render, but also about the state of the users
consent at the moment of the form impression (if all consent decisions were made before, or if it included consent types
that the visitor did not make a decision about previously).

The source of the impression is reflected in the event action field and can take one of the following values: ``Automatic``,
``Reminder widget``, ``Privacy policy link``.

``Event name`` field is used to indicate the state of the visitors consents for ``Privacy policy link`` action (the remaining
two actions always include undecided consent types). It can take one of two values: ``Initial view`` or ``Review consent decisions``.

All events for this category are presented in the table below:

  +--------------------+---------------------+--------------------------+---------------------------------------------------------------------+
  | Event category     | Event action        | Event name               | Description                                                         |
  +====================+=====================+==========================+=====================================================================+
  | Consent form views | Automatic           |                          | Dispatched when consent form is shown for first time or when asking |
  |                    |                     |                          | for additional consent                                              |
  +--------------------+---------------------+--------------------------+---------------------------------------------------------------------+
  | Consent form views | Reminder widget     |                          | Dispatched when consent form is opened via reminder widget          |
  +--------------------+---------------------+--------------------------+---------------------------------------------------------------------+
  | Consent form views | Privacy policy link | Initial view             | Dispatched when consent form is opened via privacy policy widget    |
  |                    |                     |                          | and contains previously undecided consent types                     |
  +--------------------+---------------------+--------------------------+---------------------------------------------------------------------+
  | Consent form views | Privacy policy link | Review consent decisions | Dispatched when consent form is opened via privacy policy widget    |
  |                    |                     |                          | and visitor previously made a decision about all consent types      |
  +--------------------+---------------------+--------------------------+---------------------------------------------------------------------+

Consent form interactions
`````````````````````````
This category is dedicated to tracking usage of consent form buttons - each action that results in consent form being
removed from the screen will have a dedicated custom event. Event name field is not used for this category.

All events for this category are presented in the table below:

  +---------------------------+----------------------+----------------------------------------------------------+
  | Event category            | Event action         | Description                                              |
  +===========================+======================+==========================================================+
  | Consent form interactions | Agree to all clicked | Dispatched when ``Agree to all`` button is clicked       |
  +---------------------------+----------------------+----------------------------------------------------------+
  | Consent form interactions | Reject all clicked   | Dispatched when ``Reject all`` button is clicked         |
  +---------------------------+----------------------+----------------------------------------------------------+
  | Consent form interactions | Save choices clicked | Dispatched when ``Save choices`` button is clicked       |
  +---------------------------+----------------------+----------------------------------------------------------+
  | Consent form interactions | Close button clicked | Dispatched when form is closed with the close button (X) |
  +---------------------------+----------------------+----------------------------------------------------------+

Consent decisions
`````````````````
In this category, you can find information about the scope of the consent decisions. Event name field is not used for this category.

All events for this category are presented in the table below:

  +-------------------+-----------------+---------------------------------------------------------------------------------------------+
  | Event category    | Event action    | Description                                                                                 |
  +===================+=================+=============================================================================================+
  | Consent decisions | Full consent    | Dispatched when visitor agrees to the full scope of the consent types used within a website |
  +-------------------+-----------------+---------------------------------------------------------------------------------------------+
  | Consent decisions | Any consent     | Dispatched when visitor agrees to at least one of the consent types used within a website   |
  +-------------------+-----------------+---------------------------------------------------------------------------------------------+
  | Consent decisions | No consent      | Dispatched when visitor rejects all consent types used within a website                     |
  +-------------------+-----------------+---------------------------------------------------------------------------------------------+
  | Consent decisions | Initial consent | Dispatched when visitor makes a decision about consent type for the first time              |
  +-------------------+-----------------+---------------------------------------------------------------------------------------------+

It is worth highlighting the `Consent decision - Initial consent` event. Its purpose is recreating the ``No decision``
statistic from Consent Manager insights. It will be emitted each time when visitor consent decision had previously undecided
consent in its scope (at least one). With the use of this event the no decision statistic can be calculated in the following manner::

  consent_form_impressions = automatic + reminder_widget + privacy_policy_link_initial

  no_decision = consent_form_impressions - initial_consent

where:

  - ``consent_form_impressions`` - number of consent form impressions with undecided consent
  - ``automatic`` - number of `Consent form views - Automatic` events
  - ``reminder_widget`` - number of `Consent form views - Reminder widget` events
  - ``privacy_policy_link_initial`` - number of `Consent form views - Privacy policy link - Initial view` events
  - ``initial_consent`` - number of `Consent decisions - Initial consent` events
  - ``no_decision`` - final value for the `No decision` metric presented on Consent Manager insights

Consent decisions by type
`````````````````````````
This category provides a breakdown of visitors' consent decisions according to the consent types they agreed to.

All events for this category are presented in the table below:

  +---------------------------+------------------+------------------------+---------------------------------------------------------+
  | Event category            | Event action     | Event name             | Description                                             |
  +===========================+==================+========================+=========================================================+
  | Consent decisions by type | ``consent_type`` | Initial consent        | Dispatched when user agrees to a specific consent type  |
  |                           |                  |                        | and has not made a decision about it previously         |
  +---------------------------+------------------+------------------------+---------------------------------------------------------+
  | Consent decisions by type | ``consent_type`` | Consent choices review | Dispatched when user has rejected specific consent type |
  |                           |                  |                        | previously and changes the decision                     |
  +---------------------------+------------------+------------------------+---------------------------------------------------------+

where ``consent_type`` can take one of the following values (consent types available in Consent Manager):

  - Analytics
  - AB testing & personalization
  - Conversion tracking
  - Marketing automation
  - User feedback
  - Remarketing
  - Custom
