Glossary
========

.. todo:: Compare descriptions with https://help.piwik.pro/analytics/glossary-piwik-pro-terminology/

.. raw:: html

    <script>
        if(document.querySelector('#glossary')) {
            let menuBar = document.querySelector('.wy-nav-side');
            let content = document.querySelector('.wy-nav-content-wrap');
            if(menuBar) {
                menuBar.style.display = 'none';
                content.style.marginLeft = '0';
            }
        }
    </script>

.. glossary::

    Analytics
        PPAS component gathering statistics about each :term:`visitor` of the :term:`application` (previously **Piwik**).

    Analytics attribute
        :term:`Attribute` generated from value provided by :term:`Analytics` (e.g. browser and device data, location
        data, etc.). You can read more about :term:`attribute` sources
        `here <https://help.piwik.pro/audience-manager/data-sources/>`_.

        .. note::
            If :term:`custom attribute` uses the same name - it will be represented as a separate :term:`attribute`.

    Analytics ID
        ID assigned to :term:`visitor` by :term:`Analytics` for the duration of :term:`Analytics` session. It is stored in
        browser cookie.

    Application
        Website or application tracked by PPAS.

    App ID
        PPAS :term:`application` identificator (previously **website ID**, **site ID** or **idSite**).

    Attribute
        Named value assigned to :term:`visitor` profile.

    Attribute whitelist
        List of :term:`visitor` :term:`attributes<attribute>` that are publicly available via Audience Manager API.

        .. note::
            It is still necessary to identify the :term:`user` with his :term:`analytics ID` to access this information.

    Audience
        Named set of :term:`attribute` conditions used to define a group of :term:`visitors<visitors>` matching them.

    Custom attribute
        :term:`Attribute` generated from value provided by source other than :term:`Analytics` (e.g.
        :doc:`audience_manager/form-tracker`, :doc:`sdk/index`). You can read more about :term:`attribute` sources
        `here <https://help.piwik.pro/audience-manager/data-sources/>`_.

        .. warning::
            :term:`Custom attribute` will store only latest value provided by any custom source.

        .. note::
            If :term:`analytics attribute` uses the same name - it will be represented as a separate :term:`attribute`.

    Device ID
        Device ID (device identification) is a distinctive number associated with a smartphone or similar handheld
        device. Device IDs are separate from hardware serial numbers.

    Identifier
        Unique identifier of a :term:`user` ID (e.g. :term:`analytics ID`, :term:`user ID`, :term:`device ID` or email).

    JavaScript Tracking Client (JSTC)
        A JavaScript object that is able to send requests to CPP. It is loaded and created with download of `ppms.js` file. It has an :ref:`API<data-collection-javascript-tracking-client-api>` that allows to configure what data requests should contain. You can :ref:`learn more about JSTC here<data-collection-javascript-tracking-client-installation>`

    JavaScript Tracking Snippet (JSTS)
        A JavaScript code, usually in form of HTML tag, that initiates JSTC and sends first tracking request. You can see an :ref:`example of JSTS here<jtc-installation-jsts-example>`.

    PII
        Personally Identifiable Information.

    Tracking Tag
        A HTML tag, that is created and configured by Tag Manager. It is loaded to the website with Tag Manager Container. Using a Tracking Tag is an alternative for implementing a JavaScript Tracking Snippet. You can :ref:`learn more about Tracking Tag here<https://help.piwik.pro/support/tag-manager/piwik-pro-tag/>`.

    User ID
        Permanent ID assigned to :term:`visitor` by :term:`application` (e.g. username). You can read more about it
        `here <https://help.piwik.pro/tag-manager/userid/>`_.

    Visit
        Period of continuous :term:`visitor` activity on :term:`application`. It ends in the following situations:

            - after a period of inactivity (option set to 30 minutes by default)
            - on campaign change (option enabled by default)
            - when HTTP referrer points to different website (option disabled by default)

    Visitor
        Visitor on tracked :term:`application`.
