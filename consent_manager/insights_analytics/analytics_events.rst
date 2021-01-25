Consent Manager insights analytics events
=========================================

.. versionadded:: 15.3

Introduction
------------

Since the release of PPAS 15.3, Consent Manager stats tracking presented on Insights tab has been redesigned to utilize
the custom event tracking API available in our Tracker (read more in `Trigger custom event` section of :ref:`Tracker
documentation <tracker-js-tracking-api>`).

Consent Manager insights Analytics events breakdown
---------------------------------------------------

The events connected to Consent Manager insights Analytics have been divided into following categories:

  1. Consent form views
  2. Consent form interactions
  3. Consents
  4. Consents by type

Details about each category - what is their scope and what events are emitted - are described below.

Consent form views
``````````````````
This category encompases all events connected to consent form impressions. Here, you can extract the data not only about
the number of consent form views, the method used to trigger the popup render, but also about the state of the users
consent at the moment of the form impression (if all consent decisions were made before, or if it included consent types
that the visitor did not make a decision about previously).

The source of the impression is reflected in the event action field and can take one of the following values: ``Main form``,
``Reminder``, ``Privacy policy``.

``Event name`` field is used to indicate the state of the visitors consents for ``Privacy policy`` action (the remaining
two actions always include undecided consent types). It can take one of two values: ``First view`` or ``Review``.

All events for this category are presented in the table below:

  +--------------------+---------------------+------------+---------------------------------------------------------------------+
  | Event category     | Event action        | Event name | Tracked when                                                        |
  +====================+=====================+============+=====================================================================+
  | Consent form views | Main form           |            | A visitor sees the form for the first time or again after we've     |
  |                    |                     |            | changed consent types.                                              |
  +--------------------+---------------------+------------+---------------------------------------------------------------------+
  | Consent form views | Reminder            |            | A visitor opens the form by clicking on the reminder widget.        |
  +--------------------+---------------------+------------+---------------------------------------------------------------------+
  | Consent form views | Privacy policy      | First view | A visitor hasn't agreed to one or more consents and opens the form  |
  |                    |                     |            | from a link on your privacy policy page.                            |
  +--------------------+---------------------+------------+---------------------------------------------------------------------+
  | Consent form views | Privacy policy      | Review     | A visitor has agreed to all consents and opens the form from a link |
  |                    |                     |            | on your privacy policy page.                                        |
  +--------------------+---------------------+------------+---------------------------------------------------------------------+

Consent form interactions
`````````````````````````
This category is dedicated to tracking usage of consent form buttons - each action that results in consent form being
removed from the screen will have a dedicated custom event. Event name field is not used for this category.

All events for this category are presented in the table below:

  +---------------------------+---------------+------------------------------------------------------+
  | Event category            | Event action  | Tracked when                                         |
  +===========================+===============+======================================================+
  | Consent form interactions | Agreed to all | A visitor clicks on `Agree to all`.                  |
  +---------------------------+---------------+------------------------------------------------------+
  | Consent form interactions | Rejected all  | A visitor clicks on `Reject all`.                    |
  +---------------------------+---------------+------------------------------------------------------+
  | Consent form interactions | Saved choices | A visitor clicks on `Save choices`.                  |
  +---------------------------+---------------+------------------------------------------------------+
  | Consent form interactions | Closed a form | A visitor closes a form by clicking on the x button. |
  +---------------------------+---------------+------------------------------------------------------+

Consents
````````
In this category, you can find information about the scope of the consent decisions. Event name field is not used for this category.

All events for this category are presented in the table below:

  +----------------+---------------+------------------------------------------------+
  | Event category | Event action  | Tracked when                                   |
  +================+===============+================================================+
  | Consents       | Full consent  | A visitor agrees to all consent types.         |
  +----------------+---------------+------------------------------------------------+
  | Consents       | Any consent   | A visitor agrees to one or more consent types. |
  +----------------+---------------+------------------------------------------------+
  | Consents       | No consent    | A visitor rejects all consents.                |
  +----------------+---------------+------------------------------------------------+
  | Consents       | First consent | A visitor consents for the first time.         |
  +----------------+---------------+------------------------------------------------+

It is worth highlighting the `Consent decision - First consent` event. Its purpose is recreating the ``No decision``
statistic from Consent Manager insights. It will be emitted each time when visitor consent decision had previously undecided
consent in its scope (at least one). With the use of this event the no decision statistic can be calculated in the following manner::

  consent_form_impressions = main_form + reminder_widget + privacy_policy_link_first_view

  no_decision = consent_form_impressions - first_consent

where:

  - ``consent_form_impressions`` - number of consent form impressions with undecided consent
  - ``main_form`` - number of `Consent form views - Main form` events
  - ``reminder_widget`` - number of `Consent form views - Reminder` events
  - ``privacy_policy_link_first_view`` - number of `Consent form views - Privacy policy - First view` events
  - ``first_consent`` - number of `Consents - First consent` events
  - ``no_decision`` - final value for the `No decision` metric presented on Consent Manager insights

Consents by type
````````````````
This category provides a breakdown of visitors' consent decisions according to the consent types they agreed to.

All events for this category are presented in the table below:

  +------------------+------------------+-----------------+----------------------------------------------------------------+
  | Event category   | Event action     | Event name      | Tracked when                                                   |
  +==================+==================+=================+================================================================+
  | Consents by type | ``consent_type`` | First consent   | A visitor agrees to a given consent type for the first time.   |
  +------------------+------------------+-----------------+----------------------------------------------------------------+
  | Consents by type | ``consent_type`` | Changed consent | A visitor who didn't agree to a given consent type now agrees. |
  +------------------+------------------+-----------------+----------------------------------------------------------------+

where ``consent_type`` can take one of the following values (consent types available in Consent Manager):

  - Analytics
  - AB testing & personalization
  - Conversion tracking
  - Marketing automation
  - User feedback
  - Remarketing
  - Custom
