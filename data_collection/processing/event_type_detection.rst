.. _data-collection-processing-event-type-detection:

Event type detection
=================

Available event types
-----------------

Analyzing various properties of the tracked event we recognize one of the following types:

- PageView
- Outlink
- Download
- Search
- Custom
- ContentImpression
- ContentInteraction
- GoalConversion
- OrderCompleted
- AbandonedCart
- SharePoint
- ConsentFormImpression
- ConsentFormClick
- ConsentDecision
- CustomPing
- CartUpdated
- BrokenEvent
- ExcludedEvent
- Heartbeat
- Deanonymization
- PagePerformance

Detection order
-----------------

This section describes the order of the event type detection. Process is satisfied with the first match, after that it stops and no further matching is performed.

Conversion
~~~~~~~~~~~~~~~~~~

First step in the event type detection process is a check for conversion signs in the tracked event.
If your tracked event had an ``idgoal`` parameter with the ID value other than ``0`` then it will be marked as ``GoalConversion`` type.

Ping
~~~~~~~~~~~~~~~~~~

Then the ``ping`` parameter is analyzed. Depending on it's value one of the following ping types will be assigned:

- values ``1``, ``2`` and ``3`` result in ``Heartbeat`` ping type
- value of ``4`` results in ``Deanonymization`` ping type
- value of ``5`` results in ``PagePerformance`` ping type
- value of ``6`` results in ``CustomPing`` ping type

Values outside of that range will cause an error which results in BrokenEvent.

Download
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``Download`` when ``download`` parameter of the tracked event is provided.

Outlink
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``Outlink`` when ``link`` parameter of the tracked event is provided.

Consent form impression
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``ConsentFormImpression`` when ``e_c`` parameter of the tracked event has value ``consent_form_impression`` assigned.

Consent form click
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``ConsentFormClick`` when ``e_c`` parameter of the tracked event has value ``consent_form_click`` assigned.

Consent decision
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``ConsentDecision`` when ``e_c`` parameter of the tracked event has value ``consent_decision`` assigned.

SharePoint
~~~~~~~~~~~~~~~~~~
SharePoint event type detection is a bit more complicated.
For the event to be categorized as ``SharePoint`` type two things must occur:

- Custom Variable 1 key has to be equal to ``ppas.sharepoint.plugin``
- ``e_c`` parameter has to be equal to either ``download`` or ``search``

Custom event
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``Custom`` when ``e_c`` and ``e_a`` parameters of the tracked event are provided.

Content interaction
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``ContentInteraction`` when ``c_i`` and ``c_n`` parameters of the tracked event are provided.

Content impression
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``ContentImpression`` when only ``c_n`` parameter of the tracked event is provided (and ``c_i`` is not).

Cart update
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``CartUpdated`` when ``idgoal`` parameter of the tracked event is equal to ``0`` and ``ec_id`` parameter is NOT provided.

Order completed
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``OrderCompleted`` when ``idgoal`` parameter of the tracked event is equal to ``0`` but also ``ec_id`` parameter is provided.

Site search
~~~~~~~~~~~~~~~~~~

Event will be categorized as ``Search`` when either ``search`` parameter of the tracked event is provided or a search term was detected in the tracked url (provided as the ``url`` parameter).

Page view
~~~~~~~~~~~~~~~~~~

When every other detection step failed then your event will be categoried as a simple ``PageView``.

Special cases
-----------------

As you have probly noticed already, there are 3 event types missing in the detection process steps.

- AbandonedCart
- ExcludedEvent
- BrokenEvent

That is because those type are not "detected" but rather are a result of the post-processing of an event or a session.

Abandoned Cart
~~~~~~~~~~~~~~~~~~

When a session did not track a ``OrderCompleted`` event, the last event of ``CartUpdate`` type will be converted to ``AbandonedCart``.

Excluded Event
~~~~~~~~~~~~~~~~~~

There are several ways of excluding an event (e.g. by blacklisting source IP or User-Agent header matching).
If an event matches given criteria it will be excluded from the reports but is still tracked and receives ``ExcludedEvent`` type.
If you experience any report abnormalities you may check Tracker Debugger if any of the legitimate traffic is not excluded by mistake.

Broken Event
~~~~~~~~~~~~~~~~~~

The last type is assigned to the tracked event when any error occurs during the processing (e.g. you provided incorrect value in the ``idgoal`` parameter, provided ``idsite`` does not exist, etc).
That way you can still check it in the Tracker Debugger and attached error message will tell you what is wrong with it.
