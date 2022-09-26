About
=====

JS API for Consent Manager contain methods that let you:

* Get compliance types
* Get new compliance types
* Set initial compliance settings
* Set compliance settings
* Get compliance settings
* Send a data subject request
* Open a consent form
* Track consent stats


In JavaScript, our methods can be called in this way:

* JS (queue):  After installing our container’s code, it’ll create the ``_paq`` object (a queue). You can use the ``ppms.cm.api`` method to add methods to the queue. Our tracker will then access and proceed these methods.

ppms.cm.api
-----------

The ``ppms.cm.api`` method adds methods to the ``_paq`` object (a queue). The methods are called after the container’s code (or a tracking code) loads on a page. They are called synchronously (one by one).

Syntax
^^^^^^
.. code-block:: javascript

    ppms.cm.api(command, ...args)

Parameters
^^^^^^^^^^
| **command** (string, required)
| Command name

| **args** (optional)
| Command arguments. The number of arguments and their function depend on command.

Returns
^^^^^^^
Commands are expected to be run asynchronously and return no value.
Type: undefined


.. _`Piwik PRO - Custom consent form example`: https://piwikpro.github.io/ConsentManager-CustomConsentFormExample/

Commands
--------
All commands work in the context of the current visitor and website. Additionally, they sometimes require communication with a PPAS server and are asynchronous. Callback functions are used to provide response value or information about errors. ``onSuccess(...args)`` callback is required, with the exception of ``openConsentForm`` command where it is optional. ``onFailure(exception)`` callback is optional and if is specified, any error object occurred will be passed as an argument. If not specified, an error is reported directly on the console output.

.. note::
    For examples of how to use a specific command in your custom consent form
    implementation (including how to track consent stats), reffer to the
    `Piwik PRO - Custom consent form example`_
