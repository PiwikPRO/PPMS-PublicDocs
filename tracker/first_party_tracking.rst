First Party Tracker
===================
This documet describes first party tracker implementation.

What is a first party tracker?
------------------------------

Classic implementation of tracking code of Piwik PRO Analytics Suite (PPAS) involves a request to a third party domain which is usually your-instance-name.piwik.pro. This causes the visitor cookie to be created as a third party. Unfortunately such simple tracking implementation is often blocked by tracking prevention systems.

In order to create a first party visitor cookie you need to host a tracker in your domain. There are two ways to accomplish this. PPAS could be hosted as a subdomain (ex. analytics.example.com) or you can create additional routes on your proxy to mimic first party experience for end users. Second solution is the subject of this documentation. 

As terms of first and third party cookies were introduced without any explanation it is advised to  read the following Clearcode blog post - https://clearcode.cc/blog/difference-between-first-party-third-party-cookies.

In order to set up a first party tracker you need to modify two components - your reverse proxy and PiwikPro tag.

How to configure a reverse proxy?
---------------------------------
We need to configure a reverse proxy to achieve following goals:

* All requests to ``your-website.com/t.js`` will be proxied to ``your-instance.piwik.pro/ppms.js``.
* All requests to ``your-website.com/t.php`` will be proxied to ``your-instance.piwik.pro/ppms.php``.
* ``X-Forwarded-For`` header will be added to request to ``your-instance.piwik.pro``.

.. HINT::
    To avoid collision you can use any name instead of ``t.js`` and ``t.php``, just remember to change these paths consistently everywhere they occur in this documentation.

We prepared example configuration guidelines for most common proxies and web servers: 

* :ref:`first-party-tracker-apache`
    

How to configure PiwikPRO container?
------------------------------------
TBD...