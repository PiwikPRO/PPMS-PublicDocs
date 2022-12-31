.. _android track().exception():

===================
track().exception()
===================

The **track().exception()** method records caught exceptions (errors) on your app. For each exception, you need to define handling code.

Syntax
------

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .exception(ex)
            .description("description")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .exception(ex)
            .description("description")
            .with(tracker)

Parameters
----------

| **ex** (Throwable, optional)
| The caught exception instance. The exception instance is automatically translated to a URL, and the following information is added to it: package name, activity path, method name and line number where the crash occurred.

| **description** (string, optional)
| Additional information about the issue.

Examples
--------

To send a caught exception:

.. tabs::

    .. group-tab:: Java

        .. code-block:: javascript

          TrackHelper.track()
            .exception(new Exception("OnPurposeException"))
            .description("Download error")
            .with(getTracker());


    .. group-tab:: Kotlin

        .. code-block:: javascript

          TrackHelper.track()
            .exception(Exception("OnPurposeException"))
            .description("Download error")
            .with(tracker)
