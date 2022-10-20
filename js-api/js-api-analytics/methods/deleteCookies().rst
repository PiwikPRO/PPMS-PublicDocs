.. _deleteCookies():

===============
deleteCookies()
===============

The **deleteCookies()** method deletes the existing visitor cookie (``_pk_id.*``) and session cookie (``_pk_ses.*``) that are responsible for recognizing visitors and their sessions. The cookies will be deleted with the next page view.

Syntax
------

.. tabs::

    .. group-tab:: JS

        .. code-block:: javascript

          deleteCookies()


Examples
--------

To delete visitor cookies:

.. tabs::

    .. group-tab:: JS (queue)

        .. code-block:: javascript

          _paq.push(["deleteCookies"]);

    .. group-tab:: JS (direct)

        .. code-block:: javascript

          var jstc = Piwik.getTracker(
            "https://example.com/",
            "45e07cbf-c8b3-42f3-a6d6-a5a176f623ef"
          );
          console.log(jstc.hasCookies());


Related methods
---------------

* enableCookies()
* disableCookies()
* hasCookies()
* setCookieNamePrefix()
* setCookieDomain()
* getCookieDomain()
* setCookiePath()
* getCookiePath()
* setSecureCookie()
* setVisitorCookieTimeout()
* getConfigVisitorCookieTimeout()
* setReferralCookieTimeout()
* setSessionCookieTimeout()
* getSessionCookieTimeout()
* setVisitorIdCookie()
