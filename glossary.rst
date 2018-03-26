Glossary
========

.. glossary::

    Application
        Website or application tracked by PPMS.

    App ID
        PPMS :term:`application` identificator (previously `website ID`).

    User
        Visitor on tracked :term:`application`.

    Analytics ID
        ID assigned to :term:`user` by :term:`Analytics` for the duration of :term:`Analytics` session. It's stored in
        browser cookie.

    User ID
        Permanent ID assigned to :term:`user` by :term:`application` (e.g. username).

    Device ID
        Device ID (device identification) is a distinctive number associated with a smartphone or similar handheld
        device. Device IDs are separate from hardware serial numbers.

    Identifier
        Unique :term:`user` ID (e.g. :term:`analytics ID`, :term:`user ID`, :term:`device ID` or email).

    Visit
        Period of continuous :term:`user` activity on :term:`application`. Its default maximal length is 30 minutes.

    Audience
        Named set of :term:`attribute` conditions used to define a group of :term:`users<user>` matching them.

    Attribute
        Named value assigned to :term:`user` profile.

    Attribute whitelist
        List of :term:`user` :term:`attributes<attribute>` that are publicly available via Audience Manager get
        :term:`attribute` API. To access these information's it's necessary to provide :term:`analytics ID`.

    PII
        Personally Identifiable Information.

    Hard Data
        Data that is generated from information provided by devices and applications. This information can be measured,
        traced, and validated.

    Soft Data
        Data that has unreliable source. This information usually can't be validated. It may be gathered via voluntary
        form submissions or statistical analysis.

    Analytics
        PPMS component gathering statistics about each :term:`user` of :term:`application` (previously **Piwik**).
