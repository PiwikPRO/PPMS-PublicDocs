Consent Manager insights data layer events
==========================================

Introduction
------------

In the PPAS 15.3 release, a number of changes and additions have been introduced to the events and variables connected
to Consent Manager's consent form behavior and visitors' interactions with the popup. These include:

  1. Changes to the `Consent` variable
  2. Deprecation of the `Consents were sent` event
  3. New data layer events

Changes to the `Consents` variable
----------------------------------

.. versionchanged:: 15.3

Introduced with the PPAS 8.2 release, the ``Consents`` variable sees a change in PPAS 15.3 release to its initialization
rules. Now, the value of this variable will be resolved on each event, instead of being assigned a value only on emission
of the ``Consents were sent`` event. This makes it possible to use this variable alongside each of the visitor's interactions
to figure out the state of their consent decisions. The contents of this variable will remain unchanged::

  {
    timestamp: 'Mon Jan 25 2021 08:35:49 GMT+0100 (Central European Standard Time)',
    previous_state: {
      analytics: -1,
    },
    current_state: {
      analytics: 1,
    },
    consent_form_language: 'en',
  }

.. describe:: timestamp

  Timestamp of the last consent decision. If no decision has been made previously, this value will be ``undefined``.

.. describe:: previous_state

  Object representing the previous state of visitor's consent decisions. It will be identical with ``current_state``
  for events other than making consent decisions.
    - key - up to seven fields representing consent types available in Consent Manager:

      - ``analytics``
      - ``ab_testing_and_personalization``
      - ``conversion_tracking``
      - ``marketing_automation``
      - ``remarketing``
      - ``user_feedback``
      - ``custom_consent``
    - value - represents visitor's decision and can represented as follows:

      - ``-1`` - no previous decision
      - ``0`` - visitor did not agree to a specific consent type previously
      - ``1`` - visitor agreed to a specific consent type previously

.. describe:: current_state

  Object representing the current state of visitor's consent decisions. It will be identical with ``previous_state``
  for events other than making consent decisions.

.. describe:: consent_form_language

  Current language of the consent form. If the consent form is closed this will be the last known value of the consent
  form language.

Deprecation of `Consents were sent` event
---------------------------------------

.. deprecated:: 15.3

Introduced with the PPAS 8.2 release, the `Consents were sent` event (``stg.consentsWereSent``) is now considered
deprecated. New `Consent decision made` event should be used instead. Read more in `Consent decisions events`_.


Data layer events
-----------------
.. versionadded:: 15.3

PPAS 15.3 release sees the introduction of new data layer events that allow for tracking of consent form views,
popup interactions and visitors' consents. The main purpose of these events is the redesign of the Consent Manager
insights tracking, that will utilize the Tracker API and make the data available for Analytics users. These events
however, will be emitted independently and should allow for construction of custom consent form tracking in other
analytics tools.

Emitted events fall under one of the  following categories:

  1. Consent form views
  2. Consent form interactions
  3. Consent decisions

Consent form views events
`````````````````````````

Each successful consent form render results in an event being pushed to the data layer. These events are categorized,
based on the method used to initiate the consent form render.

Main form
^^^^^^^^^

This event is emitted when a visitor sees the form for the first time or again after we've changed consent types
and ask for additional consent::

  {
    event: 'stg.consentFormViewMain',
  }

.. describe:: event

  Event name

Reminder widget
^^^^^^^^^^^^^^^

This event is emitted when a visitor opens the form by clicking on the reminder widget::

  {
    event: 'stg.consentFormViewReminder',
  }

.. describe:: event

  Event name

Privacy policy link
^^^^^^^^^^^^^^^^^^^

This event is emitted when a visitor opens the form from a privacy policy link widget::

  {
    event: 'stg.consentFormViewPrivacyPolicy',
  }

.. describe:: event

  Event name

Consent form interactions events
````````````````````````````````

For the purpose of tracking how visitors interact with the consent form, every button has an assigned data layer event,
that is emitted each time it is clicked.

Agree to all button
^^^^^^^^^^^^^^^^^^^

.. code-block:: js

  {
    event: 'stg.agreeToAllClicked',
  }

.. describe:: event

  Event name

Reject all button
^^^^^^^^^^^^^^^^^

.. code-block:: js

  {
    event: 'stg.rejectAllClicked',
  }

.. describe:: event

  Event name

Save choices button
^^^^^^^^^^^^^^^^^^^

.. code-block:: js

  {
    event: 'stg.saveChoicesClicked',
  }

.. describe:: event

  Event name

Close button
^^^^^^^^^^^^

.. code-block:: js

  {
    event: 'stg.closeButtonClicked',
  }

.. describe:: event

  Event name


Consent decisions events
````````````````````````

This category contains one event, that is emitted upon successfully saving the visitors consent decisions - once the
data is saved in the privacy cookie::

  {
    event: 'stg.consentDecisionMade',
  }

.. describe:: event

  Event name