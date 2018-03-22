.. highlight:: js
.. default-domain:: js

TRACKER OBJECT FUNCTIONS
========================

Accessing Tracker Object
------------------------

To access tracker object instance you must use  ``Piwik.getTracker`` function::

.. function:: Piwik.getTracker(trackerUrl, siteId);

Getter for Analytics Tracker instance.

    :param string trackerUrl: Url for tracker
        :param string siteId: Site Id that will be linked to tracked data.
        :returns: Analytics Tracker instance



To access internal instance of the Tracker used for asynchronous tracking you must use  ``Piwik.getAsyncTracker`` function::

.. function:: Piwik.getAsyncTracker(trackerUrl, siteId);

Getter for Analytics Tracker instance.

    :param string trackerUrl: Url for tracker
            :param string siteId: Site Id that will be linked to tracked data.
            :returns: Analytics Tracker instance



