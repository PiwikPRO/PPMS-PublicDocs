.. _plain-java-script-consent-manager:

================
Plain JavaScript
================
Here are some guidelines on how to use our Consent Manager JS API in Java Script.

Installation
------------

Our JavaScript library can be used only after you installed our container's code (or only a tracking code) on your site. The code creates a ``<script>`` tag that asynchronously loads the JavaScript library in the website's body section.

If you haven't installed the code yet, you can find it directly in Piwik PRO in **Menu** > **Administration** > **Sites & apps** > **Installation**.

For more, see our installation guides:

* `Install a container (with a tracking code) <https://help.piwik.pro/support/getting-started/install-a-tracking-code/>`_
* `Google Tag Manager: install a container (with a tracking code) <https://help.piwik.pro/support/getting-started/google-tag-manager-install-a-container-with-a-tracking-code/>`_
* `Google Tag Manager: install only a tracking code <https://help.piwik.pro/support/getting-started/google-tag-manager-install-a-tracking-code/>`_
* `Instapage: install a container (with a tracking code) <https://help.piwik.pro/support/getting-started/instapage-install-a-container-with-a-tracking-code/>`_
* `No Piwik PRO Tag Manager: install a tracking code <https://help.piwik.pro/support/getting-started/no-piwik-pro-tag-manager-install-a-tracking-code/>`_
* `Squarespace: install a container (with a tracking code) <https://help.piwik.pro/support/getting-started/squarespace-install-a-container-with-a-tracking-code/>`_
* `WordPress: install a container (with a tracking code) <https://help.piwik.pro/support/getting-started/wordpress-install-a-tracking-code/>`_



Methods used for calls
----------------------

In JavaScript, our methods can be called in this way:

* **JS (queue)**:  After installing our container’s code, it’ll create the ``_paq`` object (a queue). You can use the ``ppms.cm.api`` method to add methods to the queue. Our tracker will then access and proceed these methods.



ppms.cm.api
^^^^^^^^^^^

The ``ppms.cm.api`` method adds methods to the ``_paq`` object (a queue). The methods are called after the container’s code (or a tracking code) loads on a page. They are called synchronously (one by one).

Syntax
######
.. code-block:: javascript

    ppms.cm.api(command, ...args)

Parameters
##########
| **command** (string, required)
| Command name

| **args** (optional)
| Command arguments. The number of arguments and their function depend on command.

Returns
########
Commands are expected to be run asynchronously and return no value.
Type: undefined

Notes
#####

* All commands work in the context of the current visitor and website. Additionally, they sometimes require communication with a Piwik PRO's server and are asynchronous.
* Callback functions are used to provide response value or information about errors.
* ``onSuccess(...args)`` callback is required, with the exception of ``openConsentForm`` command where it is optional.
* ``onFailure(exception)`` callback is optional and if is specified, any error object occurred will be passed as an argument. If not specified, an error is reported directly on the console output.


Custom consent form
-------------------

Our Consent Manager JS API lets you build a custom consent form in place of the default one.

To turn on custom consent form, follow these steps:

1. Log in to Piwik PRO.
2. Go to **Menu**.
3. Go to **Administration** > **Sites & apps**.
4. Navigate to **Privacy**.
5. Turn on **Ask visitors for consent**.
6. Turn on **Use a custom consent form**.
