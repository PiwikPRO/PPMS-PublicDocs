.. _android track().campaign():

==================
track().campaign()
==================

The **track().campaign()** method tracks online campaigns that bring traffic to your mobile app. To track a campaign, you need to add campaign parameters to each campaign link and then use this method to pass that data. Campaign data is collected with the first tracked screen event.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .campaign("campaignURL");


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .campaign("campaignURL")


Parameters
----------

| **campaignURL** (string, required)
| The URL you used in your campaign to bring traffic to your mobile app. Valid formats:  HTTPS, HTTP and FTP. Example: ``http://example.com?pk_campaign=Summer_Promo&pk_keyword=banking_app``

| Note: You can tag campaigns manually or use our `Piwik PRO URL builder <https://help.piwik.pro/support/collecting-data/piwik-pro-url-builder/>`_. For now, only the pk_campaign and pk_keyword work on SDKs, so don't use other parameters.

Examples
--------

To pass campaign data from a campaign link ``http://example.com?pk_campaign=Summer_Promo&pk_keyword=banking_app``:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .campaign("http://example.com?pk_campaign=Summer_Promo&pk_keyword=banking_app");

          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker);

    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .campaign("http://example.com?pk_campaign=Summer_Promo&pk_keyword=banking_app")

          TrackHelper.track()
            .screen("example/welcome")
            .title("Welcome")
            .with(tracker)

Notes
-----

* For now, only pk_campaign and pk_keyword work on SDKs, so don't use other parameters.
* Piwik PRO recognizes the pk_campaign and pk_keyword parameters by default. But if you run into any problems, check if these parameters are added in Administration > Sites & apps > Data collection > Campaigns > Campaign parameters. `Read more <https://help.piwik.pro/support/questions/how-can-i-customize-piwik-pro-campaign-parameters/>`_.
