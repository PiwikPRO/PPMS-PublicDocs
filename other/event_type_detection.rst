.. _data-collection-processing-event-type-detection:

Event processing
=================

Here's the order in which our tracker detects event types. The detection process is completed with the first match. After that it stops and no further matching is performed.

**Step 1: Goal conversion.** First step in the event type detection process is a check for conversion signs in the tracked event.
If your tracked event had an ``idgoal`` parameter with the ID value other than ``0`` then it will be marked as ``GoalConversion`` type.

**Step 2: Ping.** Then the ``ping`` parameter is analyzed. Depending on it's value one of the following ping types will be assigned:

- values ``1``, ``2`` and ``3`` result in ``Heartbeat`` ping type
- value of ``4`` results in ``Deanonymization`` ping type
- value of ``5`` results in ``PagePerformance`` ping type
- value of ``6`` results in ``CustomPing`` ping type

Values outside of that range will cause an error which results in ``BrokenEvent``.

**Step 3: Download.** Event will be categorized as ``Download`` when ``download`` parameter of the tracked event is provided.

**Step 4: Outlink.** Event will be categorized as ``Outlink`` when ``link`` parameter of the tracked event is provided.

**Step 5: Consent form impression.** Event will be categorized as ``ConsentFormImpression`` when ``e_c`` parameter of the tracked event has value ``consent_form_impression`` assigned.

**Step 6: Consent form click.** Event will be categorized as ``ConsentFormClick`` when ``e_c`` parameter of the tracked event has value ``consent_form_click`` assigned.

**Step 7: Consent decision.** Event will be categorized as ``ConsentDecision`` when ``e_c`` parameter of the tracked event has value ``consent_decision`` assigned.

**Step 8: SharePoint** SharePoint event type detection is a bit more complicated. For the event to be categorized as ``SharePoint`` type two things must occur:

- Custom Variable 1 key has to be equal to ``ppas.sharepoint.plugin``
- ``e_c`` parameter has to be equal to either ``download`` or ``search``

**Step 9: Custom event.** Event will be categorized as ``Custom`` when ``e_c`` and ``e_a`` parameters of the tracked event are provided.

**Step 10: Content interaction.** Event will be categorized as ``ContentInteraction`` when ``c_i`` and ``c_n`` parameters of the tracked event are provided.

**Step 11: Content impression.** Event will be categorized as ``ContentImpression`` when only ``c_n`` parameter of the tracked event is provided (and ``c_i`` is not).

**Step 12: Cart update.** Event will be categorized as ``CartUpdated`` when ``idgoal`` parameter of the tracked event is equal to ``0`` and ``ec_id`` parameter is NOT provided.

**Step 13: Order completed.** Event will be categorized as ``OrderCompleted`` when ``idgoal`` parameter of the tracked event is equal to ``0`` but also ``ec_id`` parameter is provided.

**Step 14: Site search.** Event will be categorized as ``Search`` when either ``search`` parameter of the tracked event is provided or a search term was detected in the tracked url (provided as the ``url`` parameter).

**Step 15: Page view.** When every other detection step failed then your event will be categoried as a simple ``PageView``.

Other events
-----------------

Here are events that aren't detected in the described way. They are a result of the post-processing of an event or a session.

**Abandoned cart:** When a session did not track a ``OrderCompleted`` event, the last event of that type will be converted to ``AbandonedCart``.

**Excluded event:** There are several ways of excluding an event (e.g. by blacklisting source IP or User-Agent header matching).
If an event matches given criteria it will be excluded from the reports but is still tracked and receives ``ExcludedEvent`` type.
If you experien any report abnormalities you may check Tracker Debugger if any of the legitimate traffic is not excluded by mistake.

**Broken event:** The last type is assigned to the tracked event when any error occurs during the processing (e.g. you provided incorrect value in the ``idgoal`` parameter, provided ``idsite`` does not exist, etc). That way you can still check it in the tracker debugger and attached error message will tell you what is wrong with it.
