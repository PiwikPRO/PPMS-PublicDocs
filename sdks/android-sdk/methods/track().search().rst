.. _android track().search():

================
track().search()
================

The **track().search()** method tracks searches on your internal search engine.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .search("keyword")
            .category("category")
            .count(searchCount)
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .search("keyword")
            .category("category")
            .count(searchCount)
            .with(tracker)

Parameters
----------

| **keyword** (string, required)
| A keyword the user entered into the search box.

| **category** (string | array<string>, optional)
| A category selected in the search engine.

| **searchCount** (number, optional)
| The number of search results.

Examples
--------

To send an internal search with the keyword "ATM in London" and 20 search results, but no category:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          Tracker tracker = ((PiwikApplication) getApplication()).getTracker();
          TrackHelper.track()
            .search("ATM in London")
            .category("")
            .count(20)
            .with(tracker);



    .. group-tab:: Kotlin

        .. code-block:: javascript

          val tracker: Tracker = (application as PiwikApplication).tracker
          TrackHelper.track()
            .search("ATM in London")
            .category("")
            .count(20)
            .with(tracker)
