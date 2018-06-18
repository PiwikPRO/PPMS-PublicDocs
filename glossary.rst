Glossary
========

.. todo:: Compare descriptions with https://help.piwik.pro/analytics/glossary-piwik-pro-terminology/

.. glossary::

    Application
        Website or application tracked by PPMS.

    App ID
        PPMS :term:`application` identificator (previously **website ID**, **site ID** or **idSite**).

    User
        Visitor on tracked :term:`application`.

    Analytics ID
        ID assigned to :term:`user` by :term:`Analytics` for the duration of :term:`Analytics` session. It is stored in
        browser cookie.

    User ID
        Permanent ID assigned to :term:`user` by :term:`application` (e.g. username). You can read more about it
        `here <https://help.piwik.pro/tag-manager/userid/>`_.

    Device ID
        Device ID (device identification) is a distinctive number associated with a smartphone or similar handheld
        device. Device IDs are separate from hardware serial numbers.

    Identifier
        Unique :term:`user` ID (e.g. :term:`analytics ID`, :term:`user ID`, :term:`device ID` or email).

    Visit
        Period of continuous :term:`user` activity on :term:`application`. It ends in the following situations:

            - after a period of inactivity (option set to 30 minutes by default)
            - at midnight (option enabled by default)
            - on campaign change (option enabled by default)
            - when HTTP referrer points to different website (option disabled by default)

    Audience
        Named set of :term:`attribute` conditions used to define a group of :term:`users<user>` matching them.

    Attribute
        Named value assigned to :term:`user` profile.

    Attribute whitelist
        List of :term:`user` :term:`attributes<attribute>` that are publicly available via Audience Manager API.

        .. note::
            It is still necessary to identify the :term:`user` with his :term:`analytics ID` to access this information.

    PII
        Personally Identifiable Information.

    Analytics attribute
        :term:`Attribute` generated from value provided by :term:`Analytics` (e.g. browser and device data, location
        data, etc.). You can read more about :term:`attribute` sources
        `here <https://help.piwik.pro/audience-manager/data-sources/>`_.

        .. note::
            If :term:`custom attribute` uses the same name - it will be represented as a separate :term:`attribute`.

    Custom attribute
        :term:`Attribute` generated from value provided by source other than :term:`Analytics` (e.g.
        :doc:`audience_manager/form-tracker`, :doc:`sdk/index`). You can read more about :term:`attribute` sources
        `here <https://help.piwik.pro/audience-manager/data-sources/>`_.

        .. warning::
            :term:`Custom attribute` will store only latest value provided by any custom source.

        .. note::
            If :term:`analytics attribute` uses the same name - it will be represented as a separate :term:`attribute`.

    Analytics
        PPMS component gathering statistics about each :term:`user` of the :term:`application` (previously **Piwik**).
