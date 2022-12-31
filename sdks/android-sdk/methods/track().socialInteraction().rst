.. _android track().socialInteraction():

===========================
track().socialInteraction()
===========================

The **track().socialInteraction()** method records likes, shares and comments on social media on your app.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .socialInteraction("interaction", "network")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .socialInteraction("interaction", "network")
            .with(tracker)

Parameters
----------

| **interaction** (string, required)
| The interaction type. Example: like, share, comment.

| **network** (string, required)
| The social media for which the interaction happened. Example: Facebook, Instagram, YouTube.

Examples
--------

To track a like on Facebook on your app:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .socialInteraction("like", "Facebook")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .socialInteraction("like", "Facebook")
            .with(tracker)
